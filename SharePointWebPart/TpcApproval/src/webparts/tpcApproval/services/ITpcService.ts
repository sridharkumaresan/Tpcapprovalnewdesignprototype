import { ITpcRequest, ITpcFormData } from '../models/ITpcRequest';

export interface ITpcService {
  /**
   * Retrieves a list of TPC requests (simulating the Approver's view or Employee's view)
   */
  getRequests(userId: number, role: 'Employee' | 'Approver'): Promise<ITpcRequest[]>;

  /**
   * Updates the status of a specific TPC 
   */
  updateRequestStatus(id: number, newStatus: 'approved' | 'denied'): Promise<ITpcRequest>;

  /**
   * Creates a new TPC Request (Employee view action)
   */
  createRequest(request: Partial<ITpcRequest>): Promise<ITpcRequest>;

  /**
   * Fetches dropdown and form configuration data
   */
  getFormData(): Promise<ITpcFormData>;
}
