export interface Player {
  id: string;
  name: string;
  country: string; // matches NationalTeam.id
  position: 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'CF' | 'ST';
  positionGroup: 'GK' | 'DEF' | 'MID' | 'ATT';
  rating: number;
  worldCups: number[];
  era: string;
  bio: string;
  legendary?: boolean;
  wcStats: {
    goals: number;
    assists: number;
    matches: number;
    passAccuracy: number;
    xG: number;
  };
}

export interface DbPlayerTemplate {
  name: string;
  position: 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'CF' | 'ST';
  gp: 'GK' | 'DEF' | 'MID' | 'ATT';
  rating: number;
  years?: number[];
  bio?: string;
}

export interface OfficialSquadPlayer {
  squadNo: number;
  name: string;
  position: Player['position'];
  positionGroup: Player['positionGroup'];
  club?: string;
  captain?: boolean;
  rating?: number;
  status?: 'active' | 'withdrawn' | 'replacement';
  replaced?: string;
  notes?: string;
}

export interface OfficialSquad {
  teamId: string;
  year: number;
  manager: string;
  source: string;
  verifiedAt: string;
  notes?: string;
  players: OfficialSquadPlayer[];
}

export interface NationalTeam {
  id: string;
  name: string;
  flag: string; // Emoji
  confederation: string;
  worldCupAppearances: number[];
  color: string; // Main squad color hex (e.g., "#FDE047")
  strength: number; // 1-10 multiplier for simulation
}

export interface WorldCupEdition {
  year: number;
  host: string;
  champion: string;
  topScorer: string;
}

export interface SquadSlot {
  id: string; // e.g., "slot_1"
  role: 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'CF' | 'ST';
  positionGroup: 'GK' | 'DEF' | 'MID' | 'ATT';
  x: number; // Pitch layout percentage coordinate from left (0-100)
  y: number; // Pitch layout percentage coordinate from top (0-100)
}

export interface Formation {
  id: string; // e.g., "4-3-3"
  name: string;
  slots: SquadSlot[];
}

export interface PlayerMatchStats {
  playerId: string;
  playerName: string;
  goals: number;
  assists: number;
  xG: number;
  shots?: number;
  shotsOnTarget?: number;
  keyPasses?: number;
  passAccuracy: number;
  interceptions: number;
  tackles?: number;
  saves?: number;
  goalsPrevented?: number;
  rating: number;
}

export interface MatchEvent {
  id: string;
  minute: number;
  team: 'user' | 'opponent' | 'system';
  type: 'kickoff' | 'chance' | 'shot' | 'save' | 'block' | 'goal' | 'card' | 'penalty' | 'full-time';
  playerId?: string;
  playerName?: string;
  assistPlayerId?: string;
  assistPlayerName?: string;
  opponentName?: string;
  description: string;
  xG?: number;
  score?: string;
  outcome?: 'goal' | 'saved' | 'blocked' | 'missed' | 'won' | 'lost';
}

export interface MatchResult {
  round: 'Group Match 1' | 'Group Match 2' | 'Group Match 3' | 'Round of 16' | 'Quarter-Finals' | 'Semi-Finals' | 'Final';
  opponentName: string;
  opponentFlag: string;
  opponentStrength: number;
  teamGoals: number;
  opponentGoals: number;
  teamXG?: number;
  opponentXG?: number;
  possession?: number;
  won: boolean;
  playerStats: PlayerMatchStats[];
  motm: string; // Backward-compatible Man of the Match name
  motmPlayerId?: string;
  motmPlayerName?: string;
  events?: MatchEvent[];
}

export interface PlayerSeasonStats {
  playerId: string;
  goals: number;
  assists: number;
  xG: number;
  avgRating: number;
  passAccuracy: number;
  motmCount: number; // Number of Man of the Match awards
}

export interface GroupStanding {
  teamId: string;
  teamName: string;
  teamFlag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface GroupMatch {
  round: number; // 1, 2, 3
  homeTeamId: string;
  homeTeamName: string;
  homeTeamFlag: string;
  awayTeamId: string;
  awayTeamName: string;
  awayTeamFlag: string;
  homeGoals: number;
  awayGoals: number;
}

export interface GroupData {
  name: string; // e.g. "Group A", "Group B"
  standings: GroupStanding[];
  matches: GroupMatch[];
}

export interface TournamentPlayerStat {
  playerId: string;
  playerName: string;
  playerRating: number;
  position: string;
  teamId: string;
  teamName: string;
  teamFlag: string;
  goals: number;
  assists: number;
}

export interface SimulationResult {
  won: boolean; // Did they win the final?
  finalScore: string; // e.g., "3-2" or "1-2" depending on where they exited
  exitRound: 'Group Stage' | 'Round of 16' | 'Quarter-Finals' | 'Semi-Finals' | 'Final' | 'Champion';
  matches: MatchResult[];
  playerSeasonStats: PlayerSeasonStats[];
  mvp: Player; // Overall tournament MVP (best avg rating)
  teamRating: number; // Squad avg rating
  topScorer: {
    player: Player;
    goals: number;
  };
  teamStats: {
    totalXG: number;
    avgPossession: number;
    avgPassAccuracy: number;
    cleanSheets: number;
  };
  groups?: GroupData[]; // Added for group stage
  tournamentStats?: {
    topScorers: TournamentPlayerStat[];
    topAssisters: TournamentPlayerStat[];
  };
}

export interface GameRecord {
  id: string; // timestamp
  teamId: string;
  teamName: string;
  teamFlag: string;
  editionYear: number;
  formation: string;
  score: string;
  won: boolean;
  mvpName: string;
  teamRating: number;
  playedAt: string; // ISO connection date
  tacticalStyle?: string;
  squadPlayers?: Array<{ name: string; rating: number; position: string; country: string }>;
  cleanSheets?: number;
}

export interface GameState {
  phase: 'ROLL' | 'BUILD' | 'SIMULATE' | 'RESULT';
  selectedTeam: NationalTeam | null;
  selectedYear: number | null;
  formation: string;
  squad: { [slotId: string]: Player | null };
  simulationResult: SimulationResult | null;
  tacticalStyle?: string;
}

/** Computed chemistry breakdown returned by the BuildPhase useMemo. */
export interface ChemistryBreakdown {
  chemistry: number;
  preferredPositions: number;
  countryCore: { team: NationalTeam; count: number } | null;
  eraCore: { year: string; count: number } | null;
  activePartnerships: Array<{ name: string; desc: string }>;
  details?: {
    positionBonus: number;
    countryLinkBonus: number;
    eraLinkBonus: number;
    basePoints: number;
    partnershipBonus: number;
  };
}

/** Valid sort keys for the ResultPhase squad table. */
export type SortKey = 'rating' | 'goals' | 'assists' | 'xG';
