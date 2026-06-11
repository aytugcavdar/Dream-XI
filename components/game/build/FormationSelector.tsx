'use client';

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import { Formation } from '@/types';
import { useLanguage } from '@/components/LanguageProvider';

interface FormationSelectorProps {
  formations: Formation[];
  selectedFormationId: string;
  handleFormationSelect: (id: string) => void;
  tacticalStyles: readonly any[];
  selectedTacticalStyle: string;
  onUpdateTacticalStyle: (styleId: string) => void;
  playSound: (soundName: 'roll-tick' | 'roll-stop' | 'select' | 'place' | 'clear' | 'success') => void;
  pendingFormationId: string | null;
  confirmFormationChange: () => void;
  setPendingFormationId: (id: string | null) => void;
}

export default function FormationSelector({
  formations,
  selectedFormationId,
  handleFormationSelect,
  tacticalStyles,
  selectedTacticalStyle,
  onUpdateTacticalStyle,
  playSound,
  pendingFormationId,
  confirmFormationChange,
  setPendingFormationId,
}: FormationSelectorProps) {
  const { t, isMounted } = useLanguage();
  return (
    <div className="mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1.5">{isMounted ? t('build_scheme') : 'Deployment Scheme'}</span>
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
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1.5">{isMounted ? t('build_philosophy') : 'Team Philosophy / Tactical Style'}</span>
          <div className="flex flex-wrap gap-1.5 bg-zinc-950/60 p-1.5 border border-zinc-900 rounded-xl w-fit">
            {tacticalStyles.map((style) => {
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
                <span>{isMounted ? t('build_change_formation_warning') : 'Changing formation will reset your current squad. Continue?'}</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <button
                  onClick={confirmFormationChange}
                  className="px-2.5 py-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold uppercase rounded-md tracking-wider text-[10px]"
                >
                  {isMounted ? t('build_btn_reset_change') : 'Reset & Change'}
                </button>
                <button
                  onClick={() => setPendingFormationId(null)}
                  className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-white uppercase rounded-md tracking-wider text-[10px]"
                >
                  {isMounted ? t('build_btn_cancel') : 'Cancel'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
