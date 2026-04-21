import React, { useState, useEffect, useRef } from 'react';
import { Search, FileCheck, CheckSquare, GraduationCap, Plus, FileText, List, X, ChevronRight, TrendingUp, Cloud, CloudRain, Sun, Sunrise, Moon, Star } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { CreateTPCModal } from './CreateTPCModal';

interface HeroBannerProps {
  onScrollChange?: (isScrolled: boolean) => void;
  displayTimeOfDay?: TimeOfDay;
}

type TimeOfDay = 'morning' | 'afternoon' | 'evening';

interface GreetingConfig {
  text: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
  glowColor: string;
}

// Custom beautiful SVG illustrations for each time of day
const MorningIllustration = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="morning-sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D" />
        <stop offset="50%" stopColor="#FFA07A" />
        <stop offset="100%" stopColor="#FFD93D" />
      </linearGradient>
      <linearGradient id="morning-sun" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE66D" />
        <stop offset="100%" stopColor="#FF6B6B" />
      </linearGradient>
      <linearGradient id="morning-cloud" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FFE6F0" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    
    {/* Background circle with gradient */}
    <circle cx="40" cy="40" r="38" fill="url(#morning-sky)" opacity="0.3" />
    
    {/* Sun rays - animated */}
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30) * Math.PI / 180;
      const x1 = 40 + Math.cos(angle) * 20;
      const y1 = 40 + Math.sin(angle) * 20;
      const x2 = 40 + Math.cos(angle) * 32;
      const y2 = 40 + Math.sin(angle) * 32;
      return (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#FFD93D"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{
            opacity: [0.5, 1, 0.5],
            strokeWidth: [2, 3, 2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      );
    })}
    
    {/* Central sun */}
    <motion.circle
      cx="40"
      cy="40"
      r="15"
      fill="url(#morning-sun)"
      animate={{
        scale: [1, 1.1, 1],
        filter: [
          'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))',
          'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
          'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))'
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Inner sun glow */}
    <circle cx="40" cy="40" r="12" fill="#FFEB3B" opacity="0.6" />
    <circle cx="40" cy="40" r="8" fill="#FFF9C4" opacity="0.8" />
    
    {/* Decorative clouds - animated */}
    <motion.ellipse
      cx="20"
      cy="25"
      rx="8"
      ry="5"
      fill="url(#morning-cloud)"
      animate={{ x: [0, 3, 0], opacity: [0.7, 0.9, 0.7] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.ellipse
      cx="65"
      cy="55"
      rx="10"
      ry="6"
      fill="url(#morning-cloud)"
      animate={{ x: [0, -2, 0], opacity: [0.6, 0.8, 0.6] }}
      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
    />
  </svg>
);

const AfternoonIllustration = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="afternoon-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF176" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#FFD54F" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FFA726" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="afternoon-sun" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD740" />
        <stop offset="50%" stopColor="#FFAB00" />
        <stop offset="100%" stopColor="#FF6F00" />
      </linearGradient>
    </defs>
    
    {/* Outer glow */}
    <motion.circle
      cx="40"
      cy="40"
      r="38"
      fill="url(#afternoon-glow)"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.5, 0.8, 0.5]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Sun rays - longer and animated */}
    {[...Array(16)].map((_, i) => {
      const angle = (i * 22.5) * Math.PI / 180;
      const x1 = 40 + Math.cos(angle) * 18;
      const y1 = 40 + Math.sin(angle) * 18;
      const x2 = 40 + Math.cos(angle) * 35;
      const y2 = 40 + Math.sin(angle) * 35;
      return (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={i % 2 === 0 ? "#FFC107" : "#FFB300"}
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            opacity: [0.7, 1, 0.7],
            x2: i % 2 === 0 ? [x2, x2 + 2, x2] : [x2, x2 - 2, x2],
            y2: i % 2 === 0 ? [y2, y2 + 2, y2] : [y2, y2 - 2, y2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.08,
            ease: "easeInOut"
          }}
        />
      );
    })}
    
    {/* Main sun with multiple layers */}
    <motion.circle
      cx="40"
      cy="40"
      r="16"
      fill="url(#afternoon-sun)"
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    
    {/* Inner layers for depth */}
    <circle cx="40" cy="40" r="13" fill="#FFEB3B" opacity="0.7" />
    <circle cx="40" cy="40" r="10" fill="#FFF59D" opacity="0.8" />
    <circle cx="40" cy="40" r="7" fill="#FFFDE7" />
    
    {/* Sparkle effects */}
    {[...Array(4)].map((_, i) => {
      const positions = [
        { x: 25, y: 25 },
        { x: 55, y: 25 },
        { x: 25, y: 55 },
        { x: 55, y: 55 }
      ];
      return (
        <motion.g key={i}>
          <motion.circle
            cx={positions[i].x}
            cy={positions[i].y}
            r="2"
            fill="#FFF59D"
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        </motion.g>
      );
    })}
  </svg>
);

const EveningIllustration = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="evening-sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1A237E" />
        <stop offset="50%" stopColor="#4A148C" />
        <stop offset="100%" stopColor="#6A1B9A" />
      </linearGradient>
      <linearGradient id="evening-moon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0E7FF" />
        <stop offset="100%" stopColor="#C7D2FE" />
      </linearGradient>
      <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#C7D2FE" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Night sky background */}
    <circle cx="40" cy="40" r="38" fill="url(#evening-sky)" opacity="0.4" />
    
    {/* Moon glow */}
    <motion.circle
      cx="40"
      cy="40"
      r="30"
      fill="url(#moon-glow)"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Crescent moon shape - using clip path effect */}
    <motion.circle
      cx="40"
      cy="40"
      r="14"
      fill="url(#evening-moon)"
      animate={{
        filter: [
          'drop-shadow(0 0 15px rgba(199, 210, 254, 0.6))',
          'drop-shadow(0 0 25px rgba(199, 210, 254, 0.8))',
          'drop-shadow(0 0 15px rgba(199, 210, 254, 0.6))'
        ]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Dark overlay for crescent effect */}
    <circle cx="46" cy="38" r="13" fill="#1e293b" opacity="0.8" />
    
    {/* Stars - twinkling */}
    {[...Array(12)].map((_, i) => {
      const positions = [
        { x: 15, y: 15, size: 2 },
        { x: 25, y: 8, size: 1.5 },
        { x: 65, y: 12, size: 2 },
        { x: 70, y: 25, size: 1.5 },
        { x: 18, y: 60, size: 1.5 },
        { x: 12, y: 48, size: 2 },
        { x: 60, y: 65, size: 2 },
        { x: 68, y: 55, size: 1.5 },
        { x: 30, y: 70, size: 1.5 },
        { x: 55, y: 20, size: 1 },
        { x: 22, y: 35, size: 1 },
        { x: 65, y: 45, size: 1 }
      ];
      
      const pos = positions[i];
      
      return (
        <motion.g key={i}>
          {/* Star shape using lines */}
          <motion.line
            x1={pos.x}
            y1={pos.y - pos.size}
            x2={pos.x}
            y2={pos.y + pos.size}
            stroke="#E0E7FF"
            strokeWidth="0.5"
            strokeLinecap="round"
            animate={{
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
          <motion.line
            x1={pos.x - pos.size}
            y1={pos.y}
            x2={pos.x + pos.size}
            y2={pos.y}
            stroke="#E0E7FF"
            strokeWidth="0.5"
            strokeLinecap="round"
            animate={{
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
          <motion.circle
            cx={pos.x}
            cy={pos.y}
            r={pos.size * 0.8}
            fill="#E0E7FF"
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        </motion.g>
      );
    })}
    
    {/* Shooting star */}
    <motion.line
      x1="10"
      y1="20"
      x2="20"
      y2="30"
      stroke="#A5B4FC"
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={{
        x1: [10, 50],
        y1: [20, 60],
        x2: [20, 60],
        y2: [30, 70],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatDelay: 4
      }}
    />
  </svg>
);

export function HeroBanner({ onScrollChange, displayTimeOfDay }: HeroBannerProps) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFABMenu, setShowFABMenu] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');
  const [manualTimeOverride, setManualTimeOverride] = useState<TimeOfDay | null>(null);
  const onScrollChangeRef = useRef(onScrollChange);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Keep ref up to date
  useEffect(() => {
    onScrollChangeRef.current = onScrollChange;
  }, [onScrollChange]);

  // Determine time of day
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setTimeOfDay('morning');
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('afternoon');
      } else {
        setTimeOfDay('evening');
      }
    };
    
    updateTimeOfDay();
    // Update every minute
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);
  
  // Use manual override if set, otherwise use automatic time
  const actualDisplayTimeOfDay = manualTimeOverride || timeOfDay;

  const greetingConfig: Record<TimeOfDay, GreetingConfig> = {
    morning: {
      text: 'Good morning',
      icon: <Sunrise className="w-10 h-10" strokeWidth={2} />,
      gradientFrom: '#FF6B35',
      gradientTo: '#FFC837',
      iconColor: '#FF8C42',
      glowColor: 'rgba(255, 140, 66, 0.4)'
    },
    afternoon: {
      text: 'Good afternoon',
      icon: <Sun className="w-10 h-10" strokeWidth={2} />,
      gradientFrom: '#FFD700',
      gradientTo: '#FFA500',
      iconColor: '#FFD700',
      glowColor: 'rgba(255, 215, 0, 0.4)'
    },
    evening: {
      text: 'Good evening',
      icon: <Moon className="w-10 h-10" strokeWidth={2} />,
      gradientFrom: '#667EEA',
      gradientTo: '#9D7BEA',
      iconColor: '#A78BFA',
      glowColor: 'rgba(167, 139, 250, 0.4)'
    }
  };

  const config = greetingConfig[actualDisplayTimeOfDay];

  // Notify parent of scroll changes (separate effect to avoid render-phase updates)
  useEffect(() => {
    onScrollChangeRef.current?.(isScrolled);
  }, [isScrolled]);

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;
      
      const bannerHeight = bannerRef.current.offsetHeight;
      const currentScroll = window.scrollY;
      
      // When 90% of banner has scrolled out of view (only 10% visible), transition to sticky
      const scrollThreshold = bannerHeight * 0.9;
      
      setIsScrolled(prev => {
        // Add hysteresis to prevent flickering
        if (!prev && currentScroll > scrollThreshold) {
          return true;
        } else if (prev && currentScroll <= scrollThreshold - 20) {
          return false;
        }
        return prev;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Run once on mount (after a delay to avoid render-phase update)
    const timer = setTimeout(handleScroll, 0);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, []); // Empty dependency array - only set up once

  return (
    <div className={`w-full sticky top-[45px] z-50 transition-all duration-500 ease-in-out bg-gradient-to-br from-[#00AEEF] to-[#005DB5] ${
      isScrolled ? 'shadow-lg' : ''
    }`} ref={bannerRef}>
      {!isScrolled ? (
        <div className="overflow-hidden relative">
          {/* Animated SVG Swirl Background - Full Width */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 600">
              <defs>
                <linearGradient id="swirl-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.5 }} />
                  <stop offset="50%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              
              {/* Wave 1 - Top layer */}
              <motion.path
                fill="url(#swirl-gradient)"
                initial={{ d: "M0,100 Q480,40 960,100 T1920,100 L1920,600 L0,600 Z" }}
                animate={{ 
                  d: [
                    "M0,100 Q480,40 960,100 T1920,100 L1920,600 L0,600 Z",
                    "M0,120 Q480,60 960,120 T1920,120 L1920,600 L0,600 Z",
                    "M0,100 Q480,40 960,100 T1920,100 L1920,600 L0,600 Z"
                  ]
                }}
                transition={{ 
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              
              {/* Wave 2 - Middle layer */}
              <motion.path
                fill="url(#swirl-gradient)"
                initial={{ d: "M0,180 Q480,120 960,180 T1920,180 L1920,600 L0,600 Z" }}
                animate={{ 
                  d: [
                    "M0,180 Q480,120 960,180 T1920,180 L1920,600 L0,600 Z",
                    "M0,160 Q480,100 960,160 T1920,160 L1920,600 L0,600 Z",
                    "M0,180 Q480,120 960,180 T1920,180 L1920,600 L0,600 Z"
                  ]
                }}
                transition={{ 
                  duration: 10,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 1
                }}
              />
              
              {/* Wave 3 - Bottom layer */}
              <motion.path
                fill="url(#swirl-gradient)"
                initial={{ d: "M0,260 Q480,200 960,260 T1920,260 L1920,600 L0,600 Z" }}
                animate={{ 
                  d: [
                    "M0,260 Q480,200 960,260 T1920,260 L1920,600 L0,600 Z",
                    "M0,280 Q480,220 960,280 T1920,280 L1920,600 L0,600 Z",
                    "M0,260 Q480,200 960,260 T1920,260 L1920,600 L0,600 Z"
                  ]
                }}
                transition={{ 
                  duration: 12,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 2
                }}
              />
            </svg>
          </div>

          <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 relative z-10">
            {/* Top Row: Weather and Stock Ticker */}
            <div className="flex items-center justify-between mb-2 gap-2">
              {/* Weather Widget - Top Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-2 sm:py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:bg-white/25 transition-all group"
              >
                <div className="relative">
                  <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 drop-shadow-lg" />
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full opacity-70"></div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-white font-bold text-base sm:text-lg">22°C</span>
                  <div className="h-3 sm:h-4 w-px bg-white/40 hidden sm:block"></div>
                  <span className="text-white/95 text-xs sm:text-sm font-medium hidden sm:inline">Mostly cloudy</span>
                </div>
              </motion.div>

              {/* Stock Ticker - Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-2 sm:py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:bg-white/25 transition-all group"
              >
                <div className="relative">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 drop-shadow-lg" />
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-300 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-white font-bold text-base sm:text-lg">222.22</span>
                  <span className="text-green-300 text-[10px] sm:text-xs font-semibold">+2.5%</span>
                  <div className="h-3 sm:h-4 w-px bg-white/40 hidden sm:block"></div>
                  <span className="text-white/95 text-xs sm:text-sm font-medium hidden md:inline">BARC.L</span>
                </div>
              </motion.div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-3 sm:mb-4">
              <div className="relative inline-block">
                {/* Animated gradient backdrop - more subtle */}
                <motion.div
                  className="absolute -inset-8 rounded-full opacity-15 blur-3xl"
                  style={{
                    background: `radial-gradient(circle, ${config.gradientFrom}, ${config.gradientTo})`
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.25, 0.15]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <div className="relative flex items-center justify-center gap-3">
                  {/* Animated Icon Container - smaller and inline */}
                  <motion.div
                    className="relative flex-shrink-0"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 12
                    }}
                  >
                    {/* Custom SVG Illustration based on time of day */}
                    <motion.div
                      className="relative"
                      animate={{
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {displayTimeOfDay === 'morning' && <MorningIllustration />}
                      {displayTimeOfDay === 'afternoon' && <AfternoonIllustration />}
                      {displayTimeOfDay === 'evening' && <EveningIllustration />}
                    </motion.div>
                  </motion.div>

                  {/* Compact Text Container - single line */}
                  <motion.div
                    className="text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    key={timeOfDay}
                  >
                    {/* Greeting and name on same line */}
                    <div className="flex items-baseline gap-2 mb-2">
                      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
                        {config.text}, 
                      </h1>
                      
                      {/* Name with underline */}
                      <div className="relative inline-block">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
                          Sabina
                        </h1>
                        
                        {/* Animated underline with gradient */}
                        <motion.div
                          className="absolute -bottom-0.5 left-0 h-0.5 rounded-full"
                          style={{ 
                            background: `linear-gradient(90deg, ${config.iconColor}, ${config.gradientTo})`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>

                      {/* Decorative sparkle - inline with name */}
                      <motion.div
                        className="relative -top-1"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.6, type: "spring" }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 180, 360],
                            scale: [1, 1.15, 1]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Star className="w-4 h-4" fill={config.iconColor} color={config.iconColor} opacity={0.7} />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Compact welcome message with time */}
                    <motion.div
                      className="flex items-center gap-2 flex-wrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-sm text-white/90 font-medium">
                        Welcome to Colleague Direct
                      </p>

                      {/* Separator */}
                      <div className="w-1 h-1 rounded-full bg-white/40"></div>

                      {/* Compact time badge */}
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-sm border border-white/20">
                        <motion.div
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: config.iconColor }}
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                        <span className="text-xs text-white/90 font-medium">
                          {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Search Box with Create Button */}
            <div className="max-w-3xl mx-auto mb-5">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-0 bg-white rounded-xl shadow-xl overflow-hidden">
                  <select className="px-4 py-3 bg-gray-50 border-r border-gray-200 text-sm text-gray-700 focus:outline-none cursor-pointer">
                    <option>All</option>
                    <option>Documents</option>
                    <option>People</option>
                    <option>Sites</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search intranet"
                    className="flex-1 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                  />
                  <button className="px-6 py-3 bg-[#006de3] hover:bg-[#0056b3] text-white text-sm font-semibold transition-colors">
                    Search
                  </button>
                </div>

                {/* Create Button with Menu */}
                <div className="relative">
                  <AnimatePresence>
                    {showFABMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden min-w-[220px] z-50"
                      >
                        <button
                          onClick={() => {
                            setShowFABMenu(false);
                            setShowCreateModal(true);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#00aeef] hover:text-white transition-all group/item border-b border-gray-100"
                        >
                          <div className="p-2 bg-[#00aeef] rounded-lg group-hover/item:scale-110 transition-transform">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left flex-1">
                            <div className="font-semibold text-sm text-gray-900 group-hover/item:text-white">New TPC Request</div>
                            <div className="text-xs text-gray-500 group-hover/item:text-white/80">Trade pre-clearance</div>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setShowFABMenu(false);
                            // Handle MBL creation
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#00aeef] hover:text-white transition-all group/item"
                        >
                          <div className="p-2 bg-orange-500 rounded-lg group-hover/item:scale-110 transition-transform">
                            <List className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left flex-1">
                            <div className="font-semibold text-sm text-gray-900 group-hover/item:text-white">New MBL Request</div>
                            <div className="text-xs text-gray-500 group-hover/item:text-white/80">Manage buy list</div>
                          </div>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowFABMenu(!showFABMenu)}
                    className="relative group/fab"
                  >
                    {/* Animated glow effect */}
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00aeef] via-purple-500 to-[#006de3] opacity-0 group-hover/fab:opacity-100 blur-xl transition-opacity duration-500"
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    ></motion.div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-200%', '200%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>

                    {/* Main button - Icon only circular */}
                    <div className="relative w-16 h-16 bg-gradient-to-br from-[#00aeef] to-[#006de3] rounded-full shadow-2xl flex items-center justify-center overflow-hidden group-hover/fab:shadow-[0_0_40px_rgba(0,174,239,0.6)] transition-all duration-300">
                      {/* Inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50"></div>
                      
                      {/* Animated ring on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/50 opacity-0 group-hover/fab:opacity-100"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Icon with rotation */}
                      <motion.div
                        className="relative z-10"
                        animate={{ 
                          rotate: showFABMenu ? 45 : 0,
                        }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                      >
                        <Plus className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.5} />
                      </motion.div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {/* Approvals Card - Red */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => navigate('/tpc')}
                className="group relative overflow-hidden backdrop-blur-md border-2 border-white/30 rounded-xl p-4 text-left hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:border-white/50"
                style={{
                  background: 'linear-gradient(135deg, rgba(227, 0, 15, 0.85), rgba(178, 1, 16, 0.85))'
                }}
              >
                {/* Frosted glass overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                
                {/* Inner glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-white/20 rounded-lg border border-white/30 backdrop-blur-sm">
                        <FileCheck className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-white uppercase tracking-wide">Approvals</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">7 overdue!</div>
                    <div className="text-sm text-white/90">7 in total</div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />
                </div>
              </motion.button>

              {/* Tasks Card - Orange */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group relative overflow-hidden backdrop-blur-md border-2 border-white/30 rounded-xl p-4 text-left hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:border-white/50"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.85), rgba(216, 67, 21, 0.85))'
                }}
              >
                {/* Frosted glass overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                
                {/* Inner glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-white/20 rounded-lg border border-white/30 backdrop-blur-sm">
                        <CheckSquare className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-white uppercase tracking-wide">Tasks</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">5 due today</div>
                    <div className="text-sm text-white/90">5 in total</div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />
                </div>
              </motion.button>

              {/* Learning Card - Navy */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="group relative overflow-hidden backdrop-blur-md border-2 border-white/30 rounded-xl p-4 text-left hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:border-white/50"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 48, 87, 0.85), rgba(0, 31, 63, 0.85))'
                }}
              >
                {/* Frosted glass overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                
                {/* Inner glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-white/20 rounded-lg border border-white/30 backdrop-blur-sm">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-white uppercase tracking-wide">Learning</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">3 to complete</div>
                    <div className="text-sm text-white/90">View mandatory training</div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-white">Colleague Direct</h2>
            </div>
            
            <div className="flex items-center gap-2 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search intranet"
                  className="w-full pl-9 pr-4 py-1.5 border border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60"
                />
              </div>
              <button className="p-1.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white rounded-lg transition-colors">
                <Search className="w-4 h-4" />
              </button>
              
              {/* Compact Create Button in sticky mode */}
              <div className="relative">
                <AnimatePresence>
                  {showFABMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden min-w-[220px]"
                    >
                      <button
                        onClick={() => {
                          setShowFABMenu(false);
                          setShowCreateModal(true);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-[#00aeef] hover:to-[#006de3] hover:text-white transition-all group/item border-b border-gray-100"
                      >
                        <div className="p-2 bg-gradient-to-br from-[#00aeef] to-[#006de3] rounded-lg">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-semibold text-sm text-gray-900 group-hover/item:text-white">New TPC</div>
                          <div className="text-xs text-gray-500 group-hover/item:text-white/80">Trade request</div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setShowFABMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-[#00aeef] hover:to-[#006de3] hover:text-white transition-all group/item"
                      >
                        <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                          <List className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-semibold text-sm text-gray-900 group-hover/item:text-white">New MBL</div>
                          <div className="text-xs text-gray-500 group-hover/item:text-white/80">Buy list</div>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFABMenu(!showFABMenu)}
                  className="relative"
                >
                  <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white rounded-lg flex items-center gap-1.5 transition-colors">
                    <motion.div
                      animate={{ rotate: showFABMenu ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Plus className="w-4 h-4" strokeWidth={3} />
                    </motion.div>
                    <span className="text-xs font-medium hidden sm:inline">Create</span>
                  </div>
                </motion.button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/tpc')}
                className="relative overflow-hidden backdrop-blur-md border-2 border-white/30 rounded-lg px-2.5 py-1.5 text-white transition-all hover:scale-105 hover:border-white/50 shadow-md hover:shadow-lg group"
                style={{
                  background: 'linear-gradient(135deg, rgba(227, 0, 15, 0.85), rgba(178, 1, 16, 0.85))'
                }}
              >
                {/* Frosted glass overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                
                {/* Inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4" />
                  <span className="text-sm font-bold">7</span>
                </div>
              </button>

              <button
                className="relative overflow-hidden backdrop-blur-md border-2 border-white/30 rounded-lg px-2.5 py-1.5 text-white transition-all hover:scale-105 hover:border-white/50 shadow-md hover:shadow-lg group"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.85), rgba(216, 67, 21, 0.85))'
                }}
              >
                {/* Frosted glass overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                
                {/* Inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4" />
                  <span className="text-sm font-bold">5</span>
                </div>
              </button>

              <button
                className="relative overflow-hidden backdrop-blur-md border-2 border-white/30 rounded-lg px-2.5 py-1.5 text-white transition-all hover:scale-105 hover:border-white/50 shadow-md hover:shadow-lg group"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 48, 87, 0.85), rgba(0, 31, 63, 0.85))'
                }}
              >
                {/* Frosted glass overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                
                {/* Inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm font-bold">3</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create TPC Modal */}
      <CreateTPCModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={(data) => {
          console.log('TPC Request submitted:', data);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
}