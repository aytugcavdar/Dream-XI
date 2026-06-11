import { OfficialSquad, OfficialSquadPlayer, Player } from '../../types';
import { argentina1958Squad } from './argentina/1958';
import { argentina1962Squad } from './argentina/1962';
import { argentina1966Squad } from './argentina/1966';
import { argentina1974Squad } from './argentina/1974';
import { argentina1978Squad } from './argentina/1978';
import { argentina1982Squad } from './argentina/1982';
import { argentina1986Squad } from './argentina/1986';
import { argentina1990Squad } from './argentina/1990';
import { argentina1994Squad } from './argentina/1994';
import { argentina1998Squad } from './argentina/1998';
import { argentina2002Squad } from './argentina/2002';
import { argentina2006Squad } from './argentina/2006';
import { argentina2010Squad } from './argentina/2010';
import { argentina2014Squad } from './argentina/2014';
import { argentina2018Squad } from './argentina/2018';
import { argentina2022Squad } from './argentina/2022';
import { belgium1954Squad } from './belgium/1954';
import { belgium1970Squad } from './belgium/1970';
import { belgium1982Squad } from './belgium/1982';
import { belgium1986Squad } from './belgium/1986';
import { belgium1990Squad } from './belgium/1990';
import { belgium1994Squad } from './belgium/1994';
import { belgium1998Squad } from './belgium/1998';
import { belgium2002Squad } from './belgium/2002';
import { belgium2014Squad } from './belgium/2014';
import { belgium2018Squad } from './belgium/2018';
import { belgium2022Squad } from './belgium/2022';
import { brazil1954Squad } from './brazil/1954';
import { brazil1958Squad } from './brazil/1958';
import { brazil1962Squad } from './brazil/1962';
import { brazil1966Squad } from './brazil/1966';
import { brazil1970Squad } from './brazil/1970';
import { brazil1974Squad } from './brazil/1974';
import { brazil1978Squad } from './brazil/1978';
import { brazil1982Squad } from './brazil/1982';
import { brazil1986Squad } from './brazil/1986';
import { brazil1990Squad } from './brazil/1990';
import { brazil1994Squad } from './brazil/1994';
import { brazil1998Squad } from './brazil/1998';
import { brazil2002Squad } from './brazil/2002';
import { brazil2006Squad } from './brazil/2006';
import { brazil2010Squad } from './brazil/2010';
import { brazil2014Squad } from './brazil/2014';
import { brazil2018Squad } from './brazil/2018';
import { brazil2022Squad } from './brazil/2022';
import { cameroon1982Squad } from './cameroon/1982';
import { cameroon1990Squad } from './cameroon/1990';
import { cameroon1994Squad } from './cameroon/1994';
import { cameroon1998Squad } from './cameroon/1998';
import { cameroon2002Squad } from './cameroon/2002';
import { cameroon2010Squad } from './cameroon/2010';
import { cameroon2014Squad } from './cameroon/2014';
import { cameroon2022Squad } from './cameroon/2022';
import { chile1962Squad } from './chile/1962';
import { chile1966Squad } from './chile/1966';
import { chile1974Squad } from './chile/1974';
import { chile1982Squad } from './chile/1982';
import { chile1998Squad } from './chile/1998';
import { chile2010Squad } from './chile/2010';
import { chile2014Squad } from './chile/2014';
import { colombia1962Squad } from './colombia/1962';
import { colombia1990Squad } from './colombia/1990';
import { colombia1994Squad } from './colombia/1994';
import { colombia1998Squad } from './colombia/1998';
import { colombia2014Squad } from './colombia/2014';
import { colombia2018Squad } from './colombia/2018';
import { croatia1998Squad } from './croatia/1998';
import { croatia2002Squad } from './croatia/2002';
import { croatia2006Squad } from './croatia/2006';
import { croatia2014Squad } from './croatia/2014';
import { croatia2018Squad } from './croatia/2018';
import { croatia2022Squad } from './croatia/2022';
import { denmark1986Squad } from './denmark/1986';
import { denmark1998Squad } from './denmark/1998';
import { denmark2002Squad } from './denmark/2002';
import { denmark2010Squad } from './denmark/2010';
import { denmark2018Squad } from './denmark/2018';
import { denmark2022Squad } from './denmark/2022';
import { england1954Squad } from './england/1954';
import { england1958Squad } from './england/1958';
import { england1962Squad } from './england/1962';
import { england1966Squad } from './england/1966';
import { england1970Squad } from './england/1970';
import { england1982Squad } from './england/1982';
import { england1986Squad } from './england/1986';
import { england1990Squad } from './england/1990';
import { england1998Squad } from './england/1998';
import { england2002Squad } from './england/2002';
import { england2006Squad } from './england/2006';
import { england2010Squad } from './england/2010';
import { england2014Squad } from './england/2014';
import { england2018Squad } from './england/2018';
import { england2022Squad } from './england/2022';
import { france1954Squad } from './france/1954';
import { france1958Squad } from './france/1958';
import { france1966Squad } from './france/1966';
import { france1978Squad } from './france/1978';
import { france1982Squad } from './france/1982';
import { france1986Squad } from './france/1986';
import { france1998Squad } from './france/1998';
import { france2002Squad } from './france/2002';
import { france2006Squad } from './france/2006';
import { france2010Squad } from './france/2010';
import { france2014Squad } from './france/2014';
import { france2018Squad } from './france/2018';
import { france2022Squad } from './france/2022';
import { germany1954Squad } from './germany/1954';
import { germany1958Squad } from './germany/1958';
import { germany1962Squad } from './germany/1962';
import { germany1966Squad } from './germany/1966';
import { germany1970Squad } from './germany/1970';
import { germany1974Squad } from './germany/1974';
import { germany1978Squad } from './germany/1978';
import { germany1982Squad } from './germany/1982';
import { germany1986Squad } from './germany/1986';
import { germany1990Squad } from './germany/1990';
import { germany1994Squad } from './germany/1994';
import { germany1998Squad } from './germany/1998';
import { germany2002Squad } from './germany/2002';
import { germany2006Squad } from './germany/2006';
import { germany2010Squad } from './germany/2010';
import { germany2014Squad } from './germany/2014';
import { germany2018Squad } from './germany/2018';
import { germany2022Squad } from './germany/2022';
import { italy1954Squad } from './italy/1954';
import { italy1962Squad } from './italy/1962';
import { italy1966Squad } from './italy/1966';
import { italy1970Squad } from './italy/1970';
import { italy1974Squad } from './italy/1974';
import { italy1978Squad } from './italy/1978';
import { italy1982Squad } from './italy/1982';
import { italy1986Squad } from './italy/1986';
import { italy1990Squad } from './italy/1990';
import { italy1994Squad } from './italy/1994';
import { italy1998Squad } from './italy/1998';
import { italy2002Squad } from './italy/2002';
import { italy2006Squad } from './italy/2006';
import { italy2010Squad } from './italy/2010';
import { italy2014Squad } from './italy/2014';
import { japan1998Squad } from './japan/1998';
import { japan2002Squad } from './japan/2002';
import { japan2006Squad } from './japan/2006';
import { japan2010Squad } from './japan/2010';
import { japan2014Squad } from './japan/2014';
import { japan2018Squad } from './japan/2018';
import { japan2022Squad } from './japan/2022';
import { mexico1954Squad } from './mexico/1954';
import { mexico1958Squad } from './mexico/1958';
import { mexico1962Squad } from './mexico/1962';
import { mexico1966Squad } from './mexico/1966';
import { mexico1970Squad } from './mexico/1970';
import { mexico1978Squad } from './mexico/1978';
import { mexico1986Squad } from './mexico/1986';
import { mexico1994Squad } from './mexico/1994';
import { mexico1998Squad } from './mexico/1998';
import { mexico2002Squad } from './mexico/2002';
import { mexico2006Squad } from './mexico/2006';
import { mexico2010Squad } from './mexico/2010';
import { mexico2014Squad } from './mexico/2014';
import { mexico2018Squad } from './mexico/2018';
import { mexico2022Squad } from './mexico/2022';
import { morocco1970Squad } from './morocco/1970';
import { morocco1986Squad } from './morocco/1986';
import { morocco1994Squad } from './morocco/1994';
import { morocco1998Squad } from './morocco/1998';
import { morocco2018Squad } from './morocco/2018';
import { morocco2022Squad } from './morocco/2022';
import { netherlands1974Squad } from './netherlands/1974';
import { netherlands1978Squad } from './netherlands/1978';
import { netherlands1990Squad } from './netherlands/1990';
import { netherlands1994Squad } from './netherlands/1994';
import { netherlands1998Squad } from './netherlands/1998';
import { netherlands2006Squad } from './netherlands/2006';
import { netherlands2010Squad } from './netherlands/2010';
import { netherlands2014Squad } from './netherlands/2014';
import { netherlands2022Squad } from './netherlands/2022';
import { nigeria1994Squad } from './nigeria/1994';
import { nigeria1998Squad } from './nigeria/1998';
import { nigeria2002Squad } from './nigeria/2002';
import { nigeria2010Squad } from './nigeria/2010';
import { nigeria2014Squad } from './nigeria/2014';
import { nigeria2018Squad } from './nigeria/2018';
import { portugal1966Squad } from './portugal/1966';
import { portugal1986Squad } from './portugal/1986';
import { portugal2002Squad } from './portugal/2002';
import { portugal2006Squad } from './portugal/2006';
import { portugal2010Squad } from './portugal/2010';
import { portugal2014Squad } from './portugal/2014';
import { portugal2018Squad } from './portugal/2018';
import { portugal2022Squad } from './portugal/2022';
import { senegal2002Squad } from './senegal/2002';
import { senegal2018Squad } from './senegal/2018';
import { senegal2022Squad } from './senegal/2022';
import { southKorea1954Squad } from './south_korea/1954';
import { southKorea1986Squad } from './south_korea/1986';
import { southKorea1990Squad } from './south_korea/1990';
import { southKorea1994Squad } from './south_korea/1994';
import { southKorea1998Squad } from './south_korea/1998';
import { southKorea2002Squad } from './south_korea/2002';
import { southKorea2006Squad } from './south_korea/2006';
import { southKorea2010Squad } from './south_korea/2010';
import { southKorea2014Squad } from './south_korea/2014';
import { southKorea2018Squad } from './south_korea/2018';
import { southKorea2022Squad } from './south_korea/2022';
import { spain1962Squad } from './spain/1962';
import { spain1966Squad } from './spain/1966';
import { spain1978Squad } from './spain/1978';
import { spain1982Squad } from './spain/1982';
import { spain1986Squad } from './spain/1986';
import { spain1990Squad } from './spain/1990';
import { spain1994Squad } from './spain/1994';
import { spain1998Squad } from './spain/1998';
import { spain2002Squad } from './spain/2002';
import { spain2006Squad } from './spain/2006';
import { spain2010Squad } from './spain/2010';
import { spain2014Squad } from './spain/2014';
import { spain2018Squad } from './spain/2018';
import { spain2022Squad } from './spain/2022';
import { sweden1958Squad } from './sweden/1958';
import { sweden1970Squad } from './sweden/1970';
import { sweden1974Squad } from './sweden/1974';
import { sweden1978Squad } from './sweden/1978';
import { sweden1990Squad } from './sweden/1990';
import { sweden1994Squad } from './sweden/1994';
import { sweden2002Squad } from './sweden/2002';
import { sweden2006Squad } from './sweden/2006';
import { sweden2018Squad } from './sweden/2018';
import { switzerland1954Squad } from './switzerland/1954';
import { switzerland1962Squad } from './switzerland/1962';
import { switzerland1966Squad } from './switzerland/1966';
import { switzerland1994Squad } from './switzerland/1994';
import { switzerland2006Squad } from './switzerland/2006';
import { switzerland2010Squad } from './switzerland/2010';
import { switzerland2014Squad } from './switzerland/2014';
import { switzerland2018Squad } from './switzerland/2018';
import { switzerland2022Squad } from './switzerland/2022';
import { turkey1954Squad } from './turkey/1954';
import { turkey2002Squad } from './turkey/2002';
import { uruguay1954Squad } from './uruguay/1954';
import { uruguay1962Squad } from './uruguay/1962';
import { uruguay1966Squad } from './uruguay/1966';
import { uruguay1970Squad } from './uruguay/1970';
import { uruguay1974Squad } from './uruguay/1974';
import { uruguay1986Squad } from './uruguay/1986';
import { uruguay1990Squad } from './uruguay/1990';
import { uruguay2002Squad } from './uruguay/2002';
import { uruguay2010Squad } from './uruguay/2010';
import { uruguay2014Squad } from './uruguay/2014';
import { uruguay2018Squad } from './uruguay/2018';
import { uruguay2022Squad } from './uruguay/2022';
import { usa1990Squad } from './usa/1990';
import { usa1994Squad } from './usa/1994';
import { usa1998Squad } from './usa/1998';
import { usa2002Squad } from './usa/2002';
import { usa2006Squad } from './usa/2006';
import { usa2010Squad } from './usa/2010';
import { usa2014Squad } from './usa/2014';
import { usa2022Squad } from './usa/2022';

export const officialSquads: OfficialSquad[] = [
  argentina1958Squad,
  argentina1962Squad,
  argentina1966Squad,
  argentina1974Squad,
  argentina1978Squad,
  argentina1982Squad,
  argentina1986Squad,
  argentina1990Squad,
  argentina1994Squad,
  argentina1998Squad,
  argentina2002Squad,
  argentina2006Squad,
  argentina2010Squad,
  argentina2014Squad,
  argentina2018Squad,
  argentina2022Squad,
  belgium1954Squad,
  belgium1970Squad,
  belgium1982Squad,
  belgium1986Squad,
  belgium1990Squad,
  belgium1994Squad,
  belgium1998Squad,
  belgium2002Squad,
  belgium2014Squad,
  belgium2018Squad,
  belgium2022Squad,
  brazil1954Squad,
  brazil1958Squad,
  brazil1962Squad,
  brazil1966Squad,
  brazil1970Squad,
  brazil1974Squad,
  brazil1978Squad,
  brazil1982Squad,
  brazil1986Squad,
  brazil1990Squad,
  brazil1994Squad,
  brazil1998Squad,
  brazil2002Squad,
  brazil2006Squad,
  brazil2010Squad,
  brazil2014Squad,
  brazil2018Squad,
  brazil2022Squad,
  cameroon1982Squad,
  cameroon1990Squad,
  cameroon1994Squad,
  cameroon1998Squad,
  cameroon2002Squad,
  cameroon2010Squad,
  cameroon2014Squad,
  cameroon2022Squad,
  chile1962Squad,
  chile1966Squad,
  chile1974Squad,
  chile1982Squad,
  chile1998Squad,
  chile2010Squad,
  chile2014Squad,
  colombia1962Squad,
  colombia1990Squad,
  colombia1994Squad,
  colombia1998Squad,
  colombia2014Squad,
  colombia2018Squad,
  croatia1998Squad,
  croatia2002Squad,
  croatia2006Squad,
  croatia2014Squad,
  croatia2018Squad,
  croatia2022Squad,
  denmark1986Squad,
  denmark1998Squad,
  denmark2002Squad,
  denmark2010Squad,
  denmark2018Squad,
  denmark2022Squad,
  england1954Squad,
  england1958Squad,
  england1962Squad,
  england1966Squad,
  england1970Squad,
  england1982Squad,
  england1986Squad,
  england1990Squad,
  england1998Squad,
  england2002Squad,
  england2006Squad,
  england2010Squad,
  england2014Squad,
  england2018Squad,
  england2022Squad,
  france1954Squad,
  france1958Squad,
  france1966Squad,
  france1978Squad,
  france1982Squad,
  france1986Squad,
  france1998Squad,
  france2002Squad,
  france2006Squad,
  france2010Squad,
  france2014Squad,
  france2018Squad,
  france2022Squad,
  germany1954Squad,
  germany1958Squad,
  germany1962Squad,
  germany1966Squad,
  germany1970Squad,
  germany1974Squad,
  germany1978Squad,
  germany1982Squad,
  germany1986Squad,
  germany1990Squad,
  germany1994Squad,
  germany1998Squad,
  germany2002Squad,
  germany2006Squad,
  germany2010Squad,
  germany2014Squad,
  germany2018Squad,
  germany2022Squad,
  italy1954Squad,
  italy1962Squad,
  italy1966Squad,
  italy1970Squad,
  italy1974Squad,
  italy1978Squad,
  italy1982Squad,
  italy1986Squad,
  italy1990Squad,
  italy1994Squad,
  italy1998Squad,
  italy2002Squad,
  italy2006Squad,
  italy2010Squad,
  italy2014Squad,
  japan1998Squad,
  japan2002Squad,
  japan2006Squad,
  japan2010Squad,
  japan2014Squad,
  japan2018Squad,
  japan2022Squad,
  mexico1954Squad,
  mexico1958Squad,
  mexico1962Squad,
  mexico1966Squad,
  mexico1970Squad,
  mexico1978Squad,
  mexico1986Squad,
  mexico1994Squad,
  mexico1998Squad,
  mexico2002Squad,
  mexico2006Squad,
  mexico2010Squad,
  mexico2014Squad,
  mexico2018Squad,
  mexico2022Squad,
  morocco1970Squad,
  morocco1986Squad,
  morocco1994Squad,
  morocco1998Squad,
  morocco2018Squad,
  morocco2022Squad,
  netherlands1974Squad,
  netherlands1978Squad,
  netherlands1990Squad,
  netherlands1994Squad,
  netherlands1998Squad,
  netherlands2006Squad,
  netherlands2010Squad,
  netherlands2014Squad,
  netherlands2022Squad,
  nigeria1994Squad,
  nigeria1998Squad,
  nigeria2002Squad,
  nigeria2010Squad,
  nigeria2014Squad,
  nigeria2018Squad,
  portugal1966Squad,
  portugal1986Squad,
  portugal2002Squad,
  portugal2006Squad,
  portugal2010Squad,
  portugal2014Squad,
  portugal2018Squad,
  portugal2022Squad,
  senegal2002Squad,
  senegal2018Squad,
  senegal2022Squad,
  southKorea1954Squad,
  southKorea1986Squad,
  southKorea1990Squad,
  southKorea1994Squad,
  southKorea1998Squad,
  southKorea2002Squad,
  southKorea2006Squad,
  southKorea2010Squad,
  southKorea2014Squad,
  southKorea2018Squad,
  southKorea2022Squad,
  spain1962Squad,
  spain1966Squad,
  spain1978Squad,
  spain1982Squad,
  spain1986Squad,
  spain1990Squad,
  spain1994Squad,
  spain1998Squad,
  spain2002Squad,
  spain2006Squad,
  spain2010Squad,
  spain2014Squad,
  spain2018Squad,
  spain2022Squad,
  sweden1958Squad,
  sweden1970Squad,
  sweden1974Squad,
  sweden1978Squad,
  sweden1990Squad,
  sweden1994Squad,
  sweden2002Squad,
  sweden2006Squad,
  sweden2018Squad,
  switzerland1954Squad,
  switzerland1962Squad,
  switzerland1966Squad,
  switzerland1994Squad,
  switzerland2006Squad,
  switzerland2010Squad,
  switzerland2014Squad,
  switzerland2018Squad,
  switzerland2022Squad,
  turkey1954Squad,
  turkey2002Squad,
  uruguay1954Squad,
  uruguay1962Squad,
  uruguay1966Squad,
  uruguay1970Squad,
  uruguay1974Squad,
  uruguay1986Squad,
  uruguay1990Squad,
  uruguay2002Squad,
  uruguay2010Squad,
  uruguay2014Squad,
  uruguay2018Squad,
  uruguay2022Squad,
  usa1990Squad,
  usa1994Squad,
  usa1998Squad,
  usa2002Squad,
  usa2006Squad,
  usa2010Squad,
  usa2014Squad,
  usa2022Squad
];

const officialSquadsByKey = new Map(
  officialSquads.map(squad => [squadKey(squad.teamId, squad.year), squad])
);

function squadKey(teamId: string, year: number) {
  return `${teamId}:${year}`;
}

function ratingFor(player: OfficialSquadPlayer) {
  if (player.rating) return player.rating;

  switch (player.positionGroup) {
    case 'GK':
      return 78;
    case 'DEF':
      return 79;
    case 'MID':
      return 80;
    case 'ATT':
      return 81;
  }
}

function slugifyName(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

export function getOfficialSquad(teamId: string, year: number) {
  return officialSquadsByKey.get(squadKey(teamId, year));
}

export function officialSquadToPlayers(squad: OfficialSquad): Player[] {
  return squad.players
    .filter(player => player.status !== 'withdrawn')
    .map(player => {
      const rating = ratingFor(player);
      return {
        id: `official_${squad.teamId}_${squad.year}_${slugifyName(player.name)}`,
        name: player.name,
        country: squad.teamId,
        position: player.position,
        positionGroup: player.positionGroup,
        rating,
        worldCups: [squad.year],
        era: `${squad.year} Official Squad`,
        bio: `${player.name} was part of ${squad.teamId.toUpperCase()}'s verified ${squad.year} World Cup squad${player.club ? ` while playing for ${player.club}` : ``}.`,
        legendary: rating >= 88,
        wcStats: {
          goals: player.positionGroup === 'ATT' ? Math.max(1, Math.floor((rating - 78) / 4)) : 0,
          assists: player.positionGroup === 'MID' || player.positionGroup === 'ATT' ? Math.max(0, Math.floor((rating - 78) / 5)) : 0,
          matches: 3,
          passAccuracy: player.positionGroup === 'MID' ? 88 : player.positionGroup === 'DEF' ? 84 : 78,
          xG: player.positionGroup === 'ATT' ? 1.2 : 0.2
        }
      };
    });
}
