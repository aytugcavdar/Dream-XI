'use client';

import React from 'react';
import { GameRecord } from '@/types';

interface TrophyCabinetProps {
  historyList: GameRecord[];
}

export default function TrophyCabinet({ historyList }: TrophyCabinetProps) {
  const unlockedCount = [
    historyList.some(r => r.won && r.teamId === 'brazil'),
    historyList.some(r => r.won && (r.tacticalStyle === 'tikitaka' || r.tacticalStyle === 'tiki-taka')),
    historyList.some(r => r.won && r.editionYear <= 1990),
    historyList.some(r => r.won && r.cleanSheets !== undefined && r.cleanSheets >= 2),
    historyList.some(r => r.won && r.teamRating >= 88),
  ].filter(Boolean).length;

  const achievements = [
    {
      id: 'samba_gold',
      title: 'Samba Altını 🇧🇷',
      desc: 'Brezilya ile dünya kupasını kazanmak.',
      hint: 'Brezilya milli takımıyla kupa kaldırın.',
      emoji: '👑',
      color: 'text-yellow-500',
      glow: 'shadow-[0_0_15px_rgba(234,179,8,0.25)] border-yellow-500/30 bg-gradient-to-b from-yellow-950/20 to-zinc-950',
      metaCheck: () => historyList.some(r => r.won && r.teamId === 'brazil'),
      visualTrophy: (
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-md animate-pulse" />
          <div className="w-8 h-10 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 rounded-b-lg relative flex flex-col justify-between items-center pt-1 shadow-md">
            <div className="absolute -top-1 w-10 h-1.5 bg-yellow-300 rounded-full" />
            <div className="absolute -left-2 top-2 w-2 h-4 border-2 border-yellow-400 rounded-l-full" />
            <div className="absolute -right-2 top-2 w-2 h-4 border-2 border-yellow-400 rounded-r-full" />
            <span className="text-[10px] leading-none mb-1">🇧🇷</span>
            <div className="w-6 h-1 bg-yellow-600 rounded-full mb-0.5" />
          </div>
          <div className="absolute bottom-2.5 w-7 h-2.5 bg-zinc-800 border border-zinc-700 rounded-t-sm" />
        </div>
      )
    },
    {
      id: 'tiki_taka_master',
      title: 'Tiki-Taka Ustası 🧬',
      desc: 'Tiki-Taka taktiğiyle turnuvayı fethetmek.',
      hint: 'Seçilen taktik Tiki-Taka olacak şekilde şampiyon olun.',
      emoji: '⚽',
      color: 'text-emerald-500',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.25)] border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-zinc-950',
      metaCheck: () => historyList.some(r => r.won && (r.tacticalStyle === 'tikitaka' || r.tacticalStyle === 'tiki-taka')),
      visualTrophy: (
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-md animate-pulse" />
          <div className="w-9 h-10 bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600 rounded-b-xl relative flex flex-col justify-center items-center shadow-md">
            <div className="w-6 h-6 rounded-full bg-emerald-950 flex items-center justify-center border border-emerald-400/30">
              <span className="text-[9px]">🧬</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'classic_generation',
      title: 'Klasik Nesil 📜',
      desc: '1990 öncesi retro kadroyla şampiyon olmak.',
      hint: 'Yılı 1990 veya daha eski olan efsane kadrolarla zafere ulaşın.',
      emoji: '⏳',
      color: 'text-amber-500',
      glow: 'shadow-[0_0_15px_rgba(217,119,6,0.25)] border-amber-600/30 bg-gradient-to-b from-amber-950/20 to-zinc-950',
      metaCheck: () => historyList.some(r => r.won && r.editionYear <= 1990),
      visualTrophy: (
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-md animate-pulse" />
          <div className="w-8 h-10 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 rounded-md relative flex flex-col justify-center items-center shadow-md border-b border-amber-800">
            <div className="w-10 h-1 bg-amber-400 rounded-full absolute top-0" />
            <span className="text-xs font-serif italic text-amber-950 font-bold">XC</span>
            <div className="w-9 h-1.5 bg-zinc-800 rounded-sm absolute bottom-0" />
          </div>
        </div>
      )
    },
    {
      id: 'invincible_defense',
      title: 'Yenilmez Savunma 🧱',
      desc: 'En az 2 gol yemeden maç tamamlayarak kupa almak.',
      hint: 'En az 2 clean sheet / gol yemeden tamamlanan maçla şampiyon olun.',
      emoji: '🔒',
      color: 'text-cyan-500',
      glow: 'shadow-[0_0_15px_rgba(6,182,212,0.25)] border-cyan-500/30 bg-gradient-to-b from-cyan-950/20 to-zinc-950',
      metaCheck: () => historyList.some(r => r.won && r.cleanSheets !== undefined && r.cleanSheets >= 2),
      visualTrophy: (
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-md animate-pulse" />
          <div className="w-9 h-10 bg-gradient-to-b from-cyan-455 via-sky-600 to-blue-800 rounded-b-lg relative flex justify-center items-center shadow-md">
            <div className="w-7 h-8 border border-cyan-200/20 rounded-b-md flex items-center justify-center text-[10px]">
              🧱
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dream_creator',
      title: 'Rüya Kadro Kurucu 🌌',
      desc: '88+ OVR kadro reytingiyle zafere ulaşmak.',
      hint: 'Takım genel reytinginizin 88+ olduğu bir şampiyonluk tamamlayın.',
      emoji: '💎',
      color: 'text-purple-500',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.25)] border-purple-500/30 bg-gradient-to-b from-purple-950/20 to-zinc-950',
      metaCheck: () => historyList.some(r => r.won && r.teamRating >= 88),
      visualTrophy: (
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-md animate-pulse" />
          <div className="w-8 h-8 rotate-45 bg-gradient-to-br from-fuchsia-400 via-purple-500 to-indigo-700 relative flex justify-center items-center shadow-md border-2 border-purple-300/40">
            <span className="text-xs -rotate-45 font-bold">💎</span>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 space-y-4 shadow-xl font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-3 gap-2">
        <div>
          <h2 className="font-display font-bold text-base text-zinc-100 flex items-center gap-2">
            <span>🏆</span> KUPA VİTRİNİ & TAKTİKSEL BAŞARILAR
          </h2>
          <p className="text-[10px] text-zinc-500 font-mono uppercase">
            Unlock specialized shiny accolades in your historical draft campaigns
          </p>
        </div>
        <div className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
          UNLOCKED:{' '}
          <strong className="text-[#e8ff3b] font-bold">
            {unlockedCount}
          </strong>
          /5
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {achievements.map((ach) => {
          const unlocked = ach.metaCheck();
          
          return (
            <div
              key={ach.id}
              className={`border rounded-xl p-3 flex flex-col justify-between text-center relative overflow-hidden transition-all duration-300 ${
                unlocked
                  ? `${ach.glow} border-zinc-800`
                  : 'bg-[#12141a]/20 border-zinc-950 opacity-30 grayscale filter'
              }`}
            >
              <div className="absolute top-1.5 right-1.5">
                {unlocked ? (
                  <span className="text-[7px] font-mono uppercase bg-emerald-950 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.2 rounded-sm font-bold">
                    AÇIK
                  </span>
                ) : (
                  <span className="text-[7px] font-mono uppercase bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.2 rounded-sm">
                    KİLİTLİ
                  </span>
                )}
              </div>

              <div>
                {unlocked ? (
                  ach.visualTrophy
                ) : (
                  <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-zinc-900/60 border border-zinc-850 text-zinc-600 font-bold">
                    🔒
                  </div>
                )}
                
                <h3 className={`font-sans font-extrabold text-[11px] uppercase ${unlocked ? 'text-zinc-150' : 'text-zinc-500'} mt-2`}>
                  {ach.title}
                </h3>
                <p className={`text-[10px] ${unlocked ? 'text-zinc-400' : 'text-zinc-500'} font-sans mt-0.5 leading-normal`}>
                  {ach.desc}
                </p>
              </div>

              <div className="mt-2.5 pt-1.5 border-t border-zinc-900/60 text-[8px] font-mono uppercase text-zinc-500 leading-tight">
                {unlocked ? '✅ KİLİT AÇILDI' : `🎯 İPUCU: ${ach.hint}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
