'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Player, Formation, NationalTeam } from '@/types';

interface PitchCanvasProps {
  squad: { [slotId: string]: Player | null };
  activeFormation: Formation;
  synergyLines: Array<{
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    type: 'gold' | 'double-emerald' | 'emerald' | 'cyan';
    label: string;
  }>;
  selectedPlayerForAssignment: Player | null;
  handleSlotClick: (slotId: string, player: Player | null, gp: 'GK' | 'DEF' | 'MID' | 'ATT') => void;
  getGroupPill: (gp: string) => string;
  teams: NationalTeam[];
}

export default function PitchCanvas({
  squad,
  activeFormation,
  synergyLines,
  selectedPlayerForAssignment,
  handleSlotClick,
  getGroupPill,
  teams,
}: PitchCanvasProps) {
  return (
    <div className="aspect-[3/4] max-w-[540px] w-full mx-auto relative rounded-3xl overflow-hidden pitch-striped border border-zinc-800/60 p-4 shrink-0 shadow-inner">
      {/* SVG Pitch Markings Layer */}
      <div className="absolute inset-2 border-2 pitch-line opacity-35 rounded-2xl pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Center line */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
          {/* Center circle */}
          <circle cx="50" cy="50" r="14" fill="none" stroke="white" strokeWidth="0.5" />
          {/* Center dot */}
          <circle cx="50" cy="50" r="1.2" fill="white" />
          {/* Penalty Area Top */}
          <rect x="20" y="0" width="60" height="15" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="35" y="0" width="30" height="5" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M 37.5 15 A 12 12 0 0 0 62.5 15" fill="none" stroke="white" strokeWidth="0.5" />
          
          {/* Penalty Area Bottom */}
          <rect x="20" y="85" width="60" height="15" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="35" y="95" width="30" height="5" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M 37.5 85 A 12 12 0 0 1 62.5 85" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Visual Chemistry / Synergy Links SVG Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-5">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <style>{`
            @keyframes linePulseAnim {
              0% { stroke-opacity: 0.4; }
              50% { stroke-opacity: 0.95; }
              100% { stroke-opacity: 0.4; }
            }
            @keyframes goldDashAnim {
              to {
                stroke-dashoffset: -20;
              }
            }
            .chemistry-path-gold {
              stroke: #ffbd15;
              stroke-width: 1.6;
              stroke-linecap: round;
              stroke-dasharray: 4, 3;
              animation: goldDashAnim 2.5s linear infinite, linePulseAnim 1.8s ease-in-out infinite;
              filter: drop-shadow(0px 0px 4px rgba(245, 158, 11, 0.95));
            }
            .chemistry-path-double {
              stroke: #10b981;
              stroke-width: 1.5;
              stroke-linecap: round;
              stroke-dasharray: 3, 3;
              animation: goldDashAnim 3.5s linear infinite, linePulseAnim 2s ease-in-out infinite;
              filter: drop-shadow(0px 0px 3px rgba(16, 185, 129, 0.9));
            }
            .chemistry-path-emerald {
              stroke: #10b981;
              stroke-width: 1.2;
              stroke-linecap: round;
              animation: linePulseAnim 2s ease-in-out infinite;
              filter: drop-shadow(0px 0px 2px rgba(16, 185, 129, 0.75));
            }
            .chemistry-path-cyan {
              stroke: #06b6d4;
              stroke-width: 1.2;
              stroke-linecap: round;
              animation: linePulseAnim 2s ease-in-out infinite;
              filter: drop-shadow(0px 0px 2px rgba(6, 182, 212, 0.75));
            }
          `}</style>
          <g>
            {synergyLines.map((line) => {
              let className = 'chemistry-path-emerald';
              if (line.type === 'gold') className = 'chemistry-path-gold';
              else if (line.type === 'double-emerald') className = 'chemistry-path-double';
              else if (line.type === 'cyan') className = 'chemistry-path-cyan';

              return (
                <motion.line
                  key={line.id}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  className={className}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              );
            })}
          </g>
        </svg>

        {/* Centered chemistry label pills */}
        {synergyLines.map((line) => {
          const midX = (line.x1 + line.x2) / 2;
          const midY = (line.y1 + line.y2) / 2;
          return (
            <div
              key={`pill-${line.id}`}
              style={{ left: `${midX}%`, top: `${midY}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 scale-[0.8] sm:scale-95 transition-transform"
            >
              <span className={`text-[7.5px] tracking-wide font-mono font-bold px-1.5 py-0.5 rounded shadow-[0_2px_4px_rgba(0,0,0,0.5)] border whitespace-nowrap uppercase select-none ${
                line.type === 'gold'
                  ? 'bg-[#1e1403] text-amber-400 border-amber-500/40'
                  : line.type === 'double-emerald'
                  ? 'bg-[#031c11] text-emerald-300 border-emerald-500/40'
                  : line.type === 'emerald'
                  ? 'bg-[#03140d] text-emerald-400 border-emerald-500/20'
                  : 'bg-[#02181d] text-cyan-400 border-cyan-500/20'
              }`}>
                {line.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Core Slot Placements */}
      {activeFormation.slots.map((slot) => {
        const assignedPlayer = squad[slot.id] || null;
        const hasPlayer = assignedPlayer !== null;
        const playerTeam = hasPlayer ? teams.find(t => t.id === assignedPlayer.country) : null;
        
        // Dynamic check for compatible assignment slot
        const isCompatible = selectedPlayerForAssignment !== null && 
                             selectedPlayerForAssignment.positionGroup === slot.positionGroup && 
                             !hasPlayer;
        
        return (
          <div
            key={slot.id}
            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
            className="absolute -translate-x-12 -translate-y-12 w-24 h-24 flex flex-col items-center justify-center transition-all duration-300 z-10"
          >
            <motion.div
              whileHover={{ scale: isCompatible ? 1.12 : 1.05 }}
              whileTap={{ scale: 0.96 }}
              animate={isCompatible ? { scale: [1, 1.06, 1] } : {}}
              transition={isCompatible ? { repeat: Infinity, duration: 2 } : {}}
              className="cursor-pointer flex flex-col items-center"
              onClick={() => handleSlotClick(slot.id, assignedPlayer, slot.positionGroup)}
            >
              {/* Circle Card representation */}
              <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center relative border-2 ${
                hasPlayer 
                  ? 'bg-zinc-950 border-zinc-200 hover:border-[#e8ff3b] text-white shadow-xl glow-lime' 
                  : isCompatible
                  ? 'bg-emerald-950/45 border-emerald-400 border-solid text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.7)] animate-pulse'
                  : 'bg-zinc-900/90 border-dashed border-zinc-700 hover:border-[#e8ff3b] text-zinc-500 shadow-md'
              } transition-all duration-300`}>
                
                {/* Rating pill or Role indicator badge */}
                {hasPlayer ? (
                  <div className={`absolute -top-1.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-mono font-bold border ${getGroupPill(assignedPlayer.positionGroup)} border-black`}>
                    {assignedPlayer.rating}
                  </div>
                ) : (
                  <span className={`text-[10px] uppercase font-mono font-bold px-1.5 rounded border transition-colors ${
                    isCompatible
                      ? 'bg-emerald-555 text-emerald-100 border-emerald-500'
                      : 'bg-zinc-950/80 text-zinc-500 border-zinc-800'
                  }`}>
                    {slot.role}
                  </span>
                )}
                
                {/* Animated selector pointer background for matching cards */}
                {isCompatible && (
                  <span className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-25" />
                )}

                {/* Flag / Center visual element */}
                <span className="text-xl leading-none mt-1 select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {hasPlayer ? (playerTeam?.flag || '👤') : isCompatible ? '🎯' : '➕'}
                </span>


              </div>

              {/* Short Player Display Name underneath */}
              <div className="mt-1.5 w-24 text-center">
                <span className={`text-[10px] font-mono leading-none tracking-tight block truncate uppercase select-none px-1 rounded transition-colors ${
                  hasPlayer 
                    ? 'font-bold text-white bg-zinc-950/90 border border-zinc-800 py-0.5' 
                    : isCompatible
                    ? 'font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 py-0.5'
                    : 'font-medium text-zinc-400 py-0.5'
                }`}>
                  {hasPlayer ? assignedPlayer.name.split(' ').pop() : slot.role}
                </span>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
