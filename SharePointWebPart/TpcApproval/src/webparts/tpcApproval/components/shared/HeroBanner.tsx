import * as React from 'react';
import { mergeClasses, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';
import { motion } from 'framer-motion';
import { 
  WeatherSnowflake24Regular, 
  ArrowTrending24Filled, 
  WeatherSunny24Regular, 
  WeatherMoon24Regular, 
  Star24Regular,
  Search24Regular,
  Add24Regular,
  DocumentCheckmark24Regular,
  TextBulletListSquare24Regular,
  HatGraduation24Regular,
  ChevronRight24Regular
} from '@fluentui/react-icons';
import { useHeroBannerStyles } from './HeroBanner.styles';

export interface IHeroBannerProps {
  onScrollChange?: (isScrolled: boolean) => void;
  displayTimeOfDay?: 'morning' | 'afternoon' | 'evening';
  currentUserDisplayName?: string;
  onCreateTpcClick?: () => void;
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
    
    <circle cx="40" cy="40" r="38" fill="url(#morning-sky)" opacity="0.3" />
    
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30) * Math.PI / 180;
      const x1 = 40 + Math.cos(angle) * 20;
      const y1 = 40 + Math.sin(angle) * 20;
      const x2 = 40 + Math.cos(angle) * 32;
      const y2 = 40 + Math.sin(angle) * 32;
      return (
        <motion.line
          key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#FFD93D" strokeWidth="2.5" strokeLinecap="round"
          animate={{ opacity: [0.5, 1, 0.5], strokeWidth: [2, 3, 2] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
        />
      );
    })}
    
    <motion.circle
      cx="40" cy="40" r="15" fill="url(#morning-sun)"
      animate={{
        scale: [1, 1.1, 1],
        filter: [
          'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))',
          'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
          'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))'
        ]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    
    <circle cx="40" cy="40" r="12" fill="#FFEB3B" opacity="0.6" />
    <circle cx="40" cy="40" r="8" fill="#FFF9C4" opacity="0.8" />
    
    <motion.ellipse
      cx="20" cy="25" rx="8" ry="5" fill="url(#morning-cloud)"
      animate={{ x: [0, 3, 0], opacity: [0.7, 0.9, 0.7] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.ellipse
      cx="65" cy="55" rx="10" ry="6" fill="url(#morning-cloud)"
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
    
    <motion.circle
      cx="40" cy="40" r="38" fill="url(#afternoon-glow)"
      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {[...Array(16)].map((_, i) => {
      const angle = (i * 22.5) * Math.PI / 180;
      const x1 = 40 + Math.cos(angle) * 18;
      const y1 = 40 + Math.sin(angle) * 18;
      const x2 = 40 + Math.cos(angle) * 35;
      const y2 = 40 + Math.sin(angle) * 35;
      return (
        <motion.line
          key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={i % 2 === 0 ? "#FFC107" : "#FFB300"} strokeWidth="3" strokeLinecap="round"
          animate={{
            opacity: [0.7, 1, 0.7],
            x2: i % 2 === 0 ? [x2, x2 + 2, x2] : [x2, x2 - 2, x2],
            y2: i % 2 === 0 ? [y2, y2 + 2, y2] : [y2, y2 - 2, y2]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
        />
      );
    })}
    
    <motion.circle
      cx="40" cy="40" r="16" fill="url(#afternoon-sun)"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    
    <circle cx="40" cy="40" r="13" fill="#FFEB3B" opacity="0.7" />
    <circle cx="40" cy="40" r="10" fill="#FFF59D" opacity="0.8" />
    <circle cx="40" cy="40" r="7" fill="#FFFDE7" />
    
    {[...Array(4)].map((_, i) => {
      const positions = [{ x: 25, y: 25 }, { x: 55, y: 25 }, { x: 25, y: 55 }, { x: 55, y: 55 }];
      return (
        <motion.g key={i}>
          <motion.circle
            cx={positions[i].x} cy={positions[i].y} r="2" fill="#FFF59D"
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
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
    
    <circle cx="40" cy="40" r="38" fill="url(#evening-sky)" opacity="0.4" />
    
    <motion.circle
      cx="40" cy="40" r="30" fill="url(#moon-glow)"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
    
    <motion.circle
      cx="40" cy="40" r="14" fill="url(#evening-moon)"
      animate={{
        filter: [
          'drop-shadow(0 0 15px rgba(199, 210, 254, 0.6))',
          'drop-shadow(0 0 25px rgba(199, 210, 254, 0.8))',
          'drop-shadow(0 0 15px rgba(199, 210, 254, 0.6))'
        ]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    
    <circle cx="46" cy="38" r="13" fill="#1e293b" opacity="0.8" />
    
    {[...Array(12)].map((_, i) => {
      const positions = [
        { x: 15, y: 15, size: 2 }, { x: 25, y: 8, size: 1.5 }, { x: 65, y: 12, size: 2 },
        { x: 70, y: 25, size: 1.5 }, { x: 18, y: 60, size: 1.5 }, { x: 12, y: 48, size: 2 },
        { x: 60, y: 65, size: 2 }, { x: 68, y: 55, size: 1.5 }, { x: 30, y: 70, size: 1.5 },
        { x: 55, y: 20, size: 1 }, { x: 22, y: 35, size: 1 }, { x: 65, y: 45, size: 1 }
      ];
      const pos = positions[i];
      return (
        <motion.g key={i}>
          <motion.line
            x1={pos.x} y1={pos.y - pos.size} x2={pos.x} y2={pos.y + pos.size} stroke="#E0E7FF"
            strokeWidth="0.5" strokeLinecap="round" animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.3 }}
          />
          <motion.line
            x1={pos.x - pos.size} y1={pos.y} x2={pos.x + pos.size} y2={pos.y} stroke="#E0E7FF"
            strokeWidth="0.5" strokeLinecap="round" animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.3 }}
          />
          <motion.circle
            cx={pos.x} cy={pos.y} r={pos.size * 0.8} fill="#E0E7FF"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.3 }}
          />
        </motion.g>
      );
    })}
    
    <motion.line
      x1="10" y1="20" x2="20" y2="30" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round"
      animate={{ x1: [10, 50], y1: [20, 60], x2: [20, 60], y2: [30, 70], opacity: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
    />
  </svg>
);

export const HeroBanner: React.FunctionComponent<IHeroBannerProps> = ({ 
  onScrollChange,
  displayTimeOfDay = 'morning',
  currentUserDisplayName = 'Colleague',
  onCreateTpcClick
}) => {
  const styles = useHeroBannerStyles();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // simplified scroll logic for Web Part inclusion
      const currentScroll = window.scrollY;
      const scrolled = currentScroll > 150;
      setIsScrolled(scrolled);
      if(onScrollChange) onScrollChange(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollChange]);

  const greeting = displayTimeOfDay === 'morning' ? 'Good morning' : 
                   displayTimeOfDay === 'afternoon' ? 'Good afternoon' : 'Good evening';

  return (
    <div className={mergeClasses(styles.root, isScrolled && styles.rootScrolled)}>
      {!isScrolled ? (
        <div className={styles.bgContainer}>
          {/* Animated SVG Swirl Background - Full Width */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.25 }}>
            <svg style={{ position: 'absolute', width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 600">
              <defs>
                <linearGradient id="swirl-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.5 }} />
                  <stop offset="50%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <motion.path
                fill="url(#swirl-gradient)"
                initial={{ d: "M0,100 Q480,40 960,100 T1920,100 L1920,600 L0,600 Z" }}
                animate={{ d: [ "M0,100 Q480,40 960,100 T1920,100 L1920,600 L0,600 Z", "M0,120 Q480,60 960,120 T1920,120 L1920,600 L0,600 Z", "M0,100 Q480,40 960,100 T1920,100 L1920,600 L0,600 Z" ] }}
                transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
              />
              <motion.path
                fill="url(#swirl-gradient)"
                initial={{ d: "M0,180 Q480,120 960,180 T1920,180 L1920,600 L0,600 Z" }}
                animate={{ d: [ "M0,180 Q480,120 960,180 T1920,180 L1920,600 L0,600 Z", "M0,160 Q480,100 960,160 T1920,160 L1920,600 L0,600 Z", "M0,180 Q480,120 960,180 T1920,180 L1920,600 L0,600 Z" ] }}
                transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 1 }}
              />
              <motion.path
                fill="url(#swirl-gradient)"
                initial={{ d: "M0,260 Q480,200 960,260 T1920,260 L1920,600 L0,600 Z" }}
                animate={{ d: [ "M0,260 Q480,200 960,260 T1920,260 L1920,600 L0,600 Z", "M0,280 Q480,220 960,280 T1920,280 L1920,600 L0,600 Z", "M0,260 Q480,200 960,260 T1920,260 L1920,600 L0,600 Z" ] }}
                transition={{ duration: 12, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 2 }}
              />
            </svg>
          </div>
          <div className={styles.contentContainer}>
            {/* Top Row Widgets */}
            <div className={styles.topRow}>
              <motion.div 
                className={styles.widgetPill}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <WeatherSnowflake24Regular style={{ color: '#fde047' }} fontSize={24} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={styles.widgetText}>22°C</span>
                  <span className={styles.widgetSubText}>Mostly cloudy</span>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.widgetPill}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ArrowTrending24Filled style={{ color: '#4ade80' }} fontSize={24} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={styles.widgetText}>222.22</span>
                  <span style={{ color: '#86efac', fontSize: '12px', fontWeight: 600 }}>+2.5%</span>
                  <span className={styles.widgetSubText}>BARC.L</span>
                </div>
              </motion.div>
            </div>

            {/* Header Area */}
            <div className={styles.headerContainer}>
              <div className={styles.headerBox}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 12 }}
                >
                  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                    {displayTimeOfDay === 'morning' && <MorningIllustration />}
                    {displayTimeOfDay === 'afternoon' && <AfternoonIllustration />}
                    {displayTimeOfDay === 'evening' && <EveningIllustration />}
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  style={{ textAlign: 'left' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', position: 'relative' }}>
                    <h1 className={styles.greetingText}>{greeting}, {currentUserDisplayName.split(' ')[0]}</h1>
                    <motion.div
                      style={{ position: 'absolute', bottom: -2, left: 0, height: 2, background: 'linear-gradient(90deg, #FFD700, #FF6B35)' }}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    />
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.6, type: "spring" }}
                    >
                      <motion.div animate={{ rotate: [0, 180, 360], scale: [1, 1.15, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                        <Star24Regular fontSize={20} style={{ color: '#FFD700' }} />
                      </motion.div>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className={styles.greetingSubText}>Welcome to Colleague Direct</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Search Box */}
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <select style={{ padding: '12px 16px', border: 'none', borderRight: '1px solid #e5e7eb', outline: 'none' }}>
                  <option>All</option>
                  <option>Documents</option>
                  <option>People</option>
                </select>
                <input type="text" placeholder="Search intranet" className={styles.searchInput} />
                <button className={styles.searchButton}>Search</button>
              </div>
              <div style={{ position: 'relative' }}>
                 <Menu>
                   <MenuTrigger disableButtonEnhancement>
                     <button style={{ 
                         width: '56px', height: '56px', borderRadius: '50%', 
                         background: 'linear-gradient(to bottom right, #00aeef, #006de3)',
                         border: 'none', color: '#fff', cursor: 'pointer',
                         boxShadow: '0 10px 15px -3px rgba(0, 174, 239, 0.5)'
                      }}>
                       <Add24Regular fontSize={28} />
                     </button>
                   </MenuTrigger>
                   <MenuPopover>
                     <MenuList>
                       <MenuItem onClick={onCreateTpcClick}>Create Trade Pre-Clearance</MenuItem>
                       <MenuItem>New Request</MenuItem>
                       <MenuItem>Quick Action</MenuItem>
                     </MenuList>
                   </MenuPopover>
                 </Menu>
              </div>
            </div>

            {/* Action Cards Grid */}
            <div className={styles.actionCardsGrid}>
              
              <button className={mergeClasses(styles.actionCard, styles.cardRed)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ padding: '6px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}>
                        <DocumentCheckmark24Regular style={{ color: '#fff' }} fontSize={16} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff', textTransform: 'uppercase' }}>Approvals</span>
                    </div>
                    <div className={styles.cardTitle}>7 overdue!</div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>7 in total</div>
                  </div>
                  <ChevronRight24Regular fontSize={24} style={{ color: 'rgba(255,255,255,0.7)', marginTop: '4px' }} />
                </div>
              </button>

              <button className={mergeClasses(styles.actionCard, styles.cardOrange)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ padding: '6px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}>
                        <TextBulletListSquare24Regular style={{ color: '#fff' }} fontSize={16} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff', textTransform: 'uppercase' }}>Tasks</span>
                    </div>
                    <div className={styles.cardTitle}>5 due today</div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>5 in total</div>
                  </div>
                  <ChevronRight24Regular fontSize={24} style={{ color: 'rgba(255,255,255,0.7)', marginTop: '4px' }} />
                </div>
              </button>

              <button className={mergeClasses(styles.actionCard, styles.cardNavy)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ padding: '6px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}>
                        <HatGraduation24Regular style={{ color: '#fff' }} fontSize={16} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff', textTransform: 'uppercase' }}>Learning</span>
                    </div>
                    <div className={styles.cardTitle}>3 to complete</div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>View mandatory training</div>
                  </div>
                  <ChevronRight24Regular fontSize={24} style={{ color: 'rgba(255,255,255,0.7)', marginTop: '4px' }} />
                </div>
              </button>

            </div>
          </div>
        </div>
      ) : (
        <div className={styles.scrolledNavbar}>
           <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: 0 }}>Colleague Direct</h2>
           <div style={{ display: 'flex', flexGrow: 1, maxWidth: '600px', gap: '12px', alignItems: 'center' }}>
              <div style={{ flexGrow: 1, position: 'relative' }}>
                 <Search24Regular style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)' }} />
                 <input type="text" placeholder="Search intranet" style={{ width: '100%', padding: '6px 16px 6px 40px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', outline: 'none' }} />
              </div>
              <button 
                  onClick={onCreateTpcClick}
                  style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                 <Add24Regular /> Create
              </button>
           </div>
        </div>
      )}
    </div>
  );
};
