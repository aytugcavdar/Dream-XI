'use client';

import React from 'react';
import { Trophy, BarChart3, Award, Star } from 'lucide-react';
import { HistoryStats } from '@/hooks/useHistory';

interface MetricsBillboardProps {
  stats: HistoryStats;
}

const cards = [
  {
    icon: <Trophy className="w-5 h-5 text-yellow-500" />,
    label: 'World Cups Won',
    getValue: (s: HistoryStats) => s.wins,
    valueClass: 'text-white',
    borderClass: 'border-zinc-900',
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-emerald-500" />,
    label: 'Simulation Count',
    getValue: (s: HistoryStats) => s.total,
    valueClass: 'text-zinc-100',
    borderClass: 'border-zinc-900',
  },
  {
    icon: <Award className="w-5 h-5 text-[#e8ff3b]" />,
    label: 'Record Win Rate',
    getValue: (s: HistoryStats) => `${s.winRate}%`,
    valueClass: 'text-[#e8ff3b]',
    borderClass: 'border-[#e8ff3b]/10',
  },
  {
    icon: <Star className="w-5 h-5 text-blue-400" />,
    label: 'Peak Draft OVR',
    getValue: (s: HistoryStats) => s.highestRating,
    valueClass: 'text-white',
    borderClass: 'border-zinc-900',
  },
];

export default function MetricsBillboard({ stats }: MetricsBillboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className={`bg-zinc-950 border ${card.borderClass} p-4 rounded-2xl flex items-center gap-4`}>
          <div className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl text-zinc-400 flex-shrink-0">
            {card.icon}
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">{card.label}</div>
            <div className={`font-display font-black text-2xl ${card.valueClass}`}>
              {card.getValue(stats)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
