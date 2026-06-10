'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { GameRecord } from '@/types';

interface HistoryRecordCardProps {
  record: GameRecord;
}

export default function HistoryRecordCard({ record }: HistoryRecordCardProps) {
  const formattedDate = new Date(record.playedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      layoutId={record.id}
      className={`p-4 bg-zinc-950 border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
        record.won ? 'border-emerald-500/25' : 'border-zinc-900'
      }`}
    >
      {/* Left: Flag and Team details */}
      <div className="flex items-center gap-4">
        <div className="text-3xl select-none leading-none shrink-0">
          {record.teamFlag}
        </div>
        <div className="min-w-0">
          <div className="flex items-center flex-wrap gap-2">
            <h3 className="font-display font-black text-sm text-zinc-100 uppercase tracking-tight">
              {record.teamName} <span className="text-[#e8ff3b] font-mono">({record.editionYear})</span>
            </h3>
            <span className="text-[10px] font-mono font-bold text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded uppercase">
              {record.formation}
            </span>
            {record.tacticalStyle && (
              <span className="text-[10px] font-mono font-bold text-[#e8ff3b] bg-[#e8ff3b]/5 border border-[#e8ff3b]/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                ⚡ {record.tacticalStyle}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-zinc-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-zinc-600" />
              <span>{formattedDate}</span>
            </span>
            <span>•</span>
            <span>Squad Rating: <strong className="text-zinc-300 font-bold">{record.teamRating} OVR</strong></span>
          </div>
        </div>
      </div>

      {/* Middle details: MVP highlight tag */}
      <div className="flex items-center gap-2 bg-zinc-900/40 border border-zinc-900 p-2 rounded-xl text-[11px] font-mono md:max-w-xs w-full md:w-auto">
        <span className="text-xs">👑</span>
        <div className="min-w-0">
          <span className="text-[9px] text-zinc-650 block uppercase leading-none mb-0.5">Mvp player</span>
          <strong className="text-zinc-300 truncate font-bold block">{record.mvpName}</strong>
        </div>
      </div>

      {/* Right: Score and Win Indicator */}
      <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-zinc-900/60 pt-3 md:pt-0">
        <div className="md:text-right">
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block leading-none mb-1">Cup Score</span>
          <span className={`font-display font-black text-lg tracking-widest ${record.won ? 'text-[#e8ff3b]' : 'text-zinc-100'}`}>
            {record.score}
          </span>
        </div>

        <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-display font-black text-sm ${
          record.won 
            ? 'bg-emerald-500/10 text-[#e8ff3b] border border-emerald-500/25' 
            : 'bg-zinc-900 text-zinc-500 border border-zinc-850'
        }`} title={record.won ? 'World Cup Winner!' : 'Knocked Out'}>
          {record.won ? '🏆' : '✗'}
        </div>
      </div>
    </motion.div>
  );
}
