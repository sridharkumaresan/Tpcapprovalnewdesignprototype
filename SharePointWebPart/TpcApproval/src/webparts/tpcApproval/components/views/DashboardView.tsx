import * as React from 'react';
import { makeStyles, shorthands, tokens, Spinner } from '@fluentui/react-components';
import { HeroBanner } from '../shared/HeroBanner';
import { TaskCard } from '../shared/TaskCard';
import { useTpcAppContext } from '../../context/TpcAppContext';
import { ITpcRequest } from '../../models/ITpcRequest';

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground2, // Slight off-white to let white cards pop
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    maxWidth: '1400px',
    ...shorthands.margin('0', 'auto'),
    ...shorthands.padding('32px', '32px'),
    width: '100%',
    boxSizing: 'border-box'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: tokens.colorNeutralForeground1,
    ...shorthands.margin(0),
  },
  subtitle: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground3,
    ...shorthands.margin('4px', '0', '0', '0'),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '40px',
    marginBottom: '20px',
    color: tokens.colorNeutralForeground1,
  },
  errorState: {
    color: tokens.colorStatusDangerForeground1,
    ...shorthands.padding('24px'),
    backgroundColor: tokens.colorStatusDangerBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
  }
});

export interface IDashboardViewProps {
  onNavigateToRequest: (requestId: number) => void;
  onCreateTpcClick: () => void;
}

export const DashboardView: React.FunctionComponent<IDashboardViewProps> = ({ onNavigateToRequest, onCreateTpcClick }) => {
  const styles = useStyles();
  const { appService, currentUser } = useTpcAppContext();
  const [requests, setRequests] = React.useState<ITpcRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await appService.getRequests(currentUser.id, currentUser.role);
        setRequests(data);
      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    void fetchData();
  }, [appService, currentUser]);

  const pendingRequests = requests.filter(r => r.Status === 'pending');
  const completedRequests = requests.filter(r => r.Status !== 'pending');

  return (
    <div className={styles.container}>
      <HeroBanner 
        currentUserDisplayName={currentUser.displayName}
        onCreateTpcClick={onCreateTpcClick} 
      />
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>My Workspace</h2>
            <p className={styles.subtitle}>Manage your approvals and tasks efficiently</p>
          </div>
        </div>

        {error && (
           <div className={styles.errorState}>{error}</div>
        )}

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
            <Spinner label="Loading tasks..." size="large" />
          </div>
        ) : (
          <>
            {/* Pending Tasks */}
            {pendingRequests.length > 0 ? (
              <div className={styles.grid}>
                {pendingRequests.map(req => (
                  <TaskCard key={req.Id} request={req} onClick={onNavigateToRequest} />
                ))}
              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '12px' }}>
                <p>No pending tasks! Great job.</p>
              </div>
            )}

            {/* Recent Activity */}
            {completedRequests.length > 0 && (
              <>
                <h3 className={styles.sectionTitle}>Recent Activity</h3>
                <div className={styles.grid}>
                  {completedRequests.map(req => (
                    <TaskCard key={req.Id} request={req} onClick={onNavigateToRequest} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
