import { Player } from '../types';

export const players: Player[] = [
  // === BRAZIL ===
  {
    id: 'pele',
    name: 'Pelé',
    country: 'brazil',
    position: 'CF',
    positionGroup: 'ATT',
    rating: 98,
    worldCups: [1958, 1962, 1966, 1970],
    era: 'Golden Era (1950s-1970s)',
    bio: 'Widely regarded as the greatest player ever. O Rei won three FIFA World Cup titles, scoring magnificent goals and creating magic in 1958, 1962, and 1970.',
    legendary: true,
    wcStats: { goals: 12, assists: 8, matches: 14, passAccuracy: 88, xG: 10.5 }
  },
  {
    id: 'garrincha',
    name: 'Garrincha',
    country: 'brazil',
    position: 'RW',
    positionGroup: 'ATT',
    rating: 95,
    worldCups: [1958, 1962, 1966],
    era: 'Vintage Era',
    bio: 'The "Joy of the People," an unstoppable dribbler who practically won the 1962 World Cup single-handedly after Pelé got injured.',
    legendary: true,
    wcStats: { goals: 5, assists: 6, matches: 12, passAccuracy: 82, xG: 4.8 }
  },
  {
    id: 'ronaldo_nazario',
    name: 'Ronaldo Nazário',
    country: 'brazil',
    position: 'ST',
    positionGroup: 'ATT',
    rating: 97,
    worldCups: [1994, 1998, 2002, 2006],
    era: 'Golden 1990s & 2000s',
    bio: '"O Fenômeno" dominated the 2002 World Cup with 8 goals, claiming the Golden Boot and Brazil\'s fifth title, overcoming career-threatening knee injuries.',
    legendary: true,
    wcStats: { goals: 15, assists: 5, matches: 19, passAccuracy: 84, xG: 14.2 }
  },
  {
    id: 'ronaldinho',
    name: 'Ronaldinho',
    country: 'brazil',
    position: 'LW',
    positionGroup: 'ATT',
    rating: 95,
    worldCups: [2002, 2006],
    era: 'Early 2000s',
    bio: 'A football magician known for his incredible flair, tricks, and that legendary long-range free-kick over David Seaman in the 2002 Quarter-Final.',
    legendary: true,
    wcStats: { goals: 2, assists: 4, matches: 10, passAccuracy: 85, xG: 2.1 }
  },
  {
    id: 'rivaldo',
    name: 'Rivaldo',
    country: 'brazil',
    position: 'CAM',
    positionGroup: 'MID',
    rating: 94,
    worldCups: [1998, 2002],
    era: 'Late 1990s',
    bio: 'A clutch performer who formed the unstoppable "Three Rs" partnership with Ronaldo and Ronaldinho in 2002, scoring 5 critical goals.',
    legendary: true,
    wcStats: { goals: 8, assists: 4, matches: 14, passAccuracy: 83, xG: 7.2 }
  },
  {
    id: 'zico',
    name: 'Zico',
    country: 'brazil',
    position: 'CAM',
    positionGroup: 'MID',
    rating: 94,
    worldCups: [1978, 1982, 1986],
    era: '1980s Pride',
    bio: 'Known as "White Pelé," Zico was the creative mastermind of the legendary, beautiful-playing but uncrowned 1982 Brazil squad.',
    legendary: true,
    wcStats: { goals: 5, assists: 6, matches: 14, passAccuracy: 90, xG: 5.5 }
  },
  {
    id: 'romario',
    name: 'Romário',
    country: 'brazil',
    position: 'ST',
    positionGroup: 'ATT',
    rating: 95,
    worldCups: [1990, 1994],
    era: '1990s Nostalgia',
    bio: 'The penalty area predator who single-handedly carried Brazil to the 1994 World Cup title in the USA, winning the Golden Ball.',
    legendary: true,
    wcStats: { goals: 5, assists: 3, matches: 8, passAccuracy: 80, xG: 6.0 }
  },
  {
    id: 'roberto_carlos',
    name: 'Roberto Carlos',
    country: 'brazil',
    position: 'LB',
    positionGroup: 'DEF',
    rating: 92,
    worldCups: [1998, 2002, 2006],
    era: 'Golden 1990s & 2000s',
    bio: 'With thunderous left-foot free kicks and infinite stamina, he redefined the modern wing-back role for Brazil across three tournaments.',
    legendary: true,
    wcStats: { goals: 1, assists: 4, matches: 17, passAccuracy: 81, xG: 1.5 }
  },
  {
    id: 'cafu',
    name: 'Cafu',
    country: 'brazil',
    position: 'RB',
    positionGroup: 'DEF',
    rating: 93,
    worldCups: [1994, 1998, 2002, 2006],
    era: 'Golden 1990s & 2000s',
    bio: 'The only player in history to play in three consecutive World Cup finals (1994, 1998, 2002), captaining the Seleção to victory in Yokohama.',
    legendary: true,
    wcStats: { goals: 0, assists: 5, matches: 20, passAccuracy: 83, xG: 0.8 }
  },
  {
    id: 'neymar',
    name: 'Neymar Jr',
    country: 'brazil',
    position: 'LW',
    positionGroup: 'ATT',
    rating: 91,
    worldCups: [2014, 2018, 2022],
    era: 'Modern Era',
    bio: 'Equalled Pelé\'s all-time goalscoring record for Brazil at the 2022 World Cup. A creative, high-skill talisman of the modern Seleção.',
    legendary: false,
    wcStats: { goals: 8, assists: 4, matches: 13, passAccuracy: 84, xG: 7.9 }
  },

  // === ARGENTINA ===
  {
    id: 'maradona',
    name: 'Diego Maradona',
    country: 'argentina',
    position: 'CAM',
    positionGroup: 'MID',
    rating: 98,
    worldCups: [1982, 1986, 1990, 1994],
    era: '1980s Pride',
    bio: 'His legendary 1986 campaign in Mexico is widely seen as the greatest individual tournament in sports history, featuring the "Goal of the Century."',
    legendary: true,
    wcStats: { goals: 8, assists: 8, matches: 21, passAccuracy: 87, xG: 9.1 }
  },
  {
    id: 'messi',
    name: 'Lionel Messi',
    country: 'argentina',
    position: 'CF',
    positionGroup: 'ATT',
    rating: 98,
    worldCups: [2006, 2010, 2014, 2018, 2022],
    era: 'Modern Era',
    bio: 'Completed football by captaining Argentina to the 2022 title in Qatar, winning the Golden Ball and scoring 7 goals in a historic run.',
    legendary: true,
    wcStats: { goals: 13, assists: 8, matches: 26, passAccuracy: 87, xG: 13.8 }
  },
  {
    id: 'kempes',
    name: 'Mario Kempes',
    country: 'argentina',
    position: 'ST',
    positionGroup: 'ATT',
    rating: 92,
    worldCups: [1974, 1978, 1982],
    era: 'Vintage Era',
    bio: 'The charismatic striker who scored twice in the 1978 final against the Netherlands to hand Argentina their first-ever World Cup title.',
    legendary: true,
    wcStats: { goals: 6, assists: 2, matches: 18, passAccuracy: 78, xG: 6.2 }
  },
  {
    id: 'batistuta',
    name: 'Gabriel Batistuta',
    country: 'argentina',
    position: 'ST',
    positionGroup: 'ATT',
    rating: 93,
    worldCups: [1994, 1998, 2002],
    era: '1990s Nostalgia',
    bio: '"Batigol" was a ruthless finisher, scoring hat-tricks in two different World Cups (1994 and 1998)—a record that still stands today.',
    legendary: true,
    wcStats: { goals: 10, assists: 1, matches: 12, passAccuracy: 76, xG: 8.8 }
  },
  {
    id: 'di_maria',
    name: 'Ángel Di María',
    country: 'argentina',
    position: 'RW',
    positionGroup: 'ATT',
    rating: 90,
    worldCups: [2010, 2014, 2018, 2022],
    era: 'Modern Era',
    bio: 'Argentina\'s ultimate big-game final player. Scored in the 2022 Final in Qatar and has been Messi\'s perfect partner for a decade.',
    legendary: false,
    wcStats: { goals: 3, assists: 2, matches: 18, passAccuracy: 79, xG: 2.8 }
  },
  {
    id: 'passarella',
    name: 'Daniel Passarella',
    country: 'argentina',
    position: 'CB',
    positionGroup: 'DEF',
    rating: 93,
    worldCups: [1978, 1982],
    era: 'Vintage Era',
    bio: 'The passionate, iron-willed captain who lifted Argentina\'s first World Cup in 1978. One of the highest-scoring defenders in history.',
    legendary: true,
    wcStats: { goals: 3, assists: 0, matches: 12, passAccuracy: 84, xG: 1.8 }
  },

  // === GERMANY ===
  {
    id: 'beckenbauer',
    name: 'Franz Beckenbauer',
    country: 'germany',
    position: 'CB',
    positionGroup: 'DEF',
    rating: 97,
    worldCups: [1966, 1970, 1974],
    era: 'Vintage Era',
    bio: 'The "Kaiser" invented the modern Libero (sweeper) position. Captained West Germany to the 1974 trophy on home soil and played with a broken shoulder in 1970.',
    legendary: true,
    wcStats: { goals: 5, assists: 3, matches: 18, passAccuracy: 92, xG: 2.2 }
  },
  {
    id: 'muller_gerd',
    name: 'Gerd Müller',
    country: 'germany',
    position: 'ST',
    positionGroup: 'ATT',
    rating: 96,
    worldCups: [1970, 1974],
    era: 'Vintage Era',
    bio: '"Der Bomber" was the ultimate goal poacher. Scored the winning goal in the 1974 Final and managed 10 goals in the 1970 edition alone.',
    legendary: true,
    wcStats: { goals: 14, assists: 3, matches: 13, passAccuracy: 75, xG: 12.8 }
  },
  {
    id: 'matthaus',
    name: 'Lothar Matthäus',
    country: 'germany',
    position: 'CM',
    positionGroup: 'MID',
    rating: 95,
    worldCups: [1982, 1986, 1990, 1994, 1998],
    era: '1990s Nostalgia',
    bio: 'Played in a record-equalling 5 World Cup tournaments, captaining Germany to victory in 1990. Diego Maradona described him as his toughest ever opponent.',
    legendary: true,
    wcStats: { goals: 6, assists: 3, matches: 25, passAccuracy: 89, xG: 3.5 }
  },
  {
    id: 'klose',
    name: 'Miroslav Klose',
    country: 'germany',
    position: 'ST',
    positionGroup: 'ATT',
    rating: 93,
    worldCups: [2002, 2006, 2010, 2014],
    era: 'Golden 1990s & 2000s',
    bio: 'The all-time leading goal scorer in FIFA World Cup history with 16 goals. A humble team player who won the 2014 tournament in Brazil.',
    legendary: true,
    wcStats: { goals: 16, assists: 3, matches: 24, passAccuracy: 78, xG: 14.5 }
  },
  {
    id: 'lahm',
    name: 'Philipp Lahm',
    country: 'germany',
    position: 'RB',
    positionGroup: 'DEF',
    rating: 93,
    worldCups: [2006, 2010, 2014],
    era: 'Early 2000s',
    bio: 'An incredibly smart, versatile defender described by Pep Guardiola as the most intelligent player he ever coached. Captained the 2014 champions.',
    legendary: true,
    wcStats: { goals: 1, assists: 3, matches: 20, passAccuracy: 91, xG: 0.5 }
  },
  {
    id: 'neuer',
    name: 'Manuel Neuer',
    country: 'germany',
    position: 'GK',
    positionGroup: 'GK',
    rating: 94,
    worldCups: [2010, 2014, 2018, 2022],
    era: 'Modern Era',
    bio: 'Redefined modern waste-management and goalkeeping as a "sweeper-keeper." Won the Golden Glove and the World Cup title in 2014.',
    legendary: false,
    wcStats: { goals: 0, assists: 0, matches: 19, passAccuracy: 87, xG: 0.0 }
  },

  // === ITALY ===
  {
    id: 'maldini',
    name: 'Paolo Maldini',
    country: 'italy',
    position: 'LB',
    positionGroup: 'DEF',
    rating: 96,
    worldCups: [1990, 1994, 1998, 2002],
    era: '1990s Nostalgia',
    bio: 'One of the greatest defenders in football history. Played more minutes (2,217) in World Cup matches than any defender, anchoring a tight Italian defense.',
    legendary: true,
    wcStats: { goals: 0, assists: 1, matches: 23, passAccuracy: 88, xG: 0.2 }
  },
  {
    id: 'baggio',
    name: 'Roberto Baggio',
    country: 'italy',
    position: 'CF',
    positionGroup: 'ATT',
    rating: 94,
    worldCups: [1990, 1994, 1998],
    era: '1990s Nostalgia',
    bio: '"Il Divin Codino" (The Divine Ponytail) was an elegant creative genius who carried Italy to the 1994 Final in the USA, scoring 5 goals in the knockouts.',
    legendary: true,
    wcStats: { goals: 9, assists: 2, matches: 16, passAccuracy: 84, xG: 6.6 }
  },
  {
    id: 'pirlo',
    name: 'Andrea Pirlo',
    country: 'italy',
    position: 'CM',
    positionGroup: 'MID',
    rating: 93,
    worldCups: [2006, 2010, 2014],
    era: 'Early 2000s',
    bio: 'The calm, deep-lying playmaker who orchestrated Italy\'s 2006 champion squad, winning the Bronze Ball and putting on a masterclass in the semi-final.',
    legendary: true,
    wcStats: { goals: 1, assists: 4, matches: 11, passAccuracy: 93, xG: 0.9 }
  },
  {
    id: 'cannavaro',
    name: 'Fabio Cannavaro',
    country: 'italy',
    position: 'CB',
    positionGroup: 'DEF',
    rating: 94,
    worldCups: [1998, 2002, 2006, 2010],
    era: 'Early 2000s',
    bio: 'The "Berlin Wall" captained Italy during their legendary 2006 triumph, playing every minute, conceding only 2 goals, and winning the Ballon d\'Or.',
    legendary: true,
    wcStats: { goals: 0, assists: 0, matches: 18, passAccuracy: 85, xG: 0.1 }
  },
  {
    id: 'buffon',
    name: 'Gianluigi Buffon',
    country: 'italy',
    position: 'GK',
    positionGroup: 'GK',
    rating: 95,
    worldCups: [1998, 2002, 2006, 2010, 2014],
    era: 'Early 2000s',
    bio: 'Kept five clean sheets and let in only two goals (an own goal and a PK) in Italy\'s legendary 2006 World Cup triumph.',
    legendary: true,
    wcStats: { goals: 0, assists: 0, matches: 17, passAccuracy: 81, xG: 0.0 }
  },

  // === FRANCE ===
  {
    id: 'zidane',
    name: 'Zinedine Zidane',
    country: 'france',
    position: 'CAM',
    positionGroup: 'MID',
    rating: 97,
    worldCups: [1998, 2002, 2006],
    era: 'Golden 1990s & 2000s',
    bio: '"Zizou" scored two bullet headers in the 1998 Final to win France\'s first World Cup, and carried them to the final in 2006 with masterclass displays.',
    legendary: true,
    wcStats: { goals: 5, assists: 3, matches: 12, passAccuracy: 90, xG: 3.8 }
  },
  {
    id: 'mbappe',
    name: 'Kylian Mbappé',
    country: 'france',
    position: 'LW',
    positionGroup: 'ATT',
    rating: 93,
    worldCups: [2018, 2022],
    era: 'Modern Era',
    bio: 'Scored in a final as a teenager in 2018, then scored a historic hat-trick in the 2022 World Cup Final to win the Golden Boot in Qatar.',
    legendary: false,
    wcStats: { goals: 12, assists: 3, matches: 14, passAccuracy: 82, xG: 10.1 }
  },
  {
    id: 'platini',
    name: 'Michel Platini',
    country: 'france',
    position: 'CAM',
    positionGroup: 'MID',
    rating: 94,
    worldCups: [1978, 1982, 1986],
    era: 'Vintage Era',
    bio: 'The elegant 1980s playmaker who led France to two consecutive World Cup semi-finals (1982 and 1986). A passing genius and set-piece specialist.',
    legendary: true,
    wcStats: { goals: 5, assists: 4, matches: 14, passAccuracy: 91, xG: 4.2 }
  },
  {
    id: 'henry',
    name: 'Thierry Henry',
    country: 'france',
    position: 'ST',
    positionGroup: 'ATT',
    rating: 93,
    worldCups: [1998, 2002, 2006, 2010],
    era: 'Golden 1990s & 2000s',
    bio: 'France\'s top scorer in their 1998 title-winning campaign as a winger, then starred as their primary striker in their 2006 run to the final.',
    legendary: true,
    wcStats: { goals: 6, assists: 2, matches: 17, passAccuracy: 82, xG: 5.6 }
  },

  // === NETHERLANDS ===
  {
    id: 'cruyff',
    name: 'Johan Cruyff',
    country: 'netherlands',
    position: 'CF',
    positionGroup: 'ATT',
    rating: 97,
    worldCups: [1974],
    era: 'Vintage Era',
    bio: 'The philosophical mastermind behind "Total Football." Led the legendary 1974 Oranje side, introduced the famous "Cruyff Turn," and won Golden Ball.',
    legendary: true,
    wcStats: { goals: 3, assists: 3, matches: 7, passAccuracy: 90, xG: 3.4 }
  },
  {
    id: 'robben',
    name: 'Arjen Robben',
    country: 'netherlands',
    position: 'RW',
    positionGroup: 'ATT',
    rating: 91,
    worldCups: [2006, 2010, 2014],
    era: 'Modern Era',
    bio: 'Famous for cut-backs onto his left foot, he led the Dutch to the 2010 final and 2014 bronze medal, terrorizing defenses with rapid pace.',
    legendary: false,
    wcStats: { goals: 6, assists: 6, matches: 15, passAccuracy: 80, xG: 5.1 }
  },
  {
    id: 'sneijder',
    name: 'Wesley Sneijder',
    country: 'netherlands',
    position: 'CAM',
    positionGroup: 'MID',
    rating: 92,
    worldCups: [2006, 2010, 2014],
    era: 'Modern Era',
    bio: 'Claimed the Silver Ball and Bronze Boot in 2010, scoring five crucial goals from midfield to guide the Netherlands to the final.',
    legendary: true,
    wcStats: { goals: 6, assists: 4, matches: 17, passAccuracy: 86, xG: 4.8 }
  },

  // === SPAIN ===
  {
    id: 'iniesta',
    name: 'Andrés Iniesta',
    country: 'spain',
    position: 'CM',
    positionGroup: 'MID',
    rating: 96,
    worldCups: [2006, 2010, 2014, 2018],
    era: 'Early 2000s',
    bio: 'Scored the most important goal in Spanish football history—the 116th-minute extra-time winner in the 2010 World Cup Final against Netherlands.',
    legendary: true,
    wcStats: { goals: 2, assists: 3, matches: 19, passAccuracy: 92, xG: 1.9 }
  },
  {
    id: 'xavi',
    name: 'Xavi Hernández',
    country: 'spain',
    position: 'CM',
    positionGroup: 'MID',
    rating: 95,
    worldCups: [2002, 2006, 2010, 2014],
    era: 'Early 2000s',
    bio: 'The metronome who completed the most passes in the 2010 tournament, defining Spain\'s legendary "Tiki-Taka" control-dominated tactical era.',
    legendary: true,
    wcStats: { goals: 0, assists: 4, matches: 15, passAccuracy: 95, xG: 0.8 }
  },
  {
    id: 'casillas',
    name: 'Iker Casillas',
    country: 'spain',
    position: 'GK',
    positionGroup: 'GK',
    rating: 94,
    worldCups: [2002, 2006, 2010, 2014],
    era: 'Early 2000s',
    bio: '"San Iker" captained Spain to their 2010 title, keeping 5 clean sheets and pulling off that iconic 1-on-1 save against Arjen Robben in the final.',
    legendary: true,
    wcStats: { goals: 0, assists: 0, matches: 17, passAccuracy: 80, xG: 0.0 }
  },

  // === PORTUGAL ===
  {
    id: 'cristiano_ronaldo',
    name: 'Cristiano Ronaldo',
    country: 'portugal',
    position: 'ST',
    positionGroup: 'ATT',
    rating: 96,
    worldCups: [2006, 2010, 2014, 2018, 2022],
    era: 'Modern Era',
    bio: 'The only male player to score in five different World Cup editions. A global goalscoring icon who led Portugal to a 4th place finish in 2006.',
    legendary: true,
    wcStats: { goals: 8, assists: 2, matches: 22, passAccuracy: 84, xG: 9.5 }
  },
  {
    id: 'eusebio',
    name: 'Eusébio',
    country: 'portugal',
    position: 'CF',
    positionGroup: 'ATT',
    rating: 94,
    worldCups: [1966],
    era: 'Vintage Era',
    bio: '"The Black Panther" scored a whopping 9 goals in 1966, claiming the Golden Boot and introducing Portugal onto the world stage with 3rd place.',
    legendary: true,
    wcStats: { goals: 9, assists: 1, matches: 6, passAccuracy: 81, xG: 7.2 }
  },

  // === ENGLAND ===
  {
    id: 'bobby_moore',
    name: 'Bobby Moore',
    country: 'england',
    position: 'CB',
    positionGroup: 'DEF',
    rating: 95,
    worldCups: [1962, 1966, 1970],
    era: 'Vintage Era',
    bio: 'England\'s greatest ever captain, hailed by Pelé as the cleanest defender he ever faced. Lifted the Jules Rimet trophy at Wembley in 1966.',
    legendary: true,
    wcStats: { goals: 0, assists: 2, matches: 14, passAccuracy: 89, xG: 0.2 }
  },
  {
    id: 'bobby_charlton',
    name: 'Sir Bobby Charlton',
    country: 'england',
    position: 'CAM',
    positionGroup: 'MID',
    rating: 94,
    worldCups: [1958, 1962, 1966, 1970],
    era: 'Vintage Era',
    bio: 'The heartbeat of England\'s 1966 champion team. Known for his devastating long-range shooting and sportsmanship.',
    legendary: true,
    wcStats: { goals: 4, assists: 3, matches: 14, passAccuracy: 88, xG: 2.8 }
  },
  {
    id: 'harry_kane',
    name: 'Harry Kane',
    country: 'england',
    position: 'ST',
    positionGroup: 'ATT',
    rating: 89,
    worldCups: [2018, 2022],
    era: 'Modern Era',
    bio: 'Won the World Cup Golden Boot in 2018 with 6 goals, captaining England to their first semi-final in 28 years.',
    legendary: false,
    wcStats: { goals: 8, assists: 3, matches: 11, passAccuracy: 82, xG: 7.5 }
  },

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

// Real player database to serve real historical players instead of awkward procedural combinations
const realPlayersDb: Record<string, Array<{ name: string; position: 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'CF' | 'ST'; gp: 'GK' | 'DEF' | 'MID' | 'ATT'; rating: number; years?: number[]; bio?: string }>> = {
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
    { name: 'Manuel Akanji', position: 'CB', gp: 'DEF', rating: 84, years: [2018, 2022], bio: 'Extremely fast, intelligent modern central defender.' }
  ],
  croatia: [
    { name: 'Ivan Rakitić', position: 'CM', gp: 'MID', rating: 88, years: [2014, 2018], bio: 'Formed a legendary midfield partnership with Modrić, scoring final penalties in 2018.' },
    { name: 'Mario Mandžukić', position: 'ST', gp: 'ATT', rating: 87, years: [2014, 2018], bio: 'Ruthless striker who scored the final winner against England in the 2018 semi-final.' },
    { name: 'Ivan Perišić', position: 'LW', gp: 'ATT', rating: 86, years: [2014, 2018, 2022], bio: 'Croatia\'s ultimate tournament player, scoring and assisting in vital moments.' },
    { name: 'Mateo Kovačić', position: 'CM', gp: 'MID', rating: 85, years: [2014, 2018, 2022], bio: 'Silky dribbler in midfield, driving the ball under high pressure.' },
    { name: 'Marcelo Brozović', position: 'CDM', gp: 'MID', rating: 85, years: [2014, 2018, 2022], bio: 'Unbelievable stamina engine, covering more ground than any player in 2018/2022.' },
    { name: 'Joško Gvardiol', position: 'CB', gp: 'DEF', rating: 86, years: [2022], bio: 'The masked sensation of 2022, displaying elite defensive skills as a youngster.' },
    { name: 'Zvonimir Boban', position: 'CM', gp: 'MID', rating: 87, years: [1998], bio: 'The captain of the 1998 bronze-winning generation, clean and elegant.' },
    { name: 'Robert Prosinečki', position: 'CAM', gp: 'MID', rating: 87, years: [1990, 1998], bio: 'Exquisite dribbler, the only player to score for two different nations in WC history.' }
  ],
  portugal: [
    { name: 'Luís Figo', position: 'RW', gp: 'ATT', rating: 92, years: [2002, 2006], bio: 'Ballon d\'Or winner, elite dribbler and captain who led Portugal\'s Golden Generation.' },
    { name: 'Deco', position: 'CAM', gp: 'MID', rating: 89, years: [2006, 2010], bio: 'Dynamic, highly intelligent midfielder who won everything in club football.' },
    { name: 'Rui Costa', position: 'CAM', gp: 'MID', rating: 89, years: [2002], bio: 'Classic master playmaker with majestic passing vision and elegance.' },
    { name: 'Pepe', position: 'CB', gp: 'DEF', rating: 89, years: [2010, 2014, 2018, 2022], bio: 'Gladiator central defender, played at elite levels until 41, feared by strikers.' },
    { name: 'Ricardo Carvalho', position: 'CB', gp: 'DEF', rating: 88, years: [2006, 2010], bio: 'Incredibly smooth central defender who relied on reading the game instead of force.' },
    { name: 'Bruno Fernandes', position: 'CAM', gp: 'MID', rating: 88, years: [2018, 2022], bio: 'A goalscoring and chance-creating machine with incredible tactical execution.' },
    { name: 'Bernardo Silva', position: 'RW', gp: 'ATT', rating: 88, years: [2018, 2022], bio: 'Intelligent dribbler who coordinates pressure and link up play perfectly.' },
    { name: 'Rúben Dias', position: 'CB', gp: 'DEF', rating: 88, years: [2018, 2022], bio: 'Modern robust center-back who commands and organizes defenses.' }
  ],
  netherlands: [
    { name: 'Marco van Basten', position: 'ST', gp: 'ATT', rating: 95, years: [1990], bio: 'One of the most complete strikers of all time, won multiple Ballon d\'Or awards.' },
    { name: 'Ruud Gullit', position: 'CAM', gp: 'MID', rating: 94, years: [1990], bio: 'Extremely versatile icon, could play anywhere at a world-class level with power.' },
    { name: 'Frank Rijkaard', position: 'CDM', gp: 'MID', rating: 93, years: [1990, 1994], bio: 'The perfect midfield anchor who also played as an elite central defender.' },
    { name: 'Dennis Bergkamp', position: 'CF', gp: 'ATT', rating: 93, years: [1994, 1998], bio: '"The Non-Flying Dutchman," scored that magical touch goal against Argentina in 1998.' },
    { name: 'Edwin van der Sar', position: 'GK', gp: 'GK', rating: 91, years: [1998, 2006], bio: 'Legendary ice-cool goalkeeper, set records for clean sheets and longevity.' },
    { name: 'Virgil van Dijk', position: 'CB', gp: 'DEF', rating: 91, years: [2022], bio: 'Defensive powerhouse who redefined center-back excellence in the modern era.' },
    { name: 'Robin van Persie', position: 'ST', gp: 'ATT', rating: 90, years: [2006, 2010, 2014], bio: '"The Flying Dutchman," scored the breathtaking diving header against Spain in 2014.' },
    { name: 'Ruud van Nistelrooy', position: 'ST', gp: 'ATT', rating: 89, years: [2006], bio: 'Ruthless box predator who could convert any half-chance into a goal.' }
  ],
  england: [
    { name: 'David Beckham', position: 'RW', gp: 'MID', rating: 90, years: [1998, 2002, 2006], bio: 'Pinpoint crosser of the ball, captain, scored the crucial penalty against Argentina in 2002.' },
    { name: 'Steven Gerrard', position: 'CM', gp: 'MID', rating: 91, years: [2006, 2010, 2014], bio: 'Inspirational box-to-box engine with thunderous long shots and clutch goals.' },
    { name: 'Frank Lampard', position: 'CM', gp: 'MID', rating: 90, years: [2006, 2010, 2014], bio: 'One of the highest-scoring midfielders in history, outstanding inside the box.' },
    { name: 'Wayne Rooney', position: 'ST', gp: 'ATT', rating: 91, years: [2006, 2010, 2014], bio: 'England\'s mercurial genius, combining raw power with wonderful vision.' },
    { name: 'Alan Shearer', position: 'ST', gp: 'ATT', rating: 90, years: [1998], bio: 'Premier League top-scorer, an old-school prolific striker with a bullet shot.' },
    { name: 'Rio Ferdinand', position: 'CB', gp: 'DEF', rating: 89, years: [1998, 2002, 2006], bio: 'Ultra-composed, ball-playing central defender who dominated with England.' },
    { name: 'John Terry', position: 'CB', gp: 'DEF', rating: 89, years: [2006, 2010], bio: 'Brave, physical leader who organized defenses with absolute authority.' },
    { name: 'Ashley Cole', position: 'LB', gp: 'DEF', rating: 88, years: [2002, 2006, 2010], bio: 'Arguably England\'s greatest ever left-back, pocketed Cristiano Ronaldo routinely.' },
    { name: 'Jude Bellingham', position: 'CAM', gp: 'MID', rating: 88, years: [2022], bio: 'The modern young superstar dominating Europe with physical presence and goalscoring.' }
  ],
  spain: [
    { name: 'Sergio Ramos', position: 'CB', gp: 'DEF', rating: 92, years: [2006, 2010, 2014, 2018], bio: 'An absolute warrior, legendary scorer of crucial headers, won 2010 World Cup.' },
    { name: 'Carles Puyol', position: 'CB', gp: 'DEF', rating: 91, years: [2002, 2006, 2010], bio: 'Spain\'s lionheart captain who scored the bullet header in the 2010 semi-final.' },
    { name: 'Gerard Piqué', position: 'CB', gp: 'DEF', rating: 89, years: [2010, 2014, 2018], bio: 'Elegant ball-playing defender who formed the perfect duo with Puyol in 2010.' },
    { name: 'Sergio Busquets', position: 'CDM', gp: 'MID', rating: 90, years: [2010, 2014, 2018, 2022], bio: 'The quiet shield of Tiki-Taka, reading the game three steps ahead of everyone.' },
    { name: 'David Villa', position: 'ST', gp: 'ATT', rating: 91, years: [2006, 2010, 2014], bio: '"El Guaje," Spain\'s all-time top scorer, scored 5 vital goals in the 2010 championship.' },
    { name: 'Fernando Torres', position: 'ST', gp: 'ATT', rating: 89, years: [2006, 2010, 2014], bio: '"El Niño," pacy striker who scored the clinical winner in Euro 2008.' },
    { name: 'Xabi Alonso', position: 'CM', gp: 'MID', rating: 89, years: [2006, 2010, 2014], bio: 'Master of the long pass, providing tactical structure and massive work ethic.' },
    { name: 'Cesc Fàbregas', position: 'CAM', gp: 'MID', rating: 89, years: [2006, 2010, 2014], bio: 'Visionary assist-provider who assisted Iniesta\'s historic 2010 World Cup winner.' }
  ],
  france: [
    { name: 'Antoine Griezmann', position: 'CAM', gp: 'MID', rating: 90, years: [2014, 2018, 2022], bio: 'France\'s tactical genius, leading the transition and chance creation.' },
    { name: 'N\'Golo Kanté', position: 'CDM', gp: 'MID', rating: 91, years: [2018, 2022], bio: 'Tireless midfield engine who carried France to the World Cup gold in 2018.' },
    { name: 'Patrick Vieira', position: 'CDM', gp: 'MID', rating: 92, years: [1998, 2002, 2006], bio: 'Lethal combination of physical dominance and elegant technical skill.' },
    { name: 'Raphaël Varane', position: 'CB', gp: 'DEF', rating: 88, years: [2014, 2018, 2022], bio: 'Champions-built swift defender, crucial in France\'s 2018 defensive wall.' },
    { name: 'Hugo Lloris', position: 'GK', gp: 'GK', rating: 87, years: [2010, 2014, 2018, 2022], bio: 'Long-serving captain who lifted the 2018 World Cup trophy in Moscow.' },
    { name: 'Karim Benzema', position: 'ST', gp: 'ATT', rating: 91, years: [2014, 2022], bio: 'Ballon d\'Or winner, highly complete forward with deep creative linkup play.' },
    { name: 'Jean Tigana', position: 'CM', gp: 'MID', rating: 90, years: [1982, 1986], bio: 'The tireless engine of the Carré d\'As (Magic Square) midfield, known for his high energy.' },
    { name: 'Alain Giresse', position: 'CAM', gp: 'MID', rating: 89, years: [1982, 1986], bio: 'A highly intelligent, compact playmaker who combined brilliantly with Platini in the 1980s.' },
    { name: 'Luis Fernández', position: 'CDM', gp: 'MID', rating: 88, years: [1986, 1990], bio: 'The passionate defensive anchor of France\'s legendary 1980s midfield.' },
    { name: 'Manuel Amoros', position: 'RB', gp: 'DEF', rating: 88, years: [1982, 1986, 1990], bio: 'Outstanding fullback who won the Best Young Player award in 1982 and starred in 1986.' },
    { name: 'Joël Bats', position: 'GK', gp: 'GK', rating: 87, years: [1986], bio: 'Elastic goalkeeper who saved penalties from Zico and Socrates in the epic 1986 shootout.' }
  ],
  italy: [
    { name: 'Alessandro Del Piero', position: 'CF', gp: 'ATT', rating: 91, years: [1998, 2002, 2006], bio: 'The fantasista, scored the famous ice-cool 2-0 counter goal against Germany in 2006.' },
    { name: 'Francesco Totti', position: 'CAM', gp: 'MID', rating: 91, years: [2002, 2006], bio: '"Il Gladiatore," Roma\'s king, the ultimate number 10 who played 2006 with metal plates.' },
    { name: 'Giorgio Chiellini', position: 'CB', gp: 'DEF', rating: 88, years: [2010, 2014], bio: 'Old-school master of the dark arts of defending, intense and passionate.' },
    { name: 'Gennaro Gattuso', position: 'CDM', gp: 'MID', rating: 87, years: [2002, 2006, 2010], bio: 'Aggressive, combative pitbull who provided the bite to Pirlo\'s beauty in 2006.' },
    { name: 'Daniele De Rossi', position: 'CM', gp: 'MID', rating: 87, years: [2006, 2010, 2014], bio: 'Complete gladiator midfielder with defensive toughness and great passing range.' },
    { name: 'Alessandro Altobelli', position: 'ST', gp: 'ATT', rating: 89, years: [1982, 1986], bio: 'Elegant target man who scored in the 1982 Final and captained Italy in 1986.' },
    { name: 'Bruno Conti', position: 'RW', gp: 'ATT', rating: 91, years: [1982, 1986], bio: 'The magic winger of the 1982 champions, Pele called him the best player in the world.' },
    { name: 'Giuseppe Bergomi', position: 'CB', gp: 'DEF', rating: 90, years: [1982, 1986, 1990, 1998], bio: 'Uncompromising defender who won the World Cup at 18 in 1982.' },
    { name: 'Gaetano Scirea', position: 'CB', gp: 'DEF', rating: 95, years: [1978, 1982, 1986], bio: 'A legendary, ultra-fair sweeper and core champion of Italy\'s 1982 side.' },
    { name: 'Antonio Cabrini', position: 'LB', gp: 'DEF', rating: 89, years: [1978, 1982, 1986], bio: 'Sublime, highly attacking left-back who was a core pillar of Italy\'s 1982 backline.' },
    { name: 'Marco Tardelli', position: 'CM', gp: 'MID', rating: 90, years: [1978, 1982, 1986], bio: 'Aggressive box-to-box midfielder, famed for his emotional goal celebration in 1982.' }
  ],
  germany: [
    // 1980s / 1990s
    { name: 'Karl-Heinz Rummenigge', position: 'ST', gp: 'ATT', rating: 92, years: [1978, 1982, 1986], bio: 'Two-time Ballon d\'Or winner and clinical forward who captained West Germany to two World Cup finals.' },
    { name: 'Rudi Völler', position: 'ST', gp: 'ATT', rating: 91, years: [1986, 1990, 1994], bio: 'Highly prolific striker who scored in the 1986 Final and won the 1990 trophy.' },
    { name: 'Andreas Brehme', position: 'LB', gp: 'DEF', rating: 90, years: [1986, 1990, 1994], bio: 'One of the greatest set-piece and crossing full-backs ever; scored the 1990 Final winning penalty.' },
    { name: 'Pierre Littbarski', position: 'RW', gp: 'ATT', rating: 89, years: [1982, 1986, 1990], bio: 'Elusive and highly skillful dribbling winger who starred in the 1982, 1986, and 1990 runs.' },
    { name: 'Jürgen Klinsmann', position: 'ST', gp: 'ATT', rating: 91, years: [1990, 1994, 1998], bio: 'Lethal tournament scorer who won the 1990 World Cup and notched 11 World Cup goals.' },
    { name: 'Jürgen Kohler', position: 'CB', gp: 'DEF', rating: 90, years: [1990, 1994, 1998], bio: 'One of the toughest, most uncompromising man-markers in football history.' },
    { name: 'Harald Schumacher', position: 'GK', gp: 'GK', rating: 89, years: [1982, 1986], bio: 'Dominant and fierce goalkeeper who led West Germany to consecutive World Cup finals.' },
    { name: 'Bodo Illgner', position: 'GK', gp: 'GK', rating: 88, years: [1990, 1994], bio: 'Composed goalkeeper who became the first to keep a clean sheet in a World Cup Final (1990).' },
    { name: 'Guido Buchwald', position: 'CB', gp: 'DEF', rating: 88, years: [1990, 1994], bio: 'A tactical defender famous for completely neutralizing Diego Maradona in the 1990 Final.' },
    // 2010s / 2014 Modern
    { name: 'Toni Kroos', position: 'CM', gp: 'MID', rating: 91, years: [2010, 2014, 2018], bio: 'German sniper with outstanding laser-accuracy passes, master of the 2014 midfield.' },
    { name: 'Bastian Schweinsteiger', position: 'CM', gp: 'MID', rating: 90, years: [2006, 2010, 2014], bio: 'The bloodied soldier who gave a masterclass of defensive grit in the 2014 Final.' },
    { name: 'Thomas Müller', position: 'CAM', gp: 'MID', rating: 89, years: [2010, 2014, 2018, 2022], bio: 'The "Raumdeuter" (Space Investigator), scoring 10 goals across 2010 & 2014 World Cups.' },
    { name: 'Oliver Kahn', position: 'GK', gp: 'GK', rating: 91, years: [1998, 2002, 2006], bio: '"Der Titan," the only goalkeeper in history to win the World Cup Golden Ball (2002).' },
    { name: 'Michael Ballack', position: 'CM', gp: 'MID', rating: 89, years: [2002, 2006], bio: 'Powerful midfield leader with clinical long-range shooting and headers.' },
    { name: 'Mesut Özil', position: 'CAM', gp: 'MID', rating: 89, years: [2010, 2014, 2018], bio: 'Wizard of Oz, visionary playmaker of the 2014 World Cup champions.' },
    { name: 'Mats Hummels', position: 'CB', gp: 'DEF', rating: 89, years: [2014, 2018], bio: 'Superb ball-playing center-back whose header knocked out France in the 2014 Quarter-Final.' },
    { name: 'Mario Götze', position: 'CAM', gp: 'MID', rating: 87, years: [2014], bio: 'Scored the unforgettable, breathtaking extra-time winner in the 2014 World Cup Final.' }
  ],
  argentina: [
    { name: 'Jorge Burruchaga', position: 'CAM', gp: 'MID', rating: 88, years: [1986, 1990], bio: 'Scored the famous 84th-minute winning goal in the 1986 World Cup Final.' },
    { name: 'Jorge Valdano', position: 'ST', gp: 'ATT', rating: 88, years: [1982, 1986], bio: 'Clutch striker who scored four goals in the 1986 campaign, including one in the Final.' },
    { name: 'Oscar Ruggeri', position: 'CB', gp: 'DEF', rating: 88, years: [1986, 1990, 1994], bio: 'The dominant defensive leader and warrior of the 1986 World Cup champion backline.' },
    { name: 'Nery Pumpido', position: 'GK', gp: 'GK', rating: 86, years: [1986, 1990], bio: 'Reliable goalkeeper who anchored Argentina\'s defense in their historic 1986 triumph.' },
    { name: 'Sergio Agüero', position: 'ST', gp: 'ATT', rating: 90, years: [2010, 2014, 2018], bio: '"Kun" Agüero, a hyper-lethal finisher with outstanding movement and power.' },
    { name: 'Javier Mascherano', position: 'CDM', gp: 'MID', rating: 88, years: [2006, 2010, 2014, 2018], bio: '"El Jefecito," a defensive general who gave everything for the Albiceleste shirt.' },
    { name: 'Javier Zanetti', position: 'RB', gp: 'DEF', rating: 89, years: [1998, 2002], bio: '"Il Trattore," historic captain with incredible longevity, defensive power and class.' },
    { name: 'Juan Román Riquelme', position: 'CAM', gp: 'MID', rating: 90, years: [2006], bio: 'The romantic classic number 10, shielded the ball and generated pure art in 2006.' },
    { name: 'Emiliano Martínez', position: 'GK', gp: 'GK', rating: 87, years: [2022], bio: '"Dibu," dynamic keeper who won the Golden Glove of 2022 World Cup after legendary saves.' }
  ],
  brazil: [
    { name: 'Careca', position: 'ST', gp: 'ATT', rating: 90, years: [1986, 1990], bio: 'Dynamic and clinical striker who starred in the 1986 campaign, scoring 5 goals.' },
    { name: 'Sócrates', position: 'CAM', gp: 'MID', rating: 92, years: [1982, 1986], bio: 'The chain-smoking medical doctor and legendary playmaker who captained the elegant 1982 side.' },
    { name: 'Falcão', position: 'CM', gp: 'MID', rating: 91, years: [1982, 1986], bio: 'The "King of Rome" and midfield orchestrator of Brazil\'s magnificent 1982 team.' },
    { name: 'Müller', position: 'ST', gp: 'ATT', rating: 88, years: [1986, 1990, 1994], bio: 'Skillful and clever forward who scored in the crucial matches of the 1986 and 1990 World Cups.' },
    { name: 'Júnior', position: 'CM', gp: 'MID', rating: 90, years: [1982, 1986], bio: 'Elegant and technically gifted player who played left-back in 1982 and midfield in 1986.' },
    { name: 'Branco', position: 'LB', gp: 'DEF', rating: 89, years: [1986, 1990, 1994], bio: 'Powerhouse left-back renowned for his lethal, physics-defying free kicks.' },
    { name: 'Carlos', position: 'GK', gp: 'GK', rating: 87, years: [1978, 1982, 1986], bio: 'Outstanding reflexes and composure; Brazil\'s primary goalkeeper in their legendary 1986 squad.' },
    { name: 'Kaká', position: 'CAM', gp: 'MID', rating: 92, years: [2002, 2006, 2010], bio: 'Ballon d\'Or winner, unmatched direct speed, dribbling and clinical scoring.' },
    { name: 'Casemiro', position: 'CDM', gp: 'MID', rating: 89, years: [2018, 2022], bio: 'Five-time CL winner, defensive wall who intercepts and breaks play.' },
    { name: 'Thiago Silva', position: 'CB', gp: 'DEF', rating: 89, years: [2010, 2014, 2018, 2022], bio: '"O Monstro," classy defender with peerless tactical anticipation.' },
    { name: 'Dani Alves', position: 'RB', gp: 'DEF', rating: 89, years: [2010, 2014, 2022], bio: 'One of the most decorated players in history, offering massive attacking output.' },
    { name: 'Marcelo', position: 'LB', gp: 'DEF', rating: 89, years: [2014, 2018], bio: 'Sublime technical left-back, played with the flair and skill of a winger.' }
  ],
  uruguay: [
    { name: 'Edinson Cavani', position: 'ST', gp: 'ATT', rating: 89, years: [2010, 2014, 2018, 2022], bio: '"El Matador," tireless defensive striker who scored a magnificent brace in 2018.' },
    { name: 'Diego Godín', position: 'CB', gp: 'DEF', rating: 90, years: [2010, 2014, 2018, 2022], bio: 'Defensive gladiator, representing the ultimate spirit of "Garra Charrúa" for Uruguay.' },
    { name: 'Federico Valverde', position: 'CM', gp: 'MID', rating: 88, years: [2018, 2022], bio: 'High-octane midfield runner with an incredible engine and rocket right-foot shot.' },
    { name: 'Enzo Francescoli', position: 'CAM', gp: 'MID', rating: 89, years: [1986, 1990], bio: '"El Príncipe," Zinedine Zidane\'s football idol, a graceful and elegant playmaker.' }
  ]
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
      const fName = pool.first[genIndex % pool.first.length];
      const lName = pool.last[(genIndex + 3) % pool.last.length];
      const name = `${fName} ${lName}`;
      
      if (squad.some(p => p.name === name)) {
        continue;
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
    const fName = pool.first[genIndex % pool.first.length];
    const lName = pool.last[(genIndex + 7) % pool.last.length];
    const name = `${fName} ${lName}`;
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
