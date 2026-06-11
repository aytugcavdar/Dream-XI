'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Player, NationalTeam, SimulationResult, MatchResult, MatchEvent } from '@/types';
import { Play, SkipForward, ArrowRight, Trophy, AlertCircle, Shield, Award, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/components/LanguageProvider';

interface LiveSimPanelProps {
  team: NationalTeam;
  year: number;
  result: SimulationResult;
  onComplete: () => void;
}

// Set of atmospheric generic commentary lines in English
const COMMENTARY_MIDFIELD_EN = [
  "fights for possession with classic black leather boots in the center circle.",
  "orchestrates a series of neat short plays, reminiscent of classic World Cup tournaments.",
  "finds space on the flank and curls a direct ball into the penalty area.",
  "intercepts a critical pass, breaking the opponent counter-attack.",
  "sprays a majestic 40-yard diagonal pass using the hand-stitched leather match ball.",
  "is fouled from behind, sparking warning calls from the referee.",
  "pulls off classic trickery to escape two defenders with elegant, retro flair.",
  "challenges with a hard-nosed, old-school tackle, keeping the game clean but tough."
];

const COMMENTARY_DEFENSE_EN = [
  "makes a massive sliding clearance inside the 18-yard box, getting mud on his classic white jersey.",
  "organizes the backline like a sweeper from the 70s to capture the offside trap.",
  "comfortably collects an incoming long-range ball with leather gloves.",
  "leaps high to shield away a dangerous corner kick with a powerful header.",
  "stands tall to block a heavy drive from the opponent striker, showing classic defensive grit."
];

// Set of atmospheric generic commentary lines in Turkish
const COMMENTARY_MIDFIELD_TR = [
  "orta yuvarlakta klasik siyah deri kramponlarıyla top kapma mücadelesi veriyor.",
  "eski Dünya Kupalarını andıran, kısa ve organizes paslarla oyunu kuruyor.",
  "kanatta boşluk bulup ceza sahasına kavisli bir orta gönderiyor.",
  "kritik bir pası keserek rakip kontratağı önlüyor.",
  "el dikişli deri topla ceza sahasına 40 metrelik muazzam bir çapraz pas fırlatıyor.",
  "arkadan sert bir faulle durduruluyor, hakem kartını işaret ederek sert bir uyarı yapıyor.",
  "zarif bir vücut çalımıyla iki savunmacıyı adeta 70'ler klasiğiyle oyundan düşürüyor.",
  "sert ama temiz bir eski usul müdahaleyle topu takımına kazandırıyor."
];

const COMMENTARY_DEFENSE_TR = [
  "çamurlu sahada yatarak yaptığı kritik müdahaleyle formasını kirletmek pahasına tehlikeyi uzaklaştırıyor!",
  "arka hattı 70'lerin klasik 'libero' tarzıyla yöneterek rakibi ofsayt tuzağına düşürüyor.",
  "gelen uzun topu deri kaleci eldivenleriyle rahatça kontrol ediyor.",
  "tehlikeli bir köşe vuruşunda adeta yerçekimine meydan okuyarak yükselip kafayla vuruyor.",
  "gövdesini siper ederek eski usul bir savunma direnciyle rakip forvetin şutunu bloke ediyor!"
];

// Resolve efsanevi (legendary) moves for our selected super-icons in English or Turkish
function getPlayerIconicAction(playerName: string, actionSeed: number, isTurkish: boolean): string | null {
  const name = playerName.toLowerCase();
  
  if (name.includes('pele') || name.includes('pelé')) {
    const actionsTr = [
      "efsanevi rövaşatasıyla kaleciyi çaresiz bırakıyor ve trübünleri ayağa kaldırıyor! ⚽🌟",
      "havadan gelen topu muhteşem göğüs kontrolüyle yumuşatıp harika bir voleyle doksana asıyor! 🌟",
      "ipe dizer gibi üç savunmacıyı geçip efsane bir plase gol imzalıyor! 👑"
    ];
    const actionsEn = [
      "leaves the goalkeeper helpless and raises the stadium to its feet with a legendary bicycle kick! ⚽🌟",
      "cushions a high ball with a magnificent chest control and volleys it into the top corner! 🌟",
      "dribbles past three defenders like training cones to score an iconic placed goal! 👑"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('maradona')) {
    const actionsTr = [
      "orta sahadan aldığı topla tüm rakip takımı çalıma dizerek kaleciyi de avlıyor! 👑🇦🇷",
      "rakip kalecinin üstünden rüya gibi bir aşırtma vuruşla adeta büyü yapıyor! ⚽",
      "üstün top tekniğiyle rakiplerini şaşkına çevirip bacak arasından milimetrik asistini fırlatıyor! 🪄"
    ];
    const actionsEn = [
      "takes the ball from the midfield, dribbles past the entire opposing team, and beats the keeper! 👑🇦🇷",
      "magically chips the ball over the opposing goalkeeper, leaving everyone in awe! ⚽",
      "confuses defenders with his superior ball control and releases a pinpoint assist through the legs! 🪄"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('zidane')) {
    const actionsTr = [
      "sol ayağıyla adeta fizik kurallarına meydan okuyan mermi gibi bir vole golü gönderiyor! 🪄🇫🇷",
      "kendi ekseninde zarifçe dönerek (Zidane Ruleti) rakiplerini adeta oyundan siliyor! ✨",
      "kusursuz futbol zekasıyla forvet hattını tek pasta kaleciyle karşı karşıya bırakıyor!"
    ];
    const actionsEn = [
      "unleashes a bullet volley with his left foot, defying the laws of physics! 🪄🇫🇷",
      "gracefully spins around (Zidane Roulette) to completely eliminate defenders from the play! ✨",
      "sends a defense-splitting pass with flawless football intelligence to put the striker one-on-one!"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('nazário') || (name.includes('ronaldo') && !name.includes('cristiano'))) {
    const actionsTr = [
      "roket hızıyla depara kalkıp meşhur efsanevi kaleci çalımlarından biriyle topu boş ağlara bırakıyor! 🇧🇷⚡",
      "rakiplerini üst üste yaptığı seri çalımlarla çaresiz bırakıp resital sunuyor! ⚽",
      "patlayıcı gücüyle savunmayı unufak edip muazzam bir gol vuruşu çıkarıyor! 🔥"
    ];
    const actionsEn = [
      "sprints at rocket speed and leaves the keeper behind with his famous trademark stepovers to score! 🇧🇷⚡",
      "presents a football masterclass by dribbling past multiple defenders in quick succession! ⚽",
      "demolishes the defense with his explosive power and finishes with an absolute rocket! 🔥"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('ronaldinho')) {
    const actionsTr = [
      "büyüleyici bir 'no-look pass' (bakmadan pas) vererek tribünleri çılgına çeviriyor! 🤙🇧🇷",
      "akılalmaz bir 'elastico' çalımıyla sol çizgiden ceza sahasına slalom yapıyor! ⚡",
      "uzak köşeye inanılmaz bir falsolu frikik vuruşu çekerek kaleciyi donduruyor! 🪄"
    ];
    const actionsEn = [
      "unleashes a mesmerizing 'no-look pass', sending the crowd into pure ecstasy! 🤙🇧🇷",
      "executes an unbelievable 'elastico' to slalom into the penalty area from the left wing! ⚡",
      "freezes the goalkeeper with a curling free-kick into the far top corner! 🪄"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('kroos')) {
    const actionsTr = [
      "orta sahada milimetrik paslarıyla oyunu yöneten bir orkestra şefi gibi parlıyor! 🇩🇪🪄",
      "ceza sahası dışından adeta elle bırakmış gibi köşeye meşhur plase golünü atıyor! ⚽",
      "harika bir korner vuruşuyla topu doğrudan arkadaşının kafasına adrese teslim gönderiyor!"
    ];
    const actionsEn = [
      "shines in midfield like an orchestra conductor with his millimeter-precise passes! 🇩🇪🪄",
      "scores his trademark placed goal into the corner from outside the area, precise as always! ⚽",
      "sends a corner kick directly to his teammate's head, delivered on a silver platter!"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('müller') || name.includes('muller')) {
    const actionsTr = [
      "ceza sahası içindeki harika önsezisiyle topun düşeceği yeri koklayıp golünü yapıyor! 🇩🇪🔥",
      "rakipleri şaşırtan akıl dolu boş koşusuyla rakip defans hattını darmadağın ediyor!",
      "savunmadan seken topu kurnazca kontrol edip anında sert bir şutla filelere yolluyor!"
    ];
    const actionsEn = [
      "sniffs out the landing zone with his incredible instincts in the box and taps it in! 🇩🇪🔥",
      "tears the opposition defensive line apart with an intelligent off-the-ball run!",
      "controls a rebound with cunning poise and instantly blasts it into the net!"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('maldini')) {
    const actionsTr = [
      "asla geçilmeyen bir duvar misali tertemiz kayarak müdahaleyle topu söküp alıyor! 🛡️🇮🇹",
      "kusursuz pozisyon bilgisiyle rakibin en tehlikeli kontrasını büyüteçle keser gibi engelliyor!",
      "savunmadan liderce oyunu kurup arkadaşlarını muazzam yönlendiriyor!"
    ];
    const actionsEn = [
      "slides in with a perfectly clean tackle to dispossess the attacker like an impassable wall! 🛡️🇮🇹",
      "anticipates the play with perfect positioning, stopping a dangerous counter-attack in its tracks!",
      "launches a defensive build-up with leadership, guiding his teammates masterfully!"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('nesta')) {
    const actionsTr = [
      "cerrah titizliğinde bir hamleyle rakibin ayağındaki topu nefis bir şekilde kapıyor! 🛡️",
      "hava topunda rakiplerine milim geçit vermeyerek tehlikeyi taca püskürtüyor!",
      "yerden kritik bir müdahaleyle ceza sahasındaki ölümcül pas kanalını kapatıyor!"
    ];
    const actionsEn = [
      "wins the ball with surgical precision, dispossessing the attacker beautifully! 🛡️",
      "dominates the aerial duel, clearing the danger out for a throw-in!",
      "cuts off a deadly passing lane inside the penalty box with a crucial slide!"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('platini')) {
    const actionsTr = [
      "zekice döşediği frikik barajının hemen üstünden topu çatala fırlatıyor! 🎯🇫🇷",
      "derin bir oyun okuma becerisiyle ceza sahasına muhteşem bir tek top indiriyor!",
      "orta sahada tek dokunuşla rakip defansın kimyasını bozuyor!"
    ];
    const actionsEn = [
      "curls a free-kick over the wall and sends it straight into the top bin! 🎯🇫🇷",
      "drops a brilliant one-touch pass into the penalty area with deep vision!",
      "disrupts the opponent's defensive chemistry with a single touch in midfield!"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('xavi')) {
    const actionsTr = [
      "360 derece dönerek yaptığı tescilli 'La Pelopina' dönüşüyle üç presçiyi nakavt ediyor! 🇪🇸🪄",
      "iğne deliğinden iplik geçirir gibi savunmanın arkasına gizemli bir pas bırakıyor! ⚽",
      "orta sahada pas istasyonu oluşturarak takımın oyun ritmini mükemmel kontrol ediyor!"
    ];
    const actionsEn = [
      "knocks out three pressing opponents with his trademark 360-degree 'La Pelopina' turn! 🇪🇸🪄",
      "threads a mystical pass behind the defense like threading a needle! ⚽",
      "controls the game's rhythm perfectly by serving as the central passing hub in midfield!"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('iniesta')) {
    const actionsTr = [
      "dar alanda meşhur 'La Croqueta' çalımıyla rakibinden tereyağı gibi sıyrılıp geçiyor! 🇪🇸⚡",
      "zarif bir havadan ara pasıyla forvete nefis bir asist ikramı yapıyor! 🪄",
      "pres altındayken soğukkanlılığıyla topu oyunda tutup takımı rahatlatıyor!"
    ];
    const actionsEn = [
      "slithers past his defender with his famous 'La Croqueta' in a tight space! 🇪🇸⚡",
      "provides a beautiful assist to the striker with an elegant lofted through-ball! 🪄",
      "keeps possession under heavy pressure with absolute composure to relieve the team!"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('messi')) {
    const actionsTr = [
      "sağ kanattan depar atarak 4 kişiyi ipe dizercesine geçip şov yapıyor! 🐐👑🇲🇦",
      "enfes bir serbest vuruşla topu kalecinin uzanamayacağı köşeye imzalıyor! ⚽",
      "akılalmaz bir aşırtma şutla savunma bloğunu tamamen geçersiz kılmaktadır!"
    ];
    const actionsEn = [
      "embarks on a solo run from the right wing, dribbling past 4 players to put on a show! 🐐👑🇲🇦",
      "curls a beautiful free-kick into the top corner out of the goalkeeper's reach! ⚽",
      "renders the defense obsolete with a mind-blowing chipped shot!"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }
  if (name.includes('di maría') || name.includes('di maria')) {
    const actionsTr = [
      "sol kanattan efsanevi 'rabona' pası fırlatıp resital sunuyor! 🪄",
      "sağ kanattan sızarak efsanevi aşırtma vuruşlarından birini gole çeviriyor!",
      "önemli anların adamı olduğunu yine nefis tekniğiyle kanıtlıyor! ⭐"
    ];
    const actionsEn = [
      "launches a legendary 'rabona' pass from the left flank, putting on a spectacular show! 🪄",
      "cuts in from the right and converts with one of his trademark delicate chips!",
      "proves once again that he is a big-game player with his exquisite technique! ⭐"
    ];
    const actions = isTurkish ? actionsTr : actionsEn;
    return actions[actionSeed % actions.length];
  }

  return null;
}

export default function LiveSimPanel({ team, year, result, onComplete }: LiveSimPanelProps) {
  const { t, language, isMounted } = useLanguage();
  const isTr = language === 'tr';

  const [currentMatchIdx, setCurrentMatchIdx] = useState(0);
  const [matchMinute, setMatchMinute] = useState(0);
  const [currentOurGoals, setCurrentOurGoals] = useState(0);
  const [currentOpponentGoals, setCurrentOpponentGoals] = useState(0);
  const [tickerEvents, setTickerEvents] = useState<string[]>([]);
  const [simPlaySpeed, setSimPlaySpeed] = useState<number>(1200); // ms per tick
  const [simTab, setSimTab] = useState<'commentary' | 'standings'>('commentary');
  const [selectedGroupIdx, setSelectedGroupIdx] = useState(0);

  // Match stage state: 'PRE_MATCH' | 'PLAYING' | 'POST_MATCH' | 'ELIMINATED' | 'CHAMPION_TRANS'
  const [matchStage, setMatchStage] = useState<'PRE_MATCH' | 'PLAYING' | 'POST_MATCH' | 'ELIMINATED' | 'CHAMPION_TRANS'>('PRE_MATCH');

  const tickerRef = useRef<HTMLDivElement>(null);
  
  // Track previous standings indexes to trigger glow alerts on rank shifts
  const prevPositionsRef = useRef<Record<string, number>>({});

  const activeMatch: MatchResult = useMemo(() => {
    return result.matches[currentMatchIdx];
  }, [result.matches, currentMatchIdx]);

  const groupActive = useMemo(() => {
    return result.groups?.[selectedGroupIdx];
  }, [result.groups, selectedGroupIdx]);

  const currentStandings = useMemo(() => {
    if (!groupActive || !activeMatch) return [];

    let includeRound = 0;
    if (activeMatch.round.includes('Group Match 1')) {
      includeRound = matchStage === 'POST_MATCH' || matchStage === 'ELIMINATED' ? 1 : 0;
    } else if (activeMatch.round.includes('Group Match 2')) {
      includeRound = matchStage === 'POST_MATCH' || matchStage === 'ELIMINATED' ? 2 : 1;
    } else if (activeMatch.round.includes('Group Match 3')) {
      includeRound = matchStage === 'POST_MATCH' || matchStage === 'ELIMINATED' ? 3 : 2;
    } else {
      includeRound = 3;
    }

    const filteredMatches = groupActive.matches.filter(m => m.round <= includeRound);
    const teamIds = Array.from(new Set(groupActive.matches.flatMap(m => [m.homeTeamId, m.awayTeamId])));
    const teamDetails: Record<string, { name: string; flag: string }> = {};
    groupActive.matches.forEach(m => {
      teamDetails[m.homeTeamId] = { name: m.homeTeamName, flag: m.homeTeamFlag };
      teamDetails[m.awayTeamId] = { name: m.awayTeamName, flag: m.awayTeamFlag };
    });

    const standingsMap: Record<string, any> = {};
    teamIds.forEach(id => {
      standingsMap[id] = {
        teamId: id,
        teamName: teamDetails[id]?.name || id,
        teamFlag: teamDetails[id]?.flag || '🏳️',
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0
      };
    });

    filteredMatches.forEach(m => {
      const home = standingsMap[m.homeTeamId];
      const away = standingsMap[m.awayTeamId];
      if (home && away) {
        home.played += 1;
        away.played += 1;
        home.goalsFor += m.homeGoals;
        home.goalsAgainst += m.awayGoals;
        away.goalsFor += m.awayGoals;
        away.goalsAgainst += m.homeGoals;

        if (m.homeGoals > m.awayGoals) {
          home.won += 1;
          home.points += 3;
          away.lost += 1;
        } else if (m.awayGoals > m.homeGoals) {
          away.won += 1;
          away.points += 3;
          home.lost += 1;
        } else {
          home.drawn += 1;
          home.points += 1;
          away.drawn += 1;
          away.points += 1;
        }
      }
    });

    return Object.values(standingsMap).map((s: any) => ({
      ...s,
      goalDifference: s.goalsFor - s.goalsAgainst
    })).sort((a: any, b: any) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
  }, [groupActive, activeMatch, matchStage]);

  useEffect(() => {
    const positionsMap: Record<string, number> = {};
    currentStandings.forEach((s: any, idx: number) => {
      positionsMap[s.teamId] = idx;
    });
    prevPositionsRef.current = positionsMap;
  }, [currentStandings]);

  const activeEvents = useMemo(() => {
    return [...(activeMatch?.events || [])].sort((a, b) => a.minute - b.minute);
  }, [activeMatch]);

  const formatEventLog = useCallback((event: MatchEvent) => {
    const minute = event.minute === 0 ? 'KO' : `${event.minute}'`;
    const xgText = typeof event.xG === 'number' ? ` xG ${event.xG.toFixed(2)}` : '';
    if (event.type === 'goal' && event.team === 'user') {
      return `GOAL ${minute}: ${team.flag} ${event.description}${xgText}`;
    }
    if (event.type === 'goal' && event.team === 'opponent') {
      return `GOAL ${minute}: ${activeMatch.opponentFlag} ${event.description}${xgText}`;
    }
    if (event.type === 'penalty') {
      return `${event.outcome === 'won' ? 'WIN' : 'LOSS'} ${minute}: ${event.description}`;
    }
    if (event.type === 'full-time') {
      return `FT ${minute}: ${event.description}`;
    }
    return `${minute}: ${event.description}${xgText}`;
  }, [activeMatch.opponentFlag, team.flag]);

  const getGoalsUntil = useCallback((minute: number) => {
    const goalEvents = activeEvents.filter(event => event.type === 'goal' && event.minute <= minute);
    return {
      our: goalEvents.filter(event => event.team === 'user').length,
      opponent: goalEvents.filter(event => event.team === 'opponent').length,
    };
  }, [activeEvents]);

  const goalMinutes = useMemo((): { ourTimes: { min: number; scorer: string }[]; opponentTimes: { min: number }[] } => {
    return { ourTimes: [], opponentTimes: [] };
  }, []);

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
    setTickerEvents([
      isMounted ? t('sim_welcome') : `🏟️ Welcome to Match Day! The pitch is loaded.`,
      isMounted ? t('sim_kickoff_imminent') : `📢 Kick-off is imminent. Let's conquer the grid!`
    ]);
    setTickerEvents(prev => [
      ...prev,
      ...activeEvents.filter(event => event.minute === 0).map(formatEventLog),
    ]);
    setMatchStage('PLAYING');
  };

  // Skip match straight to end scoreline
  const handleFastForwardMatch = () => {
    setCurrentOurGoals(activeMatch.teamGoals);
    setCurrentOpponentGoals(activeMatch.opponentGoals);
    setMatchMinute(activeEvents.some(event => event.minute > 90) ? 120 : 90);
    
    const finalLogs = [
      ...activeEvents.filter(event => event.minute > matchMinute).map(formatEventLog),
      isMounted ? t('sim_min_90_whistle') : `⏱️ Min 90: Referee blows the final whistle here!`,
      isMounted 
        ? t('sim_scoreline_matches').replace('{our}', String(activeMatch.teamGoals)).replace('{opp}', String(activeMatch.opponentGoals))
        : `🏁 FT Scoreline matches the final model calculations: ${activeMatch.teamGoals} - ${activeMatch.opponentGoals}.`
    ];

    if (activeMatch.won) {
      finalLogs.push(
        isMounted 
          ? t('sim_win_log').replace('{flag}', team.flag).replace('{team}', team.name)
          : `🎉 WIN! ${team.flag} ${team.name} passes to the next round with complete composure.`
      );
    } else {
      finalLogs.push(
        isMounted ? t('sim_loss_log') : `💔 LOSS! Elite tactical opposition managed to contain our squads.`
      );
    }

    setTickerEvents(prev => [...prev, ...finalLogs]);
    setMatchStage(activeMatch.won ? 'POST_MATCH' : 'ELIMINATED');
  };

  // Live minute ticking engine
  useEffect(() => {
    if (matchStage !== 'PLAYING') return;

    const interval = setTimeout(() => {
      const matchEndMinute = activeEvents.some(event => event.minute > 90) ? 120 : 90;

      if (matchMinute >= matchEndMinute) {
        setTickerEvents(prev => [
          ...prev,
          activeMatch.won
            ? `WIN: ${team.flag} ${team.name} advances from ${activeMatch.round}.`
            : `LOSS: ${team.name} is eliminated by ${activeMatch.opponentName}.`,
        ]);
        setMatchStage(activeMatch.won ? 'POST_MATCH' : 'ELIMINATED');
        return;
      }

      const nextEventMinute = Math.min(matchMinute + 15, matchEndMinute);
      setMatchMinute(nextEventMinute);

      const goals = getGoalsUntil(nextEventMinute);
      const eventsThisBlock = activeEvents.filter(event => event.minute > matchMinute && event.minute <= nextEventMinute);
      const logs = eventsThisBlock.length > 0
        ? eventsThisBlock.map(formatEventLog)
        : [`${nextEventMinute}': ${isMounted && isTr ? 'Orta saha dengesi korunuyor, iki ekip de pozisyon arıyor.' : 'The midfield balance holds as both teams probe for space.'}`];

      setCurrentOurGoals(goals.our);
      setCurrentOpponentGoals(goals.opponent);
      setTickerEvents(prev => [...prev, ...logs]);
      return;

      if (matchMinute >= 90) {
        // Handle tie breakers
        const isDraw = activeMatch.teamGoals === activeMatch.opponentGoals;
        if (isDraw) {
          const isPenaltiesWin = activeMatch.won;
          const pensText = isPenaltiesWin 
            ? (isMounted ? t('sim_draw_win').replace('{team}', team.name) : `🏆 DRAW AFTER TIME! Penalty Shootout initiated... WIN! (${team.name} converts their penalties triumphantly!)`)
            : (isMounted ? t('sim_draw_loss') : `❌ DRAW AFTER TIME! Penalty Shootout initiated... LOSS! (Opponent GK pulled off critical saves.)`);
          
          setTickerEvents(prev => [
            ...prev, 
            isMounted ? t('sim_min_120_over') : `⏱️ Min 120: Final extra-time whistle!`, 
            pensText
          ]);
        } else {
          setTickerEvents(prev => [...prev, isMounted ? t('sim_min_90_over') : `⏱️ Min 90: It is all over! Final whistle blown.`]);
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
        const iconicAction = getPlayerIconicAction(scorer, nextMin, isTr);
        if (iconicAction) {
          logSnippet = isMounted 
            ? t('sim_our_goal_iconic').replace('{min}', String(ourScorersThisBlock[0].min)).replace('{flag}', team.flag).replace('{team}', team.name).replace('{scorer}', scorer).replace('{action}', iconicAction || '')
            : `⚽ Min ${ourScorersThisBlock[0].min}: GOOOOOAL! ${team.flag} ${team.name} strikes! ${scorer} ${iconicAction}`;
        } else {
          logSnippet = isMounted
            ? t('sim_our_goal').replace('{min}', String(ourScorersThisBlock[0].min)).replace('{flag}', team.flag).replace('{team}', team.name).replace('{scorer}', scorer)
            : `⚽ Min ${ourScorersThisBlock[0].min}: GOOOOOAL! ${team.flag} ${team.name} strikes! ${scorer} executes a flawless shot into the net!`;
        }
      } else if (enemyGoalsThisBlock.length > 0) {
        opponentGoalsCount += enemyGoalsThisBlock.length;
        logSnippet = isMounted
          ? t('sim_opp_goal').replace('{min}', String(enemyGoalsThisBlock[0].min))
          : `⚠️ Min ${enemyGoalsThisBlock[0].min}: GOAL! The opposition exploits our flank defense to slot home.`;
      } else {
        // Deterministic team events using seed modulos
        const eventSeed = nextMin * 73 + activeMatch.opponentStrength;
        const randomSource = (eventSeed % 2 === 0)
          ? (isTr ? COMMENTARY_MIDFIELD_TR : COMMENTARY_MIDFIELD_EN)
          : (isTr ? COMMENTARY_DEFENSE_TR : COMMENTARY_DEFENSE_EN);
        
        const randomPlayerIndex = eventSeed % activeMatch.playerStats.length;
        const randomPlayer = activeMatch.playerStats[randomPlayerIndex]?.playerName || 'Player';
        
        // Efsanevi moves commentary insertion
        const iconicAction = getPlayerIconicAction(randomPlayer, eventSeed, isTr);
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
  }, [matchStage, matchMinute, activeMatch, activeEvents, team, simPlaySpeed, isTr, isMounted, t, formatEventLog, getGoalsUntil, goalMinutes.ourTimes, goalMinutes.opponentTimes]);

  // Proceed to the next knockout round
  const handleNextMatchStep = () => {
    if (currentMatchIdx < result.matches.length - 1) {
      setCurrentMatchIdx(prev => prev + 1);
      setMatchStage('PRE_MATCH');
      setSimTab('commentary');
    } else {
      // Completed all matches (won the trophy!)
      setMatchStage('CHAMPION_TRANS');
    }
  };

  const getLocalizedRound = (roundName: string) => {
    if (!isMounted) return roundName;
    const name = roundName.toLowerCase();
    if (name.includes('16') || name.includes('r16')) return t('sim_round_r16');
    if (name.includes('quarter')) return t('sim_round_qf');
    if (name.includes('semi')) return t('sim_round_sf');
    if (name.includes('final') && !name.includes('semi') && !name.includes('quarter')) return t('sim_round_final');
    if (name.includes('group match 1')) return t('sim_round_gm1');
    if (name.includes('group match 2')) return t('sim_round_gm2');
    if (name.includes('group match 3')) return t('sim_round_gm3');
    return roundName;
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
            <span className="font-bold text-zinc-300 uppercase tracking-widest text-[10px]">
              {isMounted ? t('sim_round_deployment') : 'ROUND DEPLOYMENT'}: {getLocalizedRound(activeMatch.round)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-500">
            <span>{isMounted ? t('sim_speed') : 'SPEED'}:</span>
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
              {matchStage === 'PLAYING'
                ? `${isMounted ? t('sim_live') : 'LIVE'} • ${matchMinute}'`
                : matchStage === 'PRE_MATCH'
                  ? (isMounted ? t('sim_pre_match') : 'PRE-MATCH')
                  : (isMounted ? t('sim_full_time') : 'FULL TIME')}
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

        {/* TABS SELECTOR (Only for Group Stage) */}
        {activeMatch.round.startsWith('Group') && (
          <div className="flex bg-zinc-900/40 p-1 rounded-xl border border-zinc-850 gap-1">
            <button 
              onClick={() => setSimTab('commentary')}
              className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${simTab === 'commentary' ? 'bg-[#e8ff3b] text-black font-extrabold' : 'text-zinc-450 hover:text-zinc-200'}`}
            >
              {isMounted && isTr ? 'Maç Anlatımı' : 'Commentary'}
            </button>
            <button 
              onClick={() => setSimTab('standings')}
              className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${simTab === 'standings' ? 'bg-[#e8ff3b] text-black font-extrabold' : 'text-zinc-450 hover:text-zinc-200'}`}
            >
              {isMounted ? t('sim_table_standings') : 'Group Standings'}
            </button>
          </div>
        )}

        {/* CONDITIONALLY RENDER COMMENTARY OR STANDINGS */}
        {(!activeMatch.round.startsWith('Group') || simTab === 'commentary') ? (
          /* LIVE COMMENTARY TERMINAL TICKER */
          <div className="flex flex-col flex-1 bg-black/95 border border-zinc-900 rounded-2xl p-4 min-h-[200px] max-h-[220px]">
            <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-2 mb-2 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5 text-[#e8ff3b]" fill="currentColor" />
              <span>{isMounted && isTr ? 'GERÇEK ZAMANLI MAÇ OLAYLARI PROTOKOLÜ' : 'REAL-TIME MATCH EVENTS PROTOCOL'}</span>
            </div>
            
            <div 
              ref={tickerRef}
              className="flex-1 overflow-y-auto space-y-2.5 font-mono text-xs pr-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent selection:bg-[#e8ff3b]/20 selection:text-white"
            >
              {tickerEvents.map((evt, idx) => {
                const isGoal = evt.includes('GOAL') || evt.includes('strikes') || evt.includes('GOOOOOL') || evt.includes('GOOOOOAL');
                const isWin = evt.includes('WIN') || evt.includes('KAZANDIK') || evt.includes('advances') || evt.includes('passes');
                const isLoss = evt.includes('LOSS') || evt.includes('ELENDİK') || evt.includes('eliminated') || evt.includes('contain');
                const isWarning = evt.includes('⚠️') || evt.includes('card') || evt.includes('yellow') || evt.includes('red') || evt.includes('faulle') || evt.includes('warning');
                const isSystem = evt.startsWith('🏟️') || evt.startsWith('📢') || evt.includes('⏱️') || evt.includes('🏁') || evt.includes('KO:') || evt.includes('FT:');

                let textClass = 'text-zinc-450';
                if (isGoal) textClass = 'text-[#e8ff3b] font-black border-l-2 border-[#e8ff3b] pl-2 bg-zinc-900/40 py-1 rounded';
                else if (isWin) textClass = 'text-emerald-400 font-bold bg-emerald-950/20 p-2 border border-emerald-900/30 rounded';
                else if (isLoss) textClass = 'text-red-400 font-bold bg-red-950/20 p-2 border border-red-900/30 rounded';
                else if (isWarning) textClass = 'text-yellow-400 font-medium pl-2 border-l border-yellow-500/40 py-0.5 bg-yellow-950/5';
                else if (isSystem) textClass = 'text-zinc-550 italic';

                return (
                  <div key={idx} className={`leading-relaxed text-[11px] ${textClass}`}>
                    {evt}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* GROUP STANDINGS TABLE */
          <div className="flex flex-col flex-1 bg-black/95 border border-zinc-900 rounded-2xl p-4 min-h-[200px] max-h-[220px] overflow-y-auto select-none">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2 mb-2">
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#e8ff3b] uppercase tracking-widest">
                <Users className="w-3.5 h-3.5 text-[#e8ff3b]" fill="currentColor" />
                <span>{isMounted ? t('sim_table_standings') : 'Group Standings'}</span>
              </div>
              <div className="flex gap-1 bg-zinc-900/50 p-0.5 rounded-lg border border-zinc-800 text-[9px] font-mono font-bold">
                {[0, 1, 2, 3].map((idx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const isActive = selectedGroupIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedGroupIdx(idx)}
                      className={`px-2 py-0.5 rounded transition-all uppercase ${isActive ? 'bg-[#e8ff3b] text-black font-extrabold' : 'text-zinc-500 hover:text-zinc-350'}`}
                    >
                      {letters[idx]}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="w-full text-left font-mono text-[10px] mt-1 select-none flex flex-col">
              {/* Header row */}
              <div className="text-zinc-550 border-b border-zinc-900 pb-1.5 text-[8px] uppercase tracking-wider flex items-center font-bold">
                <div className="flex-1 min-w-[100px]">{isMounted ? t('sim_table_team') : 'TEAM'}</div>
                <div className="w-8 text-center">{isMounted ? t('sim_table_played') : 'P'}</div>
                <div className="w-8 text-center">{isMounted ? t('sim_table_won') : 'W'}</div>
                <div className="w-8 text-center">{isMounted ? t('sim_table_drawn') : 'D'}</div>
                <div className="w-8 text-center">{isMounted ? t('sim_table_lost') : 'L'}</div>
                <div className="w-16 text-center">{isMounted ? t('sim_table_goals') : 'GF-GA'}</div>
                <div className="w-8 text-center">{isMounted ? t('sim_table_difference') : 'GD'}</div>
                <div className="w-10 text-right">{isMounted ? t('sim_table_points') : 'PTS'}</div>
              </div>
              
              {/* Standings Rows */}
              <div className="divide-y divide-zinc-900/40 flex flex-col">
                {currentStandings.map((standing: any, index: number) => {
                  const isUser = standing.teamId === team.id;
                  const isQualifying = index < 2;

                  const prevPos = prevPositionsRef.current[standing.teamId];
                  let glowClass = "";
                  if (prevPos !== undefined) {
                    if (index < prevPos) {
                      glowClass = "animate-glow-green border-emerald-500/30";
                    } else if (index > prevPos) {
                      glowClass = "animate-glow-red border-red-500/30";
                    }
                  }

                  return (
                    <motion.div 
                      layout
                      transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                      key={standing.teamId} 
                      className={`border-b border-zinc-900/50 flex items-center py-2 transition-all duration-300 ${isUser ? 'text-[#e8ff3b] font-bold bg-[#e8ff3b]/5' : 'text-zinc-350'} ${glowClass}`}
                    >
                      <div className="flex-1 flex items-center gap-1 min-w-[100px] truncate">
                        <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isQualifying ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span className="text-sm leading-none flex-shrink-0">{standing.teamFlag}</span>
                        <span className="truncate max-w-[80px] sm:max-w-none">{standing.teamName}</span>
                      </div>
                      <div className="w-8 text-center">{standing.played}</div>
                      <div className="w-8 text-center">{standing.won}</div>
                      <div className="w-8 text-center">{standing.drawn}</div>
                      <div className="w-8 text-center">{standing.lost}</div>
                      <div className="w-16 text-center text-zinc-500">{standing.goalsFor}-{standing.goalsAgainst}</div>
                      <div className={`w-8 text-center font-semibold ${standing.goalDifference > 0 ? 'text-emerald-400' : standing.goalDifference < 0 ? 'text-red-400' : 'text-zinc-550'}`}>
                        {standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference}
                      </div>
                      <div className="w-10 text-right font-bold text-zinc-100">{standing.points}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM STEP CONTROLS ROW */}
        <div className="flex justify-between items-center pt-2 gap-4">
          
          {/* Quick skip directly to bracket end */}
          <button
            onClick={onComplete}
            className="py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-[11px] font-mono font-bold uppercase tracking-wider rounded-xl transition-all"
            title="Instant Calculations Bypass viewer"
          >
            {isMounted ? t('sim_btn_skip') : 'Skip Simulations'}
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
                  <span>{isMounted ? t('sim_btn_kickoff') : 'KICK-OFF NOW'}</span>
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
                  <span>{isMounted ? t('sim_btn_fast_forward') : 'Fast Forward match'}</span>
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
                  <span>
                    {currentMatchIdx < result.matches.length - 1
                      ? (isMounted
                          ? t('sim_btn_proceed').replace('{round}', getLocalizedRound(result.matches[currentMatchIdx + 1].round).toUpperCase())
                          : `PROCEED TO ${result.matches[currentMatchIdx + 1].round.toUpperCase()}`)
                      : (isMounted ? t('sim_btn_finish') : 'FINISH Campaign')}
                  </span>
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
                  <span>{isMounted ? t('sim_btn_report') : 'SEE TOURNAMENT REPORT'}</span>
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
                  <span>{isMounted ? t('sim_btn_claim') : 'CLAIM CHAMPIONSHIP TROPHY'}</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
