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
  passAccuracy: number;
  interceptions: number;
  rating: number;
}

export interface MatchResult {
  round: 'Round of 16' | 'Quarter-Finals' | 'Semi-Finals' | 'Final';
  opponentName: string;
  opponentFlag: string;
  opponentStrength: number;
  teamGoals: number;
  opponentGoals: number;
  won: boolean;
  playerStats: PlayerMatchStats[];
  motm: string; // Player ID of Man of the Match
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

export interface SimulationResult {
  won: boolean; // Did they win the final?
  finalScore: string; // e.g., "3-2" or "1-2" depending on where they exited
  exitRound: 'Round of 16' | 'Quarter-Finals' | 'Semi-Finals' | 'Final' | 'Champion';
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
