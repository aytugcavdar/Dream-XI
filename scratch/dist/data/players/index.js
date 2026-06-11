"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.players = void 0;
exports.getPlayersByTeamAndYear = getPlayersByTeamAndYear;
const brazil_1 = require("./brazil");
const argentina_1 = require("./argentina");
const germany_1 = require("./germany");
const italy_1 = require("./italy");
const france_1 = require("./france");
const netherlands_1 = require("./netherlands");
const spain_1 = require("./spain");
const portugal_1 = require("./portugal");
const england_1 = require("./england");
const rest_1 = require("./rest");
exports.players = [
    ...brazil_1.brazilLegends,
    ...argentina_1.argentinaLegends,
    ...germany_1.germanyLegends,
    ...italy_1.italyLegends,
    ...france_1.franceLegends,
    ...netherlands_1.netherlandsLegends,
    ...spain_1.spainLegends,
    ...portugal_1.portugalLegends,
    ...england_1.englandLegends,
    ...rest_1.restLegends,
];
const realPlayersDb = Object.assign({ brazil: brazil_1.brazilRealPlayers, argentina: argentina_1.argentinaRealPlayers, germany: germany_1.germanyRealPlayers, italy: italy_1.italyRealPlayers, france: france_1.franceRealPlayers, netherlands: netherlands_1.netherlandsRealPlayers, spain: spain_1.spainRealPlayers, portugal: portugal_1.portugalRealPlayers, england: england_1.englandRealPlayers }, rest_1.restRealPlayers);
// Generates systematic squads for teams and years that do not have 11+ pre-authored players
// This ensures game mechanics are robust for all 26 nations.
function getPlayersByTeamAndYear(teamId, year) {
    // 1. Get pre-defined legends who match this team
    // Use professional tighter active career window limits (4 years before/after active World Cups)
    // to ensure historic consistency.
    const matched = exports.players.filter(p => {
        if (p.country !== teamId)
            return false;
        const minActive = Math.min(...p.worldCups) - 4;
        const maxActive = Math.max(...p.worldCups) + 4;
        return p.worldCups.includes(year) || (year >= minActive && year <= maxActive);
    });
    const squad = [...matched];
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
        const isDuplicate = squad.some(s => s.name.toLowerCase().includes(pTemplate.name.toLowerCase()) ||
            pTemplate.name.toLowerCase().includes(s.name.toLowerCase()));
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
        }
        else if (pTemplate.gp === 'MID') {
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
    const nameGenerators = {
        brazil: {
            first: ['José', 'Lucas', 'Carlos', 'Marcos', 'Luiz', 'Thiago', 'Matheus', 'Gabriel', 'Rafael', 'Bruno', 'Felipe', 'Rodrigo', 'Diego', 'Gustavo', 'Arthur'],
            last: ['Santos', 'Silva', 'Pereira', 'Ferreira', 'Oliveira', 'Souza', 'Rodrigues', 'Alves', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Carvalho', 'Martins', 'Araújo']
        },
        germany: {
            first: ['Hans', 'Dieter', 'Klaus', 'Stefan', 'Jürgen', 'Sebastian', 'Michael', 'Karl', 'Thomas', 'Andreas', 'Christian', 'Frank', 'Markus', 'Alexander', 'Martin'],
            last: ['Schneider', 'Müller', 'Wagner', 'Fischer', 'Weber', 'Becker', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schröder', 'Neumann']
        },
        italy: {
            first: ['Giovanni', 'Francesco', 'Alessandro', 'Marco', 'Matteo', 'Roberto', 'Paolo', 'Andrea', 'Luca', 'Davide', 'Stefano', 'Fabio', 'Gianluca', 'Lorenzo', 'Filippo'],
            last: ['Rossi', 'Ferrari', 'Russo', 'Bianchi', 'Romano', 'Gallo', 'Costa', 'Rizzo', 'Moretti', 'Marino', 'Greco', 'Bruno', 'Lombardi', 'Barbieri', 'Fontana']
        },
        argentina: {
            first: ['Juan', 'Jorge', 'Daniel', 'Esteban', 'Claudio', 'Guillermo', 'Lautaro', 'Federico', 'Hernán', 'Mateo', 'Lucas', 'Gonzalo', 'Nicolas', 'Santiago', 'Agustín'],
            last: ['González', 'Rodríguez', 'Gómez', 'Fernández', 'López', 'Díaz', 'Martínez', 'Pérez', 'Romero', 'Sánchez', 'Álvarez', 'Torres', 'Ruiz', 'Ramírez', 'Flores']
        },
        france: {
            first: ['Jean', 'Pierre', 'Antoine', 'Lucas', 'Nicolas', 'Olivier', 'Guillaume', 'Mathieu', 'Julien', 'Alexandre', 'Thomas', 'Romain', 'Sebastien', 'Maxime', 'Clement'],
            last: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Blanc', 'Guerin', 'Moreau', 'Laurent', 'Simon', 'Michel', 'Garcia', 'Fontaine']
        },
        spain: {
            first: ['Álvaro', 'Francisco', 'Manuel', 'David', 'Javier', 'Andrés', 'Sergio', 'José', 'Antonio', 'Carlos', 'Daniel', 'Alejandro', 'Miguel', 'Pablo', 'Jorge'],
            last: ['García', 'Fernández', 'González', 'Rodríguez', 'López', 'Sánchez', 'Pérez', 'Martínez', 'Gómez', 'Díaz', 'Hernández', 'Alonso', 'Ruiz', 'Navarro', 'Ramos']
        },
        england: {
            first: ['John', 'Peter', 'David', 'James', 'Gary', 'Bobby', 'Steven', 'Paul', 'William', 'Thomas', 'Robert', 'Harry', 'Jack', 'George', 'Charlie'],
            last: ['Smith', 'Jones', 'Taylor', 'Brown', 'Cole', 'Wright', 'Green', 'Walker', 'Hughes', 'Edwards', 'Harris', 'Lewis', 'Clarke', 'Cooper', 'Ward']
        },
        uruguay: {
            first: ['Luis', 'Diego', 'Sebastian', 'Ignacio', 'Edinson', 'Alvaro', 'Guzmán', 'Felipe', 'Nicolas', 'Maximiliano', 'Santiago', 'Mateo', 'Mathías', 'Rodrigo'],
            last: ['Suárez', 'Cavani', 'Godín', 'Muslera', 'Cáceres', 'Pereira', 'Lugano', 'Rodríguez', 'González', 'Giménez', 'Sosa', 'Silva', 'Hernández', 'Pérez']
        },
        netherlands: {
            first: ['Ruud', 'Robin', 'Frank', 'Ronald', 'Mark', 'Dennis', 'Edwin', 'Bram', 'Daan', 'Sven', 'Luuk', 'Sem', 'Milan', 'Thijs', 'Bas'],
            last: ['van Dijk', 'de Jong', 'de Groot', 'Janssen', 'Bakker', 'Sneijder', 'Robben', 'Vermeer', 'Willems', 'Veenstra', 'Bos', 'Dekker', 'Meijer', 'Visser', 'Smit']
        },
        portugal: {
            first: ['João', 'Manuel', 'António', 'Rui', 'Bernardo', 'Cristiano', 'Francisco', 'Diogo', 'Pedro', 'Miguel', 'André', 'Luís', 'Ricardo', 'Gonçalo'],
            last: ['Silva', 'Santos', 'Ferreira', 'Gomes', 'Martins', 'Mendes', 'Sousa', 'Oliveira', 'Rodrigues', 'Pinto', 'Carvalho', 'Ribeiro', 'Costa', 'Teixeira']
        },
        belgium: {
            first: ['Jan', 'Eden', 'Kevin', 'Romelu', 'Thibaut', 'Vincent', 'Dries', 'Thomas', 'Yannick', 'Simon', 'Arthur', 'Maxim', 'Jonas', 'Lander'],
            last: ['Peeters', 'Janssens', 'Maes', 'Hazard', 'De Bruyne', 'Lukaku', 'Claes', 'Goossens', 'Wouters', 'Mertens', 'Jacobs', 'Michiels', 'Hermans', 'Smets']
        },
        croatia: {
            first: ['Luka', 'Ivan', 'Mario', 'Mateo', 'Domagoj', 'Dejan', 'Andrej', 'Nikola', 'Borna', 'Josip', 'Filip', 'Lovro', 'Mislav', 'Ante'],
            last: ['Horvat', 'Kovačić', 'Modrić', 'Lovren', 'Mandžukić', 'Rakitić', 'Knežević', 'Šimić', 'Vuković', 'Pavlović', 'Barišić', 'Vidović', 'Petrović', 'Jurić']
        },
        morocco: {
            first: ['Youssef', 'Sofyan', 'Achraf', 'Hakim', 'Yassine', 'Romain', 'Ayoub', 'Hamza', 'Anass', 'Reda', 'Zakaria', 'Tariq', 'Khalid', 'Amine'],
            last: ['Bounou', 'Saïss', 'Amrabat', 'Ziyech', 'Hakimi', 'En-Nesyri', 'El Idrissi', 'Alami', 'Benjelloun', 'Tazi', 'Kabbaj', 'Chraibi', 'Filali', 'El Amrani']
        },
        mexico: {
            first: ['Javier', 'Andrés', 'Guillermo', 'Rafael', 'Hugo', 'Carlos', 'Eduardo', 'Alejandro', 'Luis', 'José', 'Miguel', 'Daniel', 'Fernando', 'Roberto'],
            last: ['Hernández', 'Ochoa', 'Guardado', 'Márquez', 'Sánchez', 'Vela', 'García', 'Martínez', 'González', 'Rodríguez', 'López', 'Pérez', 'Gómez', 'Flores']
        },
        usa: {
            first: ['Christian', 'Clint', 'Landon', 'Tim', 'Claudio', 'Weston', 'Tyler', 'Brad', 'Michael', 'Jonathan', 'Brandon', 'Walker', 'Sean', 'Jordan'],
            last: ['Pulisic', 'Dempsey', 'Donovan', 'Howard', 'Reyna', 'McKennie', 'Adams', 'Friedel', 'Smith', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller']
        },
        senegal: {
            first: ['Sadio', 'Kalidou', 'Idrissa', 'Cheikhou', 'M\'Baye', 'Boulaye', 'Moustapha', 'Aliou', 'Papa', 'Abdou', 'El Hadji', 'Lamine', 'Khadim'],
            last: ['Mané', 'Koulibaly', 'Gueye', 'Sarr', 'Mendy', 'Diallo', 'Diop', 'Camara', 'Ndiaye', 'Sow', 'Fall', 'Ba', 'Diedhiou', 'Gomez']
        },
        cameroon: {
            first: ['Samuel', 'Vincent', 'Roger', 'Rigobert', 'André', 'Eric', 'Jean-Pierre', 'Marc', 'Stephane', 'Nicolas', 'Achille', 'Alexandre'],
            last: ['Eto\'o', 'Aboubakar', 'Milla', 'Song', 'Onana', 'Choupo-Moting', 'N\'Kono', 'Mbappe', 'Geremi', 'Wome', 'Job', 'Anguissa']
        },
        japan: {
            first: ['Keisuke', 'Shunsuke', 'Shinji', 'Takumi', 'Maya', 'Hidetoshi', 'Yuto', 'Hiroki', 'Daichi', 'Koiti', 'Kenji', 'Takashi', 'Ryota', 'Shoya'],
            last: ['Honda', 'Nakamura', 'Kagawa', 'Minamino', 'Yoshida', 'Nakata', 'Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura']
        },
        south_korea: {
            first: ['Heung-min', 'Ji-sung', 'Ki-hyeon', 'Young-pyo', 'Min-jae', 'Jung-hwan', 'Myung-bo', 'Chung-yong', 'Ja-cheol', 'Dong-gook'],
            last: ['Son', 'Park', 'Seol', 'Lee', 'Kim', 'Ahn', 'Hong', 'Choi', 'Jung', 'Kang']
        },
        nigeria: {
            first: ['Jay-Jay', 'Nwankwo', 'Victor', 'Vincent', 'John', 'Ahmed', 'Sunday', 'Taribo', 'Celestine', 'Emmanuel', 'Wilfred', 'Samuel', 'Kelechi'],
            last: ['Okocha', 'Kanu', 'Osimhen', 'Enyeama', 'Mikel', 'Musa', 'Babayaro', 'West', 'Yobo', 'Martins', 'Ikpeba', 'Amunike', 'Ndidi', 'Iheanacho']
        },
        sweden: {
            first: ['Zlatan', 'Henrik', 'Andreas', 'Thomas', 'Emil', 'Victor', 'Johan', 'Marcus', 'Robin', 'Alexander', 'Kristoffer', 'Albin', 'Ludwig'],
            last: ['Ibrahimović', 'Larsson', 'Isaksson', 'Brolin', 'Forsberg', 'Lindelöf', 'Svensson', 'Andersson', 'Mellberg', 'Ljungberg', 'Larsson', 'Augustinsson']
        },
        denmark: {
            first: ['Christian', 'Kasper', 'Simon', 'Jon', 'Martin', 'Pierre', 'Thomas', 'Andreas', 'Mikkel', 'Joakim', 'Jonas', 'Yussuf', 'Rasmus'],
            last: ['Eriksen', 'Schmeichel', 'Kjær', 'Dahl Tomasson', 'Braithwaite', 'Højbjerg', 'Laudrup', 'Poulsen', 'Agger', 'Bendtner', 'Christensen', 'Maehle']
        },
        colombia: {
            first: ['James', 'Radamel', 'Carlos', 'Mario', 'Juan', 'Luis', 'David', 'Santiago', 'Jefferson', 'Duvan', 'Davinson', 'Wilmar', 'Mateus'],
            last: ['Rodríguez', 'Falcao', 'Valderrama', 'Yepes', 'Cuadrado', 'Díaz', 'Ospina', 'Arias', 'Lerma', 'Zapata', 'Sánchez', 'Barrios', 'Uribe']
        },
        chile: {
            first: ['Alexis', 'Arturo', 'Claudio', 'Gary', 'Eduardo', 'Humberto', 'Mauricio', 'Charles', 'Jean', 'Erick', 'Guillermo', 'Ben'],
            last: ['Sánchez', 'Vidal', 'Bravo', 'Medel', 'Vargas', 'Suazo', 'Isla', 'Aránguiz', 'Beausejour', 'Pulgar', 'Maripán', 'Brereton']
        },
        switzerland: {
            first: ['Xherdan', 'Granit', 'Yann', 'Ricardo', 'Breel', 'Haris', 'Manuel', 'Denis', 'Silvan', 'Remo', 'Ruben', 'Djibril', 'Valon'],
            last: ['Shaqiri', 'Xhaka', 'Sommer', 'Rodríguez', 'Embolo', 'Seferović', 'Akanji', 'Zakaria', 'Widmer', 'Freuler', 'Vargas', 'Sow', 'Behrami']
        },
        turkey: {
            first: ['Ahmet', 'Mehmet', 'Mustafa', 'Ali', 'Hüseyin', 'Murat', 'Arda', 'Can', 'Deniz', 'Serkan', 'Gökhan', 'Yusuf', 'Eren', 'Oğuz', 'Kaan'],
            last: ['Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Yıldız', 'Erdoğan', 'Öztürk', 'Aydın', 'Özdemir', 'Arslan', 'Doğan', 'Kılıç']
        }
    };
    const defaultNames = { first: ['Lucas', 'Alex', 'David', 'Ryan', 'Sam', 'Chris'], last: ['Miller', 'Taylor', 'Walker', 'Thomas', 'Hale', 'Bell'] };
    const pool = nameGenerators[teamId] || defaultNames;
    const requiredPositions = [
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
            let lName = pool.last[Math.floor(genIndex / pool.first.length) % pool.last.length];
            let name = teamId === 'south_korea' ? `${lName} ${fName}` : `${fName} ${lName}`;
            while (squad.some(p => p.name === name)) {
                genIndex++;
                fName = pool.first[genIndex % pool.first.length];
                lName = pool.last[Math.floor(genIndex / pool.first.length) % pool.last.length];
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
        let lName = pool.last[Math.floor(genIndex / pool.first.length) % pool.last.length];
        let name = teamId === 'south_korea' ? `${lName} ${fName}` : `${fName} ${lName}`;
        while (squad.some(p => p.name === name)) {
            genIndex++;
            fName = pool.first[genIndex % pool.first.length];
            lName = pool.last[Math.floor(genIndex / pool.first.length) % pool.last.length];
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
