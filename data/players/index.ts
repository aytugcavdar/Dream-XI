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
  // 1. Get pre-defined legends who match this team
  // Use professional tighter active career window limits (4 years before/after active World Cups)
  // to ensure historic consistency.
  const matched = players.filter(p => {
    if (p.country !== teamId) return false;
    const minActive = Math.min(...p.worldCups) - 4;
    const maxActive = Math.max(...p.worldCups) + 4;
    return p.worldCups.includes(year) || (year >= minActive && year <= maxActive);
  });

  const squad: Player[] = [...matched];
  let genIndex = 0;

  // 2. Add real players from database if available (making sure the name is not duplicated and matches the active year)
  const dbPlayers = realPlayersDb[teamId] || [];
  for (const pTemplate of dbPlayers) {
    if (pTemplate.years) {
      const minYr = Math.min(...pTemplate.years) - 4;
      const maxYr = Math.max(...pTemplate.years) + 4;
      if (year < minYr || year > maxYr) {
        continue; // Skip players that do not match this historical active era
      }
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

  // Define database of national family names / player templates for procedural generation
  const nameGenerators: { [key: string]: { first: string[], last: string[] } } = {
    brazil: { first: ['José', 'Lucas', 'Carlos', 'Marcos', 'Silva', 'Junior', 'Luiz', 'Thiago'], last: ['Santos', 'Silva', 'Pereira', 'Ferreira', 'Oliveira', 'Souza', 'Rodrigues'] },
    germany: { first: ['Hans', 'Dieter', 'Klaus', 'Stefan', 'Jürgen', 'Sebastian', 'Michael', 'Karl'], last: ['Schneider', 'Müller', 'Wagner', 'Fischer', 'Weber', 'Becker', 'Lahm', 'Kroos'] },
    italy: { first: ['Giovanni', 'Francesco', 'Alessandro', 'Marco', 'Matteo', 'Roberto', 'Paolo'], last: ['Rossi', 'Ferrari', 'Russo', 'Bianchi', 'Romano', 'Gallo', 'Costa', 'Rizzo'] },
    argentina: { first: ['Juan', 'Jorge', 'Daniel', 'Esteban', 'Claudio', 'Guillermo', 'Lautaro'], last: ['González', 'Rodríguez', 'Gómez', 'Fernández', 'López', 'Díaz', 'Martínez'] },
    france: { first: ['Jean', 'Pierre', 'Antoine', 'Lucas', 'Nicolas', 'Olivier', 'Guillaume'], last: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Blanc'] },
    spain: { first: ['Álvaro', 'Francisco', 'Manuel', 'David', 'Javier', 'Andrés', 'Sergio'], last: ['García', 'Fernández', 'González', 'Rodríguez', 'López', 'Sánchez', 'Pérez'] },
    england: { first: ['John', 'Peter', 'David', 'James', 'Gary', 'Bobby', 'Steven', 'Paul'], last: ['Smith', 'Jones', 'Taylor', 'Brown', 'Cole', 'Wright', 'Scholes', 'Rooney'] },
    uruguay: { first: ['Luis', 'Diego', 'Sebastian', 'Ignacio', 'Edinson', 'Alvaro'], last: ['Suárez', 'Cavani', 'Godín', 'Muslera', 'Cáceres', 'Pereira', 'Lugano'] },
    netherlands: { first: ['Ruud', 'Robin', 'Frank', 'Ronald', 'Mark', 'Dennis', 'Edwin'], last: ['van Dijk', 'de Jong', 'de Groot', 'Janssen', 'Bakker', 'Sneijder', 'Robben'] },
    portugal: { first: ['João', 'Manuel', 'António', 'Rui', 'Bernardo', 'Cristiano'], last: ['Silva', 'Santos', 'Ferreira', 'Gomes', 'Martins', 'Mendes', 'Sousa'] },
    belgium: { first: ['Jan', 'Eden', 'Kevin', 'Romelu', 'Thibaut', 'Vincent', 'Dries'], last: ['Peeters', 'Janssens', 'Maes', 'Hazard', 'De Bruyne', 'Lukaku'] },
    croatia: { first: ['Luka', 'Ivan', 'Mario', 'Mateo', 'Domagoj', 'Dejan', 'Andrej'], last: ['Horvat', 'Kovačić', 'Modrić', 'Lovren', 'Mandžukić', 'Rakitić'] },
    morocco: { first: ['Youssef', 'Sofyan', 'Achraf', 'Hakim', 'Yassine', 'Romain'], last: ['Bounou', 'Saïss', 'Amrabat', 'Ziyech', 'Hakimi', 'En-Nesyri'] },
    mexico: { first: ['Javier', 'Andrés', 'Guillermo', 'Rafael', 'Hugo', 'Carlos'], last: ['Hernández', 'Ochoa', 'Guardado', 'Márquez', 'Sánchez', 'Vela'] },
    usa: { first: ['Christian', 'Clint', 'Landon', 'Tim', 'Claudio', 'Weston', 'Tyler', 'Brad'], last: ['Pulisic', 'Dempsey', 'Donovan', 'Howard', 'Reyna', 'McKennie', 'Adams', 'Friedel'] },
    senegal: { first: ['Sadio', 'Kalidou', 'Idrissa', 'Cheikhou', 'M\'Baye', 'Boulaye'], last: ['Mané', 'Koulibaly', 'Gueye', 'Sarr', 'Mendy', 'Diallo'] },
    cameroon: { first: ['Samuel', 'Vincent', 'Roger', 'Rigobert', 'André', 'Eric'], last: ['Eto\'o', 'Aboubakar', 'Milla', 'Song', 'Onana', 'Choupo-Moting'] },
    japan: { first: ['Keisuke', 'Shunsuke', 'Shinji', 'Takumi', 'Maya', 'Hidetoshi'], last: ['Honda', 'Nakamura', 'Kagawa', 'Minamino', 'Yoshida', 'Nakata'] },
    south_korea: { first: ['Heung-min', 'Ji-sung', 'Ki-hyeon', 'Young-pyo', 'Min-jae'], last: ['Son', 'Park', 'Seol', 'Lee', 'Kim'] },
    nigeria: { first: ['Jay-Jay', 'Nwankwo', 'Victor', 'Vincent', 'John', 'Ahmed'], last: ['Okocha', 'Kanu', 'Osimhen', 'Enyeama', 'Mikel', 'Musa'] },
    sweden: { first: ['Zlatan', 'Henrik', 'Andreas', 'Thomas', 'Emil', 'Victor'], last: ['Ibrahimović', 'Larsson', 'Isaksson', 'Brolin', 'Forsberg', 'Lindelöf'] },
    denmark: { first: ['Christian', 'Kasper', 'Simon', 'Jon', 'Martin', 'Pierre'], last: ['Eriksen', 'Schmeichel', 'Kjær', 'Dahl Tomasson', 'Braithwaite', 'Højbjerg'] },
    colombia: { first: ['James', 'Radamel', 'Carlos', 'Mario', 'Juan', 'Luis'], last: ['Rodríguez', 'Falcao', 'Valderrama', 'Yepes', 'Cuadrado', 'Díaz'] },
    chile: { first: ['Alexis', 'Arturo', 'Claudio', 'Gary', 'Eduardo', 'Humberto'], last: ['Sánchez', 'Vidal', 'Bravo', 'Medel', 'Vargas', 'Suazo'] },
    switzerland: { first: ['Xherdan', 'Granit', 'Yann', 'Ricardo', 'Breel', 'Haris'], last: ['Shaqiri', 'Xhaka', 'Sommer', 'Rodríguez', 'Embolo', 'Seferović'] },
    turkey: { first: ['Hakan', 'Rüştü', 'İlhan', 'Nihat', 'Emre', 'Burak'], last: ['Şükür', 'Reçber', 'Mansız', 'Kahveci', 'Belözoğlu', 'Yılmaz'] }
  };

  const defaultNames = { first: ['Lucas', 'Alex', 'David', 'Ryan', 'Sam', 'Chris'], last: ['Miller', 'Taylor', 'Walker', 'Thomas', 'Hale', 'Bell'] };
  const pool = nameGenerators[teamId] || defaultNames;

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
      let fName = pool.first[genIndex % pool.first.length];
      let lName = pool.last[(genIndex + 3) % pool.last.length];
      let name = teamId === 'south_korea' ? `${lName} ${fName}` : `${fName} ${lName}`;
      
      while (squad.some(p => p.name === name)) {
        genIndex++;
        fName = pool.first[genIndex % pool.first.length];
        lName = pool.last[(genIndex + 3) % pool.last.length];
        name = teamId === 'south_korea' ? `${lName} ${fName}` : `${fName} ${lName}`;
      }

      const decade = Math.floor(year / 10) * 10;
      const eraString = `${decade}s Classics`;
      const teamMultiplier = teamId === 'brazil' ? 10 : (teamId === 'germany' || teamId === 'argentina' || teamId === 'france' || teamId === 'italy' ? 9 : 7);
      const rating = Math.min(94, Math.max(76, 75 + Math.floor(teamMultiplier * 1.8) + (genIndex % 5)));

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
        bio: `A key member of the ${year} squad, representing ${teamId.toUpperCase()} with solid performances and professional display.`,
        legendary: rating >= 88,
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
    let fName = pool.first[genIndex % pool.first.length];
    let lName = pool.last[(genIndex + 7) % pool.last.length];
    let name = teamId === 'south_korea' ? `${lName} ${fName}` : `${fName} ${lName}`;

    while (squad.some(p => p.name === name)) {
      genIndex++;
      fName = pool.first[genIndex % pool.first.length];
      lName = pool.last[(genIndex + 7) % pool.last.length];
      name = teamId === 'south_korea' ? `${lName} ${fName}` : `${fName} ${lName}`;
    }

    const decade = Math.floor(year / 10) * 10;
    const rating = Math.min(92, Math.max(74, 73 + (genIndex % 12)));

    squad.push({
      id: `procedural_${teamId}_${year}_extra_${genIndex}`,
      name,
      country: teamId,
      position: item.pos,
      positionGroup: item.gp,
      rating,
      worldCups: [year],
      era: `${decade}s Classics`,
      bio: `A crucial versatile squad depth player for the historic ${year} World Cup run.`,
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
