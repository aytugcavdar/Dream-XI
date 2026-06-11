'use client';

import React from 'react';
import { NationalTeam, ChemistryBreakdown } from '@/types';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

interface SidebarRollStateProps {
  isRollingDraft: boolean;
  rollingDisplayTeam: NationalTeam | null;
  rollingDisplayYear: number | null;
  squadCount: number;
  chemistryBreakdown: ChemistryBreakdown;
  onRollTeam: () => void;
}

export default function SidebarRollState({
  isRollingDraft,
  rollingDisplayTeam,
  rollingDisplayYear,
  squadCount,
  chemistryBreakdown,
  onRollTeam,
}: SidebarRollStateProps) {
  const { t, isMounted } = useLanguage();
  return (
    <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 animate-pulse" />
            <h3 className="font-display font-semibold text-sm uppercase text-white tracking-wider">
              {isMounted ? t('build_next_pool') : 'Next Draft Pool'}
            </h3>
          </div>
        </div>

        <div className="text-center py-10 px-4 bg-zinc-900/40 border border-zinc-900 rounded-2xl mb-6 relative overflow-hidden">
          {isRollingDraft ? (
            /* Rolling animation */
            <div className="py-4 flex flex-col items-center justify-center space-y-3">
              <span className="text-5xl animate-bounce select-none">
                {rollingDisplayTeam?.flag || '⚽'}
              </span>
              <div className="font-display font-black text-xl text-[#e8ff3b] min-h-[1.75rem] uppercase tracking-tight animate-pulse text-center">
                {rollingDisplayTeam?.name || (isMounted ? t('build_searching_db') : 'Searching Database...')}
              </div>
              <div className="font-mono text-xs text-zinc-500">
                {isMounted ? t('build_year_variant') : 'Year variant:'} {rollingDisplayYear || '????'}
              </div>
            </div>
          ) : (
            /* Idle view */
            <div className="py-4 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-3xl shadow-lg leading-none select-none">
                🎰
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm text-zinc-200 uppercase tracking-wide">
                  {isMounted ? t('build_roll_next_title') : 'Roll Next National Team'}
                </h4>
                <p className="text-[11px] text-zinc-500 max-w-xs leading-relaxed mx-auto">
                  {isMounted ? t('build_roll_next_desc') : 'Your previous draft pick has been slotted successfully! Spin the wheel to pull a new random historical squad and recruit another global star!'}
                </p>
              </div>
            </div>
          )}
        </div>

        {!isRollingDraft && (
          <button
            onClick={onRollTeam}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-[#e8ff3b] text-black font-display font-black text-xs tracking-widest uppercase rounded-xl shadow-lg cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>{isMounted ? t('build_roll_btn') : '🎰 ROLL NEW DRAFT COUNTRY'}</span>
          </button>
        )}
      </div>

      {/* Squad progress footer */}
      <SidebarProgressFooter squadCount={squadCount} chemistryBreakdown={chemistryBreakdown} />
    </div>
  );
}

/** Shared progress bars used by both Roll and Active Draft sidebars. */
export function SidebarProgressFooter({
  squadCount,
  chemistryBreakdown,
}: {
  squadCount: number;
  chemistryBreakdown: ChemistryBreakdown;
}) {
  const { t, isMounted } = useLanguage();
  return (
    <div className="border-t border-zinc-900 pt-4 mt-6 space-y-3.5">
      {/* Squad Count */}
      <div>
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-1">
          <span className="flex items-center gap-1">📋 <span>{isMounted ? t('build_squad_progress') : 'Squad Progress'}</span></span>
          <strong className="text-white font-bold">{squadCount}/11</strong>
        </div>
        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${(squadCount / 11) * 100}%` }}
          />
        </div>
      </div>

      {/* Chemistry Meter */}
      <div>
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-1">
          <span className="flex items-center gap-1">🧬 <span>{isMounted ? t('build_team_chemistry_label') : 'Team Chemistry'}</span></span>
          <strong className="text-[#e8ff3b] font-bold">{chemistryBreakdown.chemistry}%</strong>
        </div>
        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-[#e8ff3b] h-full transition-all duration-300"
            style={{ width: `${chemistryBreakdown.chemistry}%` }}
          />
        </div>
      </div>

      {/* Synergy pills */}
      {squadCount > 0 && (
        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-mono">
          <div className="bg-zinc-900/60 border border-zinc-850 p-1.5 rounded-lg text-center flex flex-col justify-center items-center gap-0.5">
            <span className="text-zinc-500 uppercase tracking-tight text-[8px]">{isMounted ? t('build_preferred_role') : 'Preferred Role'}</span>
            <strong className="text-zinc-200">{chemistryBreakdown.preferredPositions}/{squadCount} OK</strong>
          </div>

          {chemistryBreakdown.countryCore ? (
            <div className="bg-zinc-900/60 border border-zinc-850 p-1.5 rounded-lg text-center flex flex-col justify-center items-center gap-0.5">
              <span className="text-zinc-500 uppercase tracking-tight text-[8px]">{isMounted ? t('build_nation_core') : 'Nation Core'}</span>
              <strong className="text-zinc-200 truncate max-w-full flex items-center gap-1 flex-row">
                <span>{chemistryBreakdown.countryCore.team.flag}</span>
                <span className="truncate">{chemistryBreakdown.countryCore.team.name.split(' ')[0]}</span>
              </strong>
            </div>
          ) : (
            <div className="bg-zinc-900/10 border border-dashed border-zinc-900 p-1.5 rounded-lg text-center flex flex-col justify-center items-center text-zinc-500 font-light text-[9px]">
              <span>{isMounted ? t('build_no_nation_link') : 'No Nationality Link'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
