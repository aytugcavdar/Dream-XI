'use client';

import React from 'react';
import { Player, NationalTeam, ChemistryBreakdown } from '@/types';
import { Trash2, Trophy, Sparkles } from 'lucide-react';

interface SidebarSquadCompleteProps {
  averageRating: number;
  chemistryBreakdown: ChemistryBreakdown;
  squadPlayers: Player[];
  onSimulate: () => void;
  onClearSquad: () => void;
}

export default function SidebarSquadComplete({
  averageRating,
  chemistryBreakdown,
  squadPlayers,
  onSimulate,
  onClearSquad,
}: SidebarSquadCompleteProps) {
  return (
    <div className="bg-zinc-950 border-2 border-emerald-500/30 p-5 rounded-2xl h-full flex flex-col justify-between shadow-[0_0_20px_rgba(16,185,129,0.15)] relative overflow-hidden">
      {/* Decorative watermark */}
      <span className="absolute -top-10 -right-10 text-8xl opacity-10 rotate-12 select-none pointer-events-none">🏆</span>

      <div className="space-y-4 font-sans">
        <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
          <Sparkles className="w-5 h-5 text-[#e8ff3b] animate-spin" />
          <div>
            <h3 className="font-display font-black text-sm uppercase text-white tracking-wider leading-none">
              All-Star Eleven Ready
            </h3>
            <span className="text-[10px] font-mono text-zinc-400 mt-1 block">Your squad is primed for World Cup simulation</span>
          </div>
        </div>

        {/* Summary scorecard */}
        <div className="p-3 bg-zinc-900/60 border border-zinc-900 rounded-xl space-y-2.5 font-mono">
          <div className="flex justify-between items-center text-xs text-zinc-400">
            <span>AVERAGE RATING</span>
            <strong className="text-white text-sm font-display font-black">{averageRating} OVR</strong>
          </div>
          <div className="flex justify-between items-center text-xs text-zinc-400">
            <span>TEAM CHEMISTRY</span>
            <strong className="text-emerald-400 text-sm font-display font-black">{chemistryBreakdown.chemistry}%</strong>
          </div>
          <div className="flex justify-between items-center text-xs text-zinc-400">
            <span>PREFERRED ROLES</span>
            <strong className="text-zinc-200 text-sm font-mono font-bold">
              {chemistryBreakdown.preferredPositions} / 11
            </strong>
          </div>
        </div>

        {/* Chemistry feedback */}
        <div className="p-2.5 text-[11px] font-mono rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-emerald-300 leading-relaxed">
          {chemistryBreakdown.chemistry >= 80 ? (
            <span>🔥 <strong>Outstanding Chemistry!</strong> Your icons share profound country & era bonds. This collection is destined to lift the World Cup!</span>
          ) : chemistryBreakdown.chemistry >= 50 ? (
            <span>⚡ <strong>Solid Cohesion!</strong> Strong regional lines of communication will push this tactical structure deep into the knockout brackets.</span>
          ) : (
            <span>⚙️ <strong>Decent Setup!</strong> Diverse generational talents are ready to compete, but may struggle against high-chemistry giants.</span>
          )}
        </div>

        {/* Active legendary partnerships */}
        {chemistryBreakdown.activePartnerships.length > 0 && (
          <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#e8ff3b] uppercase tracking-widest">
              <span className="animate-pulse">🤝</span>
              <span>Efsanevi Ortaklık ({chemistryBreakdown.activePartnerships.length})</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {chemistryBreakdown.activePartnerships.map((partnership, idx) => (
                <div key={idx} className="bg-amber-950/20 border border-[#e8ff3b]/20 p-2 rounded-lg flex flex-col font-mono text-[10px]">
                  <strong className="text-amber-400 font-bold uppercase tracking-tight">{partnership.name}</strong>
                  <span className="text-[9px] text-zinc-400 mt-0.5">{partnership.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Starting lineup list */}
        <div>
          <h4 className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Selected Lineup</h4>
          <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
            {squadPlayers.map((player) => (
              <div key={player.id} className="p-1.5 px-2 bg-zinc-900/30 border border-zinc-100/10 rounded-lg flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-1.5 truncate max-w-[75%]">
                  <span className="text-xs bg-zinc-950 border border-zinc-800 px-1 rounded text-zinc-400 font-bold">{player.position}</span>
                  <span className="text-zinc-200 truncate font-sans font-semibold">{player.name}</span>
                </div>
                <span className="text-[#e8ff3b] font-bold">{player.rating}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-900 space-y-2 text-center">
        <button
          onClick={onSimulate}
          className="w-full py-3 bg-[#e8ff3b] hover:bg-[#d6ec2b] text-black font-display font-black text-xs tracking-widest uppercase rounded-xl shadow-[0_0_15px_rgba(232,255,59,0.25)] hover:shadow-[#e8ff3b]/40 cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <Trophy className="w-4 h-4 text-black animate-bounce" />
          <span>LAUNCH CUP SIMULATOR</span>
        </button>

        <button
          onClick={onClearSquad}
          className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 font-mono text-[10px] tracking-wider uppercase rounded-lg border border-zinc-800 transition-all flex items-center justify-center gap-1.5"
        >
          <Trash2 className="w-3 h-3" />
          <span>Disband Team & Restart Draft</span>
        </button>
      </div>
    </div>
  );
}
