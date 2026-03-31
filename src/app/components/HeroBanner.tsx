import React, { useState, useEffect, useRef } from 'react';
import { Search, FileCheck, CheckSquare, GraduationCap, Plus, FileText, List, X, ChevronRight, TrendingUp, Cloud, CloudRain, Sun, Sunrise, Moon, Star } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { CreateTPCModal } from './CreateTPCModal';

interface HeroBannerProps {
  onScrollChange?: (isScrolled: boolean) => void;
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

export function HeroBanner({ onScrollChange }: HeroBannerProps) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFABMenu, setShowFABMenu] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');
  const onScrollChangeRef = useRef(onScrollChange);

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

  const config = greetingConfig[timeOfDay];

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      const currentScroll = window.scrollY;
      
      // Add hysteresis to prevent flickering
      if (!isScrolled && currentScroll > scrollThreshold) {
        setIsScrolled(true);
        onScrollChangeRef.current?.(true);
      } else if (isScrolled && currentScroll <= scrollThreshold - 20) {
        setIsScrolled(false);
        onScrollChangeRef.current?.(false);
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <div className={`w-full sticky top-[45px] z-50 transition-all duration-500 ease-in-out bg-gradient-to-br from-[#00AEEF] to-[#005DB5] ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      {!isScrolled ? (
        <div className="overflow-hidden relative">
          {/* Animated SVG Swirl Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="swirl-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.4 }} />
                  <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <motion.path
                d="M-200,100 Q200,0 600,100 T1400,100 L1400,400 L-200,400 Z"
                fill="url(#swirl-gradient)"
                initial={{ d: "M-200,100 Q200,0 600,100 T1400,100 L1400,400 L-200,400 Z" }}
                animate={{ 
                  d: [
                    "M-200,100 Q200,0 600,100 T1400,100 L1400,400 L-200,400 Z",
                    "M-200,120 Q200,20 600,120 T1400,120 L1400,400 L-200,400 Z",
                    "M-200,100 Q200,0 600,100 T1400,100 L1400,400 L-200,400 Z"
                  ]
                }}
                transition={{ 
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <motion.path
                d="M-100,200 Q400,150 800,200 T1600,200 L1600,500 L-100,500 Z"
                fill="url(#swirl-gradient)"
                initial={{ d: "M-100,200 Q400,150 800,200 T1600,200 L1600,500 L-100,500 Z" }}
                animate={{ 
                  d: [
                    "M-100,200 Q400,150 800,200 T1600,200 L1600,500 L-100,500 Z",
                    "M-100,180 Q400,130 800,180 T1600,180 L1600,500 L-100,500 Z",
                    "M-100,200 Q400,150 800,200 T1600,200 L1600,500 L-100,500 Z"
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
            </svg>
          </div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
            {/* Top Row: Weather and Stock Ticker */}
            <div className="flex items-center justify-between mb-5">
              {/* Weather Widget - Top Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 px-4 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:bg-white/25 transition-all group"
              >
                <div className="relative">
                  <Cloud className="w-5 h-5 text-yellow-300 drop-shadow-lg" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-70"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg">22°C</span>
                  <div className="h-4 w-px bg-white/40"></div>
                  <span className="text-white/95 text-sm font-medium">Mostly cloudy</span>
                </div>
              </motion.div>

              {/* Stock Ticker - Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 px-4 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:bg-white/25 transition-all group"
              >
                <div className="relative">
                  <TrendingUp className="w-5 h-5 text-green-400 drop-shadow-lg" />
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-300 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg">222.22</span>
                  <span className="text-green-300 text-xs font-semibold">+2.5%</span>
                  <div className="h-4 w-px bg-white/40"></div>
                  <span className="text-white/95 text-sm font-medium">BARC.L</span>
                </div>
              </motion.div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-5">
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
                    {/* Floating particles - positioned around icon */}
                    {timeOfDay === 'morning' && (
                      <>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full top-1/2 left-1/2"
                            style={{
                              background: config.iconColor,
                            }}
                            animate={{
                              x: [0, (Math.cos((i * 60) * Math.PI / 180) * 35)],
                              y: [0, (Math.sin((i * 60) * Math.PI / 180) * 35)],
                              opacity: [0, 1, 0],
                              scale: [0, 1.2, 0]
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                      </>
                    )}

                    {timeOfDay === 'evening' && (
                      <>
                        {/* Stars around moon - tighter positioning */}
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute"
                            style={{
                              left: `${-10 + i * 35}%`,
                              top: i % 2 === 0 ? '0%' : '80%'
                            }}
                            animate={{
                              opacity: [0.3, 1, 0.3],
                              scale: [0.8, 1.2, 0.8],
                              rotate: [0, 180, 360]
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                          >
                            <Star className="w-2.5 h-2.5" fill={config.iconColor} color={config.iconColor} />
                          </motion.div>
                        ))}
                      </>
                    )}

                    {/* Icon glow effect */}
                    <motion.div
                      className="absolute -inset-1 rounded-full blur-xl"
                      style={{ backgroundColor: config.glowColor }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.6, 0.4]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Icon background circle - compact */}
                    <div
                      className="relative p-3 rounded-full backdrop-blur-md border-2 border-white/50 shadow-xl"
                      style={{
                        background: `linear-gradient(135deg, ${config.gradientFrom}50, ${config.gradientTo}50)`
                      }}
                    >
                      {/* Inner shine effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent"></div>
                      
                      <motion.div
                        className="relative z-10"
                        style={{ color: config.iconColor, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                        animate={
                          timeOfDay === 'afternoon' 
                            ? { rotate: 360 }
                            : timeOfDay === 'evening'
                            ? { rotate: [0, -5, 5, -5, 0] }
                            : { y: [0, -2, 0] }
                        }
                        transition={
                          timeOfDay === 'afternoon'
                            ? { duration: 20, repeat: Infinity, ease: "linear" }
                            : timeOfDay === 'evening'
                            ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
                            : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                        }
                      >
                        {React.cloneElement(config.icon as React.ReactElement, { className: 'w-7 h-7' })}
                      </motion.div>
                    </div>

                    {/* Afternoon rays - tighter to icon */}
                    {timeOfDay === 'afternoon' && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-0.5 h-2 origin-bottom rounded-full"
                            style={{
                              background: config.iconColor,
                              transform: `rotate(${i * 45}deg) translateY(-28px)`,
                              opacity: 0.5
                            }}
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              height: ['8px', '11px', '8px']
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.1
                            }}
                          />
                        ))}
                      </>
                    )}
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
                      
                      {/* Pulse ring effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{
                          scale: [1, 1.4],
                          opacity: [0.5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
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
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">7 Approvals</span>
                <span className="sm:hidden">7</span>
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white rounded-lg text-xs font-medium transition-colors">
                <CheckSquare className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">5 Tasks</span>
                <span className="sm:hidden">5</span>
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