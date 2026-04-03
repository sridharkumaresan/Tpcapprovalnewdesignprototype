import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useTaskCardStyles = makeStyles({
  root: {
    position: 'relative',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    ...shorthands.padding('16px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    boxShadow: tokens.shadow2,
    transitionProperty: 'all',
    transitionDuration: '300ms',
    overflow: 'hidden',
    cursor: 'pointer',
    ':hover': {
      boxShadow: tokens.shadow8,
      ...shorthands.borderColor('#00aeef'), // Brand color hover
    }
  },
  rootApproved: {
    ...shorthands.borderColor('rgba(9, 130, 31, 0.3)'),
    ':hover': {
      ...shorthands.borderColor('#09821f'),
    }
  },
  rootDenied: {
    ...shorthands.borderColor('rgba(227, 0, 15, 0.3)'),
    ':hover': {
      ...shorthands.borderColor('#e3000f'),
    }
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
  },
  gradientApproved: {
    background: 'linear-gradient(to right, #09821f, #10b981)',
  },
  gradientDenied: {
    background: 'linear-gradient(to right, #e3000f, #b20110)',
  },
  gradientBuy: {
    background: 'linear-gradient(to right, #22c55e, #10b981)',
  },
  gradientSell: {
    background: 'linear-gradient(to right, #ef4444, #f43f5e)',
  },
  statusBadgeContainer: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    zIndex: 10,
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    ...shorthands.padding('4px', '10px'),
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  statusBadgeApproved: {
    backgroundColor: 'rgba(9, 130, 31, 0.1)',
    ...shorthands.border('1px', 'solid', 'rgba(9, 130, 31, 0.2)'),
    color: '#09821f',
  },
  statusBadgeDenied: {
    backgroundColor: 'rgba(227, 0, 15, 0.1)',
    ...shorthands.border('1px', 'solid', 'rgba(227, 0, 15, 0.2)'),
    color: '#e3000f',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  timePill: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    ...shorthands.padding('4px', '10px'),
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  timePillPending: {
    backgroundColor: '#fff7ed', // orange-50 equivalent
    ...shorthands.border('1px', 'solid', '#ffedd5'), 
    color: '#c2410c',
  },
  timePillCompleted: {
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    color: tokens.colorNeutralForeground2,
  },
  directionPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    ...shorthands.padding('4px', '10px'),
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    fontWeight: 'bold',
  },
  directionBuy: {
    backgroundColor: '#f0fdf4', // green-50
    ...shorthands.border('1px', 'solid', '#dcfce7'),
    color: '#15803d',
  },
  directionSell: {
    backgroundColor: '#fef2f2', // red-50
    ...shorthands.border('1px', 'solid', '#fee2e2'),
    color: '#b91c1c',
  },
  rowItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  rowItemBordered: {
    paddingBottom: '12px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  iconBoxPrimary: {
    ...shorthands.padding('6px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    background: 'linear-gradient(to bottom right, #00aeef, #006de3)',
    color: tokens.colorNeutralForegroundOnBrand,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxSecondary: {
    ...shorthands.padding('6px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelMini: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground3,
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    fontWeight: 600,
    marginBottom: '2px',
  },
  textContent: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: tokens.colorNeutralForeground1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transitionProperty: 'color',
    transitionDuration: '200ms',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '12px',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorNeutralStroke2,
  },
  quantityValue: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: tokens.colorNeutralForeground1,
  }
});
