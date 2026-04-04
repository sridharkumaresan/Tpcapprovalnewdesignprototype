export type TpcStatus = 'pending' | 'approved' | 'denied';
export type TpcDirection = 'Buy' | 'Sell';

export interface ITpcRequest {
  // SharePoint native metadata fields
  Id: number;
  Title: string; // The standard SP Title field. We can use it for generic request titles
  Created: string; // ISO date string
  AuthorId: number; // SharePoint user ID of creator

  // Custom data fields (Simulating SP List Columns)
  EmployeeName: string; 
  ProductName: string;
  Quantity: number;
  Direction: TpcDirection;
  Status: TpcStatus;
  
  // A calculated field for display purposes, maybe computed from a 'TargetDate' or 'SLA' column
  TargetDate: string; // ISO date string representing the deadline
}

// User context for simulated roles
export interface IUserContext {
  id: number;
  displayName: string;
  role: 'Employee' | 'Approver';
}

export interface ITpcProduct {
  ticker: string;
  name: string;
}

export interface ITpcFormData {
  productTypes: string[];
  orderTypes: string[];
  mockProducts: ITpcProduct[];
}
