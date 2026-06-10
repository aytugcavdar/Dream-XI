import { NationalTeam } from '../types';

export const teams: NationalTeam[] = [
  {
    id: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    confederation: 'CONMEBOL',
    worldCupAppearances: [1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    color: '#EAB308', // Gold
    strength: 10
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    confederation: 'UEFA',
    worldCupAppearances: [1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    color: '#f8fafc', // White / Silver
    strength: 9
  },
  {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    confederation: 'UEFA',
    worldCupAppearances: [1954, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014],
    color: '#1D4ED8', // Azzurri Blue
    strength: 9
  },
  {
    id: 'argentina',
    name: 'Argentina',
    flag: '🇦🇷',
    confederation: 'CONMEBOL',
    worldCupAppearances: [1958, 1962, 1966, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    color: '#38BDF8', // Albiceleste Blue
    strength: 9
  },
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    confederation: 'UEFA',
    worldCupAppearances: [1954, 1958, 1966, 1978, 1982, 1986, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    color: '#1E3A8A', // Deep Blue
    strength: 9
  },
  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    confederation: 'UEFA',
    worldCupAppearances: [1962, 1966, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    color: '#DC2626', // Red
    strength: 8
  },
  {
    id: 'england',
    name: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    confederation: 'UEFA',
    worldCupAppearances: [1954, 1958, 1962, 1966, 1970, 1982, 1986, 1990, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    color: '#F1F5F9', // White with Red crest
    strength: 8
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
    flag: '🇺🇾',
    confederation: 'CONMEBOL',
    worldCupAppearances: [1954, 1962, 1966, 1970, 1974, 1986, 1990, 2002, 2010, 2014, 2018, 2022],
    color: '#0EA5E9', // Sky Blue
    strength: 7
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    flag: '🇳🇱',
    confederation: 'UEFA',
    worldCupAppearances: [1974, 1978, 1990, 1994, 1998, 2006, 2010, 2014, 2022],
    color: '#F97316', // Oranje
    strength: 8
  },
  {
    id: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    confederation: 'UEFA',
    worldCupAppearances: [1966, 1986, 2002, 2006, 2010, 2014, 2018, 2022],
    color: '#15803D', // Green & Red
    strength: 8
  },
  {
    id: 'belgium',
    name: 'Belgium',
    flag: '🇧🇪',
    confederation: 'UEFA',
    worldCupAppearances: [1954, 1970, 1982, 1986, 1990, 1994, 1998, 2002, 2014, 2018, 2022],
    color: '#EF4444', // Red Devils
    strength: 7
  },
  {
    id: 'croatia',
    name: 'Croatia',
    flag: '🇭🇷',
    confederation: 'UEFA',
    worldCupAppearances: [1998, 2002, 2006, 2014, 2018, 2022],
    color: '#E11D48', // Red checkers
    strength: 8
  },
  {
    id: 'mexico',
    name: 'Mexico',
    flag: '🇲🇽',
    confederation: 'CONCACAF',
    worldCupAppearances: [1954, 1958, 1962, 1966, 1970, 1978, 1986, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    color: '#16A34A', // Green
    strength: 6
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    confederation: 'CONCACAF',
    worldCupAppearances: [1990, 1994, 1998, 2002, 2006, 2010, 2014, 2022],
    color: '#1E40AF', // Navy Blue
    strength: 6
  },
  {
    id: 'senegal',
    name: 'Senegal',
    flag: '🇸🇳',
    confederation: 'CAF',
    worldCupAppearances: [2002, 2018, 2022],
    color: '#15803D', // Green-Yellow-Red
    strength: 6
  },
  {
    id: 'cameroon',
    name: 'Cameroon',
    flag: '🇨🇲',
    confederation: 'CAF',
    worldCupAppearances: [1982, 1990, 1994, 1998, 2002, 2010, 2014, 2022],
    color: '#16A34A', // Green
    strength: 6
  },
  {
    id: 'morocco',
    name: 'Morocco',
    flag: '🇲🇦',
    confederation: 'CAF',
    worldCupAppearances: [1970, 1986, 1994, 1998, 2018, 2022],
    color: '#B91C1C', // Dark Red
    strength: 7
  },
  {
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    confederation: 'AFC',
    worldCupAppearances: [1998, 2002, 2006, 2010, 2014, 2018, 2022],
    color: '#1E3A8A', // Samurai Blue
    strength: 6
  },
  {
    id: 'south_korea',
    name: 'South Korea',
    flag: '🇰🇷',
    confederation: 'AFC',
    worldCupAppearances: [1954, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    color: '#E11D48', // Red
    strength: 6
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
    flag: '🇳🇬',
    confederation: 'CAF',
    worldCupAppearances: [1994, 1998, 2002, 2010, 2014, 2018],
    color: '#059669', // Emerald Green
    strength: 6
  },
  {
    id: 'sweden',
    name: 'Sweden',
    flag: '🇸🇪',
    confederation: 'UEFA',
    worldCupAppearances: [1958, 1970, 1974, 1978, 1990, 1994, 2002, 2006, 2018],
    color: '#FACC15', // Yellow/Blue
    strength: 6
  },
  {
    id: 'denmark',
    name: 'Denmark',
    flag: '🇩🇰',
    confederation: 'UEFA',
    worldCupAppearances: [1986, 1998, 2002, 2010, 2018, 2022],
    color: '#DC2626', // Red/White
    strength: 6
  },
  {
    id: 'colombia',
    name: 'Colombia',
    flag: '🇨🇴',
    confederation: 'CONMEBOL',
    worldCupAppearances: [1962, 1990, 1994, 1998, 2014, 2018],
    color: '#FACC15', // Yellow
    strength: 7
  },
  {
    id: 'chile',
    name: 'Chile',
    flag: '🇨🇱',
    confederation: 'CONMEBOL',
    worldCupAppearances: [1962, 1966, 1974, 1982, 1998, 2010, 2014],
    color: '#DC2626', // Red
    strength: 6
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    flag: '🇨🇭',
    confederation: 'UEFA',
    worldCupAppearances: [1954, 1962, 1966, 1994, 2006, 2010, 2014, 2018, 2022],
    color: '#DC2626', // Red with white cross
    strength: 6
  },
  {
    id: 'turkey',
    name: 'Turkey',
    flag: '🇹🇷',
    confederation: 'UEFA',
    worldCupAppearances: [1954, 2002],
    color: '#E11D48', // Red
    strength: 6
  }
];
