import * as React from 'react';
import { makeStyles, shorthands, tokens, Button, Spinner } from '@fluentui/react-components';
import { ChevronLeft24Regular, CheckmarkCircle24Regular, DismissCircle24Regular } from '@fluentui/react-icons';
import { useTpcAppContext } from '../../context/TpcAppContext';
import { ITpcRequest } from '../../models/ITpcRequest';

const useStyles = makeStyles({
  container: {
    maxWidth: '1000px',
    ...shorthands.margin('0', 'auto'),
    ...shorthands.padding('32px', '24px'),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '32px',
  },
  backButton: {
    ...shorthands.padding('8px', '16px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    }
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    ...shorthands.padding('32px'),
    boxShadow: tokens.shadow16,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
  },
  titleGroup: {
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    ...shorthands.margin('0', '0', '8px', '0'),
  },
  dataGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '32px',
  },
  dataLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: tokens.colorNeutralForeground3,
    marginBottom: '4px',
  },
  dataValue: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: tokens.colorNeutralForeground1,
  },
  actions: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end',
    marginTop: '32px',
    paddingTop: '24px',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorNeutralStroke2,
  },
  approveBtn: {
    backgroundColor: '#09821f',
    color: '#fff',
    ':hover': {
      backgroundColor: '#0a6319'
    }
  },
  denyBtn: {
    backgroundColor: '#e3000f',
    color: '#fff',
    ':hover': {
      backgroundColor: '#b20110'
    }
  }
});

export interface ITpcDetailsViewProps {
  requestId: number;
  onBack: () => void;
}

export const TpcDetailsView: React.FunctionComponent<ITpcDetailsViewProps> = ({ requestId, onBack }) => {
  const styles = useStyles();
  const { appService, currentUser } = useTpcAppContext();
  const [request, setRequest] = React.useState<ITpcRequest | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isProcessing, setIsProcessing] = React.useState(false);

  React.useEffect(() => {
    const fetchRef = async () => {
      setIsLoading(true);
      try {
        const data = await appService.getRequests(currentUser.id, currentUser.role);
        const req = data.find(r => r.Id === requestId);
        setRequest(req || null);
      } catch(e) {
        console.error(e);
      }
      setIsLoading(false);
    }
    fetchRef();
  }, [requestId, appService, currentUser]);

  const handleAction = async (status: 'approved' | 'denied') => {
    if (!request) return;
    setIsProcessing(true);
    try {
      await appService.updateRequestStatus(request.Id, status);
      // Immediately navigate back after action in a real app, 
      // or update local state
      onBack();
    } catch(e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <div style={{ padding: '100px', textAlign: 'center' }}><Spinner label="Loading details..." /></div>;
  }

  if (!request) {
    return (
      <div className={styles.container}>
        <button onClick={onBack} className={styles.backButton}><ChevronLeft24Regular /> Back</button>
        <h2>Request not found</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
          <ChevronLeft24Regular /> Dashboard
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>{request.Title}</h1>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ 
              padding: '4px 12px', 
              borderRadius: '16px', 
              background: request.Status === 'pending' ? '#ffedd5' : request.Status === 'approved' ? '#dcfce7' : '#fee2e2',
              color: request.Status === 'pending' ? '#c2410c' : request.Status === 'approved' ? '#15803d' : '#b91c1c',
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              {request.Status}
            </span>
            <span style={{ color: tokens.colorNeutralForeground3, fontSize: '14px' }}>
              ID: {request.Id} • Created: {new Date(request.Created).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className={styles.dataGrid}>
          <div>
            <div className={styles.dataLabel}>Employee</div>
            <div className={styles.dataValue}>{request.EmployeeName}</div>
          </div>
          <div>
            <div className={styles.dataLabel}>Product</div>
            <div className={styles.dataValue}>{request.ProductName}</div>
          </div>
          <div>
            <div className={styles.dataLabel}>Direction</div>
            <div className={styles.dataValue}>{request.Direction}</div>
          </div>
          <div>
            <div className={styles.dataLabel}>Quantity</div>
            <div className={styles.dataValue}>{request.Quantity.toLocaleString()}</div>
          </div>
        </div>

        {/* Action bounds logic checks if the user is an Approver and the status is pending */}
        {currentUser.role === 'Approver' && request.Status === 'pending' && (
          <div className={styles.actions}>
            <Button 
              size="large" 
              className={styles.denyBtn}
              onClick={() => handleAction('denied')}
              icon={<DismissCircle24Regular />}
              disabled={isProcessing}
            >
              Deny
            </Button>
            <Button 
              size="large" 
              className={styles.approveBtn}
              onClick={() => handleAction('approved')}
              icon={<CheckmarkCircle24Regular />}
              disabled={isProcessing}
            >
              Approve
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
