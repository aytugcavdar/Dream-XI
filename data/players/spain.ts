import { Player } from '../../types';

export const spainLegends: Player[] = [
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
  }
];

export const spainRealPlayers = [
  { name: 'Sergio Ramos', position: 'CB', gp: 'DEF', rating: 92, years: [2006, 2010, 2014, 2018], bio: 'An absolute warrior, legendary scorer of crucial headers, won 2010 World Cup.' },
  { name: 'Carles Puyol', position: 'CB', gp: 'DEF', rating: 91, years: [2002, 2006, 2010], bio: 'Spain\'s lionheart captain who scored the bullet header in the 2010 semi-final.' },
  { name: 'Gerard Piqué', position: 'CB', gp: 'DEF', rating: 89, years: [2010, 2014, 2018], bio: 'Elegant ball-playing defender who formed the perfect duo with Puyol in 2010.' },
  { name: 'Sergio Busquets', position: 'CDM', gp: 'MID', rating: 90, years: [2010, 2014, 2018, 2022], bio: 'The quiet shield of Tiki-Taka, reading the game three steps ahead of everyone.' },
  { name: 'David Villa', position: 'ST', gp: 'ATT', rating: 91, years: [2006, 2010, 2014], bio: '"El Guaje," Spain\'s all-time top scorer, scored 5 vital goals in the 2010 championship.' },
  { name: 'Fernando Torres', position: 'ST', gp: 'ATT', rating: 89, years: [2006, 2010, 2014], bio: '"El Niño," pacy striker who scored the clinical winner in Euro 2008.' },
  { name: 'Xabi Alonso', position: 'CM', gp: 'MID', rating: 89, years: [2006, 2010, 2014], bio: 'Master of the long pass, providing tactical structure and massive work ethic.' },
  { name: 'Cesc Fàbregas', position: 'CAM', gp: 'MID', rating: 89, years: [2006, 2010, 2014], bio: 'Visionary assist-provider who assisted Iniesta\'s historic 2010 World Cup winner.' }
];
