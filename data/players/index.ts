import { Player, DbPlayerTemplate } from '../../types';
import { brazilLegends, brazilRealPlayers } from './brazil';
import { argentinaLegends, argentinaRealPlayers } from './argentina';
import { germanyLegends, germanyRealPlayers } from './germany';
import { italyLegends, italyRealPlayers } from './italy';
import { franceLegends, franceRealPlayers } from './france';
import { netherlandsLegends, netherlandsRealPlayers } from './netherlands';
import { spainLegends, spainRealPlayers } from './spain';
import { portugalLegends, portugalRealPlayers } from './portugal';
import { englandLegends, englandRealPlayers } from './england';
import { restLegends, restRealPlayers } from './rest';
import { getOfficialSquad, officialSquadToPlayers } from '../squads';

export const players: Player[] = [
  ...brazilLegends,
  ...argentinaLegends,
  ...germanyLegends,
  ...italyLegends,
  ...franceLegends,
  ...netherlandsLegends,
  ...spainLegends,
  ...portugalLegends,
  ...englandLegends,
  ...restLegends,
];

const realPlayersDb: Record<string, DbPlayerTemplate[]> = {
  brazil: brazilRealPlayers as DbPlayerTemplate[],
  argentina: argentinaRealPlayers as DbPlayerTemplate[],
  germany: germanyRealPlayers as DbPlayerTemplate[],
  italy: italyRealPlayers as DbPlayerTemplate[],
  france: franceRealPlayers as DbPlayerTemplate[],
  netherlands: netherlandsRealPlayers as DbPlayerTemplate[],
  spain: spainRealPlayers as DbPlayerTemplate[],
  portugal: portugalRealPlayers as DbPlayerTemplate[],
  england: englandRealPlayers as DbPlayerTemplate[],
  ...restRealPlayers,
};


// Generates systematic squads for teams and years that do not have 11+ pre-authored players
// This ensures game mechanics are robust for all 26 nations.
export function getPlayersByTeamAndYear(teamId: string, year: number): Player[] {
  const officialSquad = getOfficialSquad(teamId, year);
  if (officialSquad) {
    return enrichOfficialPlayers(officialSquadToPlayers(officialSquad), teamId, year).sort((a, b) => b.rating - a.rating);
  }

  // 1. Get pre-defined legends who match this team
  const matched = players.filter(p => {
    if (p.country !== teamId) return false;
    return p.worldCups.includes(year);
  });

  const squad: Player[] = [...matched];
  let genIndex = 0;

  // 2. Add real players from database if available (making sure the name is not duplicated and matches the active year)
  const dbPlayers = realPlayersDb[teamId] || [];
  for (const pTemplate of dbPlayers) {
    if (pTemplate.years && !pTemplate.years.includes(year)) {
      continue; // Skip players that did not belong to this World Cup year.
    }

    const isDuplicate = squad.some(s => 
      s.name.toLowerCase().includes(pTemplate.name.toLowerCase()) || 
      pTemplate.name.toLowerCase().includes(s.name.toLowerCase())
    );

    if (isDuplicate) {
      continue;
    }

    const decade = Math.floor(year / 10) * 10;
    const eraString = `${decade}s Classics`;
    
    // Simulate realistic matches, goals, assists
    const matches = 4 + (genIndex % 4);
    let goals = 0;
    let assists = 0;
    if (pTemplate.gp === 'ATT') {
      goals = pTemplate.rating >= 90 ? 4 + (genIndex % 3) : 2 + (genIndex % 2);
      assists = 1 + (genIndex % 3);
    } else if (pTemplate.gp === 'MID') {
      goals = Math.random() > 0.6 ? 1 : 0;
      assists = pTemplate.rating >= 90 ? 3 + (genIndex % 2) : 1 + (genIndex % 2);
    }

    squad.push({
      id: `real_${teamId}_${year}_${pTemplate.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${genIndex}`,
      name: pTemplate.name,
      country: teamId,
      position: pTemplate.position,
      positionGroup: pTemplate.gp,
      rating: pTemplate.rating,
      worldCups: [year],
      era: eraString,
      bio: pTemplate.bio || `Notable star representing ${teamId.toUpperCase()} with solid performances and elite professional display.`,
      legendary: pTemplate.rating >= 88,
      wcStats: {
        goals,
        assists,
        matches,
        passAccuracy: pTemplate.gp === 'MID' ? 88 + (genIndex % 8) : 75 + (genIndex % 10),
        xG: parseFloat((goals * 0.95 + 0.3).toFixed(1))
      }
    });
    genIndex++;
  }

  // 3. Fallback squad template logic to fill any remaining gaps if squad.length is still under 18
  if (squad.length >= 18) {
    return squad.sort((a, b) => b.rating - a.rating);
  }

  const fallbackDisplayName = (position: string, index: number) =>
    `${teamId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} ${year} ${position} Depth ${index + 1}`;

  const requiredPositions: Array<{ pos: 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'CF' | 'ST', gp: 'GK' | 'DEF' | 'MID' | 'ATT' }> = [
    { pos: 'GK', gp: 'GK' },
    { pos: 'GK', gp: 'GK' },
    { pos: 'CB', gp: 'DEF' },
    { pos: 'CB', gp: 'DEF' },
    { pos: 'CB', gp: 'DEF' },
    { pos: 'LB', gp: 'DEF' },
    { pos: 'RB', gp: 'DEF' },
    { pos: 'CDM', gp: 'MID' },
    { pos: 'CDM', gp: 'MID' },
    { pos: 'CM', gp: 'MID' },
    { pos: 'CM', gp: 'MID' },
    { pos: 'CAM', gp: 'MID' },
    { pos: 'LW', gp: 'ATT' },
    { pos: 'RW', gp: 'ATT' },
    { pos: 'CF', gp: 'ATT' },
    { pos: 'ST', gp: 'ATT' },
    { pos: 'ST', gp: 'ATT' },
    { pos: 'ST', gp: 'ATT' }
  ];

  for (const item of requiredPositions) {
    const existingOfPosition = squad.filter(p => p.position === item.pos).length;
    if (existingOfPosition < (item.pos === 'ST' || item.pos === 'CB' || item.pos === 'CM' ? 3 : 1)) {
      let name = fallbackDisplayName(item.pos, genIndex);

      const decade = Math.floor(year / 10) * 10;
      const eraString = `${decade}s Classics`;
      const teamMultiplier = teamId === 'brazil' ? 4 : (teamId === 'germany' || teamId === 'argentina' || teamId === 'france' || teamId === 'italy' ? 3 : 1);
      const rating = Math.min(82, Math.max(70, 73 + teamMultiplier + (genIndex % 4)));

      const goalsAndAssistsOfPos = item.gp === 'ATT' ? { g: 3 + (genIndex % 4), a: 1 + (genIndex % 3) } 
                                 : item.gp === 'MID' ? { g: 1 + (genIndex % 2), a: 2 + (genIndex % 4) } 
                                 : { g: 0, a: 0 };
      const matches = 4 + (genIndex % 4);

      squad.push({
        id: `procedural_${teamId}_${year}_${item.pos}_${genIndex}`,
        name,
        country: teamId,
        position: item.pos,
        positionGroup: item.gp,
        rating,
        worldCups: [year],
        era: eraString,
        bio: `Depth placeholder for ${teamId.toUpperCase()} ${year}; no verified real player record is available for this generated slot.`,
        legendary: false,
        wcStats: {
          goals: goalsAndAssistsOfPos.g,
          assists: goalsAndAssistsOfPos.a,
          matches,
          passAccuracy: item.gp === 'MID' ? 88 + (genIndex % 8) : 75 + (genIndex % 10),
          xG: parseFloat((goalsAndAssistsOfPos.g * 0.9 + 0.5).toFixed(1))
        }
      });
      genIndex++;
    }
  }

  while (squad.length < 20) {
    const item = requiredPositions[squad.length % requiredPositions.length];
    let name = fallbackDisplayName(item.pos, genIndex);

    const decade = Math.floor(year / 10) * 10;
    const rating = Math.min(78, Math.max(68, 70 + (genIndex % 7)));

    squad.push({
      id: `procedural_${teamId}_${year}_extra_${genIndex}`,
      name,
      country: teamId,
      position: item.pos,
      positionGroup: item.gp,
      rating,
      worldCups: [year],
      era: `${decade}s Classics`,
      bio: `Depth placeholder for ${teamId.toUpperCase()} ${year}; no verified real player record is available for this generated slot.`,
      wcStats: {
        goals: item.gp === 'ATT' ? 2 : 0,
        assists: item.gp === 'MID' ? 2 : 0,
        matches: 3,
        passAccuracy: 80,
        xG: item.gp === 'ATT' ? 1.4 : 0.1
      }
    });
    genIndex++;
  }

  return squad.sort((a, b) => b.rating - a.rating);
}

function normalizePlayerName(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function enrichOfficialPlayers(officialPlayers: Player[], teamId: string, year: number): Player[] {
  const knownPlayers = new Map<string, { rating: number; bio: string; legendary?: boolean; wcStats?: Player['wcStats'] }>();

  for (const player of players) {
    if (player.country === teamId && player.worldCups.includes(year)) {
      knownPlayers.set(normalizePlayerName(player.name), player);
    }
  }

  for (const player of realPlayersDb[teamId] || []) {
    if (player.years?.includes(year)) {
      knownPlayers.set(normalizePlayerName(player.name), {
        rating: player.rating,
        bio: player.bio || `Verified ${year} World Cup squad member for ${teamId.toUpperCase()}.`,
        legendary: player.rating >= 88
      });
    }
  }

  return officialPlayers.map(player => {
    const playerName = normalizePlayerName(player.name);
    const known = knownPlayers.get(playerName) || Array.from(knownPlayers.entries()).find(([knownName]) => (
      knownName.includes(playerName) || playerName.includes(knownName)
    ))?.[1];
    if (!known) return player;

    return {
      ...player,
      rating: known.rating,
      bio: known.bio,
      legendary: known.legendary ?? known.rating >= 88,
      wcStats: known.wcStats || player.wcStats
    };
  });
}
