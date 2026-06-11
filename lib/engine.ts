import { GameState, MatchEvent, MatchResult, NationalTeam, Player, PlayerMatchStats, PlayerSeasonStats, SimulationResult } from '../types';
import { teams } from '../data/teams';
import { PARTNERSHIPS, type TacticalStyleId } from './constants';
import { buildPlayerMatchStats, selectManOfTheMatch } from './engine.player-stats';

type Rng = () => number;

type StyleProfile = {
  tempo: number;
  attack: number;
  defense: number;
  possession: number;
  passAccuracy: number;
  shotQuality: number;
  risk: number;
  press: number;
  directness: number;
};

const STYLE_PROFILES: Record<string, StyleProfile> = {
  'tiki-taka': { tempo: -1, attack: 0.4, defense: 0.2, possession: 9, passAccuracy: 6, shotQuality: 0.04, risk: -0.08, press: 0.1, directness: -0.3 },
  gegenpress: { tempo: 2, attack: 0.8, defense: -0.1, possession: 2, passAccuracy: -1, shotQuality: -0.01, risk: 0.12, press: 0.45, directness: 0.1 },
  catenaccio: { tempo: -2, attack: -0.5, defense: 1.2, possession: -5, passAccuracy: 1, shotQuality: 0.02, risk: -0.22, press: -0.2, directness: -0.1 },
  'joga-bonito': { tempo: 2, attack: 1.2, defense: -0.6, possession: 3, passAccuracy: 1, shotQuality: 0.06, risk: 0.2, press: 0, directness: 0.2 },
  'route-one': { tempo: 1, attack: 0.5, defense: -0.1, possession: -7, passAccuracy: -7, shotQuality: 0.08, risk: 0.05, press: -0.1, directness: 0.75 },
};

function hashString(input: string) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRng(seedInput: string): Rng {
  let state = hashString(seedInput) || 1;
  return () => {
    state += 0x6D2B79F5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function pickWeighted<T>(items: T[], weights: number[], rng: Rng): T {
  const total = weights.reduce((sum, w) => sum + Math.max(0.001, w), 0);
  let threshold = rng() * total;
  for (let i = 0; i < items.length; i++) {
    threshold -= Math.max(0.001, weights[i]);
    if (threshold <= 0) return items[i];
  }
  return items[items.length - 1];
}

function sampleWithoutReplacement<T>(items: T[], count: number, weightFn: (item: T, index: number) => number, rng: Rng) {
  const pool = [...items];
  const picked: T[] = [];
  while (pool.length > 0 && picked.length < count) {
    const item = pickWeighted(pool, pool.map(weightFn), rng);
    picked.push(item);
    pool.splice(pool.indexOf(item), 1);
  }
  return picked;
}

function average(players: Player[], predicate: (player: Player) => boolean, fallback: number) {
  const scoped = players.filter(predicate);
  if (scoped.length === 0) return fallback;
  return scoped.reduce((sum, player) => sum + player.rating, 0) / scoped.length;
}

function applyStyleBonus(player: Player, style: string): Player {
  let ratingBonus = 0;
  if (style === 'tiki-taka' && player.positionGroup === 'MID') ratingBonus = 3;
  if (style === 'gegenpress' && (player.positionGroup === 'ATT' || player.positionGroup === 'MID')) ratingBonus = 2;
  if (style === 'catenaccio' && (player.positionGroup === 'DEF' || player.positionGroup === 'GK')) ratingBonus = 3;
  if (style === 'joga-bonito' && player.positionGroup === 'ATT') ratingBonus = 4;
  if (style === 'route-one' && player.positionGroup === 'ATT') ratingBonus = 3;
  return { ...player, rating: player.rating + ratingBonus };
}

function partnershipBonus(players: Player[]) {
  let bonus = 0;
  const playerNames = players.map(player => player.name.toLowerCase());
  PARTNERSHIPS.forEach(pair => {
    const hasP1 = playerNames.some(name => name.includes(pair.p1.toLowerCase()));
    const hasP2 = playerNames.some(name => name.includes(pair.p2.toLowerCase()));
    if (hasP1 && hasP2) bonus += 4;
  });
  return bonus;
}

function createSeed(state: GameState, squadPlayers: Player[]) {
  const squadKey = squadPlayers
    .map(player => `${player.id}:${player.rating}`)
    .sort()
    .join('|');
  return `${state.selectedTeam?.id}:${state.selectedYear}:${state.formation}:${state.tacticalStyle}:${squadKey}`;
}

function selectOpponents(selectedTeam: NationalTeam, selectedYear: number, rng: Rng) {
  const sameYear = teams.filter(team => team.id !== selectedTeam.id && team.worldCupAppearances.includes(selectedYear));
  const pool = sameYear.length >= 4 ? sameYear : teams.filter(team => team.id !== selectedTeam.id);
  const roundPressure = [0.7, 1.0, 1.35, 1.75];

  return sampleWithoutReplacement(pool, 4, (team, index) => {
    const pressure = roundPressure[Math.min(index, roundPressure.length - 1)];
    return Math.pow(team.strength, pressure);
  }, rng);
}

function chooseShooter(players: Player[], profile: StyleProfile, rng: Rng) {
  return pickWeighted(
    players,
    players.map(player => {
      const group =
        player.positionGroup === 'ATT' ? 13
        : player.positionGroup === 'MID' ? 5
        : player.positionGroup === 'DEF' ? 1.2
        : 0.05;
      const directBonus = profile.directness > 0 && player.positionGroup === 'ATT' ? 4 * profile.directness : 0;
      return (group + directBonus) * (player.rating / 75);
    }),
    rng,
  );
}

function chooseAssister(players: Player[], scorer: Player, rng: Rng) {
  const candidates = players.filter(player => player.id !== scorer.id);
  return pickWeighted(
    candidates,
    candidates.map(player => {
      const base =
        player.positionGroup === 'MID' ? 12
        : player.positionGroup === 'ATT' ? 6
        : player.positionGroup === 'DEF' ? 2
        : 0.1;
      return base * (player.rating / 75);
    }),
    rng,
  );
}

function chanceXG(shooter: Player, profile: StyleProfile, rng: Rng) {
  const base =
    shooter.positionGroup === 'ATT' ? 0.16
    : shooter.positionGroup === 'MID' ? 0.09
    : shooter.positionGroup === 'DEF' ? 0.055
    : 0.015;
  const variance = rng() * 0.18;
  return parseFloat(clamp(base + variance + profile.shotQuality, 0.02, 0.55).toFixed(2));
}

function opponentXG(opponent: NationalTeam, rng: Rng, profile: StyleProfile) {
  return parseFloat(clamp(0.06 + opponent.strength * 0.015 + rng() * 0.18 + profile.risk * 0.18, 0.02, 0.5).toFixed(2));
}

function eventDescription(event: Omit<MatchEvent, 'id' | 'description'>, team: NationalTeam, opponent: NationalTeam) {
  if (event.type === 'kickoff') return `${team.name} and ${opponent.name} are underway.`;
  if (event.type === 'goal' && event.team === 'user') {
    return `${event.playerName} scores${event.assistPlayerName ? ` from ${event.assistPlayerName}'s pass` : ''}.`;
  }
  if (event.type === 'goal' && event.team === 'opponent') return `${opponent.name} finish a dangerous move.`;
  if (event.type === 'save') return `${event.playerName} forces a save.`;
  if (event.type === 'block') return `${event.playerName || opponent.name} sees the shot blocked.`;
  if (event.type === 'shot') return `${event.playerName || opponent.name} misses the target.`;
  if (event.type === 'penalty') return event.outcome === 'won' ? `${team.name} win the penalty shootout.` : `${team.name} lose the penalty shootout.`;
  if (event.type === 'full-time') return `Full time: ${event.score}.`;
  return `${event.playerName || opponent.name} creates a chance.`;
}

function addEvent(events: MatchEvent[], event: Omit<MatchEvent, 'id' | 'description'>, team: NationalTeam, opponent: NationalTeam) {
  const complete = {
    ...event,
    id: `${events.length + 1}_${event.minute}_${event.type}`,
    description: eventDescription(event, team, opponent),
  };
  events.push(complete);
  return complete;
}

function simulateMatch(params: {
  round: MatchResult['round'];
  team: NationalTeam;
  opponent: NationalTeam;
  squadPlayers: Player[];
  teamRating: number;
  profile: StyleProfile;
  style: string;
  rng: Rng;
}): MatchResult {
  const { round, team, opponent, squadPlayers, teamRating, profile, style, rng } = params;
  const attackRating = average(squadPlayers, player => player.positionGroup === 'ATT', teamRating);
  const midfieldRating = average(squadPlayers, player => player.positionGroup === 'MID', teamRating);
  const defenseRating = average(squadPlayers, player => player.positionGroup === 'DEF' || player.positionGroup === 'GK', teamRating);

  const ourPower = teamRating * 0.72 + attackRating * 0.18 + midfieldRating * 0.1 + team.strength * 1.8 + profile.attack * 3;
  const opponentPower = opponent.strength * 9 + 18 + rng() * 7;
  const powerDiff = ourPower - opponentPower;

  const possession = Math.round(clamp(50 + (midfieldRating - 80) * 0.8 + profile.possession + powerDiff * 0.15 + (rng() - 0.5) * 8, 32, 72));
  const ourChanceCount = clamp(Math.round(5 + profile.tempo + profile.attack + (possession - 50) / 8 + powerDiff / 12 + rng() * 4), 2, 14);
  const opponentChanceCount = clamp(Math.round(5 + profile.tempo * 0.3 + profile.risk * 4 - profile.defense + (50 - possession) / 10 - powerDiff / 14 + rng() * 4), 1, 13);

  const events: MatchEvent[] = [];
  addEvent(events, { minute: 0, team: 'system', type: 'kickoff', score: '0-0' }, team, opponent);

  let teamGoals = 0;
  let opponentGoals = 0;
  let teamXG = 0;
  let opponentTotalXG = 0;

  const chances = [
    ...Array.from({ length: ourChanceCount }, () => ({ side: 'user' as const, minute: 4 + Math.floor(rng() * 86) })),
    ...Array.from({ length: opponentChanceCount }, () => ({ side: 'opponent' as const, minute: 4 + Math.floor(rng() * 86) })),
  ].sort((a, b) => a.minute - b.minute || (a.side === 'user' ? -1 : 1));

  for (const chance of chances) {
    if (chance.side === 'user') {
      const shooter = chooseShooter(squadPlayers, profile, rng);
      const xG = chanceXG(shooter, profile, rng);
      teamXG += xG;
      const goalProbability = clamp(xG + (shooter.rating - 80) * 0.006 + powerDiff * 0.004, 0.03, 0.72);
      const outcomeRoll = rng();
      const assist = rng() < 0.78 ? chooseAssister(squadPlayers, shooter, rng) : null;

      if (outcomeRoll < goalProbability) {
        teamGoals += 1;
        addEvent(events, {
          minute: chance.minute,
          team: 'user',
          type: 'goal',
          playerId: shooter.id,
          playerName: shooter.name,
          assistPlayerId: assist?.id,
          assistPlayerName: assist?.name,
          xG,
          score: `${teamGoals}-${opponentGoals}`,
          outcome: 'goal',
        }, team, opponent);
      } else {
        const type = outcomeRoll < goalProbability + 0.25 ? 'save' : outcomeRoll < goalProbability + 0.45 ? 'block' : 'shot';
        addEvent(events, {
          minute: chance.minute,
          team: 'user',
          type,
          playerId: shooter.id,
          playerName: shooter.name,
          xG,
          score: `${teamGoals}-${opponentGoals}`,
          outcome: type === 'save' ? 'saved' : type === 'block' ? 'blocked' : 'missed',
        }, team, opponent);
      }
    } else {
      const xG = opponentXG(opponent, rng, profile);
      opponentTotalXG += xG;
      const goalProbability = clamp(xG + (opponent.strength - team.strength) * 0.015 - profile.defense * 0.045 - (defenseRating - 80) * 0.004, 0.025, 0.68);
      const outcomeRoll = rng();

      if (outcomeRoll < goalProbability) {
        opponentGoals += 1;
        addEvent(events, {
          minute: chance.minute,
          team: 'opponent',
          type: 'goal',
          opponentName: opponent.name,
          xG,
          score: `${teamGoals}-${opponentGoals}`,
          outcome: 'goal',
        }, team, opponent);
      } else {
        const keeper = squadPlayers.find(player => player.positionGroup === 'GK') || squadPlayers[0];
        const type = outcomeRoll < goalProbability + 0.32 ? 'save' : outcomeRoll < goalProbability + 0.52 ? 'block' : 'shot';
        addEvent(events, {
          minute: chance.minute,
          team: type === 'save' ? 'user' : 'opponent',
          type,
          playerId: type === 'save' ? keeper.id : undefined,
          playerName: type === 'save' ? keeper.name : opponent.name,
          opponentName: opponent.name,
          xG,
          score: `${teamGoals}-${opponentGoals}`,
          outcome: type === 'save' ? 'saved' : type === 'block' ? 'blocked' : 'missed',
        }, team, opponent);
      }
    }
  }

  let won = teamGoals > opponentGoals;
  if (teamGoals === opponentGoals) {
    const shootoutWeight = clamp(0.5 + (teamRating - opponent.strength * 10) / 60 + (average(squadPlayers, p => p.positionGroup === 'GK', teamRating) - 80) / 100, 0.25, 0.78);
    won = rng() < shootoutWeight;
    addEvent(events, {
      minute: 120,
      team: 'system',
      type: 'penalty',
      score: `${teamGoals}-${opponentGoals}`,
      outcome: won ? 'won' : 'lost',
    }, team, opponent);
  }

  addEvent(events, { minute: 90, team: 'system', type: 'full-time', score: `${teamGoals}-${opponentGoals}` }, team, opponent);

  const playerStats = buildPlayerMatchStats(squadPlayers, events, style, opponentGoals);
  const motm = selectManOfTheMatch(playerStats);

  return {
    round,
    opponentName: opponent.name,
    opponentFlag: opponent.flag,
    opponentStrength: opponent.strength,
    teamGoals,
    opponentGoals,
    teamXG: parseFloat(teamXG.toFixed(2)),
    opponentXG: parseFloat(opponentTotalXG.toFixed(2)),
    possession,
    won,
    playerStats,
    motm: motm.playerName,
    motmPlayerId: motm.playerId,
    motmPlayerName: motm.playerName,
    events,
  };
}

export function simulate(state: GameState): SimulationResult {
  const { selectedTeam, selectedYear, squad } = state;
  if (!selectedTeam || !selectedYear) throw new Error('Team and Year must be selected before simulation');

  const squadPlayers = Object.values(squad).filter((player): player is Player => player !== null);
  if (squadPlayers.length !== 11) throw new Error('Squad must have exactly 11 players');

  const style = state.tacticalStyle || 'tiki-taka';
  const profile = STYLE_PROFILES[style as TacticalStyleId] || STYLE_PROFILES['tiki-taka'];
  const rng = createRng(createSeed(state, squadPlayers));
  const modifiedSquadPlayers = squadPlayers.map(player => applyStyleBonus(player, style));

  const squadRatingsSum = modifiedSquadPlayers.reduce((sum, player) => sum + player.rating, 0);
  const teamRating = Math.round(squadRatingsSum / 11) + partnershipBonus(squadPlayers);
  const opponents = selectOpponents(selectedTeam, selectedYear, rng);

  const rounds: MatchResult['round'][] = ['Round of 16', 'Quarter-Finals', 'Semi-Finals', 'Final'];
  const matches: MatchResult[] = [];
  const matchPerformanceLogs: Record<string, PlayerMatchStats[]> = {};
  squadPlayers.forEach(player => {
    matchPerformanceLogs[player.id] = [];
  });

  let tournamentWon = true;
  let exitRound: SimulationResult['exitRound'] = 'Champion';
  let finalScore = '';

  for (let i = 0; i < rounds.length; i++) {
    const match = simulateMatch({
      round: rounds[i],
      team: selectedTeam,
      opponent: opponents[i] || teams.find(team => team.id !== selectedTeam.id)!,
      squadPlayers: modifiedSquadPlayers,
      teamRating,
      profile,
      style,
      rng,
    });
    matches.push(match);

    match.playerStats.forEach(stat => {
      matchPerformanceLogs[stat.playerId]?.push(stat);
    });

    if (!match.won) {
      tournamentWon = false;
      exitRound = match.round;
      finalScore = match.teamGoals === match.opponentGoals ? `${match.teamGoals}-${match.opponentGoals} (Lost pens)` : `${match.teamGoals}-${match.opponentGoals}`;
      break;
    }
  }

  if (tournamentWon) {
    const lastMatch = matches[matches.length - 1];
    finalScore = `${lastMatch.teamGoals}-${lastMatch.opponentGoals}`;
  }

  const playerSeasonStats: PlayerSeasonStats[] = squadPlayers.map(player => {
    const logs = matchPerformanceLogs[player.id] || [];
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
    const motmCount = matches.filter(match => match.motmPlayerId === player.id || match.motm === player.name).length;

    return {
      playerId: player.id,
      goals: totalGoals,
      assists: totalAssists,
      xG: totalXG,
      avgRating,
      passAccuracy: avgPassAccuracy,
      motmCount,
    };
  });

  const mvpStats = [...playerSeasonStats].sort((a, b) => b.avgRating - a.avgRating)[0];
  const mvpPlayer = squadPlayers.find(player => player.id === mvpStats.playerId) || squadPlayers[0];
  const topScorerStats = [...playerSeasonStats].sort((a, b) => b.goals - a.goals || b.avgRating - a.avgRating)[0];
  const topScorerPlayer = squadPlayers.find(player => player.id === topScorerStats.playerId) || squadPlayers[0];

  const totalXG = parseFloat(matches.reduce((sum, match) => sum + (match.teamXG || 0), 0).toFixed(1));
  const avgPossession = matches.length
    ? Math.round(matches.reduce((sum, match) => sum + (match.possession || 50), 0) / matches.length)
    : 50;
  const avgPassAccuracy = Math.round(playerSeasonStats.reduce((sum, player) => sum + player.passAccuracy, 0) / squadPlayers.length);
  const cleanSheets = matches.filter(match => match.opponentGoals === 0).length;

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
      goals: topScorerStats.goals,
    },
    teamStats: {
      totalXG,
      avgPossession,
      avgPassAccuracy,
      cleanSheets,
    },
  };
}
