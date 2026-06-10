'use client';

import React, { useState, useMemo } from 'react';
import { Player, NationalTeam, Formation, SquadSlot } from '@/types';
import { formations } from '@/data/formations';
import { getPlayersByTeamAndYear } from '@/data/players';
import { teams } from '@/data/teams';
import { ArrowLeft, Play, Info, RotateCcw, AlertTriangle, ShieldAlert, Star, Search, Plus, Trash2, Trophy, Award, Zap, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TACTICAL_STYLES = [
  { id: 'tiki-taka', name: 'Tiki-Taka', icon: '🪄', desc: 'Short passing & possession control. Midfielder ratings match bonus, +8% average possession.' },
  { id: 'gegenpress', name: 'Gegenpressing', icon: '⚡', desc: 'Intense high-line pressing. Attacker ratings match bonus, extra team interception cycles.' },
  { id: 'catenaccio', name: 'Catenaccio', icon: '🛡️', desc: 'Deep defensive lock. Defender & GK ratings match bonus, extra clean sheets chance.' },
  { id: 'joga-bonito', name: 'Joga Bonito', icon: '🎨', desc: 'Attacking flair & dribbling. Winger/CF ratings match bonus, higher goal scores but defensive compromise.' },
  { id: 'route-one', name: 'Route One', icon: '🚀', desc: 'Long-ball direct strategy. Target striker ratings match bonus, physical headers priority.' }
];

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
  // Sound controls
  const [soundEnabled, setSoundEnabled] = useState(true);

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
            const PARTNERSHIPS = [
              { p1: 'Kroos', p2: 'Müller', name: 'Alman Çeliği 🔥' },
              { p1: 'Platini', p2: 'Tigana', name: 'Le Carré Magique 🔥' },
              { p1: 'Zidane', p2: 'Henry', name: 'Fransız Zarafeti 🔥' },
              { p1: 'Pelé', p2: 'Garrincha', name: 'Yıkılmaz Seleção 🔥' },
              { p1: 'Maradona', p2: 'Careca', name: 'Efsanevi Napoli Bağı 🔥' },
              { p1: 'Ronaldinho', p2: 'Ronaldo', name: 'Samba Sihirbazları 🔥' },
              { p1: 'Hakan Şükür', p2: 'İlhan Mansız', name: '2002 Boğaz Fırtınası 🔥' },
              { p1: 'Nesta', p2: 'Maldini', name: 'Milano Surları 🔥' },
              { p1: 'Xavi', p2: 'Iniesta', name: 'La Masia Metronomu 🔥' },
              { p1: 'Messi', p2: 'Di María', name: 'Tangonun Efendileri 🔥' }
            ];
            
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
                label: '🤝 efsane'
              });
            } else if (sameCountry && sameEra) {
              lines.push({
                id: `${s1.id}-${s2.id}`,
                x1: s1.x,
                y1: s1.y,
                x2: s2.x,
                y2: s2.y,
                type: 'double-emerald',
                label: '🧬 uyum'
              });
            } else if (sameCountry) {
              lines.push({
                id: `${s1.id}-${s2.id}`,
                x1: s1.x,
                y1: s1.y,
                x2: s2.x,
                y2: s2.y,
                type: 'emerald',
                label: '🌎 ülke'
              });
            } else if (sameEra) {
              lines.push({
                id: `${s1.id}-${s2.id}`,
                x1: s1.x,
                y1: s1.y,
                x2: s2.x,
                y2: s2.y,
                type: 'cyan',
                label: '⏳ dönem'
              });
            }
          }
        }
      }
    }
    return lines;
  }, [activeFormation, squad]);

  // Simple Web Audio API Synthesizer sounds for arcade feel
  const playSound = (type: 'roll-tick' | 'roll-stop' | 'select' | 'place' | 'clear' | 'success') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
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
    const PARTNERSHIPS = [
      { p1: 'Kroos', p2: 'Müller', name: 'Alman Çeliği 🔥', desc: 'Toni Kroos & Thomas Müller' },
      { p1: 'Platini', p2: 'Tigana', name: 'Le Carré Magique 🔥', desc: 'Michel Platini & Jean Tigana' },
      { p1: 'Zidane', p2: 'Henry', name: 'Fransız Zarafeti 🔥', desc: 'Zinedine Zidane & Thierry Henry' },
      { p1: 'Pelé', p2: 'Garrincha', name: 'Yıkılmaz Seleção 🔥', desc: 'Pelé & Garrincha' },
      { p1: 'Maradona', p2: 'Careca', name: 'Efsanevi Napoli Bağı 🔥', desc: 'Diego Maradona & Careca' },
      { p1: 'Ronaldinho', p2: 'Ronaldo Nazário', name: 'Samba Sihirbazları 🔥', desc: 'Ronaldinho & Ronaldo' },
      { p1: 'Hakan Şükür', p2: 'İlhan Mansız', name: '2002 Boğaz Fırtınası 🔥', desc: 'Hakan Şükür & İlhan Mansız' },
      { p1: 'Nesta', p2: 'Maldini', name: 'Milano Surları 🔥', desc: 'Alessandro Nesta & Paolo Maldini' },
      { p1: 'Xavi', p2: 'Iniesta', name: 'La Masia Metronomu 🔥', desc: 'Xavi & Andrés Iniesta' },
      { p1: 'Messi', p2: 'Di María', name: 'Tangonun Efendileri 🔥', desc: 'Lionel Messi & Ángel Di María' }
    ];

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
      activePartnerships
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
      playSound('clear');
      // Clicking a filled slot removes the player from the squad (this does not affect the active draft roll)
      const updated = { ...squad, [slotId]: null };
      onUpdateSquad(updated);
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
  const isPositionLimitReached = (position: string) => {
    // Determine target quantity of slots with role matching "position" in active scheme
    const capacity = Math.max(1, activeFormation.slots.filter(s => s.role === position).length);
    // Count how many players with this position are already drafted in the squad
    const currentCount = squadPlayers.filter(p => p.position === position).length;
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
            Choose your deployment scheme ({formations.find(f => f.id === selectedFormationId)?.name}) and pick 11 icons associated with the {year} team and their historic generation counterparts.
          </p>
        </div>

        {/* Action Buttons & Status Indicators */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Rating Badge */}
          <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-900 p-2 px-3 rounded-xl">
            <div className="flex flex-col text-right">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 leading-none">Avg rating</span>
              <span className="font-display font-black text-xl text-[#e8ff3b]">{averageRating}</span>
            </div>
            <div className="h-6 w-px bg-zinc-850" />
            <div className="flex flex-col text-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 leading-none">Squad</span>
              <span className="font-display font-black text-xl text-white">
                {squadCount}<span className="text-zinc-650 font-light text-xs">/11</span>
              </span>
            </div>
            <div className="h-6 w-px bg-zinc-850" />
            <div className="flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 leading-none">Chemistry</span>
              <span className="font-display font-black text-xl text-emerald-400">
                {chemistryBreakdown.chemistry}<span className="text-[#e8ff3b] font-light text-xs">%</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto md:ml-0">
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
                title="Reset Squad"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}

            {/* Back / Reroll */}
            <button
              id="back-lobby-btn"
              onClick={onReroll}
              className="p-2 sm:px-3 sm:py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-400 hover:text-white rounded-xl flex items-center justify-center gap-1.5 text-xs font-mono transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reroll Team</span>
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
              <span>Simulate Cup →</span>
            </button>
          </div>
        </div>
      </header>

      {/* MID ROW: PITCH / SIDEBAR / WARNING */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
        
        {/* Pitch Area Column */}
        <div className="lg:col-span-8 flex flex-col justify-between items-stretch">
          
          {/* Top of Pitch: Formation & Philosophy Selector Pills */}
          <div className="mb-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1.5">Deployment Scheme</span>
                <div className="flex flex-wrap gap-1.5 bg-zinc-950/60 p-1.5 border border-zinc-900 rounded-xl w-fit">
                  {formations.map((f) => {
                    const isActive = selectedFormationId === f.id;
                    return (
                      <button
                        id={`formation-select-${f.id}`}
                        key={f.id}
                        onClick={() => handleFormationSelect(f.id)}
                        className={`px-3 py-1 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-lg font-display text-xs font-semibold tracking-tight transition-all uppercase ${
                          isActive 
                            ? 'bg-[#e8ff3b] border-[#e8ff3b] text-black shadow-md font-bold' 
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                        }`}
                      >
                        {f.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1.5">Team Philosophy / Tactical Style</span>
                <div className="flex flex-wrap gap-1.5 bg-zinc-950/60 p-1.5 border border-zinc-900 rounded-xl w-fit">
                  {TACTICAL_STYLES.map((style) => {
                    const isActive = selectedTacticalStyle === style.id;
                    return (
                      <button
                        id={`style-select-${style.id}`}
                        key={style.id}
                        onClick={() => {
                          onUpdateTacticalStyle(style.id);
                          playSound('select');
                        }}
                        className={`px-3 py-1 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-lg font-display text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 uppercase ${
                          isActive 
                            ? 'bg-[#e8ff3b] border-[#e8ff3b] text-black shadow-md font-bold' 
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                        }`}
                        title={style.desc}
                      >
                        <span className="text-sm">{style.icon}</span>
                        <span>{style.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CONFIRMATION DIALOG INLINE */}
            <AnimatePresence>
              {pendingFormationId && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-3 bg-yellow-950/20 border border-yellow-900/50 rounded-xl overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs leading-relaxed font-mono">
                    <div className="flex items-center gap-2 text-yellow-400">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>Changing formation will reset your current squad. Continue?</span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                      <button
                        onClick={confirmFormationChange}
                        className="px-2.5 py-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold uppercase rounded-md tracking-wider text-[10px]"
                      >
                        Reset & Change
                      </button>
                      <button
                        onClick={() => setPendingFormationId(null)}
                        className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-white uppercase rounded-md tracking-wider text-[10px]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actual Soccer Pitch Canvas */}
          <div className="aspect-[3/4] max-w-[540px] w-full mx-auto relative rounded-3xl overflow-hidden pitch-striped border border-zinc-800/60 p-4 shrink-0 shadow-inner">
            
            {/* SVG Pitch Markings Layer */}
            <div className="absolute inset-2 border-2 pitch-line opacity-35 rounded-2xl pointer-events-none">
              <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Center line */}
                <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
                {/* Center circle */}
                <circle cx="50" cy="50" r="14" fill="none" stroke="white" strokeWidth="0.5" />
                {/* Center dot */}
                <circle cx="50" cy="50" r="1.2" fill="white" />
                {/* Penalty Area Top */}
                <rect x="20" y="0" width="60" height="15" fill="none" stroke="white" strokeWidth="0.5" />
                <rect x="35" y="0" width="30" height="5" fill="none" stroke="white" strokeWidth="0.5" />
                <path d="M 37.5 15 A 12 12 0 0 0 62.5 15" fill="none" stroke="white" strokeWidth="0.5" />
                
                {/* Penalty Area Bottom */}
                <rect x="20" y="85" width="60" height="15" fill="none" stroke="white" strokeWidth="0.5" />
                <rect x="35" y="95" width="30" height="5" fill="none" stroke="white" strokeWidth="0.5" />
                <path d="M 37.5 85 A 12 12 0 0 1 62.5 85" fill="none" stroke="white" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Visual Chemistry / Synergy Links SVG Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-5">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <style>{`
                  @keyframes linePulseAnim {
                    0% { stroke-opacity: 0.4; }
                    50% { stroke-opacity: 0.95; }
                    100% { stroke-opacity: 0.4; }
                  }
                  @keyframes goldDashAnim {
                    to {
                      stroke-dashoffset: -20;
                    }
                  }
                  .chemistry-path-gold {
                    stroke: #ffbd15;
                    stroke-width: 1.6;
                    stroke-linecap: round;
                    stroke-dasharray: 4, 3;
                    animation: goldDashAnim 2.5s linear infinite, linePulseAnim 1.8s ease-in-out infinite;
                    filter: drop-shadow(0px 0px 4px rgba(245, 158, 11, 0.95));
                  }
                  .chemistry-path-double {
                    stroke: #10b981;
                    stroke-width: 1.5;
                    stroke-linecap: round;
                    stroke-dasharray: 3, 3;
                    animation: goldDashAnim 3.5s linear infinite, linePulseAnim 2s ease-in-out infinite;
                    filter: drop-shadow(0px 0px 3px rgba(16, 185, 129, 0.9));
                  }
                  .chemistry-path-emerald {
                    stroke: #10b981;
                    stroke-width: 1.2;
                    stroke-linecap: round;
                    animation: linePulseAnim 2s ease-in-out infinite;
                    filter: drop-shadow(0px 0px 2px rgba(16, 185, 129, 0.75));
                  }
                  .chemistry-path-cyan {
                    stroke: #06b6d4;
                    stroke-width: 1.2;
                    stroke-linecap: round;
                    animation: linePulseAnim 2s ease-in-out infinite;
                    filter: drop-shadow(0px 0px 2px rgba(6, 182, 212, 0.75));
                  }
                `}</style>
                <g>
                  {synergyLines.map((line) => {
                    let className = 'chemistry-path-emerald';
                    if (line.type === 'gold') className = 'chemistry-path-gold';
                    else if (line.type === 'double-emerald') className = 'chemistry-path-double';
                    else if (line.type === 'cyan') className = 'chemistry-path-cyan';

                    return (
                      <motion.line
                        key={line.id}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        className={className}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    );
                  })}
                </g>
              </svg>

              {/* Centered chemistry label pills */}
              {synergyLines.map((line) => {
                const midX = (line.x1 + line.x2) / 2;
                const midY = (line.y1 + line.y2) / 2;
                return (
                  <div
                    key={`pill-${line.id}`}
                    style={{ left: `${midX}%`, top: `${midY}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 scale-[0.8] sm:scale-95 transition-transform"
                  >
                    <span className={`text-[7.5px] tracking-wide font-mono font-bold px-1.5 py-0.5 rounded shadow-[0_2px_4px_rgba(0,0,0,0.5)] border whitespace-nowrap uppercase select-none ${
                      line.type === 'gold'
                        ? 'bg-[#1e1403] text-amber-400 border-amber-500/40'
                        : line.type === 'double-emerald'
                        ? 'bg-[#031c11] text-emerald-300 border-emerald-500/40'
                        : line.type === 'emerald'
                        ? 'bg-[#03140d] text-emerald-400 border-emerald-500/20'
                        : 'bg-[#02181d] text-cyan-400 border-cyan-500/20'
                    }`}>
                      {line.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Core Slot Placements */}
            {activeFormation.slots.map((slot) => {
              const assignedPlayer = squad[slot.id] || null;
              const hasPlayer = assignedPlayer !== null;
              const playerTeam = hasPlayer ? teams.find(t => t.id === assignedPlayer.country) : null;
              
              // Dynamic check for compatible assignment slot
              const isCompatible = selectedPlayerForAssignment !== null && 
                                   selectedPlayerForAssignment.positionGroup === slot.positionGroup && 
                                   !hasPlayer;
              
              return (
                <div
                  key={slot.id}
                  style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
                  className="absolute -translate-x-12 -translate-y-12 w-24 h-24 flex flex-col items-center justify-center transition-all duration-300 z-10"
                >
                  <motion.div
                    whileHover={{ scale: isCompatible ? 1.12 : 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    animate={isCompatible ? { scale: [1, 1.06, 1] } : {}}
                    transition={isCompatible ? { repeat: Infinity, duration: 2 } : {}}
                    className="cursor-pointer flex flex-col items-center"
                    onClick={() => handleSlotClick(slot.id, assignedPlayer, slot.positionGroup)}
                  >
                    {/* Circle Card representation */}
                    <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center relative border-2 ${
                      hasPlayer 
                        ? 'bg-zinc-950 border-zinc-200 hover:border-[#e8ff3b] text-white shadow-xl glow-lime' 
                        : isCompatible
                        ? 'bg-emerald-950/45 border-emerald-400 border-solid text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.7)] animate-pulse'
                        : 'bg-zinc-900/90 border-dashed border-zinc-700 hover:border-[#e8ff3b] text-zinc-500 shadow-md'
                    } transition-all duration-300`}>
                      
                      {/* Rating pill or Role indicator badge */}
                      {hasPlayer ? (
                        <div className={`absolute -top-1.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-mono font-bold border ${getGroupPill(assignedPlayer.positionGroup)} border-black`}>
                          {assignedPlayer.rating}
                        </div>
                      ) : (
                        <span className={`text-[10px] uppercase font-mono font-bold px-1.5 rounded border transition-colors ${
                          isCompatible
                            ? 'bg-emerald-555 text-emerald-100 border-emerald-500'
                            : 'bg-zinc-950/80 text-zinc-500 border-zinc-800'
                        }`}>
                          {slot.role}
                        </span>
                      )}
                      
                      {/* Animated selector pointer background for matching cards */}
                      {isCompatible && (
                        <span className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-25" />
                      )}

                      {/* Flag / Center visual element */}
                      <span className="text-xl leading-none mt-1 select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {hasPlayer ? (playerTeam?.flag || '👤') : isCompatible ? '🎯' : '➕'}
                      </span>

                      {/* Small removal icon overlay */}
                      {hasPlayer && (
                        <div className="absolute -bottom-1 -right-1 bg-red-950 border border-red-800 text-red-100 p-0.5 rounded-full hover:bg-red-900 transition-colors animate-duration-150" title="Remove Player" onClick={(e) => {
                          e.stopPropagation();
                          handleSlotClick(slot.id, assignedPlayer, slot.positionGroup);
                        }}>
                          <Trash2 className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>

                    {/* Short Player Display Name underneath */}
                    <div className="mt-1.5 w-24 text-center">
                      <span className={`text-[10px] font-mono leading-none tracking-tight block truncate uppercase select-none px-1 rounded transition-colors ${
                        hasPlayer 
                          ? 'font-bold text-white bg-zinc-950/90 border border-zinc-800 py-0.5' 
                          : isCompatible
                          ? 'font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 py-0.5'
                          : 'font-medium text-zinc-400 py-0.5'
                      }`}>
                        {hasPlayer ? assignedPlayer.name.split(' ').pop() : slot.role}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Dynamic Sidebar Column */}
        <div className="lg:col-span-4 flex flex-col items-stretch">
          
          <AnimatePresence mode="wait">
            {squadCount === 11 ? (
              /* State 3: Squad Completed Celebrity Dashboard */
              <motion.div
                key="sidebar-squad-complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-950 border-2 border-emerald-500/30 p-5 rounded-2xl h-full flex flex-col justify-between shadow-[0_0_20px_rgba(16,185,129,0.15)] relative overflow-hidden"
              >
                {/* Decorative absolute watermark */}
                <span className="absolute -top-10 -right-10 text-8xl opacity-10 rotate-12 select-none pointer-events-none">🏆</span>
                
                <div className="space-y-4 font-sans">
                  <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                    <Sparkles className="w-5 h-5 text-[#e8ff3b] animate-spin" />
                    <div>
                      <h3 className="font-display font-black text-sm uppercase text-white tracking-wider leading-none">
                        All-Star Eleven Ready
                      </h3>
                      <span className="text-[10px] font-mono text-zinc-400 mt-1 block">Your squad is primed for World Cup simulation</span>
                    </div>
                  </div>

                  {/* Summary scorecard */}
                  <div className="p-3 bg-zinc-900/60 border border-zinc-900 rounded-xl space-y-2.5 font-mono">
                    <div className="flex justify-between items-center text-xs text-zinc-400">
                      <span>AVERAGE RATING</span>
                      <strong className="text-white text-sm font-display font-black">{averageRating} OVR</strong>
                    </div>
                    <div className="flex justify-between items-center text-xs text-zinc-400">
                      <span>TEAM CHEMISTRY</span>
                      <strong className="text-emerald-400 text-sm font-display font-black">{chemistryBreakdown.chemistry}%</strong>
                    </div>
                    <div className="flex justify-between items-center text-xs text-zinc-400">
                      <span>PREFERRED ROLES</span>
                      <strong className="text-zinc-200 text-sm font-mono font-bold">
                        {chemistryBreakdown.preferredPositions} / 11
                      </strong>
                    </div>
                  </div>

                  {/* Chemistry feedback sentence */}
                  <div className="p-2.5 text-[11px] font-mono rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-emerald-300 leading-relaxed">
                    {chemistryBreakdown.chemistry >= 80 ? (
                      <span>🔥 <strong>Outstanding Chemistry!</strong> Your icons share profound country & era bonds. This collection is destined to lift the World Cup!</span>
                    ) : chemistryBreakdown.chemistry >= 50 ? (
                      <span>⚡ <strong>Solid Cohesion!</strong> Strong regional lines of communication will push this tactical structure deep into the knockout brackets.</span>
                    ) : (
                      <span>⚙️ <strong>Decent Setup!</strong> Diverse generational talents are ready to compete, but may struggle against high-chemistry giants.</span>
                    )}
                  </div>

                  {/* Dynamic Legendary Partnerships Widget */}
                  {chemistryBreakdown.activePartnerships && chemistryBreakdown.activePartnerships.length > 0 && (
                    <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#e8ff3b] uppercase tracking-widest">
                        <span className="animate-pulse">🤝</span>
                        <span>Efsanevi Ortaklık ({chemistryBreakdown.activePartnerships.length})</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        {chemistryBreakdown.activePartnerships.map((partnership, idx) => (
                          <div key={idx} className="bg-amber-950/20 border border-[#e8ff3b]/20 p-2 rounded-lg flex flex-col font-mono text-[10px]">
                            <strong className="text-amber-400 font-bold uppercase tracking-tight">{partnership.name}</strong>
                            <span className="text-[9px] text-zinc-400 mt-0.5">{partnership.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Complete starting roster short scroller */}
                  <div>
                    <h4 className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Selected Lineup</h4>
                    <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                      {squadPlayers.map((player) => (
                        <div key={player.id} className="p-1.5 px-2 bg-zinc-900/30 border border-zinc-100/10 rounded-lg flex items-center justify-between text-[11px] font-mono">
                          <div className="flex items-center gap-1.5 truncate max-w-[75%]">
                            <span className="text-xs bg-zinc-950 border border-zinc-800 px-1 rounded text-zinc-400 font-bold">{player.position}</span>
                            <span className="text-zinc-200 truncate font-sans font-semibold">{player.name}</span>
                          </div>
                          <span className="text-[#e8ff3b] font-bold">{player.rating}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-900 space-y-2 text-center">
                  <button
                    onClick={onSimulate}
                    className="w-full py-3 bg-[#e8ff3b] hover:bg-[#d6ec2b] text-black font-display font-black text-xs tracking-widest uppercase rounded-xl shadow-[0_0_15px_rgba(232,255,59,0.25)] hover:shadow-[#e8ff3b]/40 cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <Trophy className="w-4 h-4 text-black animate-bounce" />
                    <span>LAUNCH CUP SIMULATOR</span>
                  </button>

                  <button
                    onClick={handleClearSquad}
                    className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 font-mono text-[10px] tracking-wider uppercase rounded-lg border border-zinc-800 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Disband Team & Restart Draft</span>
                  </button>
                </div>
              </motion.div>
            ) : !currentDraftRoll ? (
              /* State 1: Draft country consumed - user needs to Spin/Roll a new country */
              <motion.div
                key="sidebar-roll-state"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 animate-pulse" />
                      <h3 className="font-display font-semibold text-sm uppercase text-white tracking-wider">
                        Next Draft Pool
                      </h3>
                    </div>
                  </div>

                  <div className="text-center py-10 px-4 bg-zinc-900/40 border border-zinc-900 rounded-2xl mb-6 relative overflow-hidden">
                    
                    {isRollingDraft ? (
                      /* Marquee wheel slot roll animation */
                      <div className="py-4 flex flex-col items-center justify-center space-y-3">
                        <span className="text-5xl animate-bounce select-none">
                          {rollingDisplayTeam?.flag || '⚽'}
                        </span>
                        <div className="font-display font-black text-xl text-[#e8ff3b] min-h-[1.75rem] uppercase tracking-tight animate-pulse text-center">
                          {rollingDisplayTeam?.name || 'Searching Database...'}
                        </div>
                        <div className="font-mono text-xs text-zinc-500">
                          Year variant: {rollingDisplayYear || '????'}
                        </div>
                      </div>
                    ) : (
                      /* Pool Roll idle view */
                      <div className="py-4 flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-3xl shadow-lg leading-none select-none">
                          🎰
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-sm text-zinc-200 uppercase tracking-wide">
                            Roll Next National Team
                          </h4>
                          <p className="text-[11px] text-zinc-500 max-w-xs leading-relaxed mx-auto">
                            Your previous draft pick has been slotted successfully! Spin the wheel to pull a new random historical squad and recruit another global star!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Lotter roll button */}
                  {!isRollingDraft && (
                    <button
                      onClick={handleRollTeam}
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-[#e8ff3b] text-black font-display font-black text-xs tracking-widest uppercase rounded-xl shadow-lg hover:shadow-[#e8ff3b]/10 cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <span>🎰 ROLL NEW DRAFT COUNTRY</span>
                    </button>
                  )}
                </div>

                <div className="border-t border-zinc-900 pt-4 mt-6 space-y-3.5">
                  {/* Squad Count Line */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-1">
                      <span className="flex items-center gap-1">📋 <span>Squad Progress</span></span>
                      <strong className="text-white font-bold">{squadCount}/11</strong>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-300"
                        style={{ width: `${(squadCount / 11) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Chemistry Meter Line */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-1">
                      <span className="flex items-center gap-1">🧬 <span>Team Chemistry</span></span>
                      <strong className="text-[#e8ff3b] font-bold">{chemistryBreakdown.chemistry}%</strong>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-[#e8ff3b] h-full transition-all duration-300"
                        style={{ width: `${chemistryBreakdown.chemistry}%` }}
                      />
                    </div>
                  </div>

                  {/* Synergy Insights Pills */}
                  {squadCount > 0 && (
                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-mono">
                      <div className="bg-zinc-900/60 border border-zinc-850 p-1.5 rounded-lg text-center flex flex-col justify-center items-center gap-0.5">
                        <span className="text-zinc-500 uppercase tracking-tight text-[8px]">Preferred Role</span>
                        <strong className="text-zinc-200">{chemistryBreakdown.preferredPositions}/{squadCount} OK</strong>
                      </div>

                      {chemistryBreakdown.countryCore ? (
                        <div className="bg-zinc-900/60 border border-zinc-850 p-1.5 rounded-lg text-center flex flex-col justify-center items-center gap-0.5">
                          <span className="text-zinc-500 uppercase tracking-tight text-[8px]">Nation Core</span>
                          <strong className="text-zinc-200 truncate max-w-full flex items-center gap-1 flex-row">
                            <span>{chemistryBreakdown.countryCore.team.flag}</span>
                            <span className="truncate">{chemistryBreakdown.countryCore.team.name.split(' ')[0]}</span>
                          </strong>
                        </div>
                      ) : (
                        <div className="bg-zinc-900/10 border border-dashed border-zinc-900 p-1.5 rounded-lg text-center flex flex-col justify-center items-center text-zinc-500 font-light text-[9px]">
                          <span>No Nationality Link</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* State 2: Country is rolled and active - display roster selection list */
              <motion.div
                key="sidebar-active-draft"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="font-display font-semibold text-sm uppercase text-white tracking-wider">
                        Roster Draft Pool
                      </h3>
                    </div>
                  </div>

                  {/* Active Draft Banner with Token-bound Reroll */}
                  <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl select-none">{currentDraftRoll.team.flag}</span>
                      <div className="flex flex-col text-left">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 leading-none">Country Edition</span>
                        <strong className="font-display text-xs text-zinc-100 uppercase mt-0.5">
                          {currentDraftRoll.team.name} <span className="text-[#e8ff3b] font-mono">({currentDraftRoll.year})</span>
                        </strong>
                      </div>
                    </div>
                    <button
                      onClick={handleRerollDraftPool}
                      disabled={rerollsAvailable <= 0}
                      className={`p-1 px-2.5 rounded-lg border text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 ${
                        rerollsAvailable > 0 
                          ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20 cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.05)] animate-pulse' 
                          : 'bg-zinc-900 border-zinc-900 text-zinc-650 cursor-not-allowed'
                      }`}
                      title={rerollsAvailable > 0 ? `Spend 1 Reroll Ticket (${rerollsAvailable} Left)` : "No Reroll Tickets Left"}
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Reroll ({rerollsAvailable})</span>
                    </button>
                  </div>

                  {/* Golden Ball draft active flash alert banner */}
                  {isGoldenBallActive && (
                    <div className="mb-4 p-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-xl border border-amber-400/30 text-center animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.15)] select-none">
                      <span className="text-[10px] font-mono font-bold text-black uppercase tracking-widest flex items-center justify-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-black shrink-0 fill-current animate-bounce" />
                        <span>✨ ALTIN KART DRAFT SEÇİMİ AKTİF (+2 OVR) ✨</span>
                      </span>
                    </div>
                  )}

                  {/* Selection Status Information Banner */}
                  <div className="mb-4">
                    {!selectedPlayerForAssignment ? (
                      <div className="p-2.5 bg-zinc-900/30 border border-zinc-900 text-[11px] text-zinc-400 rounded-lg flex items-center gap-2 font-mono">
                        <span className="animate-bounce text-xs">👉</span>
                        <span>Click any player in the pool below to choose them for your line-up!</span>
                      </div>
                    ) : (
                      <div className="p-2.5 bg-emerald-950/30 border border-emerald-900 text-[11px] text-emerald-300 rounded-lg flex items-center justify-between gap-2 font-mono animate-pulse">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">🎯</span>
                          <span>Click a glowing <strong className="text-white uppercase">{selectedPlayerForAssignment.positionGroup}</strong> spot on the field to draft <strong>{selectedPlayerForAssignment.name}</strong>!</span>
                        </div>
                        <button 
                          onClick={() => setSelectedPlayerForAssignment(null)}
                          className="text-[9px] uppercase hover:text-red-400 border border-dashed border-emerald-800 rounded px-1.5 py-0.5 bg-emerald-950/60"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Filter candidates search input */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-600" />
                    <input
                      type="text"
                      placeholder="Search name, position, group..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-zinc-900/60 text-zinc-200 pl-9 pr-4 py-2 text-xs rounded-xl border border-zinc-900 focus:outline-none focus:border-[#e8ff3b] font-mono placeholder:text-zinc-600"
                    />
                  </div>

                  {/* Candidates Vertical Scroll List */}
                  <div className="space-y-2 max-h-[3400px] lg:max-h-[380px] overflow-y-auto pr-1">
                    {filteredPlayers.length === 0 ? (
                      <div className="text-center py-10 text-zinc-600 font-mono text-xs">
                        No players matching search criteria
                      </div>
                    ) : (
                      filteredPlayers.map((player) => {
                        const isAssigned = isPlayerAssigned(player.id);
                        const isSelected = selectedPlayerForAssignment?.id === player.id;
                        const isPositionFull = !isAssigned && isPositionLimitReached(player.position);
                        
                        // Golden cards upgrade conditions (+2 OVR in draft pools!)
                        const isGoldenCard = isGoldenBallActive && (player.rating >= 92 || player.legendary === true);
                        const displayRating = isGoldenCard ? Math.min(99, player.rating + 2) : player.rating;
                        const isLegendary = player.rating >= 93 || player.legendary === true || isGoldenCard;

                        let cardClass = "bg-zinc-900/60 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900";
                        let pillClass = getGroupPill(player.positionGroup);

                        if (isAssigned) {
                          cardClass = "bg-zinc-900/30 border-zinc-950 opacity-45 cursor-not-allowed";
                        } else if (isPositionFull) {
                          cardClass = "bg-zinc-950/20 border-zinc-950/60 opacity-50 cursor-not-allowed";
                          pillClass = "bg-zinc-850 text-zinc-550 border border-zinc-900";
                        } else if (isGoldenCard) {
                          cardClass = "bg-gradient-to-r from-amber-950/30 via-yellow-950/20 to-amber-950/30 border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]";
                          pillClass = "bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black";
                        } else if (isSelected) {
                          cardClass = "bg-emerald-950/50 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]";
                          pillClass = "bg-emerald-400 text-black";
                        }

                        return (
                          <div
                            key={player.id}
                            className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${cardClass}`}
                          >
                            <button
                              disabled={isAssigned || isPositionFull}
                              onClick={() => {
                                // If player is a golden card, let's clone them with the bumped up rating for active slot!
                                const chosenPlayer = isGoldenCard ? { ...player, rating: displayRating } : player;
                                handleSelectPlayer(chosenPlayer);
                              }}
                              className="flex-1 flex items-center gap-2.5 cursor-pointer text-left focus:outline-none"
                            >
                              {/* Rating pill representation */}
                              <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-display font-black text-xs ${pillClass}`}>
                                {displayRating}
                              </div>

                              {/* Identity label */}
                              <div className="flex-1 min-w-0">
                                <div className="font-sans font-semibold text-xs text-zinc-100 truncate flex items-center gap-1.5">
                                  <span className={isGoldenCard ? "text-amber-400 font-bold" : isPositionFull ? "text-zinc-500" : ""}>{player.name}</span>
                                  {isPositionFull && (
                                    <span className="text-[8px] bg-red-950/40 text-red-400 border border-red-900/40 px-1 py-0.2 rounded font-mono font-bold uppercase shrink-0">
                                      MEVKİ DOLU
                                    </span>
                                  )}
                                  {isGoldenCard && !isPositionFull && (
                                    <span className="text-[8px] bg-amber-400 text-black px-1 py-0.2 rounded font-mono font-bold uppercase shrink-0">
                                      👑 GOLDEN
                                    </span>
                                  )}
                                  {isLegendary && !isGoldenCard && !isPositionFull && <Star className="w-3 h-3 text-[#e8ff3b] fill-[#e8ff3b] inline" />}
                                </div>
                                <div className="font-mono text-[9px] text-zinc-500 space-x-1 mt-0.5">
                                  <span className="uppercase text-zinc-400 font-bold">{player.position}</span>
                                  <span>•</span>
                                  <span>{player.era.split(' ')[0]}</span>
                                  <span>•</span>
                                  <span>Goals: {player.wcStats.goals}</span>
                                </div>
                              </div>
                            </button>

                            {/* Secondary Action */}
                            <div className="flex items-center gap-1 ml-2">
                              <button
                                onClick={() => onOpenPlayerModal(player)}
                                className="p-1 px-1.5 hover:bg-zinc-800 rounded border border-zinc-850 text-zinc-500 hover:text-white transition-all"
                                title="View player statistics file"
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

                <div className="border-t border-zinc-900 pt-4 mt-6 space-y-3.5">
                  {/* Squad Count Line */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-1">
                      <span className="flex items-center gap-1">📋 <span>Squad Progress</span></span>
                      <strong className="text-white font-bold">{squadCount}/11</strong>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-300"
                        style={{ width: `${(squadCount / 11) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Chemistry Meter Line */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-1">
                      <span className="flex items-center gap-1">🧬 <span>Team Chemistry</span></span>
                      <strong className="text-[#e8ff3b] font-bold">{chemistryBreakdown.chemistry}%</strong>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-[#e8ff3b] h-full transition-all duration-300"
                        style={{ width: `${chemistryBreakdown.chemistry}%` }}
                      />
                    </div>
                  </div>

                  {/* Synergy Insights Pills */}
                  {squadCount > 0 && (
                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-mono">
                      <div className="bg-zinc-900/60 border border-zinc-850 p-1.5 rounded-lg text-center flex flex-col justify-center items-center gap-0.5">
                        <span className="text-zinc-500 uppercase tracking-tight text-[8px]">Preferred Role</span>
                        <strong className="text-zinc-200">{chemistryBreakdown.preferredPositions}/{squadCount} OK</strong>
                      </div>

                      {chemistryBreakdown.countryCore ? (
                        <div className="bg-zinc-900/60 border border-zinc-850 p-1.5 rounded-lg text-center flex flex-col justify-center items-center gap-0.5">
                          <span className="text-zinc-500 uppercase tracking-tight text-[8px]">Nation Core</span>
                          <strong className="text-zinc-200 truncate max-w-full flex items-center gap-1 flex-row">
                            <span>{chemistryBreakdown.countryCore.team.flag}</span>
                            <span className="truncate">{chemistryBreakdown.countryCore.team.name.split(' ')[0]}</span>
                          </strong>
                        </div>
                      ) : (
                        <div className="bg-zinc-900/10 border border-dashed border-zinc-900 p-1.5 rounded-lg text-center flex flex-col justify-center items-center text-zinc-500 font-light text-[9px]">
                          <span>No Nationality Link</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </main>

    </div>
  );
}
