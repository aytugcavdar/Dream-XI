import { Player } from '../../types';

export const restLegends: Player[] = [
  // === CROATIA ===
  {
    id: 'modric',
    name: 'Luka Modrić',
    country: 'croatia',
    position: 'CM',
    positionGroup: 'MID',
    rating: 94,
    worldCups: [2006, 2014, 2018, 2022],
    era: 'Modern Era',
    bio: 'The tireless midfield orchestrator won the Golden Ball in 2018 after leading Croatia to a historic final, followed by a bronze medal in 2022.',
    legendary: true,
    wcStats: { goals: 2, assists: 1, matches: 19, passAccuracy: 90, xG: 1.5 }
  },
  {
    id: 'suker',
    name: 'Davor Šuker',
    country: 'croatia',
    position: 'ST',
    positionGroup: 'ATT',
    rating: 91,
    worldCups: [1998, 2002],
    era: '1990s Nostalgia',
    bio: 'The golden boot winner of the 1998 tournament in France, scoring six goals to secure Croatia a stunning debit-bronze position.',
    legendary: true,
    wcStats: { goals: 6, assists: 1, matches: 8, passAccuracy: 77, xG: 4.9 }
  },
  // === URUGUAY ===
  {
    id: 'suarez',
    name: 'Luis Suárez',
    country: 'uruguay',
    position: 'ST',
    positionGroup: 'ATT',
    rating: 92,
    worldCups: [2010, 2014, 2018, 2022],
    era: 'Modern Era',
    bio: 'A highly talented and controversial striker who combined exquisite technical goals with clutch performances to revive Uruguay on the world stage.',
    legendary: false,
    wcStats: { goals: 7, assists: 4, matches: 16, passAccuracy: 75, xG: 6.4 }
  },
  {
    id: 'forlan',
    name: 'Diego Forlán',
    country: 'uruguay',
    position: 'CF',
    positionGroup: 'ATT',
    rating: 91,
    worldCups: [2002, 2010, 2014],
    era: 'Early 2000s',
    bio: 'Winner of the Golden Ball at the 2010 World Cup. He famously mastered the erratic Jabulani ball, scoring spectacular long-range screamers.',
    legendary: true,
    wcStats: { goals: 6, assists: 1, matches: 10, passAccuracy: 82, xG: 4.1 }
  }
];

export const restRealPlayers: Record<string, Array<{ name: string; position: 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'CF' | 'ST'; gp: 'GK' | 'DEF' | 'MID' | 'ATT'; rating: number; years?: number[]; bio?: string }>> = {
  turkey: [
    { name: 'Rüştü Reçber', position: 'GK', gp: 'GK', rating: 88, years: [1996, 2002, 2008], bio: 'Heroic goalkeeper of Turkey\'s legendary 2002 World Cup campaign.' },
    { name: 'Hakan Şükür', position: 'ST', gp: 'ATT', rating: 89, years: [1996, 2002], bio: 'Turkey\'s greatest striker, scored the fastest goal in World Cup history in 2002.' },
    { name: 'İlhan Mansız', position: 'ST', gp: 'ATT', rating: 86, years: [2002], bio: 'Incredibly skilled forward who scored the golden goal against Senegal in 2002.' },
    { name: 'Nihat Kahveci', position: 'ST', gp: 'ATT', rating: 87, years: [2002, 2008], bio: 'A highly clinical forward with incredible shooting and free-kick accuracy.' },
    { name: 'Hakan Çalhanoğlu', position: 'CAM', gp: 'MID', rating: 88, years: [2016, 2020, 2024], bio: 'Master playmaker and free-kick specialist of modern Turkish football.' },
    { name: 'Arda Güler', position: 'CAM', gp: 'MID', rating: 85, years: [2024], bio: 'A prodigiously talented young midfielder carrying the future of Turkish football.' },
    { name: 'Emre Belözoğlu', position: 'CM', gp: 'MID', rating: 86, years: [2002, 2008, 2012, 2016], bio: 'A passionate, highly technical midfield general of the 2002 bronze squad.' },
    { name: 'Tugay Kerimoğlu', position: 'CM', gp: 'MID', rating: 87, years: [1996, 2002, 2006], bio: 'Highly respected deep-lying playmaker, a legend in the Premier League and Turkey.' },
    { name: 'Alpay Özalan', position: 'CB', gp: 'DEF', rating: 85, years: [1996, 2002], bio: 'Iron-built, uncompromising central defender in the 2002 FIFA World Cup All-Star Team.' },
    { name: 'Bülent Korkmaz', position: 'CB', gp: 'DEF', rating: 86, years: [1996, 2002], bio: 'Known as "The Warrior," an iconic captain who led with ultimate courage.' },
    { name: 'Ümit Davala', position: 'RB', gp: 'DEF', rating: 84, years: [2002], bio: 'Versatile right wing-back who scored key goals against Japan and Senegal in 2002.' },
    { name: 'Hasan Şaş', position: 'RW', gp: 'ATT', rating: 86, years: [2002], bio: 'Highly skillful winger who dominated defenses in 2002 and earned All-Star honors.' },
    { name: 'Arda Turan', position: 'LW', gp: 'ATT', rating: 86, years: [2008, 2016], bio: 'Skillful winger with exceptional close control and playmaker abilities.' },
    { name: 'Hamit Altıntop', position: 'CM', gp: 'MID', rating: 85, years: [2008, 2012], bio: 'Powerful midfielder known for long-range scoring and versatile defensive help.' },
    { name: 'Yıldıray Baştürk', position: 'CAM', gp: 'MID', rating: 85, years: [2002], bio: 'Creative, elusive attacking midfielder who orchestrated Turkey\'s 2002 attacks.' },
    { name: 'Hakan Balta', position: 'LB', gp: 'DEF', rating: 82, years: [2008, 2016], bio: 'Reliable left-back with excellent tactical positioning.' },
    { name: 'Çağlar Söyüncü', position: 'CB', gp: 'DEF', rating: 83, years: [2020, 2024], bio: 'High-physicality central defender of the modern generation.' },
    { name: 'Merih Demiral', position: 'CB', gp: 'DEF', rating: 84, years: [2020, 2024], bio: 'Passionate and aggressive modern defender with exceptional aerial presence.' },
    { name: 'Burak Yılmaz', position: 'ST', gp: 'ATT', rating: 84, years: [2012, 2016, 2020], bio: 'Prolific goalscorer and legendary striker of the 2010s era.' },
    { name: 'Volkan Demirel', position: 'GK', gp: 'GK', rating: 84, years: [2008, 2012, 2014], bio: 'Fierce, commanding goalkeeper who anchored the national team for a decade.' }
  ],
  belgium: [
    { name: 'Thibaut Courtois', position: 'GK', gp: 'GK', rating: 92, years: [2014, 2018, 2022], bio: 'One of the greatest modern goalkeepers, won Golden Glove at 2018 World Cup.' },
    { name: 'Kevin De Bruyne', position: 'CAM', gp: 'MID', rating: 94, years: [2014, 2018, 2022], bio: 'World-class midfield maestro with unparalleled vision and passing accuracy.' },
    { name: 'Eden Hazard', position: 'LW', gp: 'ATT', rating: 92, years: [2014, 2018, 2022], bio: 'Talismanic dribbler who captained Belgium to their historic 3rd place in 2018.' },
    { name: 'Romelu Lukaku', position: 'ST', gp: 'ATT', rating: 89, years: [2014, 2018, 2022], bio: 'Belgium\'s all-time record goalscorer, a physical and clinical striker.' },
    { name: 'Vincent Kompany', position: 'CB', gp: 'DEF', rating: 90, years: [2014, 2018], bio: 'Commanding captain, defensive organizer, and natural leader of the Red Devils.' },
    { name: 'Jan Vertonghen', position: 'CB', gp: 'DEF', rating: 86, years: [2014, 2018, 2022], bio: 'Record appearance maker for Belgium and a reliable left-sided defender.' },
    { name: 'Toby Alderweireld', position: 'CB', gp: 'DEF', rating: 86, years: [2014, 2018, 2022], bio: 'Long-standing defender renowned for his pinpoint long-range diagonal passes.' },
    { name: 'Dries Mertens', position: 'CF', gp: 'ATT', rating: 86, years: [2014, 2018, 2022], bio: 'Intelligent, highly agile forward with clinical finishing and movement.' },
    { name: 'Axel Witsel', position: 'CDM', gp: 'MID', rating: 85, years: [2014, 2018, 2022], bio: 'Midfield anchor who provided balance, ball retention, and stability.' },
    { name: 'Marouane Fellaini', position: 'CM', gp: 'MID', rating: 84, years: [2014, 2018], bio: 'A physical force of nature, famous for his aerial dominance and crucial clutch goals.' },
    { name: 'Radja Nainggolan', position: 'CM', gp: 'MID', rating: 85, years: [2014, 2018], bio: 'Combative box-to-box midfielder with a lethal long-range shot.' },
    { name: 'Mousa Dembélé', position: 'CM', gp: 'MID', rating: 86, years: [2014, 2018], bio: 'Unbelievable carrying midfielder, impossible to dispossess when shielding the ball.' },
    { name: 'Thomas Meunier', position: 'RB', gp: 'DEF', rating: 82, years: [2018, 2022], bio: 'Athletic right wing-back with strong attacking and crossing contributions.' },
    { name: 'Yannick Carrasco', position: 'LW', gp: 'ATT', rating: 84, years: [2018, 2022], bio: 'Pacy, skillful winger who worked hard as a wingback under Roberto Martinez.' },
    { name: 'Enzo Scifo', position: 'CAM', gp: 'MID', rating: 88, years: [1986, 1990, 1994, 1998], bio: 'Creative genius of Belgium\'s legendary 1986 semifinal squad.' }
  ],
  senegal: [
    { name: 'Sadio Mané', position: 'LW', gp: 'ATT', rating: 91, years: [2018, 2022], bio: 'African Player of the Year, led Senegal to AFCON glory and 2018/2022 World Cups.' },
    { name: 'Kalidou Koulibaly', position: 'CB', gp: 'DEF', rating: 89, years: [2018, 2022], bio: 'One of Africa\'s greatest ever defenders, an absolute rock and captain.' },
    { name: 'Idrissa Gueye', position: 'CDM', gp: 'MID', rating: 84, years: [2018, 2022], bio: 'Tireless defensive midfielder, breaking up attacks with infinite stamina.' },
    { name: 'Edouard Mendy', position: 'GK', gp: 'GK', rating: 86, years: [2018, 2022], bio: 'Commanding goalkeeper who won the Best FIFA Goalkeeper award in 2021.' },
    { name: 'El Hadji Diouf', position: 'ST', gp: 'ATT', rating: 86, years: [2002, 2006], bio: 'Sensational forward in the historic 2002 World Cup squad who terrorized defenses.' },
    { name: 'Papa Bouba Diop', position: 'CM', gp: 'MID', rating: 84, years: [2002], bio: 'Scored the legendary winning goal against France in the opening game of 2002.' },
    { name: 'Ismaïla Sarr', position: 'RW', gp: 'ATT', rating: 83, years: [2018, 2022], bio: 'High-speed modern winger with outstanding direct running and crossing.' },
    { name: 'Boulaye Dia', position: 'ST', gp: 'ATT', rating: 82, years: [2022], bio: 'Dynamic, hard-working modern forward who scored in the 2022 World Cup.' },
    { name: 'Cheikhou Kouyaté', position: 'CDM', gp: 'MID', rating: 82, years: [2018, 2022], bio: 'Versatile defensive midfielder/centerback of Senegal\'s golden eras.' },
    { name: 'Henri Camara', position: 'ST', gp: 'ATT', rating: 84, years: [2002], bio: 'Scored two goals including the Golden Goal against Sweden to reach 2002 QF.' }
  ],
  cameroon: [
    { name: 'Samuel Eto\'o', position: 'ST', gp: 'ATT', rating: 93, years: [1998, 2002, 2010, 2014], bio: 'Four-time African Player of the Year and one of the finest strikers in football history.' },
    { name: 'Roger Milla', position: 'ST', gp: 'ATT', rating: 89, years: [1982, 1990, 1994], bio: 'Iconic veteran who scored 4 goals in 1990 at age 38, famous for his corner flag dance.' },
    { name: 'Rigobert Song', position: 'CB', gp: 'DEF', rating: 85, years: [1994, 1998, 2002, 2010], bio: 'Legendary captain who played in four World Cups (1994, 1998, 2002, 2010).' },
    { name: 'André Onana', position: 'GK', gp: 'GK', rating: 85, years: [2022], bio: 'Outstanding modern goalkeeper, exceptional with his feet and shot-stopping.' },
    { name: 'Thomas N\'Kono', position: 'GK', gp: 'GK', rating: 88, years: [1982, 1990, 1994], bio: 'Legendary goalkeeper of the 1982 and 1990 campaigns, Gianluigi Buffon\'s idol.' },
    { name: 'Geremi Njitap', position: 'RB', gp: 'DEF', rating: 84, years: [2002, 2010], bio: 'Powerhouse wingback with outstanding crossing abilities and dead-ball delivery.' },
    { name: 'Vincent Aboubakar', position: 'ST', gp: 'ATT', rating: 83, years: [2010, 2014, 2022], bio: 'Clutch forward who scored a sensational lob against Brazil in the 2022 World Cup.' },
    { name: 'Eric Maxim Choupo-Moting', position: 'ST', gp: 'ATT', rating: 82, years: [2010, 2014, 2022], bio: 'Versatile and experienced attacker with excellent hold-up play.' },
    { name: 'Alex Song', position: 'CDM', gp: 'MID', rating: 84, years: [2010, 2014], bio: 'Composed defensive midfielder who represented Arsenal and Barcelona.' }
  ],
  morocco: [
    { name: 'Achraf Hakimi', position: 'RB', gp: 'DEF', rating: 90, years: [2018, 2022], bio: 'One of the world\'s premium right-backs, critical in Morocco\'s historic 2022 semi run.' },
    { name: 'Yassine Bounou', position: 'GK', gp: 'GK', rating: 88, years: [2018, 2022], bio: 'Heroic keeper who kept clean sheets against Spain and Portugal in Qatar 2022.' },
    { name: 'Hakim Ziyech', position: 'RW', gp: 'ATT', rating: 86, years: [2018, 2022], bio: 'Highly creative playmaker with a magic left foot and exceptional vision.' },
    { name: 'Sofyan Amrabat', position: 'CDM', gp: 'MID', rating: 86, years: [2018, 2022], bio: 'The engine room of Qatar 2022, shielding the backline with pure determination.' },
    { name: 'Youssef En-Nesyri', position: 'ST', gp: 'ATT', rating: 84, years: [2018, 2022], bio: 'Scored the soaring legendary header against Portugal in the 2022 quarter-final.' },
    { name: 'Romain Saïss', position: 'CB', gp: 'DEF', rating: 84, years: [2018, 2022], bio: 'Inspirational captain who played through pain to lead the Atlas Lions.' },
    { name: 'Nayef Aguerd', position: 'CB', gp: 'DEF', rating: 84, years: [2022], bio: 'Elegant modern centerback with top-tier positioning and aerial strength.' },
    { name: 'Noussair Mazraoui', position: 'LB', gp: 'DEF', rating: 84, years: [2018, 2022], bio: 'High-iq fullback competent on both sides of the pitch.' },
    { name: 'Azzedine Ounahi', position: 'CM', gp: 'MID', rating: 83, years: [2022], bio: 'Elusive midfielder who dazzled Spain\'s coach Luis Enrique with his running.' },
    { name: 'Mustapha Hadji', position: 'CAM', gp: 'MID', rating: 86, years: [1994, 1998], bio: 'African Footballer of the Year in 1998, famous for his elegant style and skill.' }
  ],
  japan: [
    { name: 'Hidetoshi Nakata', position: 'CAM', gp: 'MID', rating: 89, years: [1998, 2002, 2006], bio: 'The pioneer who put Japanese football on the global map, playing in 3 World Cups.' },
    { name: 'Keisuke Honda', position: 'CAM', gp: 'MID', rating: 86, years: [2010, 2014, 2018], bio: 'Talisman who scored in three consecutive World Cups (2010, 2014, 2018).' },
    { name: 'Shinji Kagawa', position: 'CAM', gp: 'MID', rating: 86, years: [2014, 2018], bio: 'Highly agile link-up player of Borussia Dortmund and Man Utd fame.' },
    { name: 'Shunsuke Nakamura', position: 'CAM', gp: 'MID', rating: 86, years: [2006, 2010], bio: 'Famed playmaker with arguably the most precise free-kick in football history.' },
    { name: 'Kaoru Mitoma', position: 'LW', gp: 'ATT', rating: 85, years: [2022], bio: 'Dynamic dribbler who studied dribbling at university, terrorizing modern defenders.' },
    { name: 'Wataru Endo', position: 'CDM', gp: 'MID', rating: 84, years: [2018, 2022], bio: 'Relentless midfielder, defensive anchor, and captain of the national team.' },
    { name: 'Takefusa Kubo', position: 'RW', gp: 'ATT', rating: 84, years: [2022], bio: 'Quick, highly technical winger with outstanding close control.' },
    { name: 'Maya Yoshida', position: 'CB', gp: 'DEF', rating: 82, years: [2014, 2018, 2022], bio: 'Linchpin central defender of Japan\'s defense across multiple tournaments.' },
    { name: 'Shinji Okazaki', position: 'ST', gp: 'ATT', rating: 83, years: [2010, 2014, 2018], bio: 'Hard-running, aggressive forward who helped Leicester win the PL.' }
  ],
  south_korea: [
    { name: 'Son Heung-min', position: 'LW', gp: 'ATT', rating: 91, years: [2014, 2018, 2022], bio: 'Asian Football icon, Premier League Golden Boot winner, and South Korea\'s leader.' },
    { name: 'Park Ji-sung', position: 'RW', gp: 'MID', rating: 88, years: [2002, 2006, 2010], bio: '"Three-Lung Park," legendary box-to-box midfielder of Man Utd/Korea 2002 semi team.' },
    { name: 'Kim Min-jae', position: 'CB', gp: 'DEF', rating: 87, years: [2022], bio: '"The Monster," dominant central defender possessing elite speed and physical power.' },
    { name: 'Lee Kang-in', position: 'CAM', gp: 'MID', rating: 84, years: [2022], bio: 'Superbly gifted playmaker with a magic left foot and creative vision.' },
    { name: 'Ahn Jung-hwan', position: 'ST', gp: 'ATT', rating: 84, years: [2002, 2006], bio: 'Scored the unforgettable golden goal header against Italy in the 2002 World Cup.' },
    { name: 'Hong Myung-bo', position: 'CB', gp: 'DEF', rating: 87, years: [1990, 1994, 1998, 2002], bio: 'Captain of 2002 team, won Bronze Ball in 2002, one of Asia\'s greatest sweeper-defenders.' },
    { name: 'Lee Young-pyo', position: 'LB', gp: 'DEF', rating: 83, years: [2002, 2006, 2010], bio: 'Elusive fullback with amazing step-overs who starred in the 2002 campaign.' }
  ],
  nigeria: [
    { name: 'Jay-Jay Okocha', position: 'CAM', gp: 'MID', rating: 90, years: [1994, 1998, 2002], bio: 'So good they named him twice. An absolute entertainer with unbelievable dribbling flair.' },
    { name: 'Nwankwo Kanu', position: 'ST', gp: 'ATT', rating: 88, years: [1998, 2002, 2010], bio: 'Tall, mercurial forward who won Champions League and Olympic Gold with Nigeria.' },
    { name: 'Victor Osimhen', position: 'ST', gp: 'ATT', rating: 89, years: [2018, 2022], bio: 'Relentless, elite African striker who dominated Serie A and spearheads the modern Super Eagles.' },
    { name: 'Vincent Enyeama', position: 'GK', gp: 'GK', rating: 86, years: [2002, 2010, 2014], bio: 'Unmatched reflexes, kept Lionel Messi at bay with heroic saves in 2010.' },
    { name: 'John Obi Mikel', position: 'CDM', gp: 'MID', rating: 85, years: [2010, 2014, 2018], bio: 'Composed midfield general who anchored Chelsea and Nigeria for over a decade.' },
    { name: 'Taribo West', position: 'CB', gp: 'DEF', rating: 84, years: [1998, 2002], bio: 'Famous for his colorful hairstyles and extremely aggressive defensive style.' },
    { name: 'Celestine Babayaro', position: 'LB', gp: 'DEF', rating: 83, years: [1998, 2002], bio: 'Acclaimed left-back who won the 1996 Olympics with the "Dream Team."' },
    { name: 'Ahmed Musa', position: 'LW', gp: 'ATT', rating: 82, years: [2014, 2018], bio: 'Scored consecutive brilliant braces in the 2014 and 2018 World Cups.' }
  ],
  usa: [
    { name: 'Landon Donovan', position: 'CAM', gp: 'MID', rating: 87, years: [2002, 2006, 2010], bio: 'The face of US soccer, scored iconic 91st-minute winner against Algeria in 2010.' },
    { name: 'Clint Dempsey', position: 'ST', gp: 'ATT', rating: 86, years: [2006, 2010, 2014], bio: 'First American to score in three World Cups, known for his grit and clever finishes.' },
    { name: 'Christian Pulisic', position: 'LW', gp: 'ATT', rating: 85, years: [2022], bio: '"Captain America," direct dribbler who carried USA into the 2022 knockout round.' },
    { name: 'Tim Howard', position: 'GK', gp: 'GK', rating: 87, years: [2006, 2010, 2014], bio: 'Set a World Cup record with 15 saves in a single match against Belgium in 2014.' },
    { name: 'Claudio Reyna', position: 'CM', gp: 'MID', rating: 85, years: [1998, 2002, 2006], bio: '"Captain America" of the 2002 squad, selected for the FIFA All-Star team.' },
    { name: 'Tyler Adams', position: 'CDM', gp: 'MID', rating: 83, years: [2022], bio: 'Tireless defensive midfielder who captained the young 2022 World Cup team.' },
    { name: 'Weston McKennie', position: 'CM', gp: 'MID', rating: 83, years: [2022], bio: 'Energetic, box-to-box midfielder with a massive threat in aerial duels.' },
    { name: 'Brad Friedel', position: 'GK', gp: 'GK', rating: 85, years: [1998, 2002], bio: 'Legendary goalkeeper who stopped two penalty kicks in the 2002 World Cup.' }
  ],
  mexico: [
    { name: 'Rafael Márquez', position: 'CB', gp: 'DEF', rating: 90, years: [2002, 2006, 2010, 2014, 2018], bio: '"El Káiser de Michoacán," captained Mexico in a record five consecutive World Cups.' },
    { name: 'Hugo Sánchez', position: 'ST', gp: 'ATT', rating: 92, years: [1978, 1986, 1994], bio: 'Real Madrid icon, one of the greatest overhead kickers and strikers of all time.' },
    { name: 'Guillermo Ochoa', position: 'GK', gp: 'GK', rating: 87, years: [2006, 2010, 2014, 2018, 2022], bio: 'Becomes Prime Lev Yashin every four years, pulling off worldly blocks in World Cups.' },
    { name: 'Javier Hernández', position: 'ST', gp: 'ATT', rating: 86, years: [2010, 2014, 2018], bio: '"Chicharito," Mexico\'s all-time top scorer, scored in 2010, 2014, and 2018 World Cups.' },
    { name: 'Andrés Guardado', position: 'CM', gp: 'MID', rating: 85, years: [2006, 2010, 2014, 2018, 2022], bio: 'Legendary midfielder who earned over 170 caps and played in five World Cups.' },
    { name: 'Cuauhtémoc Blanco', position: 'CAM', gp: 'MID', rating: 87, years: [1998, 2002, 2010], bio: 'Creator of the "Cuauhtemiña" jump check, extremely clutch master playmaker.' },
    { name: 'Jorge Campos', position: 'GK', gp: 'GK', rating: 86, years: [1994, 1998, 2002], bio: 'Double goalkeeper/striker enigma, famous for his colorful kits and hyper-acrobatic saves.' }
  ],
  colombia: [
    { name: 'Carlos Valderrama', position: 'CAM', gp: 'MID', rating: 86, years: [1990, 1994, 1998], bio: '"El Pibe," iconic blonde afro captain, renowned for his laser first-touch playmaking.' },
    { name: 'James Rodríguez', position: 'CAM', gp: 'MID', rating: 88, years: [2014, 2018], bio: 'Golden Boot winner of 2014 World Cup, scored THAT unbelievable chest-volley.' },
    { name: 'Radamel Falcao', position: 'ST', gp: 'ATT', rating: 88, years: [2014, 2018], bio: '"El Tigre," an aerial beast and clinical predatory strike force.' },
    { name: 'Luis Díaz', position: 'LW', gp: 'ATT', rating: 84, years: [2022], bio: 'Electric modern winger with extreme acceleration and dribbling qualities.' },
    { name: 'David Ospina', position: 'GK', gp: 'GK', rating: 82, years: [2014, 2018], bio: 'Unyielding goalkeeper, savior of the Colombian goal for over a decade.' }
  ],
  chile: [
    { name: 'Alexis Sánchez', position: 'ST', gp: 'ATT', rating: 88, years: [2010, 2014], bio: 'Chile\'s all-time scorer, electric attacker with high work rate and skill.' },
    { name: 'Arturo Vidal', position: 'CM', gp: 'MID', rating: 88, years: [2010, 2014], bio: '"El Rey," ultimate box-to-box warrior with intense tackling and goal threat.' },
    { name: 'Claudio Bravo', position: 'GK', gp: 'GK', rating: 85, years: [2010, 2014], bio: 'Legendary captain and goalkeeper who led Chile to historic achievements.' },
    { name: 'Gary Medel', position: 'CB', gp: 'DEF', rating: 84, years: [2010, 2014], bio: '"El Pitbull," small in size but colossal in heart and aggression on the line.' }
  ],
  sweden: [
    { name: 'Zlatan Ibrahimović', position: 'ST', gp: 'ATT', rating: 92, years: [2002, 2006], bio: 'Lions don\'t compare themselves to humans, legendary striker with martial art goals.' },
    { name: 'Henrik Larsson', position: 'ST', gp: 'ATT', rating: 87, years: [1994, 2002, 2006], bio: 'Highly clinical, intelligent forward, respected worldwide for his movement.' },
    { name: 'Freddie Ljungberg', position: 'RW', gp: 'MID', rating: 85, years: [2002, 2006], bio: 'Pacy Arsenal Invincible winger with high engine and attacking flair.' }
  ],
  denmark: [
    { name: 'Peter Schmeichel', position: 'GK', gp: 'GK', rating: 92, years: [1998], bio: 'Large, intimidating goalkeeper with famous starfishes saves, won Euro 92.' },
    { name: 'Michael Laudrup', position: 'CAM', gp: 'MID', rating: 92, years: [1986, 1998], bio: 'One of the finest playmakers ever, praised by Iniesta as the greatest creator.' },
    { name: 'Christian Eriksen', position: 'CAM', gp: 'MID', rating: 86, years: [2010, 2018, 2022], bio: 'Outstanding midfielder with magical set-pieces and playmaking vision.' },
    { name: 'Kasper Schmeichel', position: 'GK', gp: 'GK', rating: 84, years: [2018, 2022], bio: 'Worthily inherited his father\'s mantle, hero of Denmark\'s modern campaigns.' }
  ],
  switzerland: [
    { name: 'Xherdan Shaqiri', position: 'RW', gp: 'ATT', rating: 85, years: [2010, 2014, 2018, 2022], bio: '"XS23," stocky winger famous for scoring spectacular goals highlight reels in major tournaments.' },
    { name: 'Granit Xhaka', position: 'CM', gp: 'MID', rating: 86, years: [2014, 2018, 2022], bio: 'Field general in midfield, delivering high leadership and crisp left-footed passes.' },
    { name: 'Yann Sommer', position: 'GK', gp: 'GK', rating: 85, years: [2014, 2018, 2022], bio: 'Agile, elastic shot-stopper who always shows up in the absolute biggest games.' },
    { name: 'Manuel Akanji', position: 'CB', gp: 'DEF', rating: 84, years: [2018, 2022], bio: 'Extremely fast, intelligent central defender.' }
  ],
  croatia: [
    { name: 'Ivan Rakitić', position: 'CM', gp: 'MID', rating: 88, years: [2014, 2018], bio: 'Formed a legendary midfield partnership with Modrić, scoring final penalties in 2018.' },
    { name: 'Mario Mandžukić', position: 'ST', gp: 'ATT', rating: 87, years: [2014, 2018], bio: 'Ruthless striker who scored the final winner against England in the 2018 semi-final.' },
    { name: 'Ivan Perişić', position: 'LW', gp: 'ATT', rating: 86, years: [2014, 2018, 2022], bio: 'Croatia\'s ultimate tournament player, scoring and assisting in vital moments.' },
    { name: 'Mateo Kovačić', position: 'CM', gp: 'MID', rating: 85, years: [2014, 2018, 2022], bio: 'Silky dribbler in midfield, driving the ball under high pressure.' },
    { name: 'Marcelo Brozović', position: 'CDM', gp: 'MID', rating: 85, years: [2014, 2018, 2022], bio: 'Unbelievable stamina engine, covering more ground than any player in 2018/2022.' },
    { name: 'Joško Gvardiol', position: 'CB', gp: 'DEF', rating: 86, years: [2022], bio: 'The masked sensation of 2022, displaying elite defensive skills as a youngster.' },
    { name: 'Zvonimir Boban', position: 'CM', gp: 'MID', rating: 87, years: [1998], bio: 'The captain of the 1998 bronze-winning generation, clean and elegant.' },
    { name: 'Robert Prosinečki', position: 'CAM', gp: 'MID', rating: 87, years: [1990, 1998], bio: 'Exquisite dribbler, the only player to score for two different nations in WC history.' }
  ],
  uruguay: [
    { name: 'Edinson Cavani', position: 'ST', gp: 'ATT', rating: 89, years: [2010, 2014, 2018, 2022], bio: '"El Matador," tireless defensive striker who scored a magnificent brace in 2018.' },
    { name: 'Diego Godín', position: 'CB', gp: 'DEF', rating: 90, years: [2010, 2014, 2018, 2022], bio: 'Defensive gladiator, representing the ultimate spirit of "Garra Charrúa" for Uruguay.' },
    { name: 'Federico Valverde', position: 'CM', gp: 'MID', rating: 88, years: [2018, 2022], bio: 'High-octane midfield runner with an incredible engine and rocket right-foot shot.' },
    { name: 'Enzo Francescoli', position: 'CAM', gp: 'MID', rating: 89, years: [1986, 1990], bio: '"El Príncipe," Zinedine Zidane\'s football idol, a graceful and elegant playmaker.' }
  ]
};
