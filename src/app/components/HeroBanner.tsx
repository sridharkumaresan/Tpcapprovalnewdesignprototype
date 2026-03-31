import React, { useState, useEffect } from 'react';
import { Search, FileCheck, CheckSquare, GraduationCap, Plus, FileText, List, X, ChevronRight, TrendingUp, Cloud, CloudRain, Sun } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { CreateTPCModal } from './CreateTPCModal';

interface HeroBannerProps {
  onScrollChange?: (isScrolled: boolean) => void;
}

export function HeroBanner({ onScrollChange }: HeroBannerProps) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFABMenu, setShowFABMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      const shouldBeScrolled = window.scrollY > scrollThreshold;
      
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
        onScrollChange?.(shouldBeScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled, onScrollChange]);

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
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full"
              >
                <Cloud className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">22°C</span>
                <span className="text-white/90 text-sm">Mostly cloudy</span>
              </motion.div>

              {/* Stock Ticker - Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full"
              >
                <TrendingUp className="w-5 h-5 text-white" />
                <span className="text-white font-bold">222.22</span>
                <span className="text-white/90 text-sm">BARC.L</span>
              </motion.div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-5">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Good morning, Sabina
              </h1>
              <p className="text-sm sm:text-base text-white/90">
                Welcome to Colleague Direct, how can we help you today?
              </p>
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
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-[#00aeef] hover:to-[#006de3] hover:text-white transition-all group/item border-b border-gray-100"
                        >
                          <div className="p-2 bg-gradient-to-br from-[#00aeef] to-[#006de3] rounded-lg group-hover/item:scale-110 transition-transform">
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
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-[#00aeef] hover:to-[#006de3] hover:text-white transition-all group/item"
                        >
                          <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg group-hover/item:scale-110 transition-transform">
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFABMenu(!showFABMenu)}
                    className="relative group/fab"
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm opacity-0 group-hover/fab:opacity-100 transition-opacity"></div>
                    <div className="relative px-5 py-3 bg-white rounded-xl shadow-xl flex items-center gap-2 hover:shadow-2xl transition-shadow">
                      <motion.div
                        animate={{ rotate: showFABMenu ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Plus className="w-5 h-5 text-[#00aeef]" strokeWidth={3} />
                      </motion.div>
                      <span className="text-sm font-semibold text-[#00aeef]">Create</span>
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
                className="group relative overflow-hidden bg-gradient-to-br from-[#e3000f] to-[#b20110] rounded-xl p-5 text-left hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <FileCheck className="w-5 h-5 text-white/80" />
                      <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">Approvals</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">7 overdue!</div>
                    <div className="text-sm text-white/80">7 in total</div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />
                </div>
              </motion.button>

              {/* Tasks Card - Orange */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group relative overflow-hidden bg-gradient-to-br from-[#ff6b35] to-[#d84315] rounded-xl p-5 text-left hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckSquare className="w-5 h-5 text-white/80" />
                      <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">Tasks</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">5 due today</div>
                    <div className="text-sm text-white/80">5 in total</div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />
                </div>
              </motion.button>

              {/* Learning Card - Navy */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="group relative overflow-hidden bg-gradient-to-br from-[#003057] to-[#001f3f] rounded-xl p-5 text-left hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="w-5 h-5 text-white/80" />
                      <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">Learning</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">3 to complete</div>
                    <div className="text-sm text-white/80">View mandatory training</div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />
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
