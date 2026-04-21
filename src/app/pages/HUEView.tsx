import React, { useState } from 'react';
import { SharePointHeader } from '../components/SharePointHeader';
import { Search, Database, Shield, Users, GitBranch, Boxes, FileText, Filter, ChevronDown, Download, Plus, Cloud, TrendingUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TimeOfDay = 'morning' | 'afternoon' | 'evening';

interface GreetingConfig {
  text: string;
  gradientFrom: string;
  gradientTo: string;
}

// Compact time-of-day illustrations
const CompactMorningIllustration = () => (
  <svg width="50" height="50" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="morning-sun-compact" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE66D" />
        <stop offset="100%" stopColor="#FF6B6B" />
      </linearGradient>
    </defs>
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
          animate={{ opacity: [0.5, 1, 0.5], strokeWidth: [2, 3, 2] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
        />
      );
    })}
    <motion.circle
      cx="40"
      cy="40"
      r="15"
      fill="url(#morning-sun-compact)"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <circle cx="40" cy="40" r="12" fill="#FFEB3B" opacity="0.6" />
    <circle cx="40" cy="40" r="8" fill="#FFF9C4" opacity="0.8" />
  </svg>
);

const CompactAfternoonIllustration = () => (
  <svg width="50" height="50" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="afternoon-sun-compact" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD740" />
        <stop offset="50%" stopColor="#FFAB00" />
        <stop offset="100%" stopColor="#FF6F00" />
      </linearGradient>
    </defs>
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
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
        />
      );
    })}
    <motion.circle
      cx="40"
      cy="40"
      r="16"
      fill="url(#afternoon-sun-compact)"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <circle cx="40" cy="40" r="13" fill="#FFEB3B" opacity="0.7" />
    <circle cx="40" cy="40" r="10" fill="#FFF59D" opacity="0.8" />
  </svg>
);

const CompactEveningIllustration = () => (
  <svg width="50" height="50" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="evening-moon-compact" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0E7FF" />
        <stop offset="100%" stopColor="#C7D2FE" />
      </linearGradient>
    </defs>
    <motion.circle
      cx="40"
      cy="40"
      r="14"
      fill="url(#evening-moon-compact)"
      animate={{
        filter: [
          'drop-shadow(0 0 10px rgba(199, 210, 254, 0.6))',
          'drop-shadow(0 0 20px rgba(199, 210, 254, 0.8))',
          'drop-shadow(0 0 10px rgba(199, 210, 254, 0.6))'
        ]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <circle cx="46" cy="38" r="13" fill="#1e293b" opacity="0.8" />
    {[...Array(8)].map((_, i) => {
      const positions = [
        { x: 15, y: 15, size: 2 },
        { x: 25, y: 8, size: 1.5 },
        { x: 65, y: 12, size: 2 },
        { x: 70, y: 25, size: 1.5 },
        { x: 18, y: 60, size: 1.5 },
        { x: 60, y: 65, size: 2 },
        { x: 30, y: 70, size: 1.5 },
        { x: 55, y: 20, size: 1 }
      ];
      const pos = positions[i];
      return (
        <motion.circle
          key={i}
          cx={pos.x}
          cy={pos.y}
          r={pos.size * 0.8}
          fill="#E0E7FF"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.3 }}
        />
      );
    })}
  </svg>
);

export function HUEView() {
  const [manualTimeOverride, setManualTimeOverride] = useState<'morning' | 'afternoon' | 'evening' | null>(null);
  const [autoTimeOfDay, setAutoTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [activeTab, setActiveTab] = useState('applications');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setAutoTimeOfDay('morning');
      } else if (hour >= 12 && hour < 18) {
        setAutoTimeOfDay('afternoon');
      } else {
        setAutoTimeOfDay('evening');
      }
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const scrollThreshold = 350;
        const currentScroll = window.scrollY;

        // Only update if scroll has changed significantly
        if (Math.abs(currentScroll - lastScrollY) > 10) {
          lastScrollY = currentScroll;

          // Add larger hysteresis to prevent flickering
          setIsScrolled(prev => {
            if (!prev && currentScroll > scrollThreshold) {
              return true;
            } else if (prev && currentScroll < scrollThreshold - 150) {
              return false;
            }
            return prev;
          });
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const displayTimeOfDay = manualTimeOverride || autoTimeOfDay;

  const handleTimeChange = (time: 'morning' | 'afternoon' | 'evening' | null) => {
    setManualTimeOverride(time);
  };

  const greetingConfig: Record<TimeOfDay, GreetingConfig> = {
    morning: {
      text: 'Good morning',
      gradientFrom: '#FF6B35',
      gradientTo: '#FFC837',
    },
    afternoon: {
      text: 'Good afternoon',
      gradientFrom: '#FFD700',
      gradientTo: '#FFA500',
    },
    evening: {
      text: 'Good evening',
      gradientFrom: '#667EEA',
      gradientTo: '#9D7BEA',
    }
  };

  const config = greetingConfig[displayTimeOfDay];

  const createOptions = [
    {
      icon: Database,
      title: 'Domains',
      description: 'Define the scope and all related domains',
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-500',
    },
    {
      icon: Shield,
      title: 'Entitlements',
      description: 'Manage permissions and access levels',
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-500',
    },
    {
      icon: Boxes,
      title: 'Roles',
      description: 'Define roles that link to entitlements',
      color: 'from-amber-500 to-amber-600',
      iconBg: 'bg-amber-500',
    },
    {
      icon: Users,
      title: 'User Groups',
      description: 'Create user groups that will receive permissions',
      color: 'from-green-500 to-green-600',
      iconBg: 'bg-green-500',
    },
    {
      icon: GitBranch,
      title: 'Relationships',
      description: 'Establish hierarchy and access flow',
      color: 'from-pink-500 to-pink-600',
      iconBg: 'bg-pink-500',
    },
  ];

  const hueData = [
    { id: '1', name: 'Hierarchical User Entitlements', createdBy: 'Anastasiya Haman', lastModified: 'Apr 14, 2025', status: 'Active' },
    { id: '2', name: 'Financial Management System', createdBy: 'Sarah Johnson', lastModified: 'Mar 15, 2025', status: 'Active' },
    { id: '3', name: 'Customer Portal', createdBy: 'Mary Chen', lastModified: 'Mar 12, 2025', status: 'Active' },
    { id: '4', name: 'Analytics Dashboard', createdBy: 'Emily Davis', lastModified: 'Sep 16, 2024', status: 'Draft' },
    { id: '5', name: 'HR Employee Portal', createdBy: 'Robert Wilson', lastModified: 'Jul 11, 2025', status: 'Active' },
    { id: '6', name: 'CRM Platform', createdBy: 'Jessica Martinez', lastModified: 'Feb 09, 2025', status: 'Active' },
    { id: '7', name: 'Regional User Entitlements', createdBy: 'David Brown', lastModified: 'Apr 14, 2018', status: 'Active' },
    { id: '8', name: 'Supply Chain Management', createdBy: 'Michael Thompson', lastModified: 'Jan 22, 2025', status: 'Active' },
    { id: '9', name: 'Project Management Tool', createdBy: 'Jennifer Lee', lastModified: 'Dec 18, 2024', status: 'Active' },
    { id: '10', name: 'Sales Tracking System', createdBy: 'Christopher Davis', lastModified: 'Nov 30, 2024', status: 'Active' },
    { id: '11', name: 'Inventory Management', createdBy: 'Amanda White', lastModified: 'Oct 25, 2024', status: 'Active' },
    { id: '12', name: 'Marketing Automation Platform', createdBy: 'Daniel Garcia', lastModified: 'Sep 12, 2024', status: 'Draft' },
    { id: '13', name: 'Document Management System', createdBy: 'Michelle Rodriguez', lastModified: 'Aug 08, 2024', status: 'Active' },
    { id: '14', name: 'Training Portal', createdBy: 'Kevin Martinez', lastModified: 'Jul 19, 2024', status: 'Active' },
    { id: '15', name: 'Benefits Administration', createdBy: 'Laura Anderson', lastModified: 'Jun 15, 2024', status: 'Active' },
    { id: '16', name: 'Compliance Tracking System', createdBy: 'Brian Taylor', lastModified: 'May 28, 2024', status: 'Active' },
    { id: '17', name: 'Asset Management Portal', createdBy: 'Rebecca Thomas', lastModified: 'Apr 10, 2024', status: 'Active' },
    { id: '18', name: 'Time Tracking Application', createdBy: 'Jason Moore', lastModified: 'Mar 05, 2024', status: 'Draft' },
    { id: '19', name: 'Expense Reporting System', createdBy: 'Nicole Jackson', lastModified: 'Feb 20, 2024', status: 'Active' },
    { id: '20', name: 'Performance Review Platform', createdBy: 'Steven Harris', lastModified: 'Jan 15, 2024', status: 'Active' },
    { id: '21', name: 'Knowledge Base System', createdBy: 'Melissa Clark', lastModified: 'Dec 12, 2023', status: 'Active' },
    { id: '22', name: 'Vendor Management Portal', createdBy: 'Andrew Lewis', lastModified: 'Nov 08, 2023', status: 'Active' },
    { id: '23', name: 'Quality Assurance Dashboard', createdBy: 'Elizabeth Walker', lastModified: 'Oct 22, 2023', status: 'Active' },
    { id: '24', name: 'Customer Feedback System', createdBy: 'Matthew Hall', lastModified: 'Sep 18, 2023', status: 'Draft' },
    { id: '25', name: 'Resource Planning Tool', createdBy: 'Ashley Allen', lastModified: 'Aug 14, 2023', status: 'Active' },
  ];

  const tabs = [
    { id: 'applications', label: 'My Applications', count: 8, icon: Database },
    { id: 'entitlements', label: 'My Entitlements', count: 40, icon: Shield },
    { id: 'roles', label: 'Roles', count: 2, icon: Boxes },
    { id: 'groups', label: 'User groups', count: 3, icon: Users },
    { id: 'relationships', label: 'Relationships', count: 4, icon: GitBranch },
    { id: 'reports', label: 'Reports', count: 13, icon: FileText },
  ];

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedRows(prev =>
      prev.length === hueData.length ? [] : hueData.map(item => item.id)
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <SharePointHeader
        isVisible={true}
        timeOfDay={displayTimeOfDay}
        onTimeChange={handleTimeChange}
      />

      {/* Hero Banner - Similar to Homepage */}
      <div
        className={`w-full sticky top-[45px] z-40 transition-all duration-500 ease-in-out ${
          isScrolled ? 'shadow-lg' : ''
        }`}
        style={{ background: 'linear-gradient(to bottom left, #75FAAC 0%, #67F1B3 16.67%, #42D9C8 33.33%, #25C6D9 50%, #10B8E5 66.67%, #04B0EC 83.33%, #00AEEF 100%)' }}
      >
        {!isScrolled ? (
          <div className="overflow-hidden relative">
            {/* Animated SVG Swirl Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
              <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 600">
                <defs>
                  <linearGradient id="swirl-gradient-hue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.5 }} />
                    <stop offset="50%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
                  </linearGradient>
                </defs>

                <motion.path
                  fill="url(#swirl-gradient-hue)"
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

                <motion.path
                  fill="url(#swirl-gradient-hue)"
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
              </svg>
            </div>

            <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 relative z-10">
              {/* Top Info Bar - Welcome, Weather, Stock */}
              <div className="flex items-center justify-between mb-5">
                {/* Welcome Message with Time-of-Day Animation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  {/* Animated Time-of-Day Illustration */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 180, damping: 12 }}
                  >
                    {displayTimeOfDay === 'morning' && <CompactMorningIllustration />}
                    {displayTimeOfDay === 'afternoon' && <CompactAfternoonIllustration />}
                    {displayTimeOfDay === 'evening' && <CompactEveningIllustration />}
                  </motion.div>

                  {/* Greeting Text */}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-semibold" style={{ color: '#000063' }}>
                      {config.text},
                    </span>
                    <span className="text-sm font-bold" style={{ color: '#000063' }}>
                      Sabina
                    </span>
                  </div>
                </motion.div>

                {/* Widgets Container */}
                <div className="flex items-center gap-3">
                  {/* Weather Widget - Compact */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full"
                  >
                    <Cloud className="w-3.5 h-3.5 text-gray-700" />
                    <span className="text-xs font-semibold text-gray-900">22°C</span>
                    <span className="text-xs text-gray-600 hidden sm:inline">Cloudy</span>
                  </motion.div>

                  {/* Stock Widget - Compact */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-xs font-semibold text-gray-900">222.22</span>
                    <span className="text-xs text-green-600 font-semibold">+2.5%</span>
                  </motion.div>
                </div>
              </div>

              {/* Main Heading */}
              <div className="mb-6">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold mb-2"
                  style={{ color: '#000063' }}
                >
                  Hierarchical User Entitlement (HUE)
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-base"
                  style={{ color: '#000063' }}
                >
                  Create, manage, and understand how access domains, entitlements, roles, and user groups in a single hierarchy.
                </motion.p>
              </div>

              {/* Search Box - Fluent UI Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <div className="flex items-center bg-white rounded-xl shadow-sm p-4 w-full max-w-4xl">
                  <div className="relative flex items-center">
                    <select className="appearance-none pr-8 bg-transparent text-sm text-gray-500 focus:outline-none cursor-pointer">
                      <option>All on HUE</option>
                      <option>Domains</option>
                      <option>Entitlements</option>
                      <option>Roles</option>
                      <option>User Groups</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="w-px h-6 bg-gray-200 mx-4"></div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                  />
                  <button className="ml-4 px-8 py-2 bg-[#4A8DF8] hover:bg-[#3B7DE0] text-white text-sm font-semibold transition-colors rounded-lg shadow-sm">
                    Search
                  </button>
                </div>
              </motion.div>

              {/* iOS-Style Create New Dock - Positioned at bottom of hero */}
              <div className="flex justify-center pb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative inline-flex items-end gap-10 rounded-3xl px-10 py-5 border border-white/40 shadow-2xl transform translate-y-8 z-30 backdrop-blur-xl"
                  style={{ backgroundColor: '#e7f6fd' }}
                >
                  {createOptions.map((option, index) => (
                    <motion.button
                      key={option.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative flex flex-col items-center gap-2"
                    >
                      {/* Icon Container */}
                      <div className="relative">
                        {/* Plus indicator badge */}
                        <motion.div
                          className={`absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br ${option.color} rounded-full flex items-center justify-center shadow-lg z-10`}
                          whileHover={{ rotate: 90 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Plus className="w-3 h-3 text-white" strokeWidth={3} />
                        </motion.div>

                        {/* Main icon */}
                        <div className={`relative w-14 h-14 bg-gradient-to-br ${option.color} rounded-2xl shadow-lg group-hover:shadow-xl transition-all overflow-hidden flex items-center justify-center`}>
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                          <option.icon className="relative w-7 h-7 text-white" strokeWidth={2} />
                        </div>
                      </div>

                      {/* Label */}
                      <div className="text-center">
                        <div className="text-xs font-semibold text-gray-900 whitespace-nowrap">
                          {option.title}
                        </div>
                      </div>

                      {/* Hover description tooltip */}
                      <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
                        <div className="bg-gray-900 text-white px-3 py-1.5 rounded-lg shadow-xl text-[10px] whitespace-nowrap">
                          {option.description}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          /* Compact Sticky Mode */
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-6">
              {/* Left: Title with compact greeting */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="scale-75 flex items-center justify-center">
                    {displayTimeOfDay === 'morning' && <CompactMorningIllustration />}
                    {displayTimeOfDay === 'afternoon' && <CompactAfternoonIllustration />}
                    {displayTimeOfDay === 'evening' && <CompactEveningIllustration />}
                  </div>
                  <h2 className="text-base font-semibold whitespace-nowrap" style={{ color: '#000063' }}>
                    HUE Dashboard
                  </h2>
                </div>
              </div>

              {/* Center: Compact Search - Wider */}
              <div className="flex-1 flex justify-center">
                <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-lg shadow-sm px-4 py-2.5 w-full max-w-lg">
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search HUE..."
                    className="flex-1 ml-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Right: Compact widgets */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1.5 px-2.5 py-2 bg-white/40 backdrop-blur-md border border-white/60 rounded-full">
                  <Cloud className="w-3 h-3 text-gray-700" />
                  <span className="text-xs font-semibold text-gray-900">22°C</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-2 bg-white/40 backdrop-blur-md border border-white/60 rounded-full">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-gray-900">222.22</span>
                  <span className="text-xs text-green-600 font-semibold">+2.5%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Vertical Create New Sidebar - Only show when sticky */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
          >
            <div className="flex flex-col gap-3 px-3 py-4 rounded-2xl backdrop-blur-xl border border-white/40 shadow-xl" style={{ backgroundColor: '#e7f6fd' }}>
              {createOptions.map((option, index) => (
                <motion.button
                  key={option.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, x: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  {/* Tooltip on hover - left side */}
                  <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                    <div className="bg-gray-900 text-white px-3 py-1.5 rounded-lg shadow-xl text-xs">
                      <div className="font-semibold">{option.title}</div>
                      <div className="text-gray-300 text-[10px] mt-0.5">{option.description}</div>
                      <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>

                  <div className={`relative w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all`}>
                    <option.icon className="w-5 h-5 text-white" strokeWidth={2} />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Plus className="w-2.5 h-2.5 text-gray-700" strokeWidth={3} />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-12 pb-6">
        {/* Your Dashboard Section */}
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Dashboard Header */}
          <div className="px-6 py-5">
            <h2 className="text-xl font-semibold text-gray-900">Your dashboard</h2>
            <p className="text-sm text-gray-500 mt-1">Quickly access controls from your dashboard</p>
          </div>

          {/* Tabs - Fluent UI Style */}
          <div className="px-6">
            <div className="flex items-center gap-0 overflow-x-auto border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'text-[#0078D4] border-[#0078D4]'
                      : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className={`ml-1 text-xs ${
                    activeTab === tab.id ? 'text-[#0078D4]' : 'text-gray-500'
                  }`}>
                    ({tab.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subtitle and Actions */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
            <p className="text-sm text-gray-500">All HUE dashboards that are assigned to you</p>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Table - Clean Fluent Style */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Created By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Last Modified</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {hueData.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <button className="text-sm text-gray-700 hover:text-[#0078D4] hover:underline text-left transition-colors">
                        {item.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.createdBy}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.lastModified}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
