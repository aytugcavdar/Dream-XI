/**
 * hooks/useHistory.ts
 *
 * History sayfasının tüm state ve iş mantığını barındıran custom hook.
 * app/history/page.tsx artık sadece UI composition yapacak.
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { GameRecord } from '@/types';
import { teams } from '@/data/teams';
import { loadHistory, clearHistory, normalizeAndSave } from '@/lib/history';

export type HistorySortBy = 'date_new' | 'date_old' | 'rating_high' | 'score_ratio';

export interface ManagerRank {
  title: string;
  badge: string;
  color: string;
  accent: string;
  desc: string;
}

export interface HistoryStats {
  total: number;
  wins: number;
  winRate: number;
  highestRating: number;
}

function computeManagerRank(wins: number): ManagerRank {
  if (wins === 0) return {
    title: 'Draft Çaylağı (Rookie)',
    badge: '🌱',
    color: 'border-zinc-800 bg-zinc-950 text-zinc-400',
    accent: 'bg-zinc-500',
    desc: 'Kariyerinin başındasın. İlk kupanı kazanarak adını kupa odasına yazdırmaya başla!',
  };
  if (wins === 1) return {
    title: 'Bronz Direktör (Bronze Director)',
    badge: '🥉',
    color: 'border-amber-900/50 bg-amber-950/10 text-amber-500',
    accent: 'bg-amber-600',
    desc: 'Tarihin ilk şampiyonluğunu kazandın! Bir taktik dâhisi olma yolunda ilk adım.',
  };
  if (wins === 2) return {
    title: 'Gümüş Taktisyen (Silver Tactician)',
    badge: '🥈',
    color: 'border-slate-800 bg-slate-950/25 text-slate-300',
    accent: 'bg-slate-400',
    desc: 'İki dünya kupası şampiyonluğu! Squad simülasyonlarında rüzgarı arkana aldın.',
  };
  if (wins === 3) return {
    title: 'Altın Antrenör (Gold Coach)',
    badge: '🥇',
    color: 'border-yellow-900/40 bg-yellow-950/20 text-yellow-400',
    accent: 'bg-yellow-500',
    desc: 'Üç yıldızlı baş antrenör! Oyuncuların senin taktik planlarını sahada kusursuz uyguluyor.',
  };
  if (wins === 4) return {
    title: 'Efsanevi Menajer (Legendary Manager)',
    badge: '🏆',
    color: 'border-[#e8ff3b]/20 bg-[#e8ff3b]/5 text-[#e8ff3b]',
    accent: 'bg-[#e8ff3b]',
    desc: 'Deltalar üstü taktiksel kurgu! Küresel futbol federasyonları senin taktik formasyonlarını inceliyor.',
  };
  return {
    title: 'GOAT Dehası (Immortal GOAT)',
    badge: '👑',
    color: 'border-purple-900/40 bg-purple-950/25 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]',
    accent: 'bg-purple-500',
    desc: 'Taktik evreninin tartışmasız en büyüğü! Rekorlar kupa müzeni doldurdu taşıyor.',
  };
}

export function useHistory() {
  const [historyList, setHistoryList] = useState<GameRecord[]>([]);
  const [filterTeam, setFilterTeam] = useState<string>('all');
  const [sortBy, setSortBy] = useState<HistorySortBy>('date_new');
  const [isClient, setIsClient] = useState(false);

  // SSR-safe initialization
  useEffect(() => {
    const loaded = loadHistory();
    const cleaned = normalizeAndSave(loaded);
    setHistoryList(cleaned);
    setIsClient(true);
  }, []);

  const handleClearAllHistory = () => {
    if (confirm('Are you sure you want to permanently clear your Dream XI game history?')) {
      clearHistory();
      setHistoryList([]);
    }
  };

  // Sadece gerçekte olan takımları göster dropdown'da
  const historyTeamsList = useMemo(() => {
    const ids = Array.from(new Set(historyList.map(h => h.teamId)));
    return teams.filter(t => ids.includes(t.id));
  }, [historyList]);

  // Filtre + Sıralama
  const filteredAndSortedRecords = useMemo(() => {
    let result = [...historyList];

    if (filterTeam !== 'all') {
      result = result.filter(h => h.teamId === filterTeam);
    }

    result.sort((a, b) => {
      if (sortBy === 'date_new')   return new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime();
      if (sortBy === 'date_old')   return new Date(a.playedAt).getTime() - new Date(b.playedAt).getTime();
      if (sortBy === 'rating_high') return b.teamRating - a.teamRating;
      if (sortBy === 'score_ratio') {
        if (a.won && !b.won) return -1;
        if (!a.won && b.won) return 1;
        return b.teamRating - a.teamRating;
      }
      return 0;
    });

    return result;
  }, [historyList, filterTeam, sortBy]);

  // Toplu istatistikler
  const stats: HistoryStats = useMemo(() => {
    const total = historyList.length;
    const wins  = historyList.filter(h => h.won).length;
    return {
      total,
      wins,
      winRate: total > 0 ? Math.round((wins / total) * 100) : 0,
      highestRating: total > 0 ? Math.max(...historyList.map(h => h.teamRating)) : 0,
    };
  }, [historyList]);

  // En yüksek ratingli kadro
  const highestRatedRecord = useMemo(() =>
    historyList.length === 0
      ? null
      : [...historyList].sort((a, b) => b.teamRating - a.teamRating)[0],
    [historyList],
  );

  // Menajer rank
  const managerRank = useMemo(() => computeManagerRank(stats.wins), [stats.wins]);

  return {
    isClient,
    historyList,
    filteredAndSortedRecords,
    filterTeam,
    setFilterTeam,
    sortBy,
    setSortBy,
    stats,
    highestRatedRecord,
    managerRank,
    historyTeamsList,
    handleClearAllHistory,
  };
}
