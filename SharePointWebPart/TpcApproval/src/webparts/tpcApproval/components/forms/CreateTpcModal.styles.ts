import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useCreateModalStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '600px', // Set fixed width for modal dialog
  },
  header: {
    background: 'linear-gradient(to bottom right, #006de3, #00aeef, #0099cc)',
    ...shorthands.padding('24px'),
    color: '#ffffff',
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  iconBox: {
    ...shorthands.padding('10px'),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(4px)',
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    ...shorthands.margin(0),
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    ...shorthands.margin(0),
  },
  stepper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '24px',
  },
  stepItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: '40px',
    height: '40px',
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    transitionProperty: 'all',
    transitionDuration: '300ms',
  },
  stepCircleActive: {
    backgroundColor: '#ffffff',
    color: '#00aeef',
    boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.3)',
  },
  stepCircleCompleted: {
    backgroundColor: '#ffffff',
    color: '#00aeef',
  },
  stepCirclePending: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  stepLine: {
    flex: 1,
    height: '4px',
    ...shorthands.margin('0', '8px', '24px', '8px'), // margin bottom to align with circles because text pushes circle down
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    transitionProperty: 'all',
    transitionDuration: '300ms',
  },
  stepLineActive: {
    backgroundColor: '#ffffff',
  },
  stepLinePending: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    ...shorthands.padding('24px'),
    minHeight: '400px',
    overflowY: 'auto',
  },
  formGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    ...shorthands.padding('12px', '16px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    outlineStyle: 'none',
    ':focus': {
      ...shorthands.borderColor('#00aeef'),
      boxShadow: '0 0 0 2px rgba(0, 174, 239, 0.2)',
    }
  },
  select: {
    width: '100%',
    ...shorthands.padding('12px', '16px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    backgroundColor: tokens.colorNeutralBackground1,
  },
  gridCardButton: {
    ...shorthands.padding('12px', '16px'),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    ...shorthands.border('2px', 'solid', tokens.colorNeutralStroke1),
    backgroundColor: 'transparent',
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'center',
    transitionProperty: 'all',
    transitionDuration: '200ms',
    ':hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
    }
  },
  gridCardActive: {
    ...shorthands.borderColor('#00aeef'),
    backgroundColor: 'rgba(0, 174, 239, 0.1)',
    color: '#00aeef',
  },
  infoBox: {
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.border('1px', 'solid', tokens.colorBrandStroke2),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    ...shorthands.padding('16px'),
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    marginBottom: '24px',
  },
  footer: {
    ...shorthands.padding('16px', '24px'),
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryBtn: {
    backgroundColor: '#00aeef',
    color: '#ffffff',
    ...shorthands.padding('8px', '24px'),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    ...shorthands.border('none'),
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    ':hover': {
      backgroundColor: '#006de3',
    },
    ':disabled': {
      backgroundColor: tokens.colorNeutralBackground4,
      color: tokens.colorNeutralForegroundDisabled,
      cursor: 'not-allowed',
    }
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForeground1,
    ...shorthands.padding('8px', '16px'),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    ...shorthands.border('none'),
    fontWeight: 500,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    }
  }
});
