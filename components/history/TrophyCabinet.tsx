'use client';

import React from 'react';
import { GameRecord } from '@/types';
import { useLanguage } from '@/components/LanguageProvider';

interface TrophyCabinetProps {
  historyList: GameRecord[];
}

export default function TrophyCabinet({ historyList }: TrophyCabinetProps) {
  const { t, language, isMounted } = useLanguage();

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
      title: isMounted ? t('ach_samba_title') : 'Samba Gold 🇧🇷',
      desc: isMounted ? t('ach_samba_desc') : 'Win the World Cup with Brazil.',
      hint: isMounted ? t('ach_samba_hint') : 'Lift the trophy with the Brazilian national team.',
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
      title: isMounted ? t('ach_tiki_title') : 'Tiki-Taka Master 🧪',
      desc: isMounted ? t('ach_tiki_desc') : 'Conquer the tournament with Tiki-Taka tactics.',
      hint: isMounted ? t('ach_tiki_hint') : 'Win the championship while having Tiki-Taka selected.',
      emoji: '⚽',
      color: 'text-emerald-500',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.25)] border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-zinc-950',
      metaCheck: () => historyList.some(r => r.won && (r.tacticalStyle === 'tikitaka' || r.tacticalStyle === 'tiki-taka')),
      visualTrophy: (
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-md animate-pulse" />
          <div className="w-9 h-10 bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600 rounded-b-xl relative flex flex-col justify-center items-center shadow-md">
            <div className="w-6 h-6 rounded-full bg-emerald-950 flex items-center justify-center border border-emerald-400/30">
              <span className="text-[9px]">🧪</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'classic_generation',
      title: isMounted ? t('ach_classic_title') : 'Classic Generation 📜',
      desc: isMounted ? t('ach_classic_desc') : 'Win with a retro squad from 1990 or earlier.',
      hint: isMounted ? t('ach_classic_hint') : 'Achieve victory with legendary vintage squads.',
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
      title: isMounted ? t('ach_defense_title') : 'Invincible Defense 🧱',
      desc: isMounted ? t('ach_defense_desc') : 'Win with at least 2 clean sheets.',
      hint: isMounted ? t('ach_defense_hint') : 'Win the tournament with 2 or more shutouts.',
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
      title: isMounted ? t('ach_dream_title') : 'Dream Creator 🌌',
      desc: isMounted ? t('ach_dream_desc') : 'Win with an 88+ OVR rated squad.',
      hint: isMounted ? t('ach_dream_hint') : 'Achieve a tournament victory with a squad rating of 88+.',
      emoji: '💎',
      color: 'text-purple-500',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.25)] border-purple-500/30 bg-gradient-to-b from-purple-950/20 to-zinc-950',
      metaCheck: () => historyList.some(r => r.teamRating >= 88 && r.won),
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
            <span>🏆</span> {isMounted ? (language === 'en' ? 'TROPHY CABINET & TACTICAL ACCOLADES' : 'KUPA VİTRİNİ & TAKTİKSEL BAŞARILAR') : 'TROPHY CABINET & TACTICAL ACCOLADES'}
          </h2>
          <p className="text-[10px] text-zinc-500 font-mono uppercase">
            {isMounted ? (language === 'en' ? 'Unlock specialized shiny accolades in your historical draft campaigns' : 'Tarihsel draft kampanyalarınızda parıldayan özel ödüllerin kilidini açın') : 'Unlock specialized shiny accolades in your historical draft campaigns'}
          </p>
        </div>
        <div className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
          {isMounted ? (language === 'en' ? 'UNLOCKED' : 'AÇILANLAR') : 'UNLOCKED'}:{' '}
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
                    {isMounted ? (language === 'en' ? 'OPEN' : 'AÇIK') : 'OPEN'}
                  </span>
                ) : (
                  <span className="text-[7px] font-mono uppercase bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.2 rounded-sm">
                    {isMounted ? (language === 'en' ? 'LOCKED' : 'KİLİTLİ') : 'LOCKED'}
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
                {unlocked 
                  ? (isMounted ? (language === 'en' ? '✅ UNLOCKED' : '✅ KİLİT AÇILDI') : '✅ UNLOCKED') 
                  : `${isMounted ? (language === 'en' ? '🎯 HINT' : '🎯 İPUCU') : '🎯 HINT'}: ${ach.hint}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
