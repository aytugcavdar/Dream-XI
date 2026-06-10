import { Player } from '../../types';

export const italyLegends: Player[] = [
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
];

export const italyRealPlayers = [
  { name: 'Alessandro Del Piero', position: 'CF' as const, gp: 'ATT' as const, rating: 91, years: [1998, 2002, 2006], bio: 'The fantasista, scored the famous ice-cool 2-0 counter goal against Germany in 2006.' },
  { name: 'Francesco Totti', position: 'CAM' as const, gp: 'MID' as const, rating: 91, years: [2002, 2006], bio: '"Il Gladiatore," Roma\'s king, the ultimate number 10 who played 2006 with metal plates.' },
  { name: 'Giorgio Chiellini', position: 'CB' as const, gp: 'DEF' as const, rating: 88, years: [2010, 2014], bio: 'Old-school master of the dark arts of defending, intense and passionate.' },
  { name: 'Gennaro Gattuso', position: 'CDM' as const, gp: 'MID' as const, rating: 87, years: [2002, 2006, 2010], bio: 'Aggressive, combative pitbull who provided the bite to Pirlo\'s beauty in 2006.' },
  { name: 'Daniele De Rossi', position: 'CM' as const, gp: 'MID' as const, rating: 87, years: [2006, 2010, 2014], bio: 'Complete gladiator midfielder with defensive toughness and great passing range.' },
  { name: 'Alessandro Altobelli', position: 'ST' as const, gp: 'ATT' as const, rating: 89, years: [1982, 1986], bio: 'Elegant target man who scored in the 1982 Final and captained Italy in 1986.' },
  { name: 'Bruno Conti', position: 'RW' as const, gp: 'ATT' as const, rating: 91, years: [1982, 1986], bio: 'The magic winger of the 1982 champions, Pele called him the best player in the world.' },
  { name: 'Giuseppe Bergomi', position: 'CB' as const, gp: 'DEF' as const, rating: 90, years: [1982, 1986, 1990, 1998], bio: 'Uncompromising defender who won the World Cup at 18 in 1982.' },
  { name: 'Gaetano Scirea', position: 'CB' as const, gp: 'DEF' as const, rating: 95, years: [1978, 1982, 1986], bio: 'A legendary, ultra-fair sweeper and core champion of Italy\'s 1982 side.' },
  { name: 'Antonio Cabrini', position: 'LB' as const, gp: 'DEF' as const, rating: 89, years: [1978, 1982, 1986], bio: 'Sublime, highly attacking left-back who was a core pillar of Italy\'s 1982 backline.' },
  { name: 'Marco Tardelli', position: 'CM' as const, gp: 'MID' as const, rating: 90, years: [1978, 1982, 1986], bio: 'Aggressive box-to-box midfielder, famed for his emotional goal celebration in 1982.' },
];
