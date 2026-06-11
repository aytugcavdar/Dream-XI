'use client';

import React from 'react';
import { Filter, SortAsc, Trash2 } from 'lucide-react';
import { NationalTeam } from '@/types';
import { HistorySortBy } from '@/hooks/useHistory';

import { useLanguage } from '@/components/LanguageProvider';

interface HistoryControlsProps {
  filterTeam: string;
  setFilterTeam: (val: string) => void;
  sortBy: HistorySortBy;
  setSortBy: (val: HistorySortBy) => void;
  historyTeamsList: NationalTeam[];
  showClearButton: boolean;
  handleClearAllHistory: () => void;
}

export default function HistoryControls({
  filterTeam,
  setFilterTeam,
  sortBy,
  setSortBy,
  historyTeamsList,
  showClearButton,
  handleClearAllHistory,
}: HistoryControlsProps) {
  const { t, isMounted } = useLanguage();

  return (
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
            <option value="all" className="bg-zinc-950">
              {isMounted ? t('history_all_nations') : 'All Nations'}
            </option>
            {historyTeamsList.map((tItem) => (
              <option key={tItem.id} value={tItem.id} className="bg-zinc-950">
                {tItem.flag} {tItem.name}
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
            onChange={(e) => setSortBy(e.target.value as HistorySortBy)}
            className="bg-transparent text-xs text-zinc-200 outline-none pr-6 cursor-pointer font-sans min-w-[150px]"
          >
            <option value="date_new" className="bg-zinc-950">
              {isMounted ? t('history_date_new') : 'Date: Newest First'}
            </option>
            <option value="date_old" className="bg-zinc-950">
              {isMounted ? t('history_date_old') : 'Date: Oldest First'}
            </option>
            <option value="rating_high" className="bg-zinc-950">
              {isMounted ? t('history_sort_ovr') : 'Squad Quality OVR'}
            </option>
            <option value="score_ratio" className="bg-zinc-950">
              {isMounted ? t('history_sort_status') : 'Tournament Champion Status'}
            </option>
          </select>
        </div>
      </div>

      {/* Delete all button */}
      {showClearButton && (
        <button
          id="clear-all-history-btn"
          onClick={handleClearAllHistory}
          className="py-2 px-4 border border-red-950 hover:bg-red-950/20 text-red-400 hover:text-red-300 rounded-xl flex items-center justify-center gap-2 text-xs font-mono transition-all uppercase tracking-wider"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{isMounted ? t('history_wipe') : 'Full Data Wipe'}</span>
        </button>
      )}
    </div>
  );
}
