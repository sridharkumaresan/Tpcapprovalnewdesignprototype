import * as React from 'react';
import { FluentProvider, webLightTheme, Button } from '@fluentui/react-components';
import { TpcAppContext } from '../../context/TpcAppContext';
import { ITpcService } from '../../services/ITpcService';
import { IUserContext } from '../../models/ITpcRequest';
import { DashboardView } from '../views/DashboardView';
import { TpcDetailsDrawer } from '../views/TpcDetailsDrawer';
import { CreateTpcDrawer } from '../forms/CreateTpcDrawer';
import { ITpcFormData } from '../../models/ITpcRequest';

export interface ITpcAppProps {
  appService: ITpcService;
}

export const TpcApp: React.FunctionComponent<ITpcAppProps> = ({ appService }) => {
  // State for Simulated Routing
  const [selectedRequestId, setSelectedRequestId] = React.useState<number | null>(null);

  // State for Mock Users (so we can test both views locally)
  const employeeUser: IUserContext = { id: 101, displayName: 'John Smith', role: 'Employee' };
  const approverUser: IUserContext = { id: 999, displayName: 'Manager Admin', role: 'Approver' };
  
  const [currentUser, setCurrentUser] = React.useState<IUserContext>(employeeUser);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [formConfig, setFormConfig] = React.useState<ITpcFormData | null>(null);

  // Load Form Config
  React.useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await appService.getFormData();
        setFormConfig(config);
      } catch (e) {
        console.error("Failed to load form definitions", e);
      }
    };
    void loadConfig();
  }, [appService]);

  const handleNavigateToDashboard = () => {
    setSelectedRequestId(null);
  };

  const handleCreateRequest = async (formData: any) => {
    await appService.createRequest({
      Title: 'New Trade Pre-Clearance',
      EmployeeName: currentUser.displayName,
      AuthorId: currentUser.id,
      Direction: formData.direction,
      Quantity: parseInt(formData.quantity, 10),
      ProductName: formData.productName,
    });
    // Trigger a re-render of Dashboard by toggling view (hacky but works for mock state)
    // We just close the modal and trick react if needed, or better, appService might emit, 
    // but just closing the drawer is enough for now.
    setIsCreateModalOpen(false);
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <TpcAppContext.Provider value={{ appService, currentUser }}>
        <div style={{ position: 'relative' }}>
          
          {/* Environment Simulation Toolbar - Only visible during Dev/Mock phase */}
          <div style={{ padding: '8px 16px', background: '#333', color: '#fff', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Mock SP Environment</span>
            <Button size="small" appearance="primary" onClick={() => setCurrentUser(currentUser.role === 'Employee' ? approverUser : employeeUser)}>
              Simulate as: {currentUser.role}
            </Button>
            {currentUser.role === 'Employee' && (
              <Button size="small" onClick={() => setIsCreateModalOpen(true)}>+ New TPC</Button>
            )}
          </div>

          {/* Main Dashboard is always rendered beneath overlays */}
          <DashboardView onNavigateToRequest={setSelectedRequestId} onCreateTpcClick={() => setIsCreateModalOpen(true)} />

          {/* Detailed Request Overlay */}
          {selectedRequestId !== null && (
             <TpcDetailsDrawer requestId={selectedRequestId} onBack={handleNavigateToDashboard} />
          )}

          {/* Create Modal Overlay */}
          <CreateTpcDrawer 
            isOpen={isCreateModalOpen} 
            onClose={() => setIsCreateModalOpen(false)} 
            onSubmit={handleCreateRequest} 
            formConfig={formConfig}
          />
        </div>
      </TpcAppContext.Provider>
    </FluentProvider>
  );
};
