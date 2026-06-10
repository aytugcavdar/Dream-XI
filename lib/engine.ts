import { GameState, Player, NationalTeam, SimulationResult, MatchResult, PlayerMatchStats, PlayerSeasonStats } from '../types';
import { teams } from '../data/teams';
import { PARTNERSHIPS } from './constants';
import { simulatePlayerMatchStats, selectManOfTheMatch } from './engine.player-stats';

// Weighted random selection helper
function pickWeighted<T>(items: T[], weights: number[]): T {
  const total = weights.reduce((sum, w) => sum + w, 0);
  let threshold = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    threshold -= weights[i];
    if (threshold <= 0) {
      return items[i];
    }
  }
  return items[items.length - 1];
}

export function simulate(state: GameState): SimulationResult {
  const { selectedTeam, selectedYear, squad } = state;

  if (!selectedTeam || !selectedYear) {
    throw new Error('Team and Year must be selected before simulation');
  }

  // Get active squad players (non-null)
  const squadPlayers = Object.values(squad).filter((p): p is Player => p !== null);
  if (squadPlayers.length !== 11) {
    throw new Error('Squad must have exactly 11 players');
  }

  // Get current active tactical style
  const style = state.tacticalStyle || 'tiki-taka';

  // Apply tactical style rating bonuses for match-day calculations
  const modifiedSquadPlayers = squadPlayers.map(p => {
    let ratingBonus = 0;
    if (style === 'tiki-taka' && p.positionGroup === 'MID') {
      ratingBonus = 3;
    } else if (style === 'gegenpress' && p.positionGroup === 'ATT') {
      ratingBonus = 2;
    } else if (style === 'catenaccio' && (p.positionGroup === 'DEF' || p.positionGroup === 'GK')) {
      ratingBonus = 3;
    } else if (style === 'joga-bonito' && (p.position === 'LW' || p.position === 'RW' || p.position === 'ST' || p.position === 'CF')) {
      ratingBonus = 4;
    } else if (style === 'route-one' && (p.position === 'ST' || p.position === 'CF')) {
      ratingBonus = 3;
    }
    return { ...p, rating: p.rating + ratingBonus };
  });

  // Calculate Average Squad Rating with Legendary Partnerships bonus of +4 per pair
  let partnershipBonus = 0;
  const playerNames = squadPlayers.map(p => p.name.toLowerCase());
  PARTNERSHIPS.forEach(pair => {
    const hasP1 = playerNames.some(name => name.includes(pair.p1.toLowerCase()));
    const hasP2 = playerNames.some(name => name.includes(pair.p2.toLowerCase()));
    if (hasP1 && hasP2) {
      partnershipBonus += 4;
    }
  });

  const squadRatingsSum = modifiedSquadPlayers.reduce((sum, p) => sum + p.rating, 0);
  const teamRating = Math.round(squadRatingsSum / 11) + partnershipBonus;

  // Select 4 progressive opponents (Round of 16 -> Champion)
  const opponentPool = teams.filter(t => t.id !== selectedTeam.id);
  
  // Scramble and take 4 distinct teams
  const shuffledOpponents = [...opponentPool].sort(() => Math.random() - 0.5);
  const roundOpponents = {
    'Round of 16': shuffledOpponents[0] || teams[1],
    'Quarter-Finals': shuffledOpponents[1] || teams[2],
    'Semi-Finals': shuffledOpponents[2] || teams[3],
    'Final': shuffledOpponents[3] || teams[0]
  };

  const rounds: Array<'Round of 16' | 'Quarter-Finals' | 'Semi-Finals' | 'Final'> = [
    'Round of 16',
    'Quarter-Finals',
    'Semi-Finals',
    'Final'
  ];

  const matches: MatchResult[] = [];
  let currentRoundIndex = 0;
  let tournamentWon = true;
  let exitRound: 'Round of 16' | 'Quarter-Finals' | 'Semi-Finals' | 'Final' | 'Champion' = 'Champion';
  let finalScore = '';

  // Store player performance logs across all matches
  const matchPerformanceLogs: { [playerId: string]: PlayerMatchStats[] } = {};
  squadPlayers.forEach(p => {
    matchPerformanceLogs[p.id] = [];
  });

  // 3. Simulate knockout matches iteratively
  for (let i = 0; i < rounds.length; i++) {
    const roundName = rounds[i];
    const opponent = roundOpponents[roundName];

    // Compute relative strengths
    // Squad effective rating heavily weights player quality on the field with a bonus from the nation strength
    const ourSquadPower = (teamRating * 0.75) + (selectedTeam.strength * 2.5);
    const opponentPower = (opponent.strength * 8.5) + (Math.random() * 15 + 1);

    // Score generation
    const powerDifference = ourSquadPower - opponentPower;
    
    // Team goals
    let ourGoals = Math.max(0, Math.floor(Math.random() * 3));
    if (powerDifference > 15) {
      ourGoals += Math.floor(Math.random() * 3) + 1;
    } else if (powerDifference > 5) {
      ourGoals += Math.floor(Math.random() * 2);
    } else if (powerDifference < -12) {
      ourGoals = Math.max(0, ourGoals - 1);
    }

    // Opponent goals
    let opponentGoals = Math.max(0, Math.floor(Math.random() * 3));
    if (powerDifference < -15) {
      opponentGoals += Math.floor(Math.random() * 3) + 1;
    } else if (powerDifference < -5) {
      opponentGoals += Math.floor(Math.random() * 2);
    } else if (powerDifference > 12) {
      opponentGoals = Math.max(0, opponentGoals - 1);
    }

    // Apply philosophy specific score adjustments
    if (style === 'catenaccio') {
      opponentGoals = Math.max(0, opponentGoals - 1);
      if (Math.random() < 0.3) ourGoals = Math.max(0, ourGoals - 1);
    } else if (style === 'joga-bonito') {
      ourGoals += Math.floor(Math.random() * 2);
      opponentGoals += Math.floor(Math.random() * 2);
    } else if (style === 'route-one' && Math.random() < 0.45) {
      ourGoals += 1;
    }

    // Clean sheet bonus / adjustments
    if (ourGoals === opponentGoals) {
      // Must break ties in knockout! Penalties or extra time.
      const shootoutWeight = ourSquadPower / (ourSquadPower + opponentPower);
      const weWonShootout = Math.random() < shootoutWeight;
      
      const pensTeam = weWonShootout ? 4 + Math.floor(Math.random() * 2) : 3 - Math.floor(Math.random() * 2);
      const pensOpp = weWonShootout ? pensTeam - 1 - Math.floor(Math.random() * 2) : pensTeam + 1 + Math.floor(Math.random() * 2);
      
      // Keep score identical but flag who won
      const matchWon = weWonShootout;
      const matchScoreFormatted = `${ourGoals}-${opponentGoals} (${matchWon ? 'W' : 'L'} pen)`;
      
      const playerStats = simulatePlayerMatchStats(modifiedSquadPlayers, ourGoals, true, style);
      const motmPlayer = selectManOfTheMatch(playerStats);

      matches.push({
        round: roundName,
        opponentName: opponent.name,
        opponentFlag: opponent.flag,
        opponentStrength: opponent.strength,
        teamGoals: ourGoals,
        opponentGoals,
        won: matchWon,
        playerStats,
        motm: motmPlayer
      });

      playerStats.forEach(stat => {
        // Map back stats row to the original non-modified IDs
        matchPerformanceLogs[stat.playerId].push(stat);
      });

      if (!matchWon) {
        tournamentWon = false;
        exitRound = roundName;
        finalScore = `${ourGoals}-${opponentGoals} (Lost pens)`;
        break;
      }
    } else {
      const matchWon = ourGoals > opponentGoals;
      const playerStats = simulatePlayerMatchStats(modifiedSquadPlayers, ourGoals, false, style);
      const motmPlayer = selectManOfTheMatch(playerStats);

      matches.push({
        round: roundName,
        opponentName: opponent.name,
        opponentFlag: opponent.flag,
        opponentStrength: opponent.strength,
        teamGoals: ourGoals,
        opponentGoals,
        won: matchWon,
        playerStats,
        motm: motmPlayer
      });

      playerStats.forEach(stat => {
        matchPerformanceLogs[stat.playerId].push(stat);
      });

      if (!matchWon) {
        tournamentWon = false;
        exitRound = roundName;
        finalScore = `${ourGoals}-${opponentGoals}`;
        break;
      }
    }
  }

  if (tournamentWon) {
    exitRound = 'Champion';
    const lastMatch = matches[matches.length - 1];
    finalScore = `${lastMatch.teamGoals}-${lastMatch.opponentGoals}`;
  }

  // 4. Combine Season-Long Stats
  const playerSeasonStats: PlayerSeasonStats[] = squadPlayers.map(p => {
    const logs = matchPerformanceLogs[p.id] || [];
    const gamesPlayed = logs.length;

    const totalGoals = logs.reduce((sum, item) => sum + item.goals, 0);
    const totalAssists = logs.reduce((sum, item) => sum + item.assists, 0);
    const totalXG = parseFloat(logs.reduce((sum, item) => sum + item.xG, 0).toFixed(1));
    const avgRating = gamesPlayed > 0 
      ? parseFloat((logs.reduce((sum, item) => sum + item.rating, 0) / gamesPlayed).toFixed(2))
      : 6.0;
    const avgPassAccuracy = gamesPlayed > 0
      ? Math.round(logs.reduce((sum, item) => sum + item.passAccuracy, 0) / gamesPlayed)
      : 80;

    const motmCount = matches.filter(m => m.motm === p.name).length; // match on player names

    return {
      playerId: p.id,
      goals: totalGoals,
      assists: totalAssists,
      xG: totalXG,
      avgRating,
      passAccuracy: avgPassAccuracy,
      motmCount
    };
  });

  // Calculate tournament MVP (squad player with highest average match rating)
  const mvpStats = [...playerSeasonStats].sort((a, b) => b.avgRating - a.avgRating)[0];
  const mvpPlayer = squadPlayers.find(p => p.id === mvpStats.playerId) || squadPlayers[0];

  // Calculate Top Scorer
  const sortedByGoals = [...playerSeasonStats].sort((a, b) => b.goals - a.goals || b.avgRating - a.avgRating);
  const topScorerStats = sortedByGoals[0];
  const topScorerPlayer = squadPlayers.find(p => p.id === topScorerStats.playerId) || squadPlayers[0];

  // Team aggregation stats
  const totalMatchesCount = matches.length;
  const totalGoalsScored = matches.reduce((sum, m) => sum + m.teamGoals, 0);
  const totalGoalsConceded = matches.reduce((sum, m) => sum + m.opponentGoals, 0);
  
  const totalXG = parseFloat(playerSeasonStats.reduce((sum, p) => sum + p.xG, 0).toFixed(1));
  
  // Tactical style modifiers for team averages
  let avgPossession = 48 + Math.floor(Math.random() * 10) + Math.min(5, Math.floor((teamRating - 80) / 3));
  if (style === 'tiki-taka') avgPossession += 8;
  if (style === 'route-one') avgPossession -= 6;
  avgPossession = Math.min(68, Math.max(38, avgPossession));

  let avgPassAccuracy = Math.round(playerSeasonStats.reduce((sum, p) => sum + p.passAccuracy, 0) / squadPlayers.length);
  if (style === 'tiki-taka') avgPassAccuracy = Math.min(95, avgPassAccuracy + 5);
  if (style === 'route-one') avgPassAccuracy = Math.max(68, avgPassAccuracy - 6);

  const cleanSheets = matches.filter(m => m.opponentGoals === 0).length;

  return {
    won: tournamentWon,
    finalScore,
    exitRound,
    matches,
    playerSeasonStats,
    mvp: mvpPlayer,
    teamRating,
    topScorer: {
      player: topScorerPlayer,
      goals: topScorerStats.goals
    },
    teamStats: {
      totalXG,
      avgPossession,
      avgPassAccuracy,
      cleanSheets
    }
  };
}


