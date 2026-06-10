/**
 * lib/engine.player-stats.ts
 *
 * Oyuncu maç istatistiklerini simüle eden fonksiyonlar.
 * engine.ts'den ayrılmıştır — single responsibility prensibi.
 */

import { Player, PlayerMatchStats } from '../types';

/** Ağırlıklı rastgele seçim yardımcısı */
function pickWeighted<T>(items: T[], weights: number[]): T {
  const total = weights.reduce((sum, w) => sum + w, 0);
  let threshold = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    threshold -= weights[i];
    if (threshold <= 0) return items[i];
  }
  return items[items.length - 1];
}

/**
 * Bir maç için tüm oyuncuların istatistiklerini simüle eder.
 * @param squad       Maçta oynayan oyuncular (taktik bonus uygulanmış)
 * @param teamGoals   Takımın attığı gol sayısı
 * @param wasDrawWithPens  Beraberlik penaltıya gidip gitmediği
 * @param style       Taktik stili (tiki-taka, gegenpress, ...)
 */
export function simulatePlayerMatchStats(
  squad: Player[],
  teamGoals: number,
  wasDrawWithPens: boolean,
  style: string,
): PlayerMatchStats[] {
  const statsList: PlayerMatchStats[] = [];

  // ── Gol dağılım ağırlıkları ────────────────────────────────────────────
  const goalWeights = squad.map(p => {
    let base =
      p.positionGroup === 'ATT' ? 12
      : p.positionGroup === 'MID' ? 4
      : p.positionGroup === 'DEF' ? 1
      : 0.001;
    if (style === 'route-one' && (p.position === 'ST' || p.position === 'CF')) {
      base += 6;
    }
    return base * (p.rating / 50);
  });

  // Gol dağıt
  const goalsAllocation: Record<string, number> = {};
  squad.forEach(p => { goalsAllocation[p.id] = 0; });

  let goalsToAssign = teamGoals;
  while (goalsToAssign > 0) {
    const lucky = pickWeighted(squad, goalWeights);
    if (lucky.positionGroup === 'GK' && Math.random() < 0.99) continue;
    goalsAllocation[lucky.id]++;
    goalsToAssign--;
  }

  // ── Asist dağılım ağırlıkları ──────────────────────────────────────────
  const assistWeights = squad.map(p => {
    const base =
      p.positionGroup === 'MID' ? 12
      : p.positionGroup === 'ATT' ? 5
      : p.positionGroup === 'DEF' ? 2
      : 0.1;
    return base * (p.rating / 50);
  });

  const assistsAllocation: Record<string, number> = {};
  squad.forEach(p => { assistsAllocation[p.id] = 0; });

  let assistsToAssign = 0;
  for (let g = 0; g < teamGoals; g++) {
    if (Math.random() < 0.75) assistsToAssign++;
  }
  while (assistsToAssign > 0) {
    const lucky = pickWeighted(squad, assistWeights);
    assistsAllocation[lucky.id]++;
    assistsToAssign--;
  }

  // ── Oyuncu bazlı diğer metrikler ───────────────────────────────────────
  squad.forEach(p => {
    const goals   = goalsAllocation[p.id];
    const assists = assistsAllocation[p.id];

    let xG = 0;
    if (p.positionGroup === 'ATT') {
      xG = parseFloat((goals * 0.45 + Math.random() * 0.4 + 0.1).toFixed(2));
    } else if (p.positionGroup === 'MID') {
      xG = parseFloat((goals * 0.2 + Math.random() * 0.2 + 0.05).toFixed(2));
    } else {
      xG = parseFloat((goals * 0.1 + Math.random() * 0.1).toFixed(2));
    }

    let passAccuracy = 70 + Math.floor(Math.random() * 20);
    if (p.positionGroup === 'MID') {
      passAccuracy = 82 + Math.floor(Math.random() * 15);
      if (style === 'tiki-taka') passAccuracy += 6;
    } else if (p.positionGroup === 'GK') {
      passAccuracy = 60 + Math.floor(Math.random() * 22);
    }
    passAccuracy = Math.min(99, passAccuracy);

    let interceptions = Math.floor(Math.random() * 3);
    if (p.positionGroup === 'DEF') {
      interceptions = 3 + Math.floor(Math.random() * 6);
      if (style === 'gegenpress') interceptions += 3;
    } else if (p.positionGroup === 'MID') {
      interceptions = 1 + Math.floor(Math.random() * 5);
      if (style === 'gegenpress') interceptions += 2;
    }

    // Maç puanı
    let matchRating = 6.0 + Math.random() * 1.5;
    matchRating += (p.rating - 75) * 0.06;
    matchRating += goals   * 1.2;
    matchRating += assists * 0.8;
    if (goals === 0 && assists === 0 && p.positionGroup === 'ATT') matchRating -= 0.5;
    if (p.positionGroup === 'DEF' && teamGoals > 2) matchRating += 0.3;
    matchRating = Math.max(5.0, Math.min(10.0, parseFloat(matchRating.toFixed(1))));

    statsList.push({
      playerId: p.id,
      playerName: p.name,
      goals,
      assists,
      xG,
      passAccuracy,
      interceptions,
      rating: matchRating,
    });
  });

  return statsList;
}

/**
 * En yüksek performansı gösteren oyuncuyu "Man of the Match" seçer.
 */
export function selectManOfTheMatch(stats: PlayerMatchStats[]): string {
  const sorted = [...stats].sort(
    (a, b) =>
      b.rating - a.rating ||
      (b.goals * 3 + b.assists * 2) - (a.goals * 3 + a.assists * 2),
  );
  return sorted[0]?.playerName || 'Unknown Player';
}
