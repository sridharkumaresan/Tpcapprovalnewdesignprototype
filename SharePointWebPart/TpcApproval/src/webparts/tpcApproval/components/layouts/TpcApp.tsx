import * as React from 'react';
import { FluentProvider, webLightTheme, Button } from '@fluentui/react-components';
import { TpcAppContext } from '../../context/TpcAppContext';
import { ITpcService } from '../../services/ITpcService';
import { IUserContext } from '../../models/ITpcRequest';
import { DashboardView } from '../views/DashboardView';
import { TpcDetailsView } from '../views/TpcDetailsView';
import { CreateTpcModal } from '../forms/CreateTpcModal';

export interface ITpcAppProps {
  appService: ITpcService;
}

export const TpcApp: React.FunctionComponent<ITpcAppProps> = ({ appService }) => {
  // State for Simulated Routing
  const [currentView, setCurrentView] = React.useState<'dashboard' | 'details'>('dashboard');
  const [selectedRequestId, setSelectedRequestId] = React.useState<number | null>(null);

  // State for Mock Users (so we can test both views locally)
  const employeeUser: IUserContext = { id: 101, displayName: 'John Smith', role: 'Employee' };
  const approverUser: IUserContext = { id: 999, displayName: 'Manager Admin', role: 'Approver' };
  
  const [currentUser, setCurrentUser] = React.useState<IUserContext>(employeeUser);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  // Handlers for Views
  const handleNavigateToDetails = (id: number) => {
    setSelectedRequestId(id);
    setCurrentView('details');
  };

  const handleNavigateToDashboard = () => {
    setSelectedRequestId(null);
    setCurrentView('dashboard');
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
    setCurrentView('details');
    setTimeout(() => setCurrentView('dashboard'), 10);
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
            {currentUser.role === 'Employee' && currentView === 'dashboard' && (
              <Button size="small" onClick={() => setIsCreateModalOpen(true)}>+ New TPC</Button>
            )}
          </div>

          {/* Main View Router */}
          {currentView === 'dashboard' && (
            <DashboardView onNavigateToRequest={handleNavigateToDetails} />
          )}

          {currentView === 'details' && selectedRequestId !== null && (
             <TpcDetailsView requestId={selectedRequestId} onBack={handleNavigateToDashboard} />
          )}

          {/* Modals */}
          <CreateTpcModal 
            isOpen={isCreateModalOpen} 
            onClose={() => setIsCreateModalOpen(false)} 
            onSubmit={handleCreateRequest} 
          />
        </div>
      </TpcAppContext.Provider>
    </FluentProvider>
  );
};
