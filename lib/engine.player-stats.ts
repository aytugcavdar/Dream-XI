import { MatchEvent, Player, PlayerMatchStats } from '../types';

export function buildPlayerMatchStats(
  squad: Player[],
  events: MatchEvent[],
  style: string,
  concededGoals: number,
): PlayerMatchStats[] {
  const stats = new Map<string, PlayerMatchStats>();

  squad.forEach(player => {
    const basePassAccuracy =
      player.positionGroup === 'GK' ? 68
      : player.positionGroup === 'DEF' ? 82
      : player.positionGroup === 'MID' ? 87
      : 78;

    stats.set(player.id, {
      playerId: player.id,
      playerName: player.name,
      goals: 0,
      assists: 0,
      xG: 0,
      shots: 0,
      shotsOnTarget: 0,
      keyPasses: 0,
      passAccuracy: basePassAccuracy,
      interceptions: player.positionGroup === 'DEF' ? 3 : player.positionGroup === 'MID' ? 2 : 0,
      tackles: player.positionGroup === 'DEF' ? 3 : player.positionGroup === 'MID' ? 2 : 1,
      saves: player.positionGroup === 'GK' ? 1 : 0,
      goalsPrevented: 0,
      rating: 6.2 + Math.max(0, player.rating - 78) * 0.045,
    });
  });

  for (const event of events) {
    if (event.team !== 'user' || !event.playerId) continue;
    const row = stats.get(event.playerId);
    if (!row) continue;

    if (event.type === 'chance' || event.type === 'shot' || event.type === 'goal') {
      row.shots = (row.shots || 0) + 1;
      row.xG = parseFloat((row.xG + (event.xG || 0)).toFixed(2));
      row.rating += (event.xG || 0) * 0.8;
    }

    if (event.type === 'save') {
      row.saves = (row.saves || 0) + 1;
      row.goalsPrevented = parseFloat(((row.goalsPrevented || 0) + (event.xG || 0.15)).toFixed(2));
      row.rating += 0.35 + (event.xG || 0) * 0.5;
    }

    if (event.outcome === 'saved' || event.outcome === 'goal') {
      row.shotsOnTarget = (row.shotsOnTarget || 0) + 1;
    }

    if (event.type === 'goal') {
      row.goals += 1;
      row.rating += 1.35;
      if (event.assistPlayerId) {
        const assister = stats.get(event.assistPlayerId);
        if (assister) {
          assister.assists += 1;
          assister.keyPasses = (assister.keyPasses || 0) + 1;
          assister.rating += 0.85;
        }
      }
    }
  }

  for (const row of stats.values()) {
    const player = squad.find(p => p.id === row.playerId);
    if (!player) continue;

    if (style === 'tiki-taka' && player.positionGroup === 'MID') {
      row.passAccuracy = Math.min(96, row.passAccuracy + 5);
      row.rating += 0.15;
    }
    if (style === 'gegenpress' && (player.positionGroup === 'ATT' || player.positionGroup === 'MID')) {
      row.interceptions += 1;
      row.tackles = (row.tackles || 0) + 1;
      row.rating += 0.1;
    }
    if (style === 'catenaccio' && (player.positionGroup === 'DEF' || player.positionGroup === 'GK')) {
      row.rating += concededGoals === 0 ? 0.55 : 0.15;
      if (player.positionGroup === 'DEF') row.interceptions += 1;
    }
    if (style === 'route-one' && player.positionGroup === 'ATT') {
      row.passAccuracy = Math.max(66, row.passAccuracy - 4);
    }

    if (player.positionGroup === 'GK') {
      row.rating += (row.saves || 0) * 0.18 - concededGoals * 0.22;
    } else if (player.positionGroup === 'DEF') {
      row.rating += concededGoals === 0 ? 0.35 : -concededGoals * 0.08;
    } else if (player.positionGroup === 'ATT' && row.goals === 0 && row.assists === 0) {
      row.rating -= 0.25;
    }

    row.rating = Math.max(4.8, Math.min(10, parseFloat(row.rating.toFixed(1))));
    row.xG = parseFloat(row.xG.toFixed(2));
  }

  return Array.from(stats.values());
}

export function selectManOfTheMatch(stats: PlayerMatchStats[]): PlayerMatchStats {
  return [...stats].sort((a, b) => {
    return b.rating - a.rating ||
      (b.goals * 3 + b.assists * 2 + b.xG) - (a.goals * 3 + a.assists * 2 + a.xG);
  })[0];
}
