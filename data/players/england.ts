import { Player } from '../../types';

export const englandLegends: Player[] = [
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
  }
];

export const englandRealPlayers = [
  { name: 'David Beckham', position: 'RW', gp: 'MID', rating: 90, years: [1998, 2002, 2006], bio: 'Pinpoint crosser of the ball, captain, scored the crucial penalty against Argentina in 2002.' },
  { name: 'Steven Gerrard', position: 'CM', gp: 'MID', rating: 91, years: [2006, 2010, 2014], bio: 'Inspirational box-to-box engine with thunderous long shots and clutch goals.' },
  { name: 'Frank Lampard', position: 'CM', gp: 'MID', rating: 90, years: [2006, 2010, 2014], bio: 'One of the highest-scoring midfielders in history, outstanding inside the box.' },
  { name: 'Wayne Rooney', position: 'ST', gp: 'ATT', rating: 91, years: [2006, 2010, 2014], bio: 'England\'s mercurial genius, combining raw power with wonderful vision.' },
  { name: 'Alan Shearer', position: 'ST', gp: 'ATT', rating: 90, years: [1998], bio: 'Premier League top-scorer, an old-school prolific striker with a bullet shot.' },
  { name: 'Rio Ferdinand', position: 'CB', gp: 'DEF', rating: 89, years: [1998, 2002, 2006], bio: 'Ultra-composed, ball-playing central defender who dominated with England.' },
  { name: 'John Terry', position: 'CB', gp: 'DEF', rating: 89, years: [2006, 2010], bio: 'Brave, physical leader who organized defenses with absolute authority.' },
  { name: 'Ashley Cole', position: 'LB', gp: 'DEF', rating: 88, years: [2002, 2006, 2010], bio: 'Arguably England\'s greatest ever left-back, pocketed Cristiano Ronaldo routinely.' },
  { name: 'Jude Bellingham', position: 'CAM', gp: 'MID', rating: 88, years: [2022], bio: 'The modern young superstar dominating Europe with physical presence and goalscoring.' }
];
