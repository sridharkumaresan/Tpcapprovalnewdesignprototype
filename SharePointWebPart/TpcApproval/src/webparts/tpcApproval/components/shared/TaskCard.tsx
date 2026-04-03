import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';
import { 
  Clock24Regular, 
  ArrowUp24Regular, 
  ArrowDown24Regular, 
  Person24Regular, 
  Box24Regular, 
  CheckmarkCircle24Regular, 
  DismissCircle24Regular 
} from '@fluentui/react-icons';
import { ITpcRequest } from '../../models/ITpcRequest';
import { useTaskCardStyles } from './TaskCard.styles';

export interface ITaskCardProps {
  request: ITpcRequest;
  onClick?: (id: number) => void;
}

export const TaskCard: React.FunctionComponent<ITaskCardProps> = ({ request, onClick }) => {
  const styles = useTaskCardStyles();
  const { 
    Id, 
    TargetDate, 
    EmployeeName, 
    ProductName, 
    Quantity, 
    Direction, 
    Status 
  } = request;

  // Simple relative time calculation mock
  const calculateTimeLeft = (dateString: string) => {
    const target = new Date(dateString).getTime();
    const now = new Date().getTime();
    if (target < now) return 'Overdue';
    
    const diffHours = Math.round((target - now) / (1000 * 60 * 60));
    return `${diffHours} hrs left`;
  };

  const timeLeftDisplay = Status === 'pending' ? calculateTimeLeft(TargetDate) : 'Completed';

  // Determine variant-specific root styling
  const rootClass = mergeClasses(
    styles.root,
    Status === 'approved' && styles.rootApproved,
    Status === 'denied' && styles.rootDenied
  );

  // Determine top gradient
  const gradientClass = mergeClasses(
    styles.topGradient,
    Status === 'approved' ? styles.gradientApproved :
    Status === 'denied' ? styles.gradientDenied :
    Direction === 'Buy' ? styles.gradientBuy : styles.gradientSell
  );

  return (
    <div 
      className={rootClass} 
      onClick={() => onClick && onClick(Id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick && onClick(Id);
        }
      }}
    >
      <div className={gradientClass} />

      {/* Status Badge */}
      {Status !== 'pending' && (
        <div className={styles.statusBadgeContainer}>
          <div className={mergeClasses(styles.statusBadge, Status === 'approved' ? styles.statusBadgeApproved : styles.statusBadgeDenied)}>
            {Status === 'approved' ? <CheckmarkCircle24Regular fontSize={14} /> : <DismissCircle24Regular fontSize={14} />}
            <span style={{ fontSize: '12px', fontWeight: 600 }}>
              {Status === 'approved' ? 'Approved' : 'Denied'}
            </span>
          </div>
        </div>
      )}

      {/* Header - Time & Direction */}
      <div className={styles.header}>
        <div className={mergeClasses(styles.timePill, Status === 'pending' ? styles.timePillPending : styles.timePillCompleted)}>
          <Clock24Regular fontSize={14} />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>{timeLeftDisplay}</span>
        </div>

        {Status === 'pending' && (
          <div className={mergeClasses(styles.directionPill, Direction === 'Buy' ? styles.directionBuy : styles.directionSell)}>
            {Direction === 'Buy' ? <ArrowUp24Regular fontSize={14} /> : <ArrowDown24Regular fontSize={14} />}
            <span style={{ fontSize: '12px' }}>{Direction}</span>
          </div>
        )}
      </div>

      {/* Employee */}
      <div className={mergeClasses(styles.rowItem, styles.rowItemBordered)}>
        <div className={styles.iconBoxPrimary}>
          <Person24Regular fontSize={16} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className={styles.labelMini}>Employee</div>
          <div className={styles.textContent}>{EmployeeName}</div>
        </div>
      </div>

      {/* Product */}
      <div className={styles.rowItem}>
        <div className={styles.iconBoxSecondary}>
          <Box24Regular fontSize={16} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className={styles.labelMini}>Product</div>
          <div className={styles.textContent}>{ProductName}</div>
        </div>
      </div>

      {/* Quantity Footer */}
      <div className={styles.footer}>
        <span className={styles.labelMini} style={{ marginBottom: 0 }}>Quantity</span>
        <span className={styles.quantityValue}>{Quantity.toLocaleString()}</span>
      </div>
    </div>
  );
};
