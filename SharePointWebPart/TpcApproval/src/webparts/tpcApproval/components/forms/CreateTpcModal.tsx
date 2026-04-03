import * as React from 'react';
import { 
  Dialog, 
  DialogTrigger, 
  DialogSurface, 
  DialogBody, 
  DialogContent,
  mergeClasses
} from '@fluentui/react-components';
import { 
  Document24Regular, 
  Checkmark24Regular, 
  Info24Regular,
  ChevronRight24Regular,
  ChevronLeft24Regular
} from '@fluentui/react-icons';
import { useCreateModalStyles } from './CreateTpcModal.styles';

export interface ICreateTPCModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const productTypes = ['Equity-Common', 'Debt', 'Convertible Bonds', 'Structured Note', 'Option', 'Certificates'];

export const CreateTpcModal: React.FunctionComponent<ICreateTPCModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const styles = useCreateModalStyles();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    account: '',
    productType: '',
    ticker: 'AAPL', // Hardcoded mockup for FUIv9 translation
    productName: 'APPLE INC', // Hardcoded mockup
    orderType: '',
    direction: '',
    quantity: ''
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
      onClose();
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) return formData.account && formData.productType;
    if (currentStep === 2) return formData.orderType && formData.direction && formData.quantity;
    return true;
  };

  // We are using Fluent UI Dialog, but we control the open state via Props
  return (
    <Dialog open={isOpen} onOpenChange={(e, data) => !data.open && onClose()}>
      <DialogSurface style={{ padding: 0, maxWidth: '600px', borderRadius: '16px', overflow: 'hidden' }}>
        <DialogBody style={{ padding: 0 }}>
          <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.titleSection}>
                <div className={styles.iconBox}>
                  <Document24Regular fontSize={24} />
                </div>
                <div>
                  <h2 className={styles.title}>Trade Pre-Clearance Request</h2>
                  <p className={styles.subtitle}>Fill out your TPC or clone from previous requests</p>
                </div>
              </div>

              {/* Stepper */}
              <div className={styles.stepper}>
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <div className={styles.stepItem}>
                      <div className={mergeClasses(
                        styles.stepCircle,
                        step < currentStep ? styles.stepCircleCompleted :
                        step === currentStep ? styles.stepCircleActive : styles.stepCirclePending
                      )}>
                        {step < currentStep ? <Checkmark24Regular /> : step}
                      </div>
                      <span style={{ fontSize: '12px', marginTop: '8px', color: step <= currentStep ? '#fff' : 'rgba(255,255,255,0.5)' }}>
                        {step === 1 ? 'Account' : step === 2 ? 'Trade Details' : 'Review'}
                      </span>
                    </div>
                    {step < 3 && (
                      <div className={mergeClasses(styles.stepLine, step < currentStep ? styles.stepLineActive : styles.stepLinePending)} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Content */}
            <DialogContent className={styles.content}>
              {currentStep === 1 && (
                <div>
                  <div className={styles.infoBox}>
                    <Info24Regular fontSize={20} style={{ color: '#0f6cbd' }} />
                    <div style={{ color: '#0f6cbd', fontSize: '14px' }}>
                      <strong>Before you begin:</strong>
                      <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                        <li>Check the Restricted List for clearance requirements</li>
                        <li>Ensure your account is activated for trading</li>
                      </ul>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Account *</label>
                    <select 
                      className={styles.select}
                      value={formData.account} 
                      onChange={e => setFormData({...formData, account: e.target.value})}
                    >
                      <option value="">Select an account</option>
                      <option value="ACC001">Personal Trading Account (ACC001)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Product Type *</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {productTypes.slice(0, 4).map(type => (
                        <button 
                          key={type}
                          className={mergeClasses(styles.gridCardButton, formData.productType === type && styles.gridCardActive)}
                          onClick={() => setFormData({...formData, productType: type})}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Security / Ticker * (Mocked)</label>
                    <input className={styles.input} disabled value="AAPL - APPLE INC" />
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div className={styles.formGroup} style={{ flex: 1 }}>
                      <label className={styles.label}>Order Type *</label>
                      <select 
                        className={styles.select}
                        value={formData.orderType} 
                        onChange={e => setFormData({...formData, orderType: e.target.value})}
                      >
                         <option value="">Select</option>
                         <option value="Day Order">Day Order</option>
                      </select>
                    </div>

                    <div className={styles.formGroup} style={{ flex: 1 }}>
                      <label className={styles.label}>Direction *</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className={mergeClasses(styles.gridCardButton, formData.direction === 'Buy' && styles.gridCardActive)}
                          onClick={() => setFormData({...formData, direction: 'Buy'})}
                          style={{ flex: 1 }}
                        >Buy</button>
                        <button 
                          className={mergeClasses(styles.gridCardButton, formData.direction === 'Sell' && styles.gridCardActive)}
                          onClick={() => setFormData({...formData, direction: 'Sell'})}
                          style={{ flex: 1 }}
                        >Sell</button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Quantity *</label>
                    <input 
                       className={styles.input} 
                       type="number"
                       value={formData.quantity}
                       onChange={e => setFormData({...formData, quantity: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h3 style={{ marginTop: 0 }}>Review Details</h3>
                  <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
                     <p><strong>Account:</strong> {formData.account}</p>
                     <p><strong>Product:</strong> {formData.productType} ({formData.ticker})</p>
                     <p><strong>Action:</strong> {formData.direction} {formData.quantity}</p>
                  </div>
                </div>
              )}
            </DialogContent>

            {/* Footer */}
            <div className={styles.footer}>
              <button 
                className={styles.secondaryBtn} 
                onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose()}
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {currentStep > 1 ? <><ChevronLeft24Regular /> Back</> : 'Cancel'}
              </button>
              
              <button 
                 className={styles.primaryBtn} 
                 disabled={!isStepValid()}
                 onClick={handleNext}
              >
                 {currentStep === totalSteps ? 'Submit Request' : 'Continue'}
                 {currentStep < totalSteps && <ChevronRight24Regular />}
              </button>
            </div>
          </div>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
