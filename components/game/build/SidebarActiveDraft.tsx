'use client';

import React, { useMemo, useState } from 'react';
import { Player, NationalTeam, ChemistryBreakdown } from '@/types';
import { RotateCcw, Search, Star, Sparkles, Info } from 'lucide-react';
import { SidebarProgressFooter } from './SidebarRollState';
import { useLanguage } from '@/components/LanguageProvider';

interface SidebarActiveDraftProps {
  currentDraftRoll: { team: NationalTeam; year: number };
  rerollsAvailable: number;
  isGoldenBallActive: boolean;
  selectedPlayerForAssignment: Player | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredPlayers: Player[];
  isPlayerAssigned: (id: string) => boolean;
  isPositionLimitReached: (positionGroup: string) => boolean;
  squadCount: number;
  chemistryBreakdown: ChemistryBreakdown;
  getGroupPill: (group: string) => string;
  onRerollDraftPool: () => void;
  onSelectPlayer: (player: Player) => void;
  onOpenPlayerModal: (player: Player) => void;
  onCancelSelection: () => void;
}

export default function SidebarActiveDraft({
  currentDraftRoll,
  rerollsAvailable,
  isGoldenBallActive,
  selectedPlayerForAssignment,
  searchQuery,
  setSearchQuery,
  filteredPlayers,
  isPlayerAssigned,
  isPositionLimitReached,
  squadCount,
  chemistryBreakdown,
  getGroupPill,
  onRerollDraftPool,
  onSelectPlayer,
  onOpenPlayerModal,
  onCancelSelection,
}: SidebarActiveDraftProps) {
  const { t, isMounted } = useLanguage();
  const [groupFilter, setGroupFilter] = useState<'ALL' | Player['positionGroup']>('ALL');
  const [sortMode, setSortMode] = useState<'rating' | 'name' | 'position'>('rating');

  const groupFilters: Array<'ALL' | Player['positionGroup']> = ['ALL', 'GK', 'DEF', 'MID', 'ATT'];

  const groupCounts = useMemo(() => {
    return filteredPlayers.reduce<Record<string, number>>((acc, player) => {
      acc[player.positionGroup] = (acc[player.positionGroup] || 0) + 1;
      return acc;
    }, { ALL: filteredPlayers.length });
  }, [filteredPlayers]);

  const visiblePlayers = useMemo(() => {
    return filteredPlayers
      .filter(player => groupFilter === 'ALL' || player.positionGroup === groupFilter)
      .sort((a, b) => {
        if (sortMode === 'name') return a.name.localeCompare(b.name);
        if (sortMode === 'position') return a.positionGroup.localeCompare(b.positionGroup) || b.rating - a.rating;
        return b.rating - a.rating;
      });
  }, [filteredPlayers, groupFilter, sortMode]);

  const bestAvailablePlayer = useMemo(() => {
    return visiblePlayers.find(player => !isPlayerAssigned(player.id) && !isPositionLimitReached(player.positionGroup));
  }, [visiblePlayers, isPlayerAssigned, isPositionLimitReached]);

  const withGoldenRating = (player: Player) => {
    const isGoldenCard = isGoldenBallActive && (player.rating >= 92 || player.legendary === true);
    return isGoldenCard ? { ...player, rating: Math.min(99, player.rating + 2) } : player;
  };

  return (
    <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-display font-semibold text-sm uppercase text-white tracking-wider">
              {isMounted ? t('build_roster_pool') : 'Roster Draft Pool'}
            </h3>
          </div>
        </div>

        {/* Active draft banner + reroll button */}
        <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl select-none">{currentDraftRoll.team.flag}</span>
            <div className="flex flex-col text-left">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 leading-none">
                {isMounted ? t('build_country_edition') : 'Country Edition'}
              </span>
              <strong className="font-display text-xs text-zinc-100 uppercase mt-0.5">
                {currentDraftRoll.team.name} <span className="text-[#e8ff3b] font-mono">({currentDraftRoll.year})</span>
              </strong>
            </div>
          </div>
          <button
            onClick={onRerollDraftPool}
            disabled={rerollsAvailable <= 0}
            className={`p-1 px-2.5 rounded-lg border text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 ${
              rerollsAvailable > 0
                ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20 cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.05)] animate-pulse'
                : 'bg-zinc-900 border-zinc-900 text-zinc-650 cursor-not-allowed'
            }`}
            title={isMounted 
              ? (rerollsAvailable > 0 ? t('build_reroll_tooltip').replace('{count}', String(rerollsAvailable)) : t('build_no_reroll_tooltip')) 
              : (rerollsAvailable > 0 ? `Spend 1 Reroll Ticket (${rerollsAvailable} Left)` : 'No Reroll Tickets Left')
            }
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>{isMounted ? t('build_btn_reroll_short').replace('{count}', String(rerollsAvailable)) : `Reroll (${rerollsAvailable})`}</span>
          </button>
        </div>

        {/* Golden Ball active banner */}
        {isGoldenBallActive && (
          <div className="mb-4 p-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-xl border border-amber-400/30 text-center animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.15)] select-none">
            <span className="text-[10px] font-mono font-bold text-black uppercase tracking-widest flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-black shrink-0 fill-current animate-bounce" />
              <span>{isMounted ? t('build_golden_draft_active') : '✨ GOLDEN DRAFT PICK ACTIVE (+2 OVR) ✨'}</span>
            </span>
          </div>
        )}

        {/* Selection status banner */}
        <div className="mb-4">
          {!selectedPlayerForAssignment ? (
            <div className="p-2.5 bg-zinc-900/30 border border-zinc-900 text-[11px] text-zinc-400 rounded-lg flex items-center gap-2 font-mono">
              <span className="animate-bounce text-xs">👉</span>
              <span>{isMounted ? t('build_draft_instruction_idle') : 'Click any player in the pool below to choose them for your line-up!'}</span>
            </div>
          ) : (
            <div className="p-2.5 bg-emerald-950/30 border border-emerald-900 text-[11px] text-emerald-300 rounded-lg flex items-center justify-between gap-2 font-mono animate-pulse">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">🎯</span>
                <span>
                  {isMounted ? t('build_draft_instruction_active').replace('{group}', selectedPlayerForAssignment.positionGroup).replace('{name}', selectedPlayerForAssignment.name) : `Click a glowing ${selectedPlayerForAssignment.positionGroup} spot on the field to draft ${selectedPlayerForAssignment.name}!`}
                </span>
              </div>
              <button
                onClick={onCancelSelection}
                className="text-[9px] uppercase hover:text-red-400 border border-dashed border-emerald-800 rounded px-1.5 py-0.5 bg-emerald-950/60"
              >
                {isMounted ? t('build_btn_cancel') : 'Cancel'}
              </button>
            </div>
          )}
        </div>

        {/* Search input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-600" />
          <input
            type="text"
            placeholder={isMounted ? t('build_search_placeholder') : "Search name, position, group..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/60 text-zinc-200 pl-9 pr-4 py-2 text-xs rounded-xl border border-zinc-900 focus:outline-none focus:border-[#e8ff3b] font-mono placeholder:text-zinc-600"
          />
        </div>

        <div className="mb-4 space-y-3">
          <div className="grid grid-cols-5 gap-1.5">
            {groupFilters.map(group => {
              const active = groupFilter === group;
              return (
                <button
                  key={group}
                  onClick={() => setGroupFilter(group)}
                  className={`rounded-lg border px-2 py-1.5 text-[10px] font-mono font-bold transition-all ${
                    active
                      ? 'border-[#e8ff3b] bg-[#e8ff3b] text-black'
                      : 'border-zinc-850 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100'
                  }`}
                >
                  <span>{group}</span>
                  <span className={`ml-1 ${active ? 'text-black/70' : 'text-zinc-600'}`}>
                    {groupCounts[group] || 0}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-2">
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as 'rating' | 'name' | 'position')}
              className="bg-zinc-900/60 border border-zinc-850 text-zinc-300 rounded-lg px-2 py-2 text-[10px] font-mono uppercase focus:outline-none focus:border-[#e8ff3b]"
            >
              <option value="rating">Sort: Rating</option>
              <option value="position">Sort: Role</option>
              <option value="name">Sort: Name</option>
            </select>
            <button
              disabled={!bestAvailablePlayer}
              onClick={() => bestAvailablePlayer && onSelectPlayer(withGoldenRating(bestAvailablePlayer))}
              className={`rounded-lg border px-3 py-2 text-[10px] font-mono font-bold uppercase transition-all ${
                bestAvailablePlayer
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/20'
                  : 'border-zinc-900 bg-zinc-950/50 text-zinc-650 cursor-not-allowed'
              }`}
            >
              Best Pick
            </button>
          </div>
        </div>

        {/* Player list */}
        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
          {visiblePlayers.length === 0 ? (
            <div className="text-center py-10 text-zinc-600 font-mono text-xs">
              {isMounted ? t('build_no_players_search') : 'No players matching search criteria'}
            </div>
          ) : (
            visiblePlayers.map((player) => {
              const isAssigned = isPlayerAssigned(player.id);
              const isSelected = selectedPlayerForAssignment?.id === player.id;
              const isPositionFull = !isAssigned && isPositionLimitReached(player.positionGroup);

              const isGoldenCard = isGoldenBallActive && (player.rating >= 92 || player.legendary === true);
              const displayRating = isGoldenCard ? Math.min(99, player.rating + 2) : player.rating;
              const isLegendary = player.rating >= 93 || player.legendary === true || isGoldenCard;

              let cardClass = 'bg-zinc-900/60 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900';
              let pillClass = getGroupPill(player.positionGroup);

              if (isAssigned) {
                cardClass = 'bg-zinc-900/30 border-zinc-950 opacity-45 cursor-not-allowed';
              } else if (isPositionFull) {
                cardClass = 'bg-zinc-950/20 border-zinc-950/60 opacity-50 cursor-not-allowed';
                pillClass = 'bg-zinc-850 text-zinc-550 border border-zinc-900';
              } else if (isGoldenCard) {
                cardClass = 'bg-gradient-to-r from-amber-950/30 via-yellow-950/20 to-amber-950/30 border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]';
                pillClass = 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black';
              } else if (isSelected) {
                cardClass = 'bg-emerald-950/50 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]';
                pillClass = 'bg-emerald-400 text-black';
              }

              return (
                <div
                  key={player.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${cardClass}`}
                >
                  <button
                    disabled={isAssigned || isPositionFull}
                    onClick={() => {
                      onSelectPlayer(withGoldenRating(player));
                    }}
                    className="flex-1 flex items-center gap-2.5 cursor-pointer text-left focus:outline-none"
                  >
                    {/* Rating pill */}
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-display font-black text-xs ${pillClass}`}>
                      {displayRating}
                    </div>

                    {/* Player identity */}
                    <div className="flex-1 min-w-0">
                      <div className="font-sans font-semibold text-xs text-zinc-100 truncate flex items-center gap-1.5">
                        <span className={isGoldenCard ? 'text-amber-400 font-bold' : isPositionFull ? 'text-zinc-500' : ''}>
                          {player.name}
                        </span>
                        {isPositionFull && (
                          <span className="text-[8px] bg-red-950/40 text-red-400 border border-red-900/40 px-1 py-0.2 rounded font-mono font-bold uppercase shrink-0">
                            {isMounted ? t('build_position_full') : 'POSITION FULL'}
                          </span>
                        )}
                        {isGoldenCard && !isPositionFull && (
                          <span className="text-[8px] bg-amber-400 text-black px-1 py-0.2 rounded font-mono font-bold uppercase shrink-0">
                            👑 {isMounted ? t('build_golden_tag') : 'GOLDEN'}
                          </span>
                        )}
                        {isLegendary && !isGoldenCard && !isPositionFull && (
                          <Star className="w-3 h-3 text-[#e8ff3b] fill-[#e8ff3b] inline" />
                        )}
                      </div>
                      <div className="font-mono text-[9px] text-zinc-500 space-x-1 mt-0.5">
                        <span className="uppercase text-zinc-400 font-bold">{player.position}</span>
                        <span>•</span>
                        <span>{player.era.split(' ')[0]}</span>
                        <span>•</span>
                        <span>{isMounted ? t('build_card_goals') : 'Goals'}: {player.wcStats.goals}</span>
                      </div>
                    </div>
                  </button>

                  {/* Info button */}
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => onOpenPlayerModal(player)}
                      className="p-1 px-1.5 hover:bg-zinc-800 rounded border border-zinc-850 text-zinc-500 hover:text-white transition-all"
                      title={isMounted ? t('build_view_stats_tooltip') : 'View player statistics file'}
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Shared progress footer */}
      <SidebarProgressFooter squadCount={squadCount} chemistryBreakdown={chemistryBreakdown} />
    </div>
  );
}
