'use client';

import React from 'react';
import { ManagerRank, HistoryStats } from '@/hooks/useHistory';

import { useLanguage } from '@/components/LanguageProvider';

interface ManagerRankCardProps {
  managerRank: ManagerRank;
  stats: HistoryStats;
}

export default function ManagerRankCard({ managerRank, stats }: ManagerRankCardProps) {
  const { t, language, isMounted } = useLanguage();
  const title = language === 'en' ? managerRank.titleEn : managerRank.titleTr;
  const desc = language === 'en' ? managerRank.descEn : managerRank.descTr;

  return (
    <div className={`md:col-span-1 border rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${managerRank.color}`}>
      {/* Dekoratif rozet */}
      <div className="absolute top-2 right-2 text-4xl opacity-15 select-none font-mono">
        {managerRank.badge}
      </div>

      <div>
        <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-500 block mb-1">
          {isMounted ? t('history_rank_status') : 'COACH RANKING STATUS'}
        </span>
        <h2 className="font-display font-black text-sm tracking-tight uppercase leading-snug flex items-center gap-2">
          <span>{managerRank.badge}</span>
          <span>{title}</span>
        </h2>
        <p className="text-[11px] text-zinc-400 leading-relaxed mt-2.5 font-sans">
          {desc}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-900/50">
        <div className="flex justify-between font-mono text-[9px] text-zinc-500 mb-1">
          <span>{isMounted ? `${t('history_wins')}: ${stats.wins}` : `CHAMPIONSHIPS: ${stats.wins}`}</span>
          <span>
            {stats.wins < 5 
              ? `${isMounted ? t('history_next') : 'NEXT'}: ${stats.wins + 1} ${isMounted ? t('history_wins') : 'Wins'}` 
              : (isMounted ? t('history_max_rank') : 'MAX RANK')}
          </span>
        </div>
        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full ${managerRank.accent} transition-all duration-500`}
            style={{ width: `${Math.min(100, (stats.wins / 5) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
