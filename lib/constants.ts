/**
 * Shared game constants — single source of truth.
 * Import from here instead of duplicating across engine.ts / BuildPhase.tsx.
 */

export interface Partnership {
  p1: string;
  p2: string;
  name: string;
  desc: string;
}

export const PARTNERSHIPS: Partnership[] = [
  { p1: 'Kroos',       p2: 'Müller',          name: 'Alman Çeliği 🔥',         desc: 'Toni Kroos & Thomas Müller' },
  { p1: 'Platini',     p2: 'Tigana',           name: 'Le Carré Magique 🔥',     desc: 'Michel Platini & Jean Tigana' },
  { p1: 'Zidane',      p2: 'Henry',            name: 'Fransız Zarafeti 🔥',     desc: 'Zinedine Zidane & Thierry Henry' },
  { p1: 'Pelé',        p2: 'Garrincha',        name: 'Yıkılmaz Seleção 🔥',     desc: 'Pelé & Garrincha' },
  { p1: 'Maradona',    p2: 'Careca',           name: 'Efsanevi Napoli Bağı 🔥', desc: 'Diego Maradona & Careca' },
  { p1: 'Ronaldinho',  p2: 'Ronaldo Nazário',  name: 'Samba Sihirbazları 🔥',   desc: 'Ronaldinho & Ronaldo' },
  { p1: 'Hakan Şükür', p2: 'İlhan Mansız',    name: '2002 Boğaz Fırtınası 🔥', desc: 'Hakan Şükür & İlhan Mansız' },
  { p1: 'Nesta',       p2: 'Maldini',          name: 'Milano Surları 🔥',        desc: 'Alessandro Nesta & Paolo Maldini' },
  { p1: 'Xavi',        p2: 'Iniesta',          name: 'La Masia Metronomu 🔥',   desc: 'Xavi & Andrés Iniesta' },
  { p1: 'Messi',       p2: 'Di María',         name: 'Tangonun Efendileri 🔥',  desc: 'Lionel Messi & Ángel Di María' },
];

/** Maximum number of game records to persist in localStorage. */
export const MAX_HISTORY_RECORDS = 50;

/** Tactical style definitions — shared between BuildPhase and engine. */
export const TACTICAL_STYLES = [
  { id: 'tiki-taka',   name: 'Tiki-Taka',     icon: '🪄', desc: 'Short passing & possession control. Midfielder ratings match bonus, +8% average possession.' },
  { id: 'gegenpress',  name: 'Gegenpressing',  icon: '⚡', desc: 'Intense high-line pressing. Attacker ratings match bonus, extra team interception cycles.' },
  { id: 'catenaccio',  name: 'Catenaccio',     icon: '🛡️', desc: 'Deep defensive lock. Defender & GK ratings match bonus, extra clean sheets chance.' },
  { id: 'joga-bonito', name: 'Joga Bonito',    icon: '🎨', desc: 'Attacking flair & dribbling. Winger/CF ratings match bonus, higher goal scores but defensive compromise.' },
  { id: 'route-one',   name: 'Route One',      icon: '🚀', desc: 'Long-ball direct strategy. Target striker ratings match bonus, physical headers priority.' },
] as const;

export type TacticalStyleId = typeof TACTICAL_STYLES[number]['id'];
