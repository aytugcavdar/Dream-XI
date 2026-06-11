'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Player, NationalTeam, Formation, SquadSlot } from '@/types';
import { formations } from '@/data/formations';
import { getPlayersByTeamAndYear } from '@/data/players';
import { teams } from '@/data/teams';
import { PARTNERSHIPS, TACTICAL_STYLES } from '@/lib/constants';
import { ArrowLeft, Play, Info, RotateCcw, AlertTriangle, ShieldAlert, Star, Search, Plus, Trash2, Trophy, Award, Zap, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SidebarSquadComplete from './build/SidebarSquadComplete';
import SidebarRollState from './build/SidebarRollState';
import SidebarActiveDraft from './build/SidebarActiveDraft';
import PitchCanvas from './build/PitchCanvas';
import FormationSelector from './build/FormationSelector';
import { useLanguage } from '@/components/LanguageProvider';

// Re-export for any consumers that still import TACTICAL_STYLES from here
export { TACTICAL_STYLES };

interface BuildPhaseProps {
  team: NationalTeam;
  year: number;
  selectedFormationId: string;
  selectedTacticalStyle: string;
  squad: { [slotId: string]: Player | null };
  onUpdateSquad: (newSquad: { [slotId: string]: Player | null }) => void;
  onUpdateFormation: (formationId: string) => void;
  onUpdateTacticalStyle: (styleId: string) => void;
  onSimulate: () => void;
  onReroll: () => void;
  onOpenPlayerModal: (player: Player) => void;
}

export default function BuildPhase({
  team,
  year,
  selectedFormationId,
  selectedTacticalStyle,
  squad,
  onUpdateSquad,
  onUpdateFormation,
  onUpdateTacticalStyle,
  onSimulate,
  onReroll,
  onOpenPlayerModal
}: BuildPhaseProps) {
  const { t, language, toggleLanguage, isMounted } = useLanguage();
  // Sound controls
  const [soundEnabled, setSoundEnabled] = useState(true);
  // Persistent AudioContext — reused across calls to avoid GC pressure
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Joker retry rerolls count & Golden card active trigger modifiers
  const [rerollsAvailable, setRerollsAvailable] = useState(3);
  const [isGoldenBallActive, setIsGoldenBallActive] = useState(false);

  // Unified Global Team Draft Pool states
  const [currentDraftRoll, setCurrentDraftRoll] = useState<{ team: NationalTeam; year: number } | null>({ team, year });
  const [isRollingDraft, setIsRollingDraft] = useState(false);
  const [rollingDisplayTeam, setRollingDisplayTeam] = useState<NationalTeam | null>(null);
  const [rollingDisplayYear, setRollingDisplayYear] = useState<number | null>(null);
  
  // Player selected in the pool on the right, waiting for assignment on the pitch on the left
  const [selectedPlayerForAssignment, setSelectedPlayerForAssignment] = useState<Player | null>(null);

  const activeFormation = useMemo(() => {
    return formations.find(f => f.id === selectedFormationId) || formations[0];
  }, [selectedFormationId]);

  // Sidebar search filter query
  const [searchQuery, setSearchQuery] = useState('');

  // Formation Change Warning State
  const [pendingFormationId, setPendingFormationId] = useState<string | null>(null);

  // Chemistry detailed breakdown popover visible
  const [showChemDetails, setShowChemDetails] = useState(false);

  // Derive squad counts and ratings
  const squadPlayers = useMemo(() => {
    return Object.values(squad).filter((p): p is Player => p !== null);
  }, [squad]);

  const squadCount = squadPlayers.length;

  const averageRating = useMemo(() => {
    if (squadPlayers.length === 0) return 0;
    const total = squadPlayers.reduce((sum, p) => sum + p.rating, 0);
    return Math.round(total / squadPlayers.length);
  }, [squadPlayers]);

  // Visual Chemistry / Synergy Links calculation
  const synergyLines = useMemo(() => {
    const lines: Array<{
      id: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      type: 'gold' | 'double-emerald' | 'emerald' | 'cyan';
      label: string;
    }> = [];

    const slots = activeFormation.slots;
    for (let i = 0; i < slots.length; i++) {
      for (let j = i + 1; j < slots.length; j++) {
        const s1 = slots[i];
        const s2 = slots[j];
        
        // Compute tactical distance on pitch coordinates (0-100)
        const dx = s1.x - s2.x;
        const dy = s1.y - s2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Connections are drawn only between adjacent slots (distance < 33)
        if (dist < 33) {
          const p1 = squad[s1.id];
          const p2 = squad[s2.id];
          
          if (p1 && p2) {
            // Check for historic legendary combo partners
            let isGold = false;
            let partnerName = '';
            const name1 = p1.name.toLowerCase();
            const name2 = p2.name.toLowerCase();
            
            for (const pair of PARTNERSHIPS) {
              const p1Low = pair.p1.toLowerCase();
              const p2Low = pair.p2.toLowerCase();
              if ((name1.includes(p1Low) && name2.includes(p2Low)) || (name1.includes(p2Low) && name2.includes(p1Low))) {
                isGold = true;
                partnerName = pair.name;
                break;
              }
            }
            
            const sameCountry = p1.country === p2.country;
            const sameEra = p1.era.split(' ')[0] === p2.era.split(' ')[0];
            
            if (isGold) {
              lines.push({
                id: `${s1.id}-${s2.id}`,
                x1: s1.x,
                y1: s1.y,
                x2: s2.x,
                y2: s2.y,
                type: 'gold',
                label: isMounted ? t('synergy_legend') : '🤝 legend'
              });
            } else if (sameCountry && sameEra) {
              lines.push({
                id: `${s1.id}-${s2.id}`,
                x1: s1.x,
                y1: s1.y,
                x2: s2.x,
                y2: s2.y,
                type: 'double-emerald',
                label: isMounted ? t('synergy_chemistry') : '🧬 chemistry'
              });
            } else if (sameCountry) {
              lines.push({
                id: `${s1.id}-${s2.id}`,
                x1: s1.x,
                y1: s1.y,
                x2: s2.x,
                y2: s2.y,
                type: 'emerald',
                label: isMounted ? t('synergy_nation') : '🌎 nation'
              });
            } else if (sameEra) {
              lines.push({
                id: `${s1.id}-${s2.id}`,
                x1: s1.x,
                y1: s1.y,
                x2: s2.x,
                y2: s2.y,
                type: 'cyan',
                label: isMounted ? t('synergy_era') : '⏳ era'
              });
            }
          }
        }
      }
    }
    return lines;
  }, [activeFormation, squad, isMounted, t]);

  // Simple Web Audio API Synthesizer sounds for arcade feel
  const playSound = (type: 'roll-tick' | 'roll-stop' | 'select' | 'place' | 'clear' | 'success') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      
      if (type === 'roll-tick') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } else if (type === 'roll-stop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(480, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'select') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'place') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } else if (type === 'clear') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'success') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();
        
        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(ctx.destination);
        gain2.connect(ctx.destination);
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        osc1.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
        osc1.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.24); // C6
        gain1.gain.setValueAtTime(0.08, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(261.63, ctx.currentTime); // C4 support
        gain2.gain.setValueAtTime(0.05, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.45);
        osc2.stop(ctx.currentTime + 0.45);
      }
    } catch (e) {
      // Ignored if blocked by autoplay policy
    }
  };

  // Chemistry scoring system calculation
  const chemistryBreakdown = useMemo(() => {
    if (squadPlayers.length === 0) {
      return {
        chemistry: 0,
        preferredPositions: 0,
        countryCore: null,
        eraCore: null,
        activePartnerships: [] as Array<{ name: string; desc: string }>
      };
    }

    let positionBonus = 0;
    let preferredPositionsCount = 0;
    
    // 1. Position matches (perfect role matching)
    activeFormation.slots.forEach(slot => {
      const p = squad[slot.id];
      if (p) {
        if (p.position === slot.role) {
          positionBonus += 6; 
          preferredPositionsCount++;
        } else {
          positionBonus += 3;
        }
      }
    });

    // 2. Nationality links count
    const countryCounts: { [countryId: string]: number } = {};
    squadPlayers.forEach(p => {
      countryCounts[p.country] = (countryCounts[p.country] || 0) + 1;
    });

    let countryLinkBonus = 0;
    Object.values(countryCounts).forEach(count => {
      if (count > 1) {
        countryLinkBonus += (count - 1) * 12; // extra reward for stacking same nations
      }
    });

    // Find the country with the most players
    let topCountryId: string | null = null;
    let maxCountryCount = 0;
    Object.entries(countryCounts).forEach(([cId, count]) => {
      if (count > maxCountryCount) {
        maxCountryCount = count;
        topCountryId = cId;
      }
    });
    const countryCoreTeam = topCountryId ? teams.find(t => t.id === topCountryId) : null;

    // 3. Era/Year links
    const eraCounts: { [year: string]: number } = {};
    squadPlayers.forEach(p => {
      const yr = p.era.split(' ')[0];
      eraCounts[yr] = (eraCounts[yr] || 0) + 1;
    });

    let eraLinkBonus = 0;
    Object.values(eraCounts).forEach(count => {
      if (count > 1) {
        eraLinkBonus += (count - 1) * 8;
      }
    });

    // Find the year with the most players
    let topYear = null;
    let maxYearCount = 0;
    Object.entries(eraCounts).forEach(([yr, count]) => {
      if (count > maxYearCount) {
        maxYearCount = count;
        topYear = yr;
      }
    });

    // 4. Legendary Partnerships evaluation
    const activePartnerships: Array<{ name: string; desc: string }> = [];
    let partnershipBonus = 0;
    const playerNamesStr = squadPlayers.map(p => p.name.toLowerCase());

    PARTNERSHIPS.forEach(pair => {
      const hasP1 = playerNamesStr.some(name => name.includes(pair.p1.toLowerCase()));
      const hasP2 = playerNamesStr.some(name => name.includes(pair.p2.toLowerCase()));
      if (hasP1 && hasP2) {
        activePartnerships.push(pair);
        partnershipBonus += 15; // +15 Chemistry per active legendary duo!
      }
    });

    // Total Base points
    const basePoints = squadPlayers.length * 3;

    const totalChemistry = Math.min(100, positionBonus + countryLinkBonus + eraLinkBonus + basePoints + partnershipBonus);

    return {
      chemistry: totalChemistry,
      preferredPositions: preferredPositionsCount,
      countryCore: countryCoreTeam && maxCountryCount > 1 ? { team: countryCoreTeam, count: maxCountryCount } : null,
      eraCore: topYear && maxYearCount > 1 ? { year: topYear, count: maxYearCount } : null,
      activePartnerships,
      details: {
        positionBonus,
        countryLinkBonus,
        eraLinkBonus,
        basePoints,
        partnershipBonus
      }
    };
  }, [squad, squadPlayers, activeFormation]);

  // Available players database for the active draft pool
  const availableRoster = useMemo(() => {
    if (!currentDraftRoll) return [];
    return getPlayersByTeamAndYear(currentDraftRoll.team.id, currentDraftRoll.year);
  }, [currentDraftRoll]);

  // Handle slot click
  const handleSlotClick = (slotId: string, playerSelected: Player | null, slotGroup?: string) => {
    if (playerSelected) {
      const updated = { ...squad };

      if (selectedPlayerForAssignment && (!slotGroup || selectedPlayerForAssignment.positionGroup === slotGroup)) {
        Object.keys(updated).forEach(key => {
          if (updated[key]?.id === selectedPlayerForAssignment.id) {
            updated[key] = null;
          }
        });
        updated[slotId] = selectedPlayerForAssignment;
        setSelectedPlayerForAssignment(null);
        setCurrentDraftRoll(null);
        setSearchQuery('');
        playSound('place');
      } else {
        updated[slotId] = null;
        playSound('clear');
      }

      onUpdateSquad(updated);
      return;
    } else {
      // If we have a player selected in the sidebar, let's slot them in if compatible
      if (selectedPlayerForAssignment) {
        if (!slotGroup || selectedPlayerForAssignment.positionGroup === slotGroup) {
          const updated = { ...squad };
          
          // Remove from other slots if any duplicates exist
          Object.keys(updated).forEach(key => {
            if (updated[key]?.id === selectedPlayerForAssignment.id) {
              updated[key] = null;
            }
          });

          updated[slotId] = selectedPlayerForAssignment;
          onUpdateSquad(updated);

          // Audio responses
          const nextCount = Object.values(updated).filter((p): p is Player => p !== null).length;
          if (nextCount === 11) {
            playSound('success');
          } else {
            playSound('place');
          }

          // Clear selected player and consume the current draft selection pool
          setSelectedPlayerForAssignment(null);
          setCurrentDraftRoll(null);
          setSearchQuery('');
        }
      }
    }
  };

  // Helper to roll random national team & year
  const rollRandomTeamAndYear = () => {
    const randomTeam = teams[Math.floor(Math.random() * teams.length)];
    const post1980Years = randomTeam.worldCupAppearances.filter(y => y >= 1980);
    const randomYear = post1980Years.length > 0
      ? post1980Years[Math.floor(Math.random() * post1980Years.length)]
      : randomTeam.worldCupAppearances[Math.floor(Math.random() * randomTeam.worldCupAppearances.length)];
    return { team: randomTeam, year: randomYear };
  };

  // Execute marquee draft pool team roll animation
  const handleRollTeam = () => {
    setIsRollingDraft(true);
    setSelectedPlayerForAssignment(null);
    let counter = 0;
    
    const interval = setInterval(() => {
      const tempTeam = teams[Math.floor(Math.random() * teams.length)];
      const post1980YearsTemp = tempTeam.worldCupAppearances.filter(y => y >= 1980);
      const tempYear = post1980YearsTemp.length > 0
        ? post1980YearsTemp[Math.floor(Math.random() * post1980YearsTemp.length)]
        : tempTeam.worldCupAppearances[Math.floor(Math.random() * tempTeam.worldCupAppearances.length)];
      setRollingDisplayTeam(tempTeam);
      setRollingDisplayYear(tempYear);
      counter++;
      
      // Lottery wheel sound
      playSound('roll-tick');
      
      if (counter > 12) {
        clearInterval(interval);
        const finalSelection = rollRandomTeamAndYear();
        setCurrentDraftRoll(finalSelection);
        setIsRollingDraft(false);
        playSound('roll-stop');
        
        // 20% chance of activating rare golden card selections
        const goldenTriggered = Math.random() < 0.20;
        setIsGoldenBallActive(goldenTriggered);
      }
    }, 60);
  };

  // Handle manual pool retry actions
  const handleRerollDraftPool = () => {
    if (rerollsAvailable > 0) {
      setRerollsAvailable(prev => prev - 1);
      handleRollTeam();
    }
  };

  // Assign player of interest to wait for slot allocation
  const handleSelectPlayer = (player: Player) => {
    if (isPlayerAssigned(player.id)) return;
    
    playSound('select');
    if (selectedPlayerForAssignment?.id === player.id) {
      // Toggle off if clicked again
      setSelectedPlayerForAssignment(null);
    } else {
      setSelectedPlayerForAssignment(player);
    }
  };

  // Reset/Clear Squad fully
  const handleClearSquad = () => {
    const cleared = { ...squad };
    Object.keys(cleared).forEach(key => {
      cleared[key] = null;
    });
    onUpdateSquad(cleared);
    setCurrentDraftRoll({ team, year }); // Start clean with Lobby starting captain
    setSelectedPlayerForAssignment(null);
    setRerollsAvailable(3);
    setIsGoldenBallActive(false);
  };

  // Attempt formation change
  const handleFormationSelect = (id: string) => {
    if (id === selectedFormationId) return;

    // If squad has at least 3 players assigned, warn before resetting
    if (squadCount >= 3) {
      setPendingFormationId(id);
    } else {
      onUpdateFormation(id);
      // Clean squad fully because slot definitions change
      const cleared: { [key: string]: Player | null } = {};
      formations.find(f => f.id === id)?.slots.forEach(s => {
        cleared[s.id] = null;
      });
      onUpdateSquad(cleared);
      setCurrentDraftRoll({ team, year });
      setSelectedPlayerForAssignment(null);
    }
  };

  // Confirm formation change
  const confirmFormationChange = () => {
    if (!pendingFormationId) return;
    onUpdateFormation(pendingFormationId);
    
    // Reset squad entirely
    const cleared: { [key: string]: Player | null } = {};
    formations.find(f => f.id === pendingFormationId)?.slots.forEach(s => {
      cleared[s.id] = null;
    });
    onUpdateSquad(cleared);
    setCurrentDraftRoll({ team, year });
    setSelectedPlayerForAssignment(null);
    // Reset reroll tickets on formation change so player gets a fresh start
    setRerollsAvailable(3);
    setIsGoldenBallActive(false);

    setPendingFormationId(null);
  };

  // Filter players for active selection sidebar
  const filteredPlayers = useMemo(() => {
    return availableRoster.filter(p => {
      const textMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.position.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.positionGroup.toLowerCase().includes(searchQuery.toLowerCase());
      return textMatch;
    });
  }, [availableRoster, searchQuery]);

  // Helper check to see if player is already assigned somewhere
  const isPlayerAssigned = (playerId: string) => {
    return squadPlayers.some(p => p.id === playerId);
  };

  // Helper check to see if a certain position's draft capacity is fully met in active squad setup
  const isPositionLimitReached = (positionGroup: string) => {
    const capacity = activeFormation.slots.filter(s => s.positionGroup === positionGroup).length;
    const currentCount = squadPlayers.filter(p => p.positionGroup === positionGroup).length;
    return currentCount >= capacity;
  };

  // Position color codes
  const getGroupColor = (group: string) => {
    switch (group) {
      case 'GK': return 'bg-amber-500 border-amber-600 shadow-amber-950/50';
      case 'DEF': return 'bg-blue-500 border-blue-605 shadow-blue-950/50';
      case 'MID': return 'bg-emerald-500 border-emerald-600 shadow-emerald-950/50';
      case 'ATT': return 'bg-red-500 border-red-600 shadow-red-950/50';
      default: return 'bg-zinc-600 border-zinc-700 shadow-zinc-950/50';
    }
  };

  const getGroupPill = (group: string) => {
    switch (group) {
      case 'GK': return 'bg-amber-400 text-black';
      case 'DEF': return 'bg-blue-500 text-white';
      case 'MID': return 'bg-emerald-500 text-white';
      case 'ATT': return 'bg-red-500 text-white';
      default: return 'bg-zinc-600 text-zinc-100';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col min-h-[85vh] justify-between relative">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-5 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-3xl select-none">{team.flag}</span>
            <h1 className="font-display font-medium text-xl sm:text-2xl text-zinc-100 uppercase tracking-tight">
              {team.name} <span className="text-[#e8ff3b] font-mono font-bold">({year})</span>
            </h1>
          </div>
          <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
            {isMounted ? t('build_header_desc').replace('{formation}', formations.find(f => f.id === selectedFormationId)?.name || '').replace('{year}', String(year)) : `Choose your deployment scheme (${formations.find(f => f.id === selectedFormationId)?.name}) and pick 11 icons associated with the ${year} team and their historic generation counterparts.`}
          </p>
        </div>

        {/* Action Buttons & Status Indicators */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Rating Badge */}
          <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-900 p-2 px-3 rounded-xl">
            <div className="flex flex-col text-right">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 leading-none">
                {isMounted ? t('build_rating') : 'Avg rating'}
              </span>
              <span className="font-display font-black text-xl text-[#e8ff3b]">{averageRating}</span>
            </div>
            <div className="h-6 w-px bg-zinc-850" />
            <div className="flex flex-col text-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 leading-none">
                {isMounted ? t('build_squad') : 'Squad'}
              </span>
              <span className="font-display font-black text-xl text-white">
                {squadCount}<span className="text-zinc-650 font-light text-xs">/11</span>
              </span>
            </div>
            <div className="h-6 w-px bg-zinc-850" />
            <div className="flex flex-col relative">
              <div className="flex items-center gap-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 leading-none">
                  {isMounted ? t('build_chemistry_label') : 'Chemistry'}
                </span>
                <button
                  id="chemistry-info-popover-btn"
                  onClick={() => {
                    playSound('select');
                    setShowChemDetails(!showChemDetails);
                  }}
                  className="p-0.5 hover:bg-zinc-800 rounded text-zinc-550 hover:text-[#e8ff3b] transition-all cursor-pointer flex-shrink-0"
                  title="Chemistry Breakdown"
                >
                  <span className="text-[9px] leading-none">ℹ️</span>
                </button>
              </div>
              <span className="font-display font-black text-xl text-emerald-400">
                {chemistryBreakdown.chemistry}<span className="text-[#e8ff3b] font-light text-xs">%</span>
              </span>

              {/* Chemistry details popover */}
              {showChemDetails && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 bg-zinc-950/95 border border-zinc-900 rounded-xl p-4 shadow-2xl z-50 font-mono text-[10px] space-y-2.5 backdrop-blur-md animate-fade-in text-left">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                    <span className="text-[#e8ff3b] font-bold uppercase tracking-wider">
                      {isMounted ? t('chem_popover_title') : 'Chemistry Breakdown'}
                    </span>
                    <button onClick={() => setShowChemDetails(false)} className="text-zinc-550 hover:text-white p-0.5 hover:bg-zinc-900 rounded">✕</button>
                  </div>
                  <div className="space-y-1.5 text-zinc-400">
                    <div className="flex justify-between">
                      <span className="truncate mr-2">{isMounted ? t('chem_base_pts') : 'Base Points (3 pts / player)'}:</span>
                      <span className="text-zinc-100 font-bold shrink-0">+{chemistryBreakdown.details?.basePoints || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="truncate mr-2">{isMounted ? t('chem_pos_matches') : 'Position matches (perfect role)'}:</span>
                      <span className="text-zinc-100 font-bold shrink-0">+{chemistryBreakdown.details?.positionBonus || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="truncate mr-2">{isMounted ? t('chem_nat_links') : 'Nationality links (same country)'}:</span>
                      <span className="text-zinc-100 font-bold shrink-0">+{chemistryBreakdown.details?.countryLinkBonus || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="truncate mr-2">{isMounted ? t('chem_era_links') : 'Era / Year links (same year)'}:</span>
                      <span className="text-zinc-100 font-bold shrink-0">+{chemistryBreakdown.details?.eraLinkBonus || 0}</span>
                    </div>
                    {chemistryBreakdown.activePartnerships.length > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span className="truncate mr-2">{isMounted ? t('chem_partnerships') : 'Legendary Partnerships'}:</span>
                        <span className="font-bold shrink-0">+{chemistryBreakdown.details?.partnershipBonus || 0}</span>
                      </div>
                    )}
                  </div>
                  
                  {chemistryBreakdown.activePartnerships.length > 0 && (
                    <div className="border-t border-zinc-900 pt-2 space-y-1">
                      <span className="text-[8px] text-zinc-500 uppercase tracking-widest block font-bold">
                        {isMounted ? t('chem_active_duos') : 'Active Duos'}:
                      </span>
                      {chemistryBreakdown.activePartnerships.map((p, pIdx) => (
                        <div key={pIdx} className="text-[9px] text-[#e8ff3b] truncate" title={p.desc}>
                          🤝 {p.name}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-[9px] text-zinc-500 pt-1 text-center italic border-t border-zinc-900">
                    {isMounted ? t('chem_capped') : 'Capped at max 100%'}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="text-[10px] font-mono tracking-wider bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-700 hover:text-[#e8ff3b] px-2.5 py-2 rounded-xl text-zinc-400 transition-all uppercase"
            >
              {isMounted ? (language === 'en' ? 'TR 🇹🇷' : 'EN 🇬🇧') : '...'}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                // Simple blip to test
                if (!soundEnabled) {
                  setTimeout(() => playSound('select'), 50);
                }
              }}
              className="p-2 sm:px-2.5 sm:py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-400 hover:text-[#e8ff3b] rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all"
              title={soundEnabled ? 'Mute arcade synthesizer' : 'Enable arcade synthesizer'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Clear button */}
            {squadCount > 0 && (
              <button
                id="clear-squad-btn"
                onClick={handleClearSquad}
                className="p-2 sm:px-3 sm:py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-400 hover:text-red-400 rounded-xl flex items-center justify-center gap-1.5 text-xs font-mono transition-all"
                title={isMounted ? t('build_btn_clear') : 'Reset Squad'}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isMounted ? t('build_btn_clear') : 'Clear'}</span>
              </button>
            )}

            {/* Back / Reroll */}
            <button
              id="back-lobby-btn"
              onClick={onReroll}
              className="p-2 sm:px-3 sm:py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-400 hover:text-white rounded-xl flex items-center justify-center gap-1.5 text-xs font-mono transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isMounted ? t('build_btn_reroll') : 'Reroll Team'}</span>
            </button>

            {/* Simulate Trigger */}
            <button
              id="simulate-cup-btn"
              disabled={squadCount !== 11}
              onClick={onSimulate}
              className={`py-2 px-4 shadow-lg flex items-center justify-center gap-2 font-display font-bold text-xs tracking-wider uppercase rounded-xl transition-all ${
                squadCount === 11
                  ? 'bg-[#e8ff3b] text-black hover:bg-[#d6ec2b] cursor-pointer hover:shadow-[#e8ff3b]/20 hover:scale-[1.02]'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isMounted ? t('build_btn_simulate') : 'Simulate Cup →'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MID ROW: PITCH / SIDEBAR / WARNING */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
        
        {/* Pitch Area Column */}
        <div className="lg:col-span-8 flex flex-col justify-between items-stretch">
          
          {/* Top of Pitch: Formation & Philosophy Selector Pills */}
          <FormationSelector
            formations={formations}
            selectedFormationId={selectedFormationId}
            handleFormationSelect={handleFormationSelect}
            tacticalStyles={TACTICAL_STYLES}
            selectedTacticalStyle={selectedTacticalStyle}
            onUpdateTacticalStyle={onUpdateTacticalStyle}
            playSound={playSound}
            pendingFormationId={pendingFormationId}
            confirmFormationChange={confirmFormationChange}
            setPendingFormationId={setPendingFormationId}
          />

          {/* Actual Soccer Pitch Canvas */}
          <PitchCanvas
            squad={squad}
            activeFormation={activeFormation}
            synergyLines={synergyLines}
            selectedPlayerForAssignment={selectedPlayerForAssignment}
            handleSlotClick={handleSlotClick}
            getGroupPill={getGroupPill}
            teams={teams}
          />

        </div>

        {/* Dynamic Sidebar Column */}
        <div className="lg:col-span-4 flex flex-col items-stretch">
          
          <AnimatePresence mode="wait">
            {squadCount === 11 ? (
              <motion.div
                key="sidebar-squad-complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full"
              >
                <SidebarSquadComplete
                  averageRating={averageRating}
                  chemistryBreakdown={chemistryBreakdown}
                  squadPlayers={squadPlayers}
                  onSimulate={onSimulate}
                  onClearSquad={handleClearSquad}
                />
              </motion.div>
            ) : !currentDraftRoll ? (
              <motion.div
                key="sidebar-roll-state"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="h-full"
              >
                <SidebarRollState
                  isRollingDraft={isRollingDraft}
                  rollingDisplayTeam={rollingDisplayTeam}
                  rollingDisplayYear={rollingDisplayYear}
                  squadCount={squadCount}
                  chemistryBreakdown={chemistryBreakdown}
                  onRollTeam={handleRollTeam}
                />
              </motion.div>
            ) : (
              <motion.div
                key="sidebar-active-draft"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="h-full"
              >
                <SidebarActiveDraft
                  currentDraftRoll={currentDraftRoll}
                  rerollsAvailable={rerollsAvailable}
                  isGoldenBallActive={isGoldenBallActive}
                  selectedPlayerForAssignment={selectedPlayerForAssignment}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filteredPlayers={filteredPlayers}
                  isPlayerAssigned={isPlayerAssigned}
                  isPositionLimitReached={isPositionLimitReached}
                  squadCount={squadCount}
                  chemistryBreakdown={chemistryBreakdown}
                  getGroupPill={getGroupPill}
                  onRerollDraftPool={handleRerollDraftPool}
                  onSelectPlayer={handleSelectPlayer}
                  onOpenPlayerModal={onOpenPlayerModal}
                  onCancelSelection={() => setSelectedPlayerForAssignment(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </main>

    </div>
  );
}

