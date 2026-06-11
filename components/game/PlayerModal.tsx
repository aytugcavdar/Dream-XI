'use client';

import React, { useEffect } from 'react';
import { Player } from '@/types';
import { editions } from '@/data/editions';
import { X, Award, Shield, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/components/LanguageProvider';

interface PlayerModalProps {
  player: Player | null;
  onClose: () => void;
}

export default function PlayerModal({ player, onClose }: PlayerModalProps) {
  const { t, language, isMounted } = useLanguage();
  const isTr = language === 'tr';

  useEffect(() => {
    if (!player) return;

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Lock body-scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [player, onClose]);

  if (!player) return null;

  // Find host countries for the years the player participated in
  const getHostCountry = (year: number) => {
    const edit = editions.find(e => e.year === year);
    return edit ? edit.host : (isTr ? 'Ev Sahibi Ülke' : 'Host Country');
  };

  const isLegendary = player.rating >= 93 || player.legendary === true;

  // Position color coding
  const getPositionColor = (posGroup: string) => {
    switch (posGroup) {
      case 'GK': return 'text-amber-400 border-amber-400 bg-amber-400/10';
      case 'DEF': return 'text-blue-400 border-blue-400 bg-blue-400/10';
      case 'MID': return 'text-emerald-400 border-emerald-400 bg-emerald-400/10';
      case 'ATT': return 'text-red-400 border-red-400 bg-red-400/10';
      default: return 'text-zinc-400 border-zinc-400 bg-zinc-400/10';
    }
  };

  // Human flag emojis mapping for hosts
  const getHostFlag = (host: string) => {
    if (host.includes('Switzerland')) return '🇨🇭';
    if (host.includes('Sweden')) return '🇸🇪';
    if (host.includes('Chile')) return '🇨🇱';
    if (host.includes('England')) return '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
    if (host.includes('Mexico')) return '🇲🇽';
    if (host.includes('West Germany') || host.includes('Germany')) return '🇩🇪';
    if (host.includes('Argentina')) return '🇦🇷';
    if (host.includes('Spain')) return '🇪🇸';
    if (host.includes('Italy')) return '🇮🇹';
    if (host.includes('United States')) return '🇺🇸';
    if (host.includes('France')) return '🇫🇷';
    if (host.includes('South Korea')) return '🇰🇷';
    if (host.includes('Japan')) return '🇯🇵';
    if (host.includes('South Africa')) return '🇿🇦';
    if (host.includes('Brazil')) return '🇧🇷';
    if (host.includes('Russia')) return '🇷🇺';
    if (host.includes('Qatar')) return '🇶🇦';
    return '⚽';
  };

  const getTeamFlag = (teamId: string) => {
    const flags: { [key: string]: string } = {
      brazil: '🇧🇷', germany: '🇩🇪', italy: '🇮🇹', argentina: '🇦🇷', france: '🇫🇷',
      spain: '🇪🇸', england: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', uruguay: '🇺🇾', netherlands: '🇳🇱', portugal: '🇵🇹',
      belgium: '🇧🇪', croatia: '🇭🇷', mexico: '🇲🇽', usa: '🇺🇸', senegal: '🇸🇳',
      cameroon: '🇨🇲', morocco: '🇲🇦', japan: '🇯🇵', south_korea: '🇰🇷', nigeria: '🇳🇬',
      sweden: '🇸🇪', denmark: '🇩🇰', colombia: '🇨🇴', chile: '🇨🇱', switzerland: '🇨🇭', turkey: '🇹🇷'
    };
    return flags[teamId] || '🏳️';
  };

  return (
    <AnimatePresence>
      <div 
        id="player-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        onClick={(e) => {
          if ((e.target as HTMLElement).id === 'player-modal-overlay') onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md overflow-hidden bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl"
        >
          {/* Top Banner Accent */}
          <div className="h-2 bg-gradient-to-r from-zinc-800 via-[#e8ff3b] to-zinc-800" />

          {/* Close button */}
          <button 
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6">
            {/* Header / Player Identity Card */}
            <div className="flex items-start gap-4 mb-5">
              {/* Rating Big Badge */}
              <div className="flex flex-col items-center justify-center p-3 w-16 h-20 bg-zinc-900 border border-zinc-800 rounded-xl">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest leading-none">OVR</span>
                <span className="font-display font-bold text-3xl text-[#e8ff3b]">{player.rating}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md mt-1 border border-zinc-700 font-mono">
                  {player.position}
                </span>
              </div>

              {/* Name and Basic Identity */}
              <div className="flex-1 mt-1">
                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 mb-1">
                  <span>{getTeamFlag(player.country)}</span>
                  <span className="uppercase tracking-wider">{player.country}</span>
                  <span className="text-zinc-600">•</span>
                  <span>{player.era}</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-zinc-100 leading-tight">
                  {player.name}
                </h2>
                
                {/* Specialty Badges */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getPositionColor(player.positionGroup)}`}>
                    {player.positionGroup}
                  </span>
                  {isLegendary && (
                    <span className="flex items-center gap-1 bg-[#e8ff3b]/10 text-[#e8ff3b] border border-[#e8ff3b]/20 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      <Award className="w-3 h-3" /> {isMounted ? t('modal_legendary') : 'Legendary'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Narrative Bio */}
            <div className="mb-5 p-3.5 bg-zinc-900/50 border border-zinc-900 rounded-xl">
              <p className="text-zinc-300 text-sm leading-relaxed italic z-10">
                &ldquo;{player.bio}&rdquo;
              </p>
            </div>

            {/* World Cup Career Campaign Stats */}
            <div className="mb-5">
              <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-zinc-400 mb-3 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#e8ff3b]" /> {isMounted ? t('modal_wc_stats') : 'In this World Cup (Career Averages)'}
              </h3>
              <div className="grid grid-cols-5 gap-2 text-center">
                <div className="bg-zinc-900 border border-zinc-800/60 p-2 rounded-lg">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">{isMounted ? t('modal_gp') : 'GP'}</div>
                  <div className="font-display font-bold text-lg text-zinc-100">{player.wcStats.matches}</div>
                </div>
                <div className="bg-zinc-900 border border-zinc-800/60 p-2 rounded-lg">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">{isMounted ? t('modal_g') : 'G'}</div>
                  <div className="font-display font-bold text-lg text-[#e8ff3b]">{player.wcStats.goals}</div>
                </div>
                <div className="bg-zinc-900 border border-zinc-800/60 p-2 rounded-lg">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">{isMounted ? t('modal_a') : 'A'}</div>
                  <div className="font-display font-bold text-lg text-zinc-100">{player.wcStats.assists}</div>
                </div>
                <div className="bg-zinc-900 border border-zinc-800/60 p-2 rounded-lg">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5 font-sans lowercase">xG</div>
                  <div className="font-display font-bold text-lg text-zinc-100">{player.wcStats.xG}</div>
                </div>
                <div className="bg-zinc-900 border border-[#e8ff3b]/10 p-2 rounded-lg">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">{isMounted ? t('modal_pass') : 'PASS%'}</div>
                  <div className="font-display font-bold text-lg text-zinc-100">{player.wcStats.passAccuracy}%</div>
                </div>
              </div>
            </div>

            {/* Career Tournaments List */}
            <div className="mb-1">
              <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-zinc-400 mb-2">
                {isMounted ? t('modal_appearances') : 'Tournament Appearances'}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {player.worldCups.map((year) => {
                  const host = getHostCountry(year);
                  return (
                    <span 
                      key={year} 
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-300 transition-colors"
                      title={isMounted ? (isTr ? `${year} Dünya Kupası - Ev Sahibi: ${host}` : `World Cup ${year} - Hosted by ${host}`) : `World Cup ${year} - Hosted by ${host}`}
                    >
                      <span>{getHostFlag(host)}</span>
                      <strong className="text-zinc-100 font-bold">{year}</strong>
                      <span className="text-zinc-600 text-[10px]">{host}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Special highlight for exceptional shooters */}
            {player.wcStats.goals > 3 && (
              <div className="mt-4 p-2.5 bg-red-950/20 border border-red-950/50 rounded-lg flex items-center gap-2 text-xs text-red-300 font-mono">
                <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                <span>
                  {isMounted 
                    ? (() => {
                        const raw = t('modal_golden_boot');
                        if (raw.includes(':')) {
                          const [title, rest] = raw.split(':');
                          return (
                            <>
                              <strong>{title}:</strong>{rest.replace('{goals}', String(player.wcStats.goals))}
                            </>
                          );
                        }
                        return raw.replace('{goals}', String(player.wcStats.goals));
                      })()
                    : (
                      <>
                        <strong>Golden Boot Highlight:</strong> Scored {player.wcStats.goals} historic goals overall, placing them in elite shooting categories!
                      </>
                    )
                  }
                </span>
              </div>
            )}
          </div>

          <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex justify-end">
            <button
              id="close-modal-bottom-btn"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 text-white rounded-lg text-xs font-mono tracking-wider uppercase transition-colors"
            >
              {isMounted ? t('modal_btn_close') : 'Close Record'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
