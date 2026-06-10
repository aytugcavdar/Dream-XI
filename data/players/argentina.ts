import { Player } from '../../types';

export const argentinaLegends: Player[] = [
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
];

export const argentinaRealPlayers = [
  { name: 'Jorge Burruchaga', position: 'CAM' as const, gp: 'MID' as const, rating: 88, years: [1986, 1990], bio: 'Scored the famous 84th-minute winning goal in the 1986 World Cup Final.' },
  { name: 'Jorge Valdano', position: 'ST' as const, gp: 'ATT' as const, rating: 88, years: [1982, 1986], bio: 'Clutch striker who scored four goals in the 1986 campaign, including one in the Final.' },
  { name: 'Oscar Ruggeri', position: 'CB' as const, gp: 'DEF' as const, rating: 88, years: [1986, 1990, 1994], bio: 'The dominant defensive leader and warrior of the 1986 World Cup champion backline.' },
  { name: 'Nery Pumpido', position: 'GK' as const, gp: 'GK' as const, rating: 86, years: [1986, 1990], bio: 'Reliable goalkeeper who anchored Argentina\'s defense in their historic 1986 triumph.' },
  { name: 'Sergio Agüero', position: 'ST' as const, gp: 'ATT' as const, rating: 90, years: [2010, 2014, 2018], bio: '"Kun" Agüero, a hyper-lethal finisher with outstanding movement and power.' },
  { name: 'Javier Mascherano', position: 'CDM' as const, gp: 'MID' as const, rating: 88, years: [2006, 2010, 2014, 2018], bio: '"El Jefecito," a defensive general who gave everything for the Albiceleste shirt.' },
  { name: 'Javier Zanetti', position: 'RB' as const, gp: 'DEF' as const, rating: 89, years: [1998, 2002], bio: '"Il Trattore," historic captain with incredible longevity, defensive power and class.' },
  { name: 'Juan Román Riquelme', position: 'CAM' as const, gp: 'MID' as const, rating: 90, years: [2006], bio: 'The romantic classic number 10, shielded the ball and generated pure art in 2006.' },
  { name: 'Emiliano Martínez', position: 'GK' as const, gp: 'GK' as const, rating: 87, years: [2022], bio: '"Dibu," dynamic keeper who won the Golden Glove of 2022 World Cup after legendary saves.' },
];
