'use client';

import React, { useState, useEffect } from 'react';
import { NationalTeam } from '@/types';
import { teams } from '@/data/teams';
import { Dices, Trophy, Globe, History } from 'lucide-react';
import { motion } from 'motion/react';

interface RollPhaseProps {
  onRoll: (team: NationalTeam, year: number) => void;
  historyCount: number;
  onNavigateHistory: () => void;
}

const LEGENDARY_PLAYERS = ['Pelé', 'Maradona', 'Messi', 'Zidane', 'Cruyff', 'Ronaldo', 'Beckenbauer', 'Baggio', 'Eusébio', 'Modrić', 'Iniesta'];

export default function RollPhase({ onRoll, historyCount, onNavigateHistory }: RollPhaseProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [displayFlag, setDisplayFlag] = useState('⚽');
  const [displayName, setDisplayName] = useState('DREAM XI');
  const [displayYear, setDisplayYear] = useState<number | string>('????');
  const [scrambleNameIndex, setScrambleNameIndex] = useState(0);

  // Animated text lists
  const [playerTicker, setPlayerTicker] = useState(LEGENDARY_PLAYERS[0]);

  // Cycling legendary players ticker
  useEffect(() => {
    let tickerIndex = 0;
    const interval = setInterval(() => {
      tickerIndex = (tickerIndex + 1) % LEGENDARY_PLAYERS.length;
      setPlayerTicker(LEGENDARY_PLAYERS[tickerIndex]);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Rolling slot animation
  useEffect(() => {
    if (!isRolling) return;

    let iterations = 0;
    const maxIterations = 25;
    const intervalTime = 70;

    const interval = setInterval(() => {
      // Pick random team
      const randomTeam = teams[Math.floor(Math.random() * teams.length)];
      // Pick random year from that team's list of appearances, preferring post-1980
      const post1980YearsTemp = randomTeam.worldCupAppearances.filter(y => y >= 1980);
      const randomYear = post1980YearsTemp.length > 0
        ? post1980YearsTemp[Math.floor(Math.random() * post1980YearsTemp.length)]
        : randomTeam.worldCupAppearances[Math.floor(Math.random() * randomTeam.worldCupAppearances.length)];

      setDisplayFlag(randomTeam.flag);
      setDisplayName(randomTeam.name);
      setDisplayYear(randomYear);

      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        
        // Final roll assignment
        const finalTeam = teams[Math.floor(Math.random() * teams.length)];
        const post1980YearsFinal = finalTeam.worldCupAppearances.filter(y => y >= 1980);
        const finalYear = post1980YearsFinal.length > 0
          ? post1980YearsFinal[Math.floor(Math.random() * post1980YearsFinal.length)]
          : finalTeam.worldCupAppearances[Math.floor(Math.random() * finalTeam.worldCupAppearances.length)];

        setDisplayFlag(finalTeam.flag);
        setDisplayName(finalTeam.name);
        setDisplayYear(finalYear);
        setIsRolling(false);

        // Notify parent
        setTimeout(() => {
          onRoll(finalTeam, finalYear);
        }, 600);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isRolling, onRoll]);

  const handleStartRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] px-4 py-8 relative">
      
      {/* Decorative Grid and Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,255,59,0.03),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-lg bg-zinc-950 border border-zinc-900 rounded-3xl p-8 relative shadow-2xl overflow-hidden animate-fade-in">
        
        {/* Glow behind the slot-reel */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#e8ff3b]/5 blur-3xl rounded-full" />

        {/* Top Header Row */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Live Simulator</span>
          </div>
          {historyCount > 0 && (
            <button
              id="history-lobby-btn"
              onClick={onNavigateHistory}
              className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 rounded-full text-xs font-mono text-zinc-400 hover:text-[#e8ff3b] transition-all"
            >
              <History className="w-3.5 h-3.5" />
              <span>History ({historyCount})</span>
            </button>
          )}
        </div>

        {/* Hero title / cycling text */}
        <div className="text-center mb-10">
          <span className="font-mono text-xs text-[#e8ff3b] bg-[#e8ff3b]/10 border border-[#e8ff3b]/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
            FIFA Legends Edition
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-zinc-100 mt-2 mb-3 leading-tight tracking-tight">
            Build your <span className="text-[#e8ff3b] underline decoration-[#e8ff3b]/40 underline-offset-4">{playerTicker}</span> dream team
          </h1>
          <p className="text-zinc-400 text-sm max-w-sm mx-auto">
            Step into the history machine. Randomly draft a historic team and conquer the knockout tournament with your legendary lineup.
          </p>
        </div>

        {/* Visual Reels */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 mb-8 text-center relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-zinc-900 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
            
            {/* Reel 1: Flag and Nation */}
            <div className="flex flex-col items-center justify-center min-w-[170px]">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">National Team</span>
              <div className="h-20 flex flex-col items-center justify-center">
                <span className={`text-4xl mb-1 select-none ${isRolling ? 'animate-bounce' : 'glow-lime'}`}>
                  {displayFlag}
                </span>
                <span className="font-display font-medium text-lg leading-tight tracking-tight text-white uppercase">
                  {displayName}
                </span>
              </div>
            </div>

            {/* Visual Divider block */}
            <div className="hidden sm:block text-zinc-800 font-display text-4xl font-extralight select-none">
              /
            </div>

            {/* Reel 2: Year */}
            <div className="flex flex-col items-center justify-center min-w-[110px]">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">World Cup Year</span>
              <div className="h-20 flex items-center justify-center">
                <span className={`font-display font-bold text-4xl tracking-tight ${isRolling ? 'text-zinc-600' : 'text-[#e8ff3b] glow-lime'}`}>
                  {displayYear}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Roll Dice Button */}
        <div className="text-center relative">
          <button
            id="roll-dice-btn"
            disabled={isRolling}
            onClick={handleStartRoll}
            className={`w-full group py-4 px-6 rounded-xl flex items-center justify-center gap-3 font-display font-bold text-base tracking-wider uppercase transition-all duration-300 ${
              isRolling 
                ? 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-[#e8ff3b] text-black hover:bg-[#d6ec2b] hover:shadow-[0_0_25px_rgba(232,255,59,0.35)] cursor-pointer'
            }`}
          >
            <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : 'group-hover:rotate-45 transition-transform'}`} />
            <span>{isRolling ? 'Locating Vintage Dossier...' : 'Roll the dice →'}</span>
          </button>
        </div>

        {/* Small Facts row (24 editions, 25+ nations, 100+ legends) */}
        <div className="grid grid-cols-3 gap-2 border-t border-zinc-900 pt-6 mt-8 text-center text-zinc-500">
          <div>
            <div className="font-display font-semibold text-sm text-zinc-300 leading-none mb-1">18</div>
            <div className="font-mono text-[9px] uppercase tracking-wider">Editions</div>
          </div>
          <div className="border-x border-zinc-900">
            <div className="font-display font-semibold text-sm text-zinc-300 leading-none mb-1">26</div>
            <div className="font-mono text-[9px] uppercase tracking-wider">Nations</div>
          </div>
          <div>
            <div className="font-display font-semibold text-sm text-zinc-300 leading-none mb-1">100+</div>
            <div className="font-mono text-[9px] uppercase tracking-wider">Legends</div>
          </div>
        </div>
      </div>

      {/* Guide Card at bottom */}
      <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-zinc-950/40 border border-zinc-900 p-4 rounded-xl flex gap-3 text-left">
          <div className="p-2 h-fit bg-[#e8ff3b]/5 border border-[#e8ff3b]/10 text-[#e8ff3b] rounded-lg">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-xs text-zinc-200 uppercase tracking-widest mb-1">Championship Goals</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Assemble 11 players, select tactical formations, and beat 4 heavyweights down the knockout tree.</p>
          </div>
        </div>
        <div className="bg-zinc-950/40 border border-zinc-900 p-4 rounded-xl flex gap-3 text-left">
          <div className="p-2 h-fit bg-blue-500/5 border border-blue-500/10 text-blue-400 rounded-lg">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-xs text-zinc-200 uppercase tracking-widest mb-1">Vintage Dossiers</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Unlock historical bios, World Cup campaign scores, and personal records of classic players.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
