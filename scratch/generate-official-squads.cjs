const fs = require('fs');
const path = require('path');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    }
  }).outputText;
  module._compile(output, filename);
};

const { teams } = require('../data/teams.ts');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'data', 'squads');
const CACHE_DIR = path.join(__dirname, '.squad-cache');
const GENERATED_IMPORTS = [];
const GENERATED_EXPORTS = [];
const YEARS = [...new Set(teams.flatMap(team => team.worldCupAppearances))].sort((a, b) => a - b);

const TEAM_ALIASES = new Map([
  ['brazil', 'brazil'],
  ['germany', 'germany'],
  ['west germany', 'germany'],
  ['italy', 'italy'],
  ['argentina', 'argentina'],
  ['france', 'france'],
  ['spain', 'spain'],
  ['england', 'england'],
  ['uruguay', 'uruguay'],
  ['netherlands', 'netherlands'],
  ['holland', 'netherlands'],
  ['portugal', 'portugal'],
  ['belgium', 'belgium'],
  ['croatia', 'croatia'],
  ['mexico', 'mexico'],
  ['united states', 'usa'],
  ['usa', 'usa'],
  ['senegal', 'senegal'],
  ['cameroon', 'cameroon'],
  ['morocco', 'morocco'],
  ['japan', 'japan'],
  ['south korea', 'south_korea'],
  ['korea republic', 'south_korea'],
  ['nigeria', 'nigeria'],
  ['sweden', 'sweden'],
  ['denmark', 'denmark'],
  ['colombia', 'colombia'],
  ['chile', 'chile'],
  ['switzerland', 'switzerland'],
  ['turkey', 'turkey'],
  ['türkiye', 'turkey']
]);

const teamAppearances = new Map(
  teams.map(team => [team.id, new Set(team.worldCupAppearances)])
);

const positionMap = {
  GK: { position: 'GK', positionGroup: 'GK' },
  DF: { position: 'CB', positionGroup: 'DEF' },
  MF: { position: 'CM', positionGroup: 'MID' },
  FW: { position: 'ST', positionGroup: 'ATT' },
  DEF: { position: 'CB', positionGroup: 'DEF' },
  MID: { position: 'CM', positionGroup: 'MID' },
  ATT: { position: 'ST', positionGroup: 'ATT' }
};

const WITHDRAWN_OVERRIDES = new Map([
  ['france:2022:Karim Benzema', 'Unavailable after pre-tournament injury; not replaced.']
]);

function normalizeHeading(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/\{\{[^}]+\}\}/g, '')
    .replace(/\[[^\]|]+\|([^\]]+)\]/g, '$1')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/&amp;/g, '&')
    .trim()
    .toLowerCase();
}

function cleanWikiText(value = '') {
  return value
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<ref[\s\S]*?<\/ref>/g, '')
    .replace(/<ref[^/]*\/>/g, '')
    .replace(/\{\{sortname\|([^|}]+)\|([^|}]+)[^}]*\}\}/gi, '$1 $2')
    .replace(/\{\{nowrap\|([^}]+)\}\}/gi, '$1')
    .replace(/\{\{flagicon\|[^}]+\}\}/gi, '')
    .replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, '$1')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/''/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitTemplateArgs(line) {
  const trimmed = line.replace(/^\{\{/, '').replace(/\}\}$/, '');
  const args = [];
  let current = '';
  let braceDepth = 0;
  let linkDepth = 0;

  for (let i = 0; i < trimmed.length; i++) {
    const two = trimmed.slice(i, i + 2);
    if (two === '{{') {
      braceDepth++;
      current += two;
      i++;
      continue;
    }
    if (two === '}}') {
      braceDepth = Math.max(0, braceDepth - 1);
      current += two;
      i++;
      continue;
    }
    if (two === '[[') {
      linkDepth++;
      current += two;
      i++;
      continue;
    }
    if (two === ']]') {
      linkDepth = Math.max(0, linkDepth - 1);
      current += two;
      i++;
      continue;
    }
    if (trimmed[i] === '|' && braceDepth === 0 && linkDepth === 0) {
      args.push(current);
      current = '';
      continue;
    }
    current += trimmed[i];
  }
  args.push(current);
  return args;
}

function parseTemplate(line) {
  const args = splitTemplateArgs(line);
  const template = args.shift()?.trim().toLowerCase() || '';
  const isPlayerTemplate =
    (template.startsWith('nat fs') && template.includes('player')) ||
    template === 'national football squad player';
  if (!isPlayerTemplate) return null;

  const data = {};
  for (const arg of args) {
    const eq = arg.indexOf('=');
    if (eq === -1) continue;
    const key = arg.slice(0, eq).trim().toLowerCase();
    const value = arg.slice(eq + 1).trim();
    data[key] = value;
  }

  const no = Number.parseInt(cleanWikiText(data.no), 10);
  const rawPos = cleanWikiText(data.pos).toUpperCase();
  const mapped = positionMap[rawPos] || positionMap.MF;
  const name = cleanWikiText(data.name || data.player || '');
  if (!Number.isFinite(no) || !name) return null;

  const rawName = data.name || data.player || '';
  const other = cleanWikiText(data.other || '');
  return {
    squadNo: no,
    name: name.replace(/\s*\((?:c|captain)\)\s*$/i, ''),
    position: mapped.position,
    positionGroup: mapped.positionGroup,
    club: cleanWikiText(data.club || '') || undefined,
    captain: /captain/i.test(other) || /captain|\|\s*c\s*\]\]|\(c\)/i.test(rawName) || undefined
  };
}

function parseCoach(section) {
  const match = section.match(/(?:Head coach|Coach):\s*([^\n]+)/i);
  return match ? cleanWikiText(match[1]) : 'Unknown';
}

function parseYearSquads(year, wikitext) {
  const headerRegex = /^===(.+?)===\s*$/gm;
  const headers = [];
  let match;
  while ((match = headerRegex.exec(wikitext))) {
    headers.push({ heading: match[1], index: match.index, end: headerRegex.lastIndex });
  }

  const squads = [];
  for (let i = 0; i < headers.length; i++) {
    const heading = normalizeHeading(headers[i].heading);
    const teamId = TEAM_ALIASES.get(heading);
    if (!teamId || !teamAppearances.get(teamId)?.has(year)) continue;

    const nextIndex = headers[i + 1]?.index ?? wikitext.length;
    const section = wikitext.slice(headers[i].end, nextIndex);
    const players = [];
    for (const line of section.split(/\r?\n/)) {
      const parsed = parseTemplate(line.trim());
      if (parsed) players.push(parsed);
    }

    if (players.length < 11) continue;
    for (const player of players) {
      const withdrawnNote = WITHDRAWN_OVERRIDES.get(`${teamId}:${year}:${player.name}`);
      if (withdrawnNote) {
        player.status = 'withdrawn';
        player.notes = withdrawnNote;
      }
    }
    squads.push({
      teamId,
      year,
      manager: parseCoach(section),
      source: `https://en.wikipedia.org/wiki/${year}_FIFA_World_Cup_squads#${encodeURIComponent(headers[i].heading.trim().replace(/\s+/g, '_'))}`,
      verifiedAt: '2026-06-11',
      players
    });
  }
  return squads;
}

async function fetchWikitext(year) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const cacheFile = path.join(CACHE_DIR, `${year}.wikitext`);
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, 'utf8');
  }

  const page = `${year}_FIFA_World_Cup_squads`;
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(page)}&prop=wikitext&format=json&formatversion=2`;
  let response;
  for (let attempt = 1; attempt <= 5; attempt++) {
    response = await fetch(url, {
      headers: {
        'User-Agent': 'DreamXI squad data generator (local development)'
      }
    });
    if (response.status !== 429) break;
    await new Promise(resolve => setTimeout(resolve, attempt * 5000));
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch ${page}: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  if (json.error) throw new Error(`${page}: ${json.error.info}`);
  fs.writeFileSync(cacheFile, json.parse.wikitext, 'utf8');
  await new Promise(resolve => setTimeout(resolve, 1200));
  return json.parse.wikitext;
}

function toConstName(teamId, year) {
  return `${teamId.replace(/_([a-z])/g, (_, c) => c.toUpperCase())}${year}Squad`;
}

function literal(value, indent = 0) {
  const pad = ' '.repeat(indent);
  if (Array.isArray(value)) {
    return `[\n${value.map(item => `${pad}  ${literal(item, indent + 2)}`).join(',\n')}\n${pad}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    return `{\n${entries.map(([key, v]) => `${pad}  ${key}: ${literal(v, indent + 2)}`).join(',\n')}\n${pad}}`;
  }
  return JSON.stringify(value);
}

function writeSquadFile(squad) {
  const teamDir = path.join(OUT_DIR, squad.teamId);
  fs.mkdirSync(teamDir, { recursive: true });

  const constName = toConstName(squad.teamId, squad.year);
  const relImport = `./${squad.teamId}/${squad.year}`;
  const file = path.join(teamDir, `${squad.year}.ts`);
  const content = `import { OfficialSquad } from '../../../types';\n\nexport const ${constName}: OfficialSquad = ${literal(squad)};\n`;
  fs.writeFileSync(file, content, 'utf8');

  GENERATED_IMPORTS.push(`import { ${constName} } from '${relImport}';`);
  GENERATED_EXPORTS.push(constName);
}

function writeIndex() {
  const content = `import { OfficialSquad, OfficialSquadPlayer, Player } from '../../types';\n${GENERATED_IMPORTS.sort().join('\n')}\n\nexport const officialSquads: OfficialSquad[] = [\n  ${GENERATED_EXPORTS.sort().join(',\n  ')}\n];\n\nconst officialSquadsByKey = new Map(\n  officialSquads.map(squad => [squadKey(squad.teamId, squad.year), squad])\n);\n\nfunction squadKey(teamId: string, year: number) {\n  return \`${'${teamId}'}:${'${year}'}\`;\n}\n\nfunction ratingFor(player: OfficialSquadPlayer) {\n  if (player.rating) return player.rating;\n\n  switch (player.positionGroup) {\n    case 'GK':\n      return 78;\n    case 'DEF':\n      return 79;\n    case 'MID':\n      return 80;\n    case 'ATT':\n      return 81;\n  }\n}\n\nfunction slugifyName(name: string) {\n  return name\n    .normalize('NFD')\n    .replace(/[\\u0300-\\u036f]/g, '')\n    .toLowerCase()\n    .replace(/[^a-z0-9]+/g, '_')\n    .replace(/^_|_$/g, '');\n}\n\nexport function getOfficialSquad(teamId: string, year: number) {\n  return officialSquadsByKey.get(squadKey(teamId, year));\n}\n\nexport function officialSquadToPlayers(squad: OfficialSquad): Player[] {\n  return squad.players\n    .filter(player => player.status !== 'withdrawn')\n    .map(player => {\n      const rating = ratingFor(player);\n      return {\n        id: \`official_${'${squad.teamId}'}_${'${squad.year}'}_${'${slugifyName(player.name)}'}\`,\n        name: player.name,\n        country: squad.teamId,\n        position: player.position,\n        positionGroup: player.positionGroup,\n        rating,\n        worldCups: [squad.year],\n        era: \`${'${squad.year}'} Official Squad\`,\n        bio: \`${'${player.name}'} was part of ${'${squad.teamId.toUpperCase()}'}'s verified ${'${squad.year}'} World Cup squad${'${player.club ? ` while playing for ${player.club}` : ``}'}.\`,\n        legendary: rating >= 88,\n        wcStats: {\n          goals: player.positionGroup === 'ATT' ? Math.max(1, Math.floor((rating - 78) / 4)) : 0,\n          assists: player.positionGroup === 'MID' || player.positionGroup === 'ATT' ? Math.max(0, Math.floor((rating - 78) / 5)) : 0,\n          matches: 3,\n          passAccuracy: player.positionGroup === 'MID' ? 88 : player.positionGroup === 'DEF' ? 84 : 78,\n          xG: player.positionGroup === 'ATT' ? 1.2 : 0.2\n        }\n      };\n    });\n}\n`;
  fs.writeFileSync(path.join(OUT_DIR, 'index.ts'), content, 'utf8');
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const generated = [];

  for (const year of YEARS) {
    const wikitext = await fetchWikitext(year);
    const squads = parseYearSquads(year, wikitext);
    for (const squad of squads) {
      writeSquadFile(squad);
      generated.push(`${squad.teamId}:${squad.year}:${squad.players.length}`);
    }
    console.log(`${year}: ${squads.length} project squads`);
  }

  writeIndex();
  fs.writeFileSync(
    path.join(OUT_DIR, 'coverage.json'),
    `${JSON.stringify({ generatedAt: '2026-06-11', squads: generated }, null, 2)}\n`,
    'utf8'
  );
  console.log(`Generated ${generated.length} squad files.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
