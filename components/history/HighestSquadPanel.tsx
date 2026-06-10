'use client';

import React from 'react';
import { GameRecord } from '@/types';

interface HighestSquadPanelProps {
  record: GameRecord | null;
}

export default function HighestSquadPanel({ record }: HighestSquadPanelProps) {
  return (
    <div className="md:col-span-2 bg-[#0d0e12] border border-zinc-900 rounded-2xl p-5 flex flex-col justify-between">
      <div>
        <span className="text-[9px] uppercase font-mono tracking-widest text-[#e8ff3b] block mb-1">
          👑 COVETED HIGHEST-RATED SQUAD
        </span>
        <h2 className="font-display font-black text-sm text-zinc-200 uppercase tracking-tight">
          {record ? (
            <>{record.teamFlag} {record.teamName} ({record.editionYear}) — {record.teamRating} OVR</>
          ) : (
            'No Peak Squad Recorded Yet'
          )}
        </h2>

        {record && record.squadPlayers && record.squadPlayers.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3.5 max-h-[140px] overflow-y-auto pr-1">
            {record.squadPlayers.slice(0, 11).map((p, idx) => (
              <div key={idx} className="bg-zinc-900/30 border border-zinc-900 p-1.5 rounded-lg flex items-center justify-between font-mono text-[10px]">
                <span className="text-zinc-400 truncate max-w-[100px]" title={p.name}>
                  {p.name}
                </span>
                <span className="text-[#e8ff3b] font-bold text-[9px]">{p.rating}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-zinc-500 leading-relaxed mt-4">
            Complete drafting sequences and win the tournament simulation campaigns to register your dream rosters into the peak squad showcase block!
          </p>
        )}
      </div>

      {record && (
        <div className="flex gap-4 mt-4 pt-3 border-t border-zinc-900 font-mono text-[9px] text-zinc-500">
          <span>TACTIC: <strong className="text-zinc-300 font-bold uppercase">{record.tacticalStyle || 'Tiki-Taka'}</strong></span>
          <span>FORMATION: <strong className="text-zinc-300 font-bold uppercase">{record.formation}</strong></span>
          <span>CLEAN SHEETS: <strong className="text-emerald-400 font-bold uppercase">{record.cleanSheets ?? 'N/A'}</strong></span>
        </div>
      )}
    </div>
  );
}
