'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Users, Calendar, Dices, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/components/LanguageProvider';

const LEGENDARY_NAMES = ['Pelé', 'Maradona', 'Messi', 'Cruyff', 'Ronaldo Nazário', 'Zinedine Zidane', 'Luka Modrić', 'Bobby Moore', 'Roberto Baggio'];

export default function LandingPage() {
  const { t, language, toggleLanguage, isMounted } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % LEGENDARY_NAMES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c0f] text-zinc-100 flex flex-col justify-between overflow-x-hidden relative">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e8ff3b]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER */}
      <nav className="max-w-7xl w-full mx-auto p-5 sm:p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-[#e8ff3b] text-black flex items-center justify-center font-display font-black text-xs shadow-md shadow-[#e8ff3b]/20">
            XI
          </div>
          <span className="font-display font-bold tracking-widest uppercase text-sm">
            {isMounted ? t('nav_title') : 'Dream XI'}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            id="lang-toggle-btn"
            onClick={toggleLanguage}
            className="text-xs font-mono tracking-wider bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-[#e8ff3b] px-2.5 py-1 rounded-lg text-zinc-400 transition-all uppercase"
          >
            {isMounted ? (language === 'en' ? 'TR 🇹🇷' : 'EN 🇬🇧') : '...'}
          </button>
          <Link
            href="/history"
            className="text-xs font-mono tracking-wider uppercase text-zinc-400 hover:text-[#e8ff3b] transition-colors"
          >
            {isMounted ? t('nav_trophy_cabinet') : 'Trophy Cabinet'}
          </Link>
        </div>
      </nav>

      {/* MAIN HERO CHAMPION SECTION */}
      <main className="max-w-4xl w-full mx-auto px-4 py-8 sm:py-16 text-center z-10 flex-1 flex flex-col justify-center">
        
        {/* Neon Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-950 border border-zinc-900 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#e8ff3b] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isMounted ? t('hero_badge') : 'Fascinating World Cup Records'}</span>
        </div>

        {/* Headline with dynamic cycling names */}
        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.95] text-white uppercase mb-6">
          {isMounted ? t('hero_title_1') : 'Build your'} <br className="sm:hidden" />
          <span className="relative inline-block h-[1.12em] w-full max-w-lg overflow-hidden align-middle">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIdx}
                initial={{ y: 35, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -35, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 180 }}
                className="absolute inset-x-0 text-[#e8ff3b] text-center filter drop-shadow-[0_0_15px_rgba(232,255,59,0.3)] inline-block select-none"
              >
                {LEGENDARY_NAMES[currentIdx]}
              </motion.span>
            </AnimatePresence>
          </span> 
          <br />
          {isMounted ? t('hero_title_2') : 'dream team'}
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed mb-10">
          {isMounted ? t('hero_description') : 'Randomly roll historical squads, choose tactical formations, recruit iconic global performers, and direct a fully simulated 4-stage FIFA World Cup knockout ladder.'}
        </p>

        {/* Main CTA */}
        <div className="flex flex-col items-center gap-3">
          <Link
            href="/play"
            className="group py-4 px-8 bg-[#e8ff3b] hover:bg-[#d6ec2b] text-black rounded-xl font-display font-black tracking-wider text-sm uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,255,59,0.4)] flex items-center justify-center gap-2"
          >
            <Dices className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            <span>{isMounted ? t('hero_cta') : 'Roll the dice →'}</span>
          </Link>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
            {isMounted ? t('hero_footer') : 'no registration required • 100% offline persistence'}
          </span>
        </div>

        {/* Counter dashboard statistics row */}
        <section className="grid grid-cols-3 gap-2 border border-zinc-900 rounded-2xl bg-zinc-950/60 p-4 max-w-lg mx-auto mt-16 text-center shadow-lg divide-x divide-zinc-900">
          <div>
            <div className="font-display font-bold text-lg sm:text-xl text-zinc-100 flex items-center justify-center gap-1">
              <Calendar className="w-4 h-4 text-[#e8ff3b] shrink-0" />
              <span>18</span>
            </div>
            <p className="font-mono text-[9px] text-zinc-500 uppercase mt-0.5 tracking-wider">
              {isMounted ? t('dashboard_editions') : 'Editions'}
            </p>
          </div>
          <div>
            <div className="font-display font-bold text-lg sm:text-xl text-zinc-100 flex items-center justify-center gap-1">
              <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
              <span>26</span>
            </div>
            <p className="font-mono text-[9px] text-zinc-500 uppercase mt-0.5 tracking-wider">
              {isMounted ? t('dashboard_nations') : 'Nations'}
            </p>
          </div>
          <div>
            <div className="font-display font-bold text-lg sm:text-xl text-zinc-100 flex items-center justify-center gap-1">
              <Users className="w-4 h-4 text-blue-400 shrink-0" />
              <span>100+</span>
            </div>
            <p className="font-mono text-[9px] text-zinc-500 uppercase mt-0.5 tracking-wider">
              {isMounted ? t('dashboard_legends') : 'Legends'}
            </p>
          </div>
        </section>

      </main>

      {/* HOW-IT-WORKS GRID */}
      <section className="max-w-5xl w-full mx-auto px-4 py-12 border-t border-zinc-900/60">
        <h3 className="font-display font-semibold text-center text-xs tracking-widest uppercase text-zinc-500 mb-8">
          {isMounted ? t('sequence_title') : 'Mechanical Sequence Flow'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="p-5 bg-zinc-950/40 border border-zinc-900 rounded-2xl flex flex-col justify-between min-h-[140px]">
            <span className="font-mono text-[10px] text-[#e8ff3b] uppercase tracking-wide leading-none mb-4">Phase 1</span>
            <div>
              <h4 className="font-display font-bold text-sm text-zinc-100 mb-1">
                {isMounted ? t('phase_1_title') : 'Random Draft Roll'}
              </h4>
              <p className="text-xs text-zinc-400 leading-normal">
                {isMounted ? t('phase_1_desc') : 'Draw a randomized FIFA national team combined with a legendary qualification year (1954 - 2022).'}
              </p>
            </div>
          </div>

          <div className="p-5 bg-zinc-950/40 border border-zinc-900 rounded-2xl flex flex-col justify-between min-h-[140px]">
            <span className="font-mono text-[10px] text-[#e8ff3b] uppercase tracking-wide leading-none mb-4">Phase 2</span>
            <div>
              <h4 className="font-display font-bold text-sm text-zinc-100 mb-1">
                {isMounted ? t('phase_2_title') : 'Deploy Tactics'}
              </h4>
              <p className="text-xs text-zinc-400 leading-normal">
                {isMounted ? t('phase_2_desc') : 'Choose among classic layouts (4-3-3, 3-5-2, 4-2-3-1) mapping key slot coordinate positions.'}
              </p>
            </div>
          </div>

          <div className="p-5 bg-zinc-950/40 border border-zinc-900 rounded-2xl flex flex-col justify-between min-h-[140px]">
            <span className="font-mono text-[10px] text-[#e8ff3b] uppercase tracking-wide leading-none mb-4">Phase 3</span>
            <div>
              <h4 className="font-display font-bold text-sm text-zinc-100 mb-1">
                {isMounted ? t('phase_3_title') : 'Recruit Roster'}
              </h4>
              <p className="text-xs text-zinc-400 leading-normal">
                {isMounted ? t('phase_3_desc') : 'Assemble exact slots with position-compliant candidates. Prevent duplicates to draft the clean OVR averages.'}
              </p>
            </div>
          </div>

          <div className="p-5 bg-zinc-950/40 border border-zinc-900 rounded-2xl flex flex-col justify-between min-h-[140px]">
            <span className="font-mono text-[10px] text-[#e8ff3b] uppercase tracking-wide leading-none mb-4">Phase 4</span>
            <div>
              <h4 className="font-display font-bold text-sm text-zinc-100 mb-1">
                {isMounted ? t('phase_4_title') : 'Knockout Sim'}
              </h4>
              <p className="text-xs text-zinc-400 leading-normal">
                {isMounted ? t('phase_4_desc') : 'Launch the simulation engine. Run progressive knockout rounds (R16, QF, SF, Final) assessing detailed stat files.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-950 bg-black/30 p-6 text-center z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-650 tracking-wider uppercase">
          <span>{isMounted ? t('footer_copyright') : '© 2026 Dream XI. Decided under vintage sports statistics.'}</span>
          <span>{isMounted ? t('footer_bounds') : 'In iframe bounds • zero cookie trackers'}</span>
        </div>
      </footer>

    </div>
  );
}
