'use client';

import React, { useState, useEffect } from 'react';
import { GameState, NationalTeam, Player } from '@/types';
import { simulate } from '@/lib/engine';
import RollPhase from '@/components/game/RollPhase';
import BuildPhase from '@/components/game/BuildPhase';
import ResultPhase from '@/components/game/ResultPhase';
import PlayerModal from '@/components/game/PlayerModal';
import LiveSimPanel from '@/components/game/LiveSimPanel';
import { formations } from '@/data/formations';
import { Trophy, Activity, Network, Server, ArrowLeft, History } from 'lucide-react';
import Link from 'next/link';

export default function PlayPage() {
  // Main Game State
  const [gameState, setGameState] = useState<GameState>({
    phase: 'ROLL',
    selectedTeam: null,
    selectedYear: null,
    formation: '4-3-3',
    squad: {},
    simulationResult: null,
    tacticalStyle: 'tiki-taka'
  });

  // Player Detail Modal state
  const [modalPlayer, setModalPlayer] = useState<Player | null>(null);

  // Counter of history entries to show quick status
  const [historyCount, setHistoryCount] = useState(0);

  // Simulate Phase loading logs
  const [simStep, setSimStep] = useState(0);

  useEffect(() => {
    // Read history count
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('dreamxi_history');
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          setTimeout(() => {
            setHistoryCount(parsed.length);
          }, 0);
        } catch {
          // ignore
        }
      }
    }
  }, [gameState.phase]);

  // Rolling complete
  const handleRollComplete = (team: NationalTeam, year: number) => {
    // Initialize empty squad for the default formation '4-3-3'
    const defaultFormation = formations.find(f => f.id === '4-3-3') || formations[0];
    const initialSquad: { [key: string]: Player | null } = {};
    defaultFormation.slots.forEach(slot => {
      initialSquad[slot.id] = null;
    });

    setGameState({
      phase: 'BUILD',
      selectedTeam: team,
      selectedYear: year,
      formation: '4-3-3',
      squad: initialSquad,
      simulationResult: null,
      tacticalStyle: 'tiki-taka'
    });
  };

  // Changing formation mid-build
  const handleUpdateFormation = (formationId: string) => {
    setGameState(prev => ({
      ...prev,
      formation: formationId
    }));
  };

  // Changing general tactical style
  const handleUpdateTacticalStyle = (styleId: string) => {
    setGameState(prev => ({
      ...prev,
      tacticalStyle: styleId
    }));
  };

  // Updating the squad roster
  const handleUpdateSquad = (newSquad: { [slotId: string]: Player | null }) => {
    setGameState(prev => ({
      ...prev,
      squad: newSquad
    }));
  };

  // Triggering the actual simulation
  const handleSimulateTrigger = () => {
    try {
      const res = simulate(gameState);
      setGameState(prev => ({
        ...prev,
        simulationResult: res,
        phase: 'SIMULATE'
      }));
    } catch (err) {
      console.error('Simulation Failed', err);
    }
  };

  // Lobby actions: Play again / Reroll
  const handlePlayAgain = () => {
    setGameState({
      phase: 'ROLL',
      selectedTeam: null,
      selectedYear: null,
      formation: '4-3-3',
      squad: {},
      simulationResult: null,
      tacticalStyle: 'tiki-taka'
    });
  };

  // Lobby actions: Rebuild squad with same country + year
  const handleTrySameTeam = () => {
    if (!gameState.selectedTeam || !gameState.selectedYear) return;
    
    // Clear squad slots
    const currentFormation = formations.find(f => f.id === gameState.formation) || formations[0];
    const initialSquad: { [key: string]: Player | null } = {};
    currentFormation.slots.forEach(slot => {
      initialSquad[slot.id] = null;
    });

    setGameState(prev => ({
      ...prev,
      phase: 'BUILD',
      squad: initialSquad,
      simulationResult: null
    }));
  };

  // Navigation callbacks
  const navigateToHistory = () => {
    window.location.href = '/history';
  };

  return (
    <div className="min-h-screen bg-[#0a0c0f] select-none">
      
      {/* 1. ROLL PHASE VIEW */}
      {gameState.phase === 'ROLL' && (
        <RollPhase 
          onRoll={handleRollComplete} 
          historyCount={historyCount}
          onNavigateHistory={navigateToHistory}
        />
      )}

      {/* 2. BUILD PHASE VIEW */}
      {gameState.phase === 'BUILD' && gameState.selectedTeam && gameState.selectedYear && (
        <BuildPhase
          team={gameState.selectedTeam}
          year={gameState.selectedYear}
          selectedFormationId={gameState.formation}
          selectedTacticalStyle={gameState.tacticalStyle || 'tiki-taka'}
          squad={gameState.squad}
          onUpdateSquad={handleUpdateSquad}
          onUpdateFormation={handleUpdateFormation}
          onUpdateTacticalStyle={handleUpdateTacticalStyle}
          onSimulate={handleSimulateTrigger}
          onReroll={handlePlayAgain}
          onOpenPlayerModal={(p) => setModalPlayer(p)}
        />
      )}

      {/* 3. SIMULATE INTERACTIVE PANEL */}
      {gameState.phase === 'SIMULATE' && gameState.selectedTeam && gameState.selectedYear && gameState.simulationResult && (
        <LiveSimPanel
          team={gameState.selectedTeam}
          year={gameState.selectedYear}
          result={gameState.simulationResult}
          onComplete={() => {
            setGameState(prev => ({
              ...prev,
              phase: 'RESULT'
            }));
          }}
        />
      )}

      {/* 4. RESULT PHASE VIEW */}
      {gameState.phase === 'RESULT' && gameState.selectedTeam && gameState.selectedYear && gameState.simulationResult && (
        <ResultPhase
          team={gameState.selectedTeam}
          year={gameState.selectedYear}
          formationId={gameState.formation}
          result={gameState.simulationResult}
          squad={gameState.squad}
          tacticalStyle={gameState.tacticalStyle || 'tiki-taka'}
          onPlayAgain={handlePlayAgain}
          onTrySameTeam={handleTrySameTeam}
          onNavigateHistory={navigateToHistory}
          onOpenPlayerModal={(p) => setModalPlayer(p)}
        />
      )}

      {/* GLOBAL MOUNTED PLAYER DETAIL MODAL */}
      <PlayerModal player={modalPlayer} onClose={() => setModalPlayer(null)} />

    </div>
  );
}
