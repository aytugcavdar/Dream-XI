'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { GameRecord } from '@/types';
import { teams } from '@/data/teams';
import { ChevronLeft, Trophy, Calendar, Filter, SortAsc, HelpCircle, Trash2, Home, BarChart3, Star, Award } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export default function HistoryPage() {
  const [historyList, setHistoryList] = useState<GameRecord[]>([]);
  const [filterTeam, setFilterTeam] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date_new' | 'date_old' | 'rating_high' | 'score_ratio'>('date_new');
  const [isClient, setIsClient] = useState(false);

  // Load from local storage securely inside client hook
  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
      try {
        const raw = localStorage.getItem('dreamxi_history');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            const uniqueMap = new Map<string, GameRecord>();
            parsed.forEach((item: GameRecord) => {
              if (item && item.id && !uniqueMap.has(item.id)) {
                uniqueMap.set(item.id, item);
              }
            });
            const cleaned = Array.from(uniqueMap.values());
            setHistoryList(cleaned);
            localStorage.setItem('dreamxi_history', JSON.stringify(cleaned));
          }
        }
      } catch (e) {
        console.error('Error reading localStorage history', e);
      }
    }, 0);
  }, []);

  const handleClearAllHistory = () => {
    if (confirm('Are you sure you want to permanently clear your Dream XI game history?')) {
      localStorage.removeItem('dreamxi_history');
      setHistoryList([]);
    }
  };

  // Extract unique teams that actually exist in the history files to populate dropdown
  const historyTeamsList = useMemo(() => {
    const ids = Array.from(new Set(historyList.map(h => h.teamId)));
    return teams.filter(t => ids.includes(t.id));
  }, [historyList]);

  // Filters + Sort algorithm
  const filteredAndSortedRecords = useMemo(() => {
    let result = [...historyList];

    // 1. Filtering
    if (filterTeam !== 'all') {
      result = result.filter(h => h.teamId === filterTeam);
    }

    // 2. Sorting
    result.sort((a, b) => {
      if (sortBy === 'date_new') {
        return new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime();
      }
      if (sortBy === 'date_old') {
        return new Date(a.playedAt).getTime() - new Date(b.playedAt).getTime();
      }
      if (sortBy === 'rating_high') {
        return b.teamRating - a.teamRating;
      }
      if (sortBy === 'score_ratio') {
        // Sort champions first, then those who got further
        if (a.won && !b.won) return -1;
        if (!a.won && b.won) return 1;
        // else compare rating
        return b.teamRating - a.teamRating;
      }
      return 0;
    });

    return result;
  }, [historyList, filterTeam, sortBy]);

  // Aggregate stats
  const stats = useMemo(() => {
    const total = historyList.length;
    const wins = historyList.filter(h => h.won).length;
    const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
    
    // Find absolute highest rated drafted squad ever
    const highestRating = total > 0 ? Math.max(...historyList.map(h => h.teamRating)) : 0;

    return {
      total,
      wins,
      winRate,
      highestRating
    };
  }, [historyList]);

  // Peak Rated Record Finder
  const highestRatedRecord = useMemo(() => {
    if (historyList.length === 0) return null;
    return [...historyList].sort((a, b) => b.teamRating - a.teamRating)[0];
  }, [historyList]);

  // Manager Rank Object
  const managerRank = useMemo(() => {
    const winsCount = stats.wins;
    if (winsCount === 0) {
      return {
        title: "Draft Çaylağı (Rookie)",
        badge: "🌱",
        color: "border-zinc-800 bg-zinc-950 text-zinc-400",
        accent: "bg-zinc-500",
        desc: "Kariyerinin başındasın. İlk kupanı kazanarak adını kupa odasına yazdırmaya başla!"
      };
    } else if (winsCount === 1) {
      return {
        title: "Bronz Direktör (Bronze Director)",
        badge: "🥉",
        color: "border-amber-900/50 bg-amber-950/10 text-amber-500",
        accent: "bg-amber-600",
        desc: "Tarihin ilk şampiyonluğunu kazandın! Bir taktik dâhisi olma yolunda ilk adım."
      };
    } else if (winsCount === 2) {
      return {
        title: "Gümüş Taktisyen (Silver Tactician)",
        badge: "🥈",
        color: "border-slate-800 bg-slate-950/25 text-slate-300",
        accent: "bg-slate-400",
        desc: "İki dünya kupası şampiyonluğu! Squad simülasyonlarında rüzgarı arkana aldın."
      };
    } else if (winsCount === 3) {
      return {
        title: "Altın Antrenör (Gold Coach)",
        badge: "🥇",
        color: "border-yellow-900/40 bg-yellow-950/20 text-yellow-400",
        accent: "bg-yellow-500",
        desc: "Üç yıldızlı baş antrenör! Oyuncuların senin taktik planlarını sahada kusursuz uyguluyor."
      };
    } else if (winsCount === 4) {
      return {
        title: "Efsanevi Menajer (Legendary Manager)",
        badge: "🏆",
        color: "border-[#e8ff3b]/20 bg-[#e8ff3b]/5 text-[#e8ff3b]",
        accent: "bg-[#e8ff3b]",
        desc: "Deltalar üstü taktiksel kurgu! Küresel futbol federasyonları senin taktik formasyonlarını inceliyor."
      };
    } else {
      return {
        title: "GOAT Dehası (Immortal GOAT)",
        badge: "👑",
        color: "border-purple-900/40 bg-purple-950/25 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
        accent: "bg-purple-500",
        desc: "Taktik evreninin tartışmasız en büyüğü! Rekorlar kupa müzeni doldurdu taşıyor."
      };
    }
  }, [stats.wins]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#0a0c0f] flex items-center justify-center font-mono text-zinc-500 text-xs">
        Booting Chronicles Database...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c0f] text-[#f0f0f0] p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* TOP BAR / NAVIGATION HEADER */}
        <header className="flex justify-between items-center border-b border-zinc-900 pb-5">
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="p-2 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-[#e8ff3b] rounded-xl transition-all"
              title="Go Back to Lobby"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display font-bold text-2xl text-zinc-100 uppercase tracking-tight">
                Dream XI Trophy Cabinet
              </h1>
              <p className="text-xs text-zinc-500 font-mono uppercase">Historical Hall of Fame logs</p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-xl text-xs font-mono text-zinc-300 hover:text-white transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Play Lobby</span>
          </Link>
        </header>

        {/* MANAGER RANK PROFILE CARD & HIGHEST SQUAD PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Rank Badge Display Card */}
          <div className={`md:col-span-1 border rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${managerRank.color}`}>
            <div className="absolute top-2 right-2 text-4xl opacity-15 select-none font-mono">
              {managerRank.badge}
            </div>
            
            <div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-500 block mb-1">COACH RANKING STATUS</span>
              <h2 className="font-display font-black text-sm tracking-tight uppercase leading-snug flex items-center gap-2">
                <span>{managerRank.badge}</span>
                <span>{managerRank.title}</span>
              </h2>
              <p className="text-[11px] text-zinc-400 leading-relaxed mt-2.5 font-sans">
                {managerRank.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-900/50">
              <div className="flex justify-between font-mono text-[9px] text-zinc-500 mb-1">
                <span>CHAMPIONSHIPS: {stats.wins}</span>
                <span>NEXT: {stats.wins < 5 ? `${stats.wins + 1} Wins` : 'MAX RANK'}</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${managerRank.accent} transition-all duration-500`}
                  style={{ width: `${Math.min(100, (stats.wins / 5) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Peak Dream Squad Showcase Box */}
          <div className="md:col-span-2 bg-[#0d0e12] border border-zinc-900 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#e8ff3b] block mb-1">👑 COVETED HIGHEST-RATED SQUAD</span>
              <h2 className="font-display font-black text-sm text-zinc-200 uppercase tracking-tight">
                {highestRatedRecord ? (
                  <>
                    {highestRatedRecord.teamFlag} {highestRatedRecord.teamName} ({highestRatedRecord.editionYear}) — {highestRatedRecord.teamRating} OVR
                  </>
                ) : (
                  "No Peak Squad Recorded Yet"
                )}
              </h2>
              
              {highestRatedRecord && highestRatedRecord.squadPlayers && highestRatedRecord.squadPlayers.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3.5 max-h-[140px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-850">
                  {highestRatedRecord.squadPlayers.slice(0, 11).map((p, idx) => (
                    <div key={idx} className="bg-zinc-900/30 border border-zinc-900 p-1.5 rounded-lg flex items-center justify-between font-mono text-[10px]">
                      <span className="text-zinc-400 truncate max-w-[100px]" title={p.name}>
                        {p.name}
                      </span>
                      <span className="text-[#e8ff3b] font-bold text-[9px]">
                        {p.rating}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-500 leading-relaxed mt-4">
                  Complete drafting sequences and win the tournament simulation campaigns to register your dream rosters into the peak squad showcase block!
                </p>
              )}
            </div>

            {highestRatedRecord && (
              <div className="flex gap-4 mt-4 pt-3 border-t border-zinc-900 font-mono text-[9px] text-zinc-500">
                <span>TACTIC: <strong className="text-zinc-300 font-bold uppercase">{highestRatedRecord.tacticalStyle || 'Tiki-Taka'}</strong></span>
                <span>FORMATION: <strong className="text-zinc-300 font-bold uppercase">{highestRatedRecord.formation}</strong></span>
                <span>CLEAN SHEETS: <strong className="text-emerald-400 font-bold uppercase">{highestRatedRecord.cleanSheets !== undefined ? highestRatedRecord.cleanSheets : 'N/A'}</strong></span>
              </div>
            )}
          </div>

        </div>

        {/* METRICS BILLBOARD ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl text-zinc-400">
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">World Cups Won</div>
              <div className="font-display font-black text-2xl text-white">{stats.wins}</div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl text-zinc-400">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="w-full min-w-0 flex-1">
              <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Simulation count</div>
              <div className="font-display font-black text-2xl text-zinc-100">{stats.total}</div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-[#e8ff3b]/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl text-zinc-400">
              <Award className="w-5 h-5 text-[#e8ff3b]" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Record Win Rate</div>
              <div className="font-display font-black text-2xl text-[#e8ff3b]">{stats.winRate}%</div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl text-zinc-400">
              <Star className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Peak Draft OVR</div>
              <div className="font-display font-black text-2xl text-white">{stats.highestRating}</div>
            </div>
          </div>
        </div>

        {/* VISUAL TROPHY CABINET & ACHIEVEMENTS */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-3 gap-2">
            <div>
              <h2 className="font-display font-bold text-base text-zinc-150 flex items-center gap-2">
                <span>🏆</span> KUPA VİTRİNİ & TAKTİKSEL BAŞARILAR
              </h2>
              <p className="text-[10px] text-zinc-500 font-mono uppercase">
                Unlock specialized shiny accolades in your historical draft campaigns
              </p>
            </div>
            <div className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
              UNLOCKED:{' '}
              <strong className="text-[#e8ff3b] font-bold">
                {
                  [
                    historyList.some(r => r.won && r.teamId === 'brazil'),
                    historyList.some(r => r.won && (r.tacticalStyle === 'tikitaka' || r.tacticalStyle === 'tiki-taka')),
                    historyList.some(r => r.won && r.editionYear <= 1990),
                    historyList.some(r => r.won && r.cleanSheets !== undefined && r.cleanSheets >= 2),
                    historyList.some(r => r.won && r.teamRating >= 88),
                  ].filter(Boolean).length
                }
              </strong>
              /5
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
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
                    {/* Golden Trophy rendering with custom lines */}
                    <div className="w-8 h-10 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 rounded-b-lg relative flex flex-col justify-between items-center pt-1 shadow-md">
                      <div className="absolute -top-1 w-10 h-1.5 bg-yellow-300 rounded-full" />
                      {/* handles */}
                      <div className="absolute -left-2 top-2 w-2 h-4 border-2 border-yellow-400 rounded-l-full" />
                      <div className="absolute -right-2 top-2 w-2 h-4 border-2 border-yellow-400 rounded-r-full" />
                      <span className="text-[10px] leading-none mb-1">🇧🇷</span>
                      <div className="w-6 h-1 bg-yellow-600 rounded-full mb-0.5" />
                    </div>
                    {/* base */}
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
                    {/* Emerald Shield trophy */}
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
                    {/* Antique scroll column trophy */}
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
                    {/* Shield */}
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
                    {/* Cosmic Diamond trophy */}
                    <div className="w-8 h-8 rotate-45 bg-gradient-to-br from-fuchsia-400 via-purple-500 to-indigo-700 relative flex justify-center items-center shadow-md border-2 border-purple-300/40">
                      <span className="text-xs -rotate-45 font-bold">💎</span>
                    </div>
                  </div>
                )
              },
            ].map((ach) => {
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
                  {/* Status Indicator inside card */}
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

        {/* CONTROLS AREA: FILTER & SORT */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Team Filter */}
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-850 px-3 py-1.5 rounded-xl">
              <Filter className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              <select
                id="filter-team-select"
                value={filterTeam}
                onChange={(e) => setFilterTeam(e.target.value)}
                className="bg-transparent text-xs text-zinc-200 outline-none pr-6 cursor-pointer font-sans min-w-[120px]"
              >
                <option value="all" className="bg-zinc-950">All Nations</option>
                {historyTeamsList.map(t => (
                  <option key={t.id} value={t.id} className="bg-zinc-950">
                    {t.flag} {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-850 px-3 py-1.5 rounded-xl">
              <SortAsc className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              <select
                id="sort-history-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-zinc-200 outline-none pr-6 cursor-pointer font-sans min-w-[150px]"
              >
                <option value="date_new" className="bg-zinc-950">Date: Newest First</option>
                <option value="date_old" className="bg-zinc-950">Date: Oldest First</option>
                <option value="rating_high" className="bg-zinc-950">Squad Quality OVR</option>
                <option value="score_ratio" className="bg-zinc-950">Tournament Champion Status</option>
              </select>
            </div>
          </div>

          {/* Delete all button */}
          {historyList.length > 0 && (
            <button
              id="clear-all-history-btn"
              onClick={handleClearAllHistory}
              className="py-2 px-4 border border-red-950 hover:bg-red-950/20 text-red-400 hover:text-red-300 rounded-xl flex items-center justify-center gap-2 text-xs font-mono transition-all uppercase tracking-wider"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Full Data Wipe</span>
            </button>
          )}

        </div>

        {/* RESULTS FEED LIST */}
        <div className="space-y-3">
          {filteredAndSortedRecords.length === 0 ? (
            <div className="text-center py-20 bg-zinc-950 border border-zinc-900 border-dashed rounded-3xl p-8">
              <HelpCircle className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <h3 className="font-display font-medium text-white mb-1 uppercase tracking-wider text-sm">No Cabinet Records</h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                No historic records match these filtering conditions. Jump onto the main lobby, execute simulation runs to populate reports!
              </p>
              <Link
                href="/"
                className="mt-5 inline-block px-5 py-2.5 bg-[#e8ff3b] text-black font-display font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-[#d6ec2b] transition-all"
              >
                Begin First Simulation
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAndSortedRecords.map((record) => {
                const formattedDate = new Date(record.playedAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <motion.div
                    key={record.id}
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
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
