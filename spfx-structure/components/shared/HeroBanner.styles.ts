import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useHeroBannerStyles = makeStyles({
  root: {
    width: '100%',
    position: 'sticky',
    top: '45px',
    zIndex: 50,
    transitionProperty: 'all',
    transitionDuration: '500ms',
    transitionTimingFunction: 'ease-in-out',
    background: 'linear-gradient(225deg, #ffff98 1.11%, #cbeeA9 10%, #95DDBB 22%, #68CFCB 34%, #42C3D8 45%, #25B9E2 56%, #10B2E9 68%, #04AFED 79%, #00AEEF 90%)'
  },
  rootScrolled: {
    boxShadow: tokens.shadow16,
  },
  bgContainer: {
    overflow: 'hidden',
    position: 'relative'
  },
  contentContainer: {
    maxWidth: '1400px',
    ...shorthands.margin('0', 'auto'),
    ...shorthands.padding('12px', '32px'),
    position: 'relative',
    zIndex: 10
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
    gap: '8px'
  },
  widgetPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    ...shorthands.padding('10px', '16px'),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(12px)',
    ...shorthands.border('1px', 'solid', 'rgba(255, 255, 255, 0.3)'),
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    boxShadow: tokens.shadow8,
    transitionProperty: 'all',
    transitionDuration: '200ms',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
    }
  },
  widgetText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  widgetSubText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '14px',
    fontWeight: 500
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '16px'
  },
  headerBox: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px'
  },
  greetingText: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 1,
    letterSpacing: '-0.02em',
    ...shorthands.margin(0)
  },
  greetingSubText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 500
  },
  searchContainer: {
    maxWidth: '768px',
    ...shorthands.margin('0', 'auto', '20px', 'auto'),
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  searchBox: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    boxShadow: tokens.shadow28,
    overflow: 'hidden'
  },
  searchInput: {
    flexGrow: 1,
    ...shorthands.padding('12px', '16px'),
    fontSize: '14px',
    color: tokens.colorNeutralForeground1,
    ...shorthands.border('none'),
    outlineStyle: 'none'
  },
  searchButton: {
    ...shorthands.padding('12px', '24px'),
    backgroundColor: '#006de3',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    ...shorthands.border('none'),
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#0056b3'
    }
  },
  fabWrapper: {
    position: 'relative'
  },
  actionCardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '16px',
    maxWidth: '896px',
    ...shorthands.margin('0', 'auto')
  },
  actionCard: {
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(12px)',
    ...shorthands.border('2px', 'solid', 'rgba(255, 255, 255, 0.3)'),
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    ...shorthands.padding('16px'),
    textAlign: 'left',
    transitionProperty: 'all',
    transitionDuration: '300ms',
    boxShadow: tokens.shadow8,
    cursor: 'pointer',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: tokens.shadow28,
      ...shorthands.borderColor('rgba(255, 255, 255, 0.5)'),
    }
  },
  cardRed: {
    background: 'linear-gradient(135deg, rgba(227, 0, 15, 0.85), rgba(178, 1, 16, 0.85))'
  },
  cardOrange: {
    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.85), rgba(216, 67, 21, 0.85))'
  },
  cardNavy: {
    background: 'linear-gradient(135deg, rgba(0, 48, 87, 0.85), rgba(0, 31, 63, 0.85))'
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '4px',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  scrolledNavbar: {
    maxWidth: '1400px',
    ...shorthands.margin('0', 'auto'),
    ...shorthands.padding('10px', '32px'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px'
  }
});
