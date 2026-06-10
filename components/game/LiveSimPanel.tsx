'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Player, NationalTeam, SimulationResult, MatchResult } from '@/types';
import { Play, SkipForward, ArrowRight, Trophy, AlertCircle, Shield, Award, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LiveSimPanelProps {
  team: NationalTeam;
  year: number;
  result: SimulationResult;
  onComplete: () => void;
}

// Set of atmospheric generic commentary lines
const COMMENTARY_MIDFIELD = [
  "fights for possession in the center circle.",
  "orchestrates a series of neat short plays.",
  "finds space on the flank and curls a direct ball.",
  "intercepts a critical pass, breaking the opponent counter-attack.",
  "sprays a majestic 40-yard diagonal pass into the box.",
  "is fouled from behind, sparking warnings from the referee.",
  "pulls off classic trickery to escape two defenders."
];

const COMMENTARY_DEFENSE = [
  "makes a massive sliding clearance inside the 18-yard box.",
  "organizes the backline to capture the offside trap.",
  "comfortably collects an incoming long-range ball.",
  "leaps high to shield away a dangerous corner kick.",
  "stands tall to block a heavy drive from the opponent striker."
];

// Resolve efsanevi (legendary) moves for our selected super-icons in Turkish commentary lines
function getPlayerIconicAction(playerName: string, actionSeed: number): string | null {
  const name = playerName.toLowerCase();
  
  if (name.includes('pele') || name.includes('pelé')) {
    const actions = [
      "efsanevi rövaşatasıyla kaleciyi çaresiz bırakıyor ve trübünleri ayağa kaldırıyor! ⚽🌟",
      "havadan gelen topu muhteşem göğüs kontrolüyle yumuşatıp harika bir voleyle doksana asıyor! 🌟",
      "ipe dizer gibi üç savunmacıyı geçip efsane bir plase gol imzalıyor! 👑"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('maradona')) {
    const actions = [
      "orta sahadan aldığı topla tüm rakip takımı çalıma dizerek kaleciyi de avlıyor! 👑🇦🇷",
      "rakip kalecinin üstünden rüya gibi bir aşırtma vuruşla adeta büyü yapıyor! ⚽",
      "üstün top tekniğiyle rakiplerini şaşkına çevirip bacak arasından milimetrik asistini fırlatıyor! 🪄"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('zidane')) {
    const actions = [
      "sol ayağıyla adeta fizik kurallarına meydan okuyan mermi gibi bir vole golü gönderiyor! 🪄🇫🇷",
      "kendi ekseninde zarifçe dönerek (Zidane Ruleti) rakiplerini adeta oyundan siliyor! ✨",
      "kusursuz futbol zekasıyla forvet hattını tek pasta kaleciyle karşı karşıya bırakıyor!"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('nazário') || (name.includes('ronaldo') && !name.includes('cristiano'))) {
    const actions = [
      "roket hızıyla depara kalkıp meşhur efsanevi kaleci çalımlarından biriyle topu boş ağlara bırakıyor! 🇧🇷⚡",
      "rakiplerini üst üste yaptığı seri çalımlarla çaresiz bırakıp resital sunuyor! ⚽",
      "patlayıcı gücüyle savunmayı unufak edip muazzam bir gol vuruşu çıkarıyor! 🔥"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('ronaldinho')) {
    const actions = [
      "büyüleyici bir 'no-look pass' (bakmadan pas) vererek tribünleri çılgına çeviriyor! 🤙🇧🇷",
      "akılalmaz bir 'elastico' çalımıyla sol çizgiden ceza sahasına slalom yapıyor! ⚡",
      "uzak köşeye inanılmaz bir falsolu frikik vuruşu çekerek kaleciyi donduruyor! 🪄"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('kroos')) {
    const actions = [
      "orta sahada milimetrik paslarıyla oyunu yöneten bir orkestra şefi gibi parlıyor! 🇩🇪🪄",
      "ceza sahası dışından adeta elle bırakmış gibi köşeye meşhur plase golünü atıyor! ⚽",
      "harika bir korner vuruşuyla topu doğrudan arkadaşının kafasına adrese teslim gönderiyor!"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('müller') || name.includes('muller')) {
    const actions = [
      "ceza sahası içindeki harika önsezisiyle topun düşeceği yeri koklayıp golünü yapıyor! 🇩🇪🔥",
      "rakipleri şaşırtan akıl dolu boş koşusuyla rakip defans hattını darmadağın ediyor!",
      "savunmadan seken topu kurnazca kontrol edip anında sert bir şutla filelere yolluyor!"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('maldini')) {
    const actions = [
      "asla geçilmeyen bir duvar misali tertemiz kayarak müdahaleyle topu söküp alıyor! 🛡️🇮🇹",
      "kusursuz pozisyon bilgisiyle rakibin en tehlikeli kontrasını büyüteçle keser gibi engelliyor!",
      "savunmadan liderce oyunu kurup arkadaşlarını muazzam yönlendiriyor!"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('nesta')) {
    const actions = [
      "cerrah titizliğinde bir hamleyle rakibin ayağındaki topu nefis bir şekilde kapıyor! 🛡️",
      "hava topunda rakiplerine milim geçit vermeyerek tehlikeyi taca püskürtüyor!",
      "yerden kritik bir müdahaleyle ceza sahasındaki ölümcül pas kanalını kapatıyor!"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('platini')) {
    const actions = [
      "zekice döşediği frikik barajının hemen üstünden topu çatala fırlatıyor! 🎯🇫🇷",
      "derin bir oyun okuma becerisiyle ceza sahasına muhteşem bir tek top indiriyor!",
      "orta sahada tek dokunuşla rakip defansın kimyasını bozuyor!"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('xavi')) {
    const actions = [
      "360 derece dönerek yaptığı tescilli 'La Pelopina' dönüşüyle üç presçiyi nakavt ediyor! 🇪🇸🪄",
      "iğne deliğinden iplik geçirir gibi savunmanın arkasına gizemli bir pas bırakıyor! ⚽",
      "orta sahada pas istasyonu oluşturarak takımın oyun ritmini mükemmel kontrol ediyor!"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('iniesta')) {
    const actions = [
      "dar alanda meşhur 'La Croqueta' çalımıyla rakibinden tereyağı gibi sıyrılıp geçiyor! 🇪🇸⚡",
      "zarif bir havadan ara pasıyla forvete nefis bir asist ikramı yapıyor! 🪄",
      "pres altındayken soğukkanlılığıyla topu oyunda tutup takımı rahatlatıyor!"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('messi')) {
    const actions = [
      "sağ kanattan depar atarak 4 kişiyi ipe dizercesine geçip şov yapıyor! 🐐👑🇲🇦",
      "enfes bir serbest vuruşla topu kalecinin uzanamayacağı köşeye imzalıyor! ⚽",
      "akılalmaz bir aşırtma şutla savunma bloğunu tamamen geçersiz kılmaktadır!"
    ];
    return actions[actionSeed % actions.length];
  }
  if (name.includes('di maría') || name.includes('di maria')) {
    const actions = [
      "sol kanattan efsanevi 'rabona' pası fırlatıp resital sunuyor! 🪄",
      "sağ kanattan sızarak efsanevi aşırtma vuruşlarından birini gole çeviriyor!",
      "önemli anların adamı olduğunu yine nefis tekniğiyle kanıtlıyor! ⭐"
    ];
    return actions[actionSeed % actions.length];
  }

  return null;
}

export default function LiveSimPanel({ team, year, result, onComplete }: LiveSimPanelProps) {
  const [currentMatchIdx, setCurrentMatchIdx] = useState(0);
  const [matchMinute, setMatchMinute] = useState(0);
  const [currentOurGoals, setCurrentOurGoals] = useState(0);
  const [currentOpponentGoals, setCurrentOpponentGoals] = useState(0);
  const [tickerEvents, setTickerEvents] = useState<string[]>([]);
  const [simPlaySpeed, setSimPlaySpeed] = useState<number>(1200); // ms per tick

  // Match stage state: 'PRE_MATCH' | 'PLAYING' | 'POST_MATCH' | 'ELIMINATED' | 'CHAMPION_TRANS'
  const [matchStage, setMatchStage] = useState<'PRE_MATCH' | 'PLAYING' | 'POST_MATCH' | 'ELIMINATED' | 'CHAMPION_TRANS'>('PRE_MATCH');

  const tickerRef = useRef<HTMLDivElement>(null);

  const activeMatch: MatchResult = useMemo(() => {
    return result.matches[currentMatchIdx];
  }, [result.matches, currentMatchIdx]);

  // Determine active players who scored in this match
  const matchGoalScorers = useMemo(() => {
    if (!activeMatch) return [];
    return activeMatch.playerStats.filter(p => p.goals > 0);
  }, [activeMatch]);

  // Pre-calculate at what minutes goals happen so they map beautifully to the commentary
  // Uses deterministic formulas to stay completely PURE for React memo render cycles.
  const goalMinutes = useMemo(() => {
    if (!activeMatch) return { ourTimes: [], opponentTimes: [] };
    
    // Distribute ourGoals deterministically using player key hashes
    const ourTimes: { min: number; scorer: string }[] = [];
    const scorersPool = [...matchGoalScorers];
    
    for (let i = 0; i < activeMatch.teamGoals; i++) {
      const charCodeSum = scorersPool[i % scorersPool.length]?.playerName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 10) || 45;
      const min = ((i * 31 + charCodeSum) % 75) + 8;
      const scorer = scorersPool[i % scorersPool.length]?.playerName || 'Squad Pro';
      ourTimes.push({ min, scorer });
    }
    ourTimes.sort((a, b) => a.min - b.min);

    // Distribute opponent goals deterministically
    const opponentTimes: { min: number }[] = [];
    for (let i = 0; i < activeMatch.opponentGoals; i++) {
      const nameLength = activeMatch.opponentName.length;
      const min = ((i * 41 + nameLength * 7) % 75) + 12;
      opponentTimes.push({ min });
    }
    opponentTimes.sort((a, b) => a.min - b.min);

    return { ourTimes, opponentTimes };
  }, [activeMatch, matchGoalScorers]);

  // Auto scroll commentary ticker to bottom
  useEffect(() => {
    if (tickerRef.current) {
      tickerRef.current.scrollTop = tickerRef.current.scrollHeight;
    }
  }, [tickerEvents]);

  // Reset parameters when moving to the next match
  const startMatchSim = () => {
    setMatchMinute(0);
    setCurrentOurGoals(0);
    setCurrentOpponentGoals(0);
    setTickerEvents([`🏟️ Welcome to Match Day! The pitch is loaded.`, `📢 Kick-off is imminent. Let's conquer the grid!`]);
    setMatchStage('PLAYING');
  };

  // Skip match straight to end scoreline
  const handleFastForwardMatch = () => {
    setCurrentOurGoals(activeMatch.teamGoals);
    setCurrentOpponentGoals(activeMatch.opponentGoals);
    setMatchMinute(90);
    
    const finalLogs = [
      `⏱️ Min 90: Referee blows the final whistle here!`,
      `🏁 FT Scoreline matches the final model calculations: ${activeMatch.teamGoals} - ${activeMatch.opponentGoals}.`
    ];

    if (activeMatch.won) {
      finalLogs.push(`🎉 WIN! ${team.flag} ${team.name} passes to the next round with complete composure.`);
    } else {
      finalLogs.push(`💔 LOSS! Elite tactical opposition managed to contain our squads.`);
    }

    setTickerEvents(prev => [...prev, ...finalLogs]);
    setMatchStage(activeMatch.won ? 'POST_MATCH' : 'ELIMINATED');
  };

  // Live minute ticking engine
  useEffect(() => {
    if (matchStage !== 'PLAYING') return;

    const interval = setTimeout(() => {
      if (matchMinute >= 90) {
        // Handle tie breakers
        const isDraw = activeMatch.teamGoals === activeMatch.opponentGoals;
        if (isDraw) {
          const isPenaltiesWin = activeMatch.won;
          const pensText = isPenaltiesWin 
            ? `🏆 DRAW AFTER TIME! Penalty Shootout initiated... WIN! (${team.name} converts their penalties triumphantly!)`
            : `❌ DRAW AFTER TIME! Penalty Shootout initiated... LOSS! (Opponent GK pulled off critical saves.)`;
          
          setTickerEvents(prev => [...prev, `⏱️ Min 120: Final extra-time whistle!`, pensText]);
        } else {
          setTickerEvents(prev => [...prev, `⏱️ Min 90: It is all over! Final whistle blown.`]);
        }

        setMatchStage(activeMatch.won ? 'POST_MATCH' : 'ELIMINATED');
        return;
      }

      const nextMin = matchMinute + 15;
      setMatchMinute(nextMin);

      // Check for goals occurring in this 15-minute block
      let ourGoalsCount = 0;
      let opponentGoalsCount = 0;

      const ourScorersThisBlock = goalMinutes.ourTimes.filter(g => g.min > matchMinute && g.min <= nextMin);
      const enemyGoalsThisBlock = goalMinutes.opponentTimes.filter(g => g.min > matchMinute && g.min <= nextMin);

      let logSnippet = '';

      if (ourScorersThisBlock.length > 0) {
        ourGoalsCount += ourScorersThisBlock.length;
        const scorer = ourScorersThisBlock[0].scorer;
        
        // Check for legendary player specific move override!
        const iconicAction = getPlayerIconicAction(scorer, nextMin);
        if (iconicAction) {
          logSnippet = `⚽ Min ${ourScorersThisBlock[0].min}: GOOOOOAL! ${team.flag} ${team.name} golü buluyor! 🌟 ${scorer} ${iconicAction}`;
        } else {
          logSnippet = `⚽ Min ${ourScorersThisBlock[0].min}: GOOOOOAL! ${team.flag} ${team.name} strikes! ${scorer} executes a flawless shot into the net!`;
        }
      } else if (enemyGoalsThisBlock.length > 0) {
        opponentGoalsCount += enemyGoalsThisBlock.length;
        logSnippet = `⚠️ Min ${enemyGoalsThisBlock[0].min}: GOAL! The opposition exploits our flank defense to slot home.`;
      } else {
        // Deterministic team events using seed modulos
        const eventSeed = nextMin * 73 + activeMatch.opponentStrength;
        const randomSource = (eventSeed % 2 === 0) ? COMMENTARY_MIDFIELD : COMMENTARY_DEFENSE;
        
        const randomPlayerIndex = eventSeed % activeMatch.playerStats.length;
        const randomPlayer = activeMatch.playerStats[randomPlayerIndex]?.playerName || 'Player';
        
        // Efsanevi moves commentary insertion
        const iconicAction = getPlayerIconicAction(randomPlayer, eventSeed);
        if (iconicAction) {
          logSnippet = `✨ Min ${nextMin}: [${randomPlayer}] ${iconicAction}`;
        } else {
          const actionText = randomSource[eventSeed % randomSource.length];
          logSnippet = `⏱️ Min ${nextMin}: [${randomPlayer}] ${actionText}`;
        }
      }

      setCurrentOurGoals(prev => prev + ourGoalsCount);
      setCurrentOpponentGoals(prev => prev + opponentGoalsCount);
      setTickerEvents(prev => [...prev, logSnippet]);

    }, simPlaySpeed);

    return () => clearTimeout(interval);
  }, [matchStage, matchMinute, activeMatch, goalMinutes, team, simPlaySpeed]);

  // Proceed to the next knockout round
  const handleNextMatchStep = () => {
    if (currentMatchIdx < result.matches.length - 1) {
      setCurrentMatchIdx(prev => prev + 1);
      setMatchStage('PRE_MATCH');
    } else {
      // Completed all matches (won the trophy!)
      setMatchStage('CHAMPION_TRANS');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-2 sm:px-4 text-zinc-100 py-6">
      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-900 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col gap-6">
        
        {/* Neon Aesthetic Header Bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-[#e8ff3b] to-emerald-500 animate-pulse" />

        {/* TOP META ROW */}
        <div className="flex justify-between items-center bg-zinc-900/30 border border-zinc-900 rounded-2xl p-3 px-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-zinc-300 uppercase tracking-widest text-[10px]">ROUND DEPLOYMENT: {activeMatch.round}</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-500">
            <span>SPEED:</span>
            <button 
              onClick={() => setSimPlaySpeed(1200)}
              className={`p-1 px-1.5 rounded text-[9px] font-bold ${simPlaySpeed === 1200 ? 'bg-[#e8ff3b] text-black' : 'hover:text-zinc-300'}`}
            >
              1X
            </button>
            <button 
              onClick={() => setSimPlaySpeed(450)}
              className={`p-1 px-1.5 rounded text-[9px] font-bold ${simPlaySpeed === 450 ? 'bg-[#e8ff3b] text-black' : 'hover:text-zinc-300'}`}
            >
              2X
            </button>
          </div>
        </div>

        {/* HERO STADIUM BOARD: OUR TEAM vs OPPONENT */}
        <div className="grid grid-cols-7 items-center bg-zinc-900/50 border border-zinc-850 rounded-2xl p-4 sm:p-6 text-center shadow-inner relative">
          
          {/* OUR TEAM BOX */}
          <div className="col-span-2 flex flex-col items-center">
            <div className="text-4xl sm:text-5xl select-none mb-2 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
              {team.flag}
            </div>
            <span className="font-display font-black text-sm uppercase tracking-tight text-white truncate max-w-[100px] sm:max-w-none">
              {team.name}
            </span>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">
              OVR {result.teamRating}
            </span>
          </div>

          {/* ACTIVE SCORE CONTAINER */}
          <div className="col-span-3 flex flex-col items-center justify-center">
            {/* MATCH MINUTE CLOCK */}
            <div className="px-2.5 py-1 bg-zinc-950/80 border border-zinc-900 hover:border-[#e8ff3b]/20 rounded-full text-[10px] font-mono tracking-widest text-emerald-400 font-extrabold mb-3">
              {matchStage === 'PLAYING' ? `LIVE • ${matchMinute}'` : matchStage === 'PRE_MATCH' ? 'PRE-MATCH' : 'FULL TIME'}
            </div>

            {/* BIG NUMBERS */}
            <div className="flex items-center justify-center gap-3">
              <span className={`text-3xl sm:text-4xl font-display font-black font-mono transition-transform duration-250 ${currentOurGoals > 0 ? 'scale-110 text-[#e8ff3b]' : 'text-zinc-100'}`}>
                {currentOurGoals}
              </span>
              <span className="text-zinc-650 font-light text-xl font-sans">-</span>
              <span className={`text-3xl sm:text-4xl font-display font-black font-mono transition-transform duration-250 ${currentOpponentGoals > 0 ? 'scale-110 text-red-400' : 'text-zinc-100'}`}>
                {currentOpponentGoals}
              </span>
            </div>

            {/* Shootout penalty notification under standard clock */}
            {matchMinute >= 90 && activeMatch.teamGoals === activeMatch.opponentGoals && (
              <span className="font-mono text-[8px] tracking-wider text-emerald-400 font-black uppercase mt-2 animate-pulse">
                {activeMatch.won
                  ? `(Won ${4 + Math.floor(activeMatch.opponentStrength % 2)}-${3 + Math.floor(activeMatch.opponentStrength % 2)} pens)`
                  : `(Lost ${3 - Math.floor(activeMatch.opponentStrength % 2)}-${4 - Math.floor(activeMatch.opponentStrength % 2)} pens)`}
              </span>
            )}
          </div>

          {/* OPPONENT BOX */}
          <div className="col-span-2 flex flex-col items-center">
            <div className="text-4xl sm:text-5xl select-none mb-2 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
              {activeMatch.opponentFlag}
            </div>
            <span className="font-display font-black text-sm uppercase tracking-tight text-white truncate max-w-[100px] sm:max-w-none">
              {activeMatch.opponentName}
            </span>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">
              OVR {activeMatch.opponentStrength * 10}
            </span>
          </div>

        </div>

        {/* LIVE COMMENTARY TERMINAL TICKER */}
        <div className="flex flex-col flex-1 bg-black/95 border border-zinc-900 rounded-2xl p-4 min-h-[200px] max-h-[220px]">
          <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-2 mb-2 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5 text-[#e8ff3b]" fill="currentColor" />
            <span>REAL-TIME MATCH EVENTS PROTOCOL</span>
          </div>
          
          <div 
            ref={tickerRef}
            className="flex-1 overflow-y-auto space-y-2.5 font-mono text-xs pr-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent selection:bg-[#e8ff3b]/20 selection:text-white"
          >
            {tickerEvents.map((evt, idx) => {
              const isGoal = evt.includes('GOAL') || evt.includes('strikes');
              const isWin = evt.includes('WIN');
              const isLoss = evt.includes('LOSS');
              const isSystem = evt.startsWith('🏟️') || evt.startsWith('📢');

              let textClass = 'text-zinc-450';
              if (isGoal) textClass = 'text-[#e8ff3b] font-black border-l-2 border-[#e8ff3b] pl-2 bg-zinc-900/40 py-1 rounded';
              else if (isWin) textClass = 'text-emerald-400 font-bold bg-emerald-950/20 p-2 border border-emerald-900/30 rounded';
              else if (isLoss) textClass = 'text-red-400 font-bold bg-red-950/20 p-2 border border-red-900/30 rounded';
              else if (isSystem) textClass = 'text-zinc-550 italic';

              return (
                <div key={idx} className={`leading-relaxed text-[11px] ${textClass}`}>
                  {evt}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM STEP CONTROLS ROW */}
        <div className="flex justify-between items-center pt-2 gap-4">
          
          {/* Quick skip directly to bracket end */}
          <button
            onClick={onComplete}
            className="py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-[11px] font-mono font-bold uppercase tracking-wider rounded-xl transition-all"
            title="Instant Calculations Bypass viewer"
          >
            Skip Simulations
          </button>

          {/* Core play controls */}
          <div className="flex-1 flex justify-end">
            <AnimatePresence mode="wait">
              {matchStage === 'PRE_MATCH' && (
                <motion.button
                  key="start"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={startMatchSim}
                  className="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-black font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>KICK-OFF NOW</span>
                </motion.button>
              )}

              {matchStage === 'PLAYING' && (
                <motion.button
                  key="playing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={handleFastForwardMatch}
                  className="py-3 px-6 bg-zinc-905 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>Fast Forward match</span>
                </motion.button>
              )}

              {matchStage === 'POST_MATCH' && (
                <motion.button
                  key="post"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={handleNextMatchStep}
                  className="py-3 px-6 bg-[#e8ff3b] text-black hover:bg-[#d6ec2b] font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(232,255,59,0.3)] transition-all flex items-center gap-1.5"
                >
                  <span>PROCEED TO {currentMatchIdx < result.matches.length - 1 ? result.matches[currentMatchIdx + 1].round.toUpperCase() : 'FINISH Campaign'}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}

              {matchStage === 'ELIMINATED' && (
                <motion.button
                  key="eliminated"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={onComplete}
                  className="py-3 px-6 bg-red-500 hover:bg-red-600 text-white font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-1.5"
                >
                  <span>SEE TOURNAMENT REPORT</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}

              {matchStage === 'CHAMPION_TRANS' && (
                <motion.button
                  key="champ"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={onComplete}
                  className="py-3 px-8 bg-amber-500 hover:bg-amber-600 text-black font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4 fill-current" />
                  <span>CLAIM CHAMPIONSHIP TROPHY</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
