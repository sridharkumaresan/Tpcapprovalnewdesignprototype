import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';
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
}

export const HeroBanner: React.FunctionComponent<IHeroBannerProps> = ({ 
  onScrollChange,
  displayTimeOfDay = 'morning'
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
          <div className={styles.contentContainer}>
            {/* Top Row Widgets */}
            <div className={styles.topRow}>
              <div className={styles.widgetPill}>
                <WeatherSnowflake24Regular style={{ color: '#fde047' }} fontSize={24} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={styles.widgetText}>22°C</span>
                  <span className={styles.widgetSubText}>Mostly cloudy</span>
                </div>
              </div>
              
              <div className={styles.widgetPill}>
                <ArrowTrending24Filled style={{ color: '#4ade80' }} fontSize={24} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={styles.widgetText}>222.22</span>
                  <span style={{ color: '#86efac', fontSize: '12px', fontWeight: 600 }}>+2.5%</span>
                  <span className={styles.widgetSubText}>BARC.L</span>
                </div>
              </div>
            </div>

            {/* Header Area */}
            <div className={styles.headerContainer}>
              <div className={styles.headerBox}>
                {displayTimeOfDay === 'morning' && <WeatherSunny24Regular style={{ color: '#FF8C42' }} fontSize={40} />}
                {displayTimeOfDay === 'afternoon' && <WeatherSunny24Regular style={{ color: '#FFD700' }} fontSize={40} />}
                {displayTimeOfDay === 'evening' && <WeatherMoon24Regular style={{ color: '#A78BFA' }} fontSize={40} />}
                
                <div style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <h1 className={styles.greetingText}>{greeting}, Sabina</h1>
                    <Star24Regular fontSize={20} style={{ color: '#FFD700' }} />
                  </div>
                  <p className={styles.greetingSubText}>Welcome to Colleague Direct</p>
                </div>
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
                 <button style={{ 
                     width: '56px', height: '56px', borderRadius: '50%', 
                     background: 'linear-gradient(to bottom right, #00aeef, #006de3)',
                     border: 'none', color: '#fff', cursor: 'pointer',
                     boxShadow: '0 10px 15px -3px rgba(0, 174, 239, 0.5)'
                  }}>
                   <Add24Regular fontSize={28} />
                 </button>
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
              <button style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                 <Add24Regular /> Create
              </button>
           </div>
        </div>
      )}
    </div>
  );
};
