import { getPlayersByTeamAndYear } from '../data/players/index';
import { teams } from '../data/teams';

console.log("=== SQUAD ANALYSIS ===");
let totalSquads = 0;
let fullyRealSquads = 0;
let highProceduralSquads = [];

for (const team of teams) {
  for (const year of team.worldCupAppearances) {
    totalSquads++;
    const squad = getPlayersByTeamAndYear(team.id, year);
    const proceduralCount = squad.filter(p => p.id.startsWith('procedural_')).length;
    const realCount = squad.length - proceduralCount;
    
    if (proceduralCount === 0) {
      fullyRealSquads++;
    } else {
      highProceduralSquads.push({
        teamName: team.name,
        teamId: team.id,
        year,
        realCount,
        proceduralCount
      });
    }
  }
}

// Sort by highest number of procedural players
highProceduralSquads.sort((a, b) => b.proceduralCount - a.proceduralCount);

console.log(`Total squads checked: ${totalSquads}`);
console.log(`Fully real squads (0 procedural players): ${fullyRealSquads}`);
console.log(`Squads with procedural players: ${highProceduralSquads.length}\n`);

console.log("Top 30 squads with highest procedural count:");
highProceduralSquads.slice(0, 30).forEach(s => {
  console.log(`- ${s.teamName} (${s.year}): ${s.realCount} Real, ${s.proceduralCount} Procedural`);
});
