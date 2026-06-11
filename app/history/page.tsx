'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home, HelpCircle } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useHistory } from '@/hooks/useHistory';
import { useLanguage } from '@/components/LanguageProvider';

import ManagerRankCard from '@/components/history/ManagerRankCard';
import HighestSquadPanel from '@/components/history/HighestSquadPanel';
import MetricsBillboard from '@/components/history/MetricsBillboard';
import TrophyCabinet from '@/components/history/TrophyCabinet';
import HistoryControls from '@/components/history/HistoryControls';
import HistoryRecordCard from '@/components/history/HistoryRecordCard';

export default function HistoryPage() {
  const { t, language, toggleLanguage, isMounted } = useLanguage();
  const {
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
  } = useHistory();

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#0a0c0f] flex items-center justify-center font-mono text-zinc-500 text-xs">
        {isMounted ? t('booting_db') : 'Booting Chronicles Database...'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c0f] text-[#f0f0f0] p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6 font-sans">
        
        {/* TOP BAR / NAVIGATION HEADER */}
        <header className="flex justify-between items-center border-b border-zinc-900 pb-5">
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="p-2 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-[#e8ff3b] rounded-xl transition-all"
              title={isMounted ? t('go_back_lobby') : 'Go Back to Lobby'}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display font-bold text-2xl text-zinc-100 uppercase tracking-tight">
                {isMounted ? t('history_title') : 'Dream XI Trophy Cabinet'}
              </h1>
              <p className="text-xs text-zinc-500 font-mono uppercase">
                {isMounted ? t('history_subtitle') : 'Historical Hall of Fame logs'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="history-lang-btn"
              onClick={toggleLanguage}
              className="text-xs font-mono tracking-wider bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-[#e8ff3b] px-2.5 py-2 rounded-xl text-zinc-400 transition-all uppercase"
            >
              {isMounted ? (language === 'en' ? 'TR 🇹🇷' : 'EN 🇬🇧') : '...'}
            </button>
            <Link
              href="/"
              className="flex items-center gap-1.5 px-4 py-2 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-xl text-xs font-mono text-zinc-300 hover:text-white transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isMounted ? t('nav_play_lobby') : 'Play Lobby'}
              </span>
            </Link>
          </div>
        </header>

        {/* MANAGER RANK PROFILE CARD & HIGHEST SQUAD PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ManagerRankCard managerRank={managerRank} stats={stats} />
          <HighestSquadPanel record={highestRatedRecord} />
        </div>

        {/* METRICS BILLBOARD ROW */}
        <MetricsBillboard stats={stats} />

        {/* VISUAL TROPHY CABINET & ACHIEVEMENTS */}
        <TrophyCabinet historyList={historyList} />

        {/* CONTROLS AREA: FILTER & SORT */}
        <HistoryControls
          filterTeam={filterTeam}
          setFilterTeam={setFilterTeam}
          sortBy={sortBy}
          setSortBy={setSortBy}
          historyTeamsList={historyTeamsList}
          showClearButton={historyList.length > 0}
          handleClearAllHistory={handleClearAllHistory}
        />

        {/* RESULTS FEED LIST */}
        <div className="space-y-3">
          {filteredAndSortedRecords.length === 0 ? (
            <div className="text-center py-20 bg-zinc-950 border border-zinc-900 border-dashed rounded-3xl p-8">
              <HelpCircle className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <h3 className="font-display font-medium text-white mb-1 uppercase tracking-wider text-sm">
                {isMounted ? t('history_no_records') : 'No Cabinet Records'}
              </h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                {isMounted ? t('history_no_records_desc') : 'No historic records match these filtering conditions. Jump onto the main lobby, execute simulation runs to populate reports!'}
              </p>
              <Link
                href="/"
                className="mt-5 inline-block px-5 py-2.5 bg-[#e8ff3b] text-black font-display font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-[#d6ec2b] transition-all"
              >
                {isMounted ? t('history_start_first') : 'Begin First Simulation'}
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedRecords.map((record) => (
                  <HistoryRecordCard key={record.id} record={record} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
