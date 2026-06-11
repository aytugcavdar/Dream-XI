'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Player, NationalTeam, SimulationResult, GameRecord, SortKey, TournamentPlayerStat } from '@/types';
import { MAX_HISTORY_RECORDS } from '@/lib/constants';
import { Award, Trophy, ChevronRight, Sparkles, BarChart3, Medal, Calendar, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/LanguageProvider';

interface ResultPhaseProps {
  team: NationalTeam;
  year: number;
  formationId: string;
  result: SimulationResult;
  squad: { [slotId: string]: Player | null };
  tacticalStyle: string;
  onPlayAgain: () => void; // reroll everything
  onTrySameTeam: () => void; // keep team + year, go back to build page
  onNavigateHistory: () => void; // navigate view to history page
  onOpenPlayerModal: (player: Player) => void;
}

export default function ResultPhase({
  team,
  year,
  formationId,
  result,
  squad,
  tacticalStyle,
  onPlayAgain,
  onTrySameTeam,
  onNavigateHistory,
  onOpenPlayerModal
}: ResultPhaseProps) {
  const [historyList, setHistoryList] = useState<GameRecord[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>('rating');
  const [activeStatsTab, setActiveStatsTab] = useState<'squad' | 'scorers' | 'assisters'>('squad');
  const hasSaved = useRef(false);

  // Load and save historic record when result mounts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (hasSaved.current) return;
    hasSaved.current = true;

    try {
      const raw = localStorage.getItem('dreamxi_history');
      const loaded: GameRecord[] = raw ? JSON.parse(raw) : [];

      const playedAtStr = new Date().toISOString();
      // Create a unique compound ID
      const recordId = `record_${team.id}_${year}_${Date.now()}`;

      const squadArr = Object.values(squad)
        .filter((p): p is Player => p !== null)
        .map(p => ({
          name: p.name,
          rating: p.rating,
          position: p.position,
          country: p.country
        }));

      const newRecord: GameRecord = {
        id: recordId,
        teamId: team.id,
        teamName: team.name,
        teamFlag: team.flag,
        editionYear: year,
        formation: formationId,
        score: result.finalScore,
        won: result.won,
        mvpName: result.mvp.name,
        teamRating: result.teamRating,
        playedAt: playedAtStr,
        tacticalStyle,
        squadPlayers: squadArr,
        cleanSheets: result.teamStats.cleanSheets
      };

      // Add to beginning, filter out any duplicates by ID to be safe, trim to MAX_HISTORY_RECORDS
      const combined = [newRecord, ...loaded];
      const uniqueMap = new Map<string, GameRecord>();
      combined.forEach(item => {
        if (!uniqueMap.has(item.id)) {
          uniqueMap.set(item.id, item);
        }
      });
      const updated = Array.from(uniqueMap.values()).slice(0, MAX_HISTORY_RECORDS);
      localStorage.setItem('dreamxi_history', JSON.stringify(updated));
      setTimeout(() => {
        setHistoryList(updated);
      }, 0);
    } catch (e) {
      console.error('Error saving history record', e);
    }
  }, [result, team, year, formationId, squad, tacticalStyle]);

  // Read last 3 results
  const lastThreeChips = useMemo(() => {
    return historyList.slice(0, 3);
  }, [historyList]);

  // Aggregate global stats from history
  const historyStats = useMemo(() => {
    if (historyList.length === 0) return { totalGames: 0, winsCount: 0, rate: 0 };
    const wins = historyList.filter(h => h.won).length;
    return {
      totalGames: historyList.length,
      winsCount: wins,
      rate: Math.round((wins / historyList.length) * 100)
    };
  }, [historyList]);

  // Sort player metrics
  const sortedSeasonPlayers = useMemo(() => {
    return [...result.playerSeasonStats].sort((a, b) => {
      if (sortBy === 'rating') return b.avgRating - a.avgRating;
      if (sortBy === 'goals') return b.goals - a.goals || b.avgRating - a.avgRating;
      if (sortBy === 'assists') return b.assists - a.assists || b.avgRating - a.avgRating;
      if (sortBy === 'xG') return b.xG - a.xG || b.avgRating - a.avgRating;
      return 0;
    });
  }, [result.playerSeasonStats, sortBy]);

  // Helper mapping player id to details
  const getPlayerDetails = (id: string): Player => {
    // Try to find the player from the actual drafted squad first
    const squadPlayer = Object.values(squad).find(p => p !== null && p.id === id);
    if (squadPlayer) return squadPlayer;

    // Search in the players data fallback generated or legends
    const sqPlayers = result.playerSeasonStats;
    // We generated matching players inside `simulate`, so let's check
    // we can find the info or reconstruct it. The MVP or topScorer is in the object.
    if (id === result.mvp.id) return result.mvp;
    if (id === result.topScorer.player.id) return result.topScorer.player;

    // Fallback template
    return {
      id,
      name: id.replace('procedural_', '').replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      country: team.id,
      position: 'CM',
      positionGroup: 'MID',
      rating: 80,
      worldCups: [year],
      era: 'Legends',
      bio: 'Squad depth player contributing throughout campaigns.',
      wcStats: { goals: 0, assists: 0, matches: 4, passAccuracy: 80, xG: 0.1 }
    };
  };

  // Color mapper for match rating columns
  const getRatingColorClass = (rating: number) => {
    if (rating >= 7.8) return 'text-emerald-400 bg-emerald-400/5 border-emerald-500/20';
    if (rating >= 6.6) return 'text-yellow-400 bg-yellow-400/5 border-yellow-500/20';
    return 'text-red-400 bg-red-400/5 border-red-500/20';
  };

  const getPositionStyle = (group: string) => {
    switch (group) {
      case 'GK': return 'text-amber-400 border-amber-400/20 bg-amber-400/5';
      case 'DEF': return 'text-blue-400 border-blue-400/20 bg-blue-400/5';
      case 'MID': return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5';
      case 'ATT': return 'text-red-400 border-red-400/20 bg-red-400/5';
      default: return 'text-zinc-400 border-zinc-400/20 bg-zinc-400/5';
    }
  };

  const { t, language, isMounted } = useLanguage();

  const getLocalizedRound = (roundName: string) => {
    if (!isMounted) return roundName;
    const name = roundName.toLowerCase();
    if (name.includes('16') || name.includes('r16')) return t('sim_round_r16');
    if (name.includes('quarter')) return t('sim_round_qf');
    if (name.includes('semi')) return t('sim_round_sf');
    if (name.includes('final') && !name.includes('semi') && !name.includes('quarter')) return t('sim_round_final');
    if (name.includes('group stage')) return t('sim_round_group_stage');
    if (name.includes('group match 1')) return t('sim_round_gm1');
    if (name.includes('group match 2')) return t('sim_round_gm2');
    if (name.includes('group match 3')) return t('sim_round_gm3');
    return roundName;
  };

  const getPositionGroup = (pos: string): 'GK' | 'DEF' | 'MID' | 'ATT' => {
    if (pos === 'GK') return 'GK';
    if (['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(pos)) return 'DEF';
    if (['CDM', 'CM', 'CAM', 'LM', 'RM'].includes(pos)) return 'MID';
    return 'ATT';
  };

  const handleOpenOpponentModal = (stat: TournamentPlayerStat) => {
    const oppPlayer: Player = {
      id: stat.playerId,
      name: stat.playerName,
      country: stat.teamId,
      position: stat.position as any,
      positionGroup: getPositionGroup(stat.position),
      rating: stat.playerRating,
      worldCups: [year],
      era: year.toString(),
      bio: isMounted
        ? (language === 'en'
            ? `Elite representative of ${stat.teamFlag} ${stat.teamName} competing in the historical ${year} tournament.`
            : `${stat.teamFlag} ${stat.teamName} takımının ${year} yılındaki tarihi kadrosunu temsil eden elit oyuncu.`)
        : `Elite representative of ${stat.teamFlag} ${stat.teamName} competing in the historical ${year} tournament.`,
      wcStats: {
        goals: stat.goals,
        assists: stat.assists,
        matches: 4,
        passAccuracy: 82,
        xG: Number((stat.goals * 0.9 + stat.assists * 0.3 + 0.5).toFixed(1))
      }
    };
    onOpenPlayerModal(oppPlayer);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 animate-slide-up flex flex-col justify-between">
      
      {/* 2 COLUMN GRID CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        
        {/* LEFT COLUMN: HERO PANEL + MATCH TIMELINE */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Champion / Runner Up focal billboard */}
          <div className={`p-6 sm:p-8 rounded-3xl border text-center relative overflow-hidden shadow-2xl ${
            result.won 
              ? 'bg-zinc-950/80 border-emerald-505/20 ring-1 ring-emerald-500/10' 
              : 'bg-zinc-950/80 border-red-505/20 ring-1 ring-red-500/10'
          }`}>
            {/* Background Atmosphere */}
            <div className={`absolute top-0 inset-x-0 h-40 opacity-10 blur-3xl rounded-full ${
              result.won ? 'bg-emerald-500' : 'bg-red-500'
            }`} />

            <div className="relative">
              {/* Status Header */}
              <div className="flex justify-center mb-4">
                {result.won ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-[#e8ff3b] rounded-full animate-bounce shrink-0">
                    <Trophy className="w-8 h-8" />
                  </div>
                ) : (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full shrink-0">
                    <Medal className="w-8 h-8 opacity-60" />
                  </div>
                )}
              </div>

              {/* Champion Statement */}
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                {isMounted ? (language === 'en' ? 'Tournament Result' : 'Turnuva Sonucu') : 'Tournament Result'}
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1 uppercase tracking-tight">
                {result.won 
                  ? (isMounted ? t('result_won_title') : 'World Champions!') 
                  : (isMounted ? t('result_lost_title') : 'Campaign Finished')}
              </h2>
              <p className="text-xs text-zinc-400 mt-2 mb-6 max-w-xs mx-auto">
                {result.won 
                  ? (isMounted ? (language === 'en' ? `Congratulations! ${team.flag} ${team.name} conquered the global knockout grid with complete style.` : `Tebrikler! ${team.flag} ${team.name} tüm eleme ağacını harika bir oyunla fethetti.`) : `Congratulations! ${team.flag} ${team.name} conquered the global knockout grid with complete style.`) 
                  : (isMounted ? (language === 'en' ? `Knocked out in the ${getLocalizedRound(result.exitRound)}. Keep tuning tactics for another historical trial.` : `${getLocalizedRound(result.exitRound)} aşamasında elendiniz. Yeni bir tarihi deneme için taktiklerinizi ayarlamaya devam edin.`) : `Knocked out in the ${getLocalizedRound(result.exitRound)}. Keep tuning tactics for another historical trial.`)}
              </p>

              {/* Big Score pop */}
              <div className={`inline-block py-3 px-8 rounded-2xl border text-3xl sm:text-4xl font-display font-black tracking-widest uppercase shadow-md ${
                result.won 
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-[#e8ff3b] hover:shadow-emerald-500/5' 
                  : 'bg-red-950/30 border-red-500/30 text-red-400 hover:shadow-red-500/5'
              }`}>
                {result.finalScore}
              </div>

              {/* Formation tag */}
              <div className="mt-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                {isMounted ? (language === 'en' ? 'TACTICAL MODEL' : 'TAKTİKSEL MODEL') : 'TACTICAL MODEL'} • {formationId} ({result.teamRating} OVR)
              </div>
            </div>
          </div>

          {/* Matches Timeline Display */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 space-y-4">
            <h3 className="font-display font-bold text-xs x:text-sm uppercase text-zinc-200 tracking-wider">
              {isMounted ? t('result_summary') : 'Knockout Stage Progression'}
            </h3>

            <div className="space-y-2.5">
              {result.matches.map((match, idx) => {
                return (
                  <div 
                    key={match.round}
                    className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl flex items-center justify-between"
                  >
                    {/* Round Label & Opponent Details */}
                    <div className="flex items-center gap-3">
                      <div className="text-right flex flex-col items-end min-w-[70px]">
                        <span className="font-mono text-[9px] text-zinc-650 leading-none">M{idx+1}</span>
                        <span className="font-display font-bold text-[10px] text-zinc-300 leading-tight">{getLocalizedRound(match.round)}</span>
                      </div>
                      <div className="h-6 w-px bg-zinc-850" />
                      <div className="flex items-center gap-2">
                        <span className="text-xl select-none leading-none">{match.opponentFlag}</span>
                        <div className="flex flex-col">
                          <span className="font-sans font-bold text-xs text-zinc-200">{match.opponentName}</span>
                          <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-wider">Pwr: {match.opponentStrength * 10}</span>
                          <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-wider">
                            xG {match.teamXG?.toFixed(2) ?? '0.00'}-{match.opponentXG?.toFixed(2) ?? '0.00'} | Poss {match.possession ?? result.teamStats.avgPossession}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Result and Score */}
                    <div className="flex items-center gap-2.5">
                      <span className="font-display font-black text-xs text-zinc-100 font-mono">
                        {match.teamGoals} - {match.opponentGoals}
                      </span>
                      <span className={`text-[9px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.5 rounded ${
                        match.teamGoals === match.opponentGoals
                          ? 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/10'
                          : match.won 
                            ? 'bg-emerald-500/10 text-[#e8ff3b] border border-emerald-500/10' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/10'
                      }`}>
                        {match.teamGoals === match.opponentGoals
                          ? (isMounted ? (language === 'en' ? 'DRAW' : 'BERABERLİK') : 'DRAW')
                          : match.won
                            ? (isMounted ? (language === 'en' ? 'WIN' : 'GALİBİYET') : 'WIN')
                            : (isMounted ? (language === 'en' ? 'LOSS' : 'MAĞLUBİYET') : 'LOSS')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Campaign Statistics block */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 space-y-4">
            <h3 className="font-display font-bold text-xs uppercase text-zinc-200 tracking-wider">
              {isMounted ? (language === 'en' ? 'Squad Team Metrics' : 'Takım Metrikleri') : 'Squad Team Metrics'}
            </h3>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-zinc-900/20 border border-zinc-900 p-3 rounded-xl flex flex-col justify-between">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                  {isMounted ? t('history_clean_sheets') : 'Clean Sheets'}
                </span>
                <span className="font-display font-black text-xl text-zinc-100">{result.teamStats.cleanSheets}</span>
              </div>
              <div className="bg-zinc-900/20 border border-zinc-900 p-3 rounded-xl flex flex-col justify-between">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                  {isMounted ? (language === 'en' ? 'Total Campaign xG' : 'Toplam Kampanya xG') : 'Total Campaign xG'}
                </span>
                <span className="font-display font-black text-xl text-zinc-100">{result.teamStats.totalXG}</span>
              </div>
              <div className="bg-zinc-900/20 border border-zinc-900 p-3 rounded-xl flex flex-col justify-between">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                  {isMounted ? (language === 'en' ? 'Avg Possession' : 'Ort. Topa Sahip Olma') : 'Avg Possession'}
                </span>
                <span className="font-display font-black text-xl text-zinc-100">{result.teamStats.avgPossession}%</span>
              </div>
              <div className="bg-zinc-900/20 border border-[#e8ff3b]/10 p-3 rounded-xl flex flex-col justify-between">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                  {isMounted ? (language === 'en' ? 'Avg Pass Quality' : 'Ort. Pas İsabeti') : 'Avg Pass Quality'}
                </span>
                <span className="font-display font-black text-xl text-[#e8ff3b]">{result.teamStats.avgPassAccuracy}%</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: MVP CARD + SQUAD MATRIX */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Tournament MVP Highlight Card */}
          <div className="relative overflow-hidden p-5 rounded-2xl border border-zinc-900 bg-zinc-950 shadow-lg">
            {/* Crown decoration decoration */}
            <div className="absolute right-0 top-0 h-28 w-28 bg-[#e8ff3b]/5 blur-2xl rounded-full pointer-events-none" />
            <div className="absolute top-4 right-4 text-[#e8ff3b] animate-bounce shrink-0">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>

            <div className="flex items-start gap-4">
              {/* Highlight icon */}
              <div className="p-3 w-14 h-18 bg-zinc-900 border border-zinc-800 rounded-xl relative flex flex-col items-center justify-center">
                <span className="text-[9px] font-mono text-zinc-500 font-bold leading-none mb-1">MVP</span>
                <span className="text-xl">👑</span>
              </div>

              {/* Bio and tournament specs */}
              <div className="flex-1 mt-0.5">
                <h3 className="font-display font-bold text-sm uppercase tracking-widest text-[#e8ff3b] leading-tight mb-0.5">
                  {isMounted ? t('result_mvp') : 'Tournament Golden MVP'}
                </h3>
                <h2 className="font-display font-black text-xl text-white leading-tight mb-2">
                  {result.mvp.name}
                </h2>
                
                {/* MVP bio snippet */}
                <p className="text-xs text-zinc-400 italic max-w-md line-clamp-2 leading-relaxed">
                  &ldquo;{result.mvp.bio}&rdquo;
                </p>

                {/* Seasonal aggregate columns */}
                <div className="flex gap-4 mt-4 text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-zinc-600 block">
                      {isMounted ? (language === 'en' ? 'GOALS' : 'GOLLER') : 'GOALS'}
                    </span>
                    <strong className="text-[#e8ff3b] font-bold text-sm">
                      {result.playerSeasonStats.find(s => s.playerId === result.mvp.id)?.goals || 0}
                    </strong>
                  </div>
                  <div className="h-6 w-px bg-zinc-850 mt-1" />
                  <div>
                    <span className="text-[9px] text-zinc-650 block">
                      {isMounted ? (language === 'en' ? 'ASSISTS' : 'ASİSTLER') : 'ASSISTS'}
                    </span>
                    <strong className="text-white font-bold text-sm">
                      {result.playerSeasonStats.find(s => s.playerId === result.mvp.id)?.assists || 0}
                    </strong>
                  </div>
                  <div className="h-6 w-px bg-zinc-850 mt-1" />
                  <div>
                    <span className="text-[9px] text-zinc-650 block">
                      {isMounted ? t('build_rating') : 'AVG RATING'}
                    </span>
                    <strong className="text-white font-bold text-sm">
                      {result.playerSeasonStats.find(s => s.playerId === result.mvp.id)?.avgRating || 6.0}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Roster aggregation table */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5">
            {result.tournamentStats ? (
              <div className="flex flex-col gap-4 mb-5">
                {/* Tabs row */}
                <div className="flex border-b border-zinc-900 pb-1 gap-2 overflow-x-auto scrollbar-none">
                  {(['squad', 'scorers', 'assisters'] as const).map((tabId) => {
                    const isActive = activeStatsTab === tabId;
                    let tabLabel = '';
                    if (tabId === 'squad') tabLabel = isMounted ? t('result_tab_squad') : 'My Squad';
                    else if (tabId === 'scorers') tabLabel = isMounted ? t('result_tab_scorers') : 'Top Scorers';
                    else if (tabId === 'assisters') tabLabel = isMounted ? t('result_tab_assisters') : 'Top Assisters';

                    return (
                      <button
                        key={tabId}
                        onClick={() => setActiveStatsTab(tabId)}
                        className={`pb-2 px-1 text-xs uppercase font-display font-bold tracking-wider transition-all border-b-2 -mb-[5px] shrink-0 ${
                          isActive 
                            ? 'border-[#e8ff3b] text-[#e8ff3b] font-black' 
                            : 'border-transparent text-zinc-500 hover:text-zinc-355'
                        }`}
                      >
                        {tabLabel}
                      </button>
                    );
                  })}
                </div>

                {/* Subheader or Sorting triggers */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="font-display font-bold text-xs uppercase text-zinc-200 tracking-wider">
                      {activeStatsTab === 'squad' && (isMounted ? (language === 'en' ? 'Squad Tournament Metrics' : 'Takım Turnuva İstatistikleri') : 'Squad Tournament Metrics')}
                      {activeStatsTab === 'scorers' && (isMounted ? t('result_tournament_scorers') : 'Tournament Top Scorers')}
                      {activeStatsTab === 'assisters' && (isMounted ? t('result_tournament_assisters') : 'Tournament Top Assisters')}
                    </h3>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase">
                      {isMounted ? (language === 'en' ? 'click info button for bio logs' : 'biyografi kayıtları için bilgi butonuna tıklayın') : 'click info button for bio logs'}
                    </p>
                  </div>

                  {activeStatsTab === 'squad' && (
                    <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-900 p-1 rounded-lg text-[10px] font-mono font-bold w-fit">
                      {['rating', 'goals', 'assists', 'xG'].map((opt) => {
                        const isActive = sortBy === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => setSortBy(opt as SortKey)}
                            className={`px-2 py-1 rounded capitalize transition-all ${
                              isActive ? 'bg-[#e8ff3b] text-black font-extrabold' : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                          >
                            {opt === 'rating' ? (isMounted ? (language === 'en' ? 'Rating' : 'GEN') : 'Rating') : opt === 'goals' ? 'G' : opt === 'assists' ? 'A' : opt}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm uppercase text-zinc-200 tracking-wider">
                    {isMounted ? (language === 'en' ? 'Squad Tournament Metrics' : 'Takım Turnuva İstatistikleri') : 'Squad Tournament Metrics'}
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase">
                    {isMounted ? (language === 'en' ? 'click info button for bio logs' : 'biyografi kayıtları için bilgi butonuna tıklayın') : 'click info button for bio logs'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-900 p-1 rounded-lg text-[10px] font-mono font-bold w-fit">
                  {['rating', 'goals', 'assists', 'xG'].map((opt) => {
                    const isActive = sortBy === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setSortBy(opt as SortKey)}
                        className={`px-2 py-1 rounded capitalize transition-all ${
                          isActive ? 'bg-[#e8ff3b] text-black font-extrabold' : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {opt === 'rating' ? (isMounted ? (language === 'en' ? 'Rating' : 'GEN') : 'Rating') : opt === 'goals' ? 'G' : opt === 'assists' ? 'A' : opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dense Spreadsheet List */}
            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {(activeStatsTab === 'squad' || !result.tournamentStats) && sortedSeasonPlayers.map((statsRow, idx) => {
                const isMVP = statsRow.playerId === result.mvp.id;
                
                // Let's resolve the player object
                const details = getPlayerDetails(statsRow.playerId);

                return (
                  <div 
                    key={statsRow.playerId}
                    className="p-2 bg-zinc-900/30 border border-zinc-900 rounded-xl flex items-center justify-between gap-4"
                  >
                    {/* Pos Label and Identity */}
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {/* Rank Index helper */}
                      <span className="font-mono text-[9px] text-zinc-650 font-bold min-w-[12px] text-center">
                        {idx + 1}
                      </span>
                      {/* Pos Badge */}
                      <span className={`text-[9px] font-mono font-bold uppercase py-0.5 px-1.5 rounded border ${getPositionStyle(details.positionGroup)} flex-shrink-0`}>
                        {details.position}
                      </span>
                      {/* Name Label */}
                      <div className="min-w-0 flex-1">
                        <div className="font-sans font-bold text-xs text-zinc-200 truncate flex items-center gap-1">
                          <span>{details.name}</span>
                          {isMVP && <Trophy className="w-3 h-3 text-[#e8ff3b] inline" />}
                        </div>
                      </div>
                    </div>

                    {/* Stats Rows */}
                    <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-400 pl-2">
                      <div className="w-8 text-center" title="Goals Scored">
                        <span className="text-[8px] text-zinc-600 block sm:hidden">G</span>
                        <strong className={statsRow.goals > 0 ? 'text-[#e8ff3b] font-bold' : ''}>{statsRow.goals}</strong>
                      </div>
                      <div className="w-8 text-center" title="Assists Recorded">
                        <span className="text-[8px] text-zinc-600 block sm:hidden">A</span>
                        <span>{statsRow.assists}</span>
                      </div>
                      <div className="w-8 text-center" title="Expected Goals count">
                        <span className="text-[8px] text-zinc-600 block sm:hidden">xG</span>
                        <span className="text-zinc-500">{statsRow.xG}</span>
                      </div>
                      <div className={`w-12 py-1 border rounded text-center text-[11px] font-bold ${getRatingColorClass(statsRow.avgRating)}`} title="Avg tournament rating">
                        {statsRow.avgRating.toFixed(1)}
                      </div>

                      {/* Info Hook */}
                      <button
                        id={`player-stats-info-btn-${statsRow.playerId}`}
                        onClick={() => onOpenPlayerModal(details)}
                        className="p-1 hover:bg-zinc-800 rounded border border-zinc-850 hover:border-zinc-700 text-zinc-500 hover:text-[#e8ff3b] transition-all flex-shrink-0"
                      >
                        <span className="text-[10px] leading-none uppercase px-1.5 py-0.5 font-sans font-semibold">ℹ️</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {activeStatsTab === 'scorers' && result.tournamentStats && (result.tournamentStats.topScorers || []).map((statsRow, idx) => {
                const isUserPlayer = Object.values(squad).some(p => p !== null && p.id === statsRow.playerId);
                
                return (
                  <div 
                    key={statsRow.playerId}
                    className={`p-2 rounded-xl border flex items-center justify-between gap-4 ${
                      isUserPlayer 
                        ? 'bg-[#e8ff3b]/5 border-[#e8ff3b]/25 shadow-[0_0_15px_rgba(232,255,59,0.03)]' 
                        : 'bg-zinc-900/30 border-zinc-900'
                    }`}
                  >
                    {/* Pos Label and Identity */}
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="font-mono text-[10px] text-zinc-500 font-black min-w-[15px] text-center">
                        {idx + 1}
                      </span>
                      <span className={`text-[9px] font-mono font-bold uppercase py-0.5 px-1.5 rounded border ${getPositionStyle(getPositionGroup(statsRow.position))} flex-shrink-0`}>
                        {statsRow.position}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-sans font-bold text-xs text-zinc-200 truncate flex items-center gap-1">
                          <span>{statsRow.playerName}</span>
                          {isUserPlayer && <Trophy className="w-3 h-3 text-[#e8ff3b] inline" />}
                        </div>
                        <div className="font-mono text-[9px] text-zinc-500 flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs select-none leading-none">{statsRow.teamFlag}</span>
                          <span className="truncate">{statsRow.teamName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Rows */}
                    <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-400 pl-2">
                      <div className="w-16 py-0.5 px-2 bg-[#e8ff3b]/10 text-[#e8ff3b] border border-[#e8ff3b]/20 rounded-full text-center font-extrabold text-[10px]">
                        {statsRow.goals} {isMounted ? (language === 'en' ? 'Goals' : 'Gol') : 'Goals'}
                      </div>
                      <div className="w-12 text-center text-zinc-550">
                        {statsRow.assists} {isMounted ? (language === 'en' ? 'Ast' : 'Ast') : 'Ast'}
                      </div>
                      <div className="w-12 py-1 border border-zinc-850 bg-zinc-900/40 rounded text-center text-[10px] font-bold text-zinc-400">
                        OVR {statsRow.playerRating}
                      </div>

                      {/* Info Hook */}
                      <button
                        id={`player-stats-info-btn-${statsRow.playerId}`}
                        onClick={() => handleOpenOpponentModal(statsRow)}
                        className="p-1 hover:bg-zinc-800 rounded border border-zinc-850 hover:border-zinc-700 text-zinc-500 hover:text-[#e8ff3b] transition-all flex-shrink-0"
                      >
                        <span className="text-[10px] leading-none uppercase px-1.5 py-0.5 font-sans font-semibold">ℹ️</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {activeStatsTab === 'assisters' && result.tournamentStats && (result.tournamentStats.topAssisters || []).map((statsRow, idx) => {
                const isUserPlayer = Object.values(squad).some(p => p !== null && p.id === statsRow.playerId);
                
                return (
                  <div 
                    key={statsRow.playerId}
                    className={`p-2 rounded-xl border flex items-center justify-between gap-4 ${
                      isUserPlayer 
                        ? 'bg-[#e8ff3b]/5 border-[#e8ff3b]/25 shadow-[0_0_15px_rgba(232,255,59,0.03)]' 
                        : 'bg-zinc-900/30 border-zinc-900'
                    }`}
                  >
                    {/* Pos Label and Identity */}
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="font-mono text-[10px] text-zinc-500 font-black min-w-[15px] text-center">
                        {idx + 1}
                      </span>
                      <span className={`text-[9px] font-mono font-bold uppercase py-0.5 px-1.5 rounded border ${getPositionStyle(getPositionGroup(statsRow.position))} flex-shrink-0`}>
                        {statsRow.position}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-sans font-bold text-xs text-zinc-200 truncate flex items-center gap-1">
                          <span>{statsRow.playerName}</span>
                          {isUserPlayer && <Trophy className="w-3 h-3 text-[#e8ff3b] inline" />}
                        </div>
                        <div className="font-mono text-[9px] text-zinc-500 flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs select-none leading-none">{statsRow.teamFlag}</span>
                          <span className="truncate">{statsRow.teamName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Rows */}
                    <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-400 pl-2">
                      <div className="w-12 text-center text-zinc-550">
                        {statsRow.goals} {isMounted ? (language === 'en' ? 'Gls' : 'Gol') : 'Gls'}
                      </div>
                      <div className="w-18 py-0.5 px-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-center font-extrabold text-[10px]">
                        {statsRow.assists} {isMounted ? (language === 'en' ? 'Assists' : 'Asist') : 'Assists'}
                      </div>
                      <div className="w-12 py-1 border border-zinc-850 bg-zinc-900/40 rounded text-center text-[10px] font-bold text-zinc-400">
                        OVR {statsRow.playerRating}
                      </div>

                      {/* Info Hook */}
                      <button
                        id={`player-stats-info-btn-${statsRow.playerId}`}
                        onClick={() => handleOpenOpponentModal(statsRow)}
                        className="p-1 hover:bg-zinc-800 rounded border border-zinc-850 hover:border-zinc-700 text-zinc-500 hover:text-[#e8ff3b] transition-all flex-shrink-0"
                      >
                        <span className="text-[10px] leading-none uppercase px-1.5 py-0.5 font-sans font-semibold">ℹ️</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM PANEL: HISTORY CHIPS & LOBBY NAV ACTIONS */}
      <footer className="border-t border-zinc-900 pt-6 mt-4 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6">
        
        {/* History Quick-Chips strip */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between max-w-sm">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              {isMounted ? (language === 'en' ? `History Log (${historyStats.totalGames} played)` : `Geçmiş Kayıtları (${historyStats.totalGames} oynandı)`) : `History Log (${historyStats.totalGames} played)`}
            </span>
            {historyStats.totalGames > 0 && (
              <span className="font-mono text-[9px] px-2 py-0.5 bg-zinc-900/60 border border-zinc-800 rounded-full text-zinc-400">
                {isMounted ? t('history_win_rate') : 'Win Rate'}: <strong className="text-[#e8ff3b] font-bold">{historyStats.winsCount}/{historyStats.totalGames} ({historyStats.rate}%)</strong>
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {lastThreeChips.length === 0 ? (
              <span className="text-zinc-650 font-mono text-[10px]">
                {isMounted ? (language === 'en' ? 'No historic runs recorded yet.' : 'Henüz kaydedilmiş geçmiş maç bulunmuyor.') : 'No historic runs recorded yet.'}
              </span>
            ) : (
              lastThreeChips.map((h) => {
                return (
                  <div 
                    key={h.id}
                    className={`flex items-center gap-1.5 p-1.5 px-3 border rounded-xl font-mono text-xs cursor-pointer transition-colors ${
                      h.won 
                        ? 'bg-emerald-950/20 border-emerald-900/40 text-zinc-300 hover:border-emerald-800' 
                        : 'bg-zinc-950 border-zinc-900 text-zinc-300 hover:border-zinc-800'
                    }`}
                    onClick={onNavigateHistory}
                    title="Click to view full game records"
                  >
                    <span>{h.teamFlag}</span>
                    <span className="font-semibold">{h.teamName}</span>
                    <span className="text-zinc-600">•</span>
                    <span>{h.editionYear}</span>
                    <span className="text-zinc-600">•</span>
                    <span className={`font-bold font-mono ${h.won ? 'text-[#e8ff3b]' : 'text-zinc-400'}`}>{h.score}</span>
                    <span className={h.won ? 'text-emerald-400' : 'text-zinc-500'}>
                      {h.won ? '✓' : '✗'}
                    </span>
                  </div>
                );
              })
            )}

            {historyList.length > 0 && (
              <button
                id="view-all-history-btn"
                onClick={onNavigateHistory}
                className="text-[10px] font-mono text-zinc-500 hover:text-[#e8ff3b] flex items-center gap-0.5 hover:underline pl-1"
              >
                <span>{isMounted ? (language === 'en' ? 'View All History' : 'Tüm Geçmişi Görüntüle') : 'View All History'}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            id="try-same-team-btn"
            onClick={onTrySameTeam}
            className="flex-1 md:flex-none py-3 px-5 border border-zinc-900 hover:border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all"
          >
            {isMounted ? t('result_btn_try_same') : 'Try Same Team'}
          </button>

          <button
            id="play-again-btn"
            onClick={onPlayAgain}
            className="flex-1 md:flex-none py-3 px-6 bg-[#e8ff3b] text-black hover:bg-[#d6ec2b] hover:shadow-[0_0_20px_rgba(232,255,59,0.25)] rounded-xl text-xs font-display font-black uppercase tracking-wider transition-all"
          >
            {isMounted ? t('result_btn_play_again') : 'Play Again'}
          </button>
        </div>

      </footer>

    </div>
  );
}
