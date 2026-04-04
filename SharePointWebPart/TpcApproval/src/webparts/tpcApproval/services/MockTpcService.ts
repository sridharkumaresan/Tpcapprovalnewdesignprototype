import { ITpcService } from './ITpcService';
import { ITpcRequest as ITpcRequestModel, ITpcFormData } from '../models/ITpcRequest';

// Use strict typing from the model
type TpcData = ITpcRequestModel;

/**
 * A robust Mock Service that simulates network latency and 
 * stores state in memory during the component lifecycle.
 */
export class MockTpcService implements ITpcService {
  private mockData: TpcData[] = [];
  private currentId = 7; // Matching the auto-increment logic for new posts

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    const now = new Date();
    this.mockData = [
      {
        Id: 1,
        Title: 'Review Trade Pre-Clearance',
        Created: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        AuthorId: 101, // Mock Employee ID
        EmployeeName: 'John Smith',
        ProductName: 'Apple Inc. (AAPL)',
        Quantity: 500,
        Direction: 'Buy',
        Status: 'pending',
        TargetDate: new Date(now.getTime() + 14 * 60 * 60 * 1000).toISOString(), // 14 hours left
      },
      {
        Id: 2,
        Title: 'Review Trade Pre-Clearance',
        Created: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        AuthorId: 102,
        EmployeeName: 'Emma Wilson',
        ProductName: 'Microsoft Corp. (MSFT)',
        Quantity: 250,
        Direction: 'Sell',
        Status: 'pending',
        TargetDate: new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString(),
      },
      {
        Id: 3,
        Title: 'Review Trade Pre-Clearance',
        Created: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
        AuthorId: 103,
        EmployeeName: 'Michael Chen',
        ProductName: 'Tesla Inc. (TSLA)',
        Quantity: 300,
        Direction: 'Buy',
        Status: 'approved',
        TargetDate: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(),
      },
      {
        Id: 4,
        Title: 'Review Trade Pre-Clearance',
        Created: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        AuthorId: 104,
        EmployeeName: 'Sarah Johnson',
        ProductName: 'Amazon.com Inc. (AMZN)',
        Quantity: 150,
        Direction: 'Buy',
        Status: 'pending',
        TargetDate: new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString(),
      },
      {
        Id: 5,
        Title: 'Review Trade Pre-Clearance',
        Created: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
        AuthorId: 105,
        EmployeeName: 'David Brown',
        ProductName: 'Alphabet Inc. (GOOGL)',
        Quantity: 400,
        Direction: 'Sell',
        Status: 'denied',
        TargetDate: new Date(now.getTime() + 18 * 60 * 60 * 1000).toISOString(),
      },
      {
        Id: 6,
        Title: 'Review Trade Pre-Clearance',
        Created: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
        AuthorId: 106,
        EmployeeName: 'Lisa Martinez',
        ProductName: 'Meta Platforms (META)',
        Quantity: 200,
        Direction: 'Buy',
        Status: 'pending',
        TargetDate: new Date(now.getTime() + 10 * 60 * 60 * 1000).toISOString(),
      }
    ];
  }

  /**
   * Simulate a network delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async getRequests(userId: number, role: 'Employee' | 'Approver'): Promise<ITpcRequestModel[]> {
    await this.delay(600); // 600ms latency
    
    // If it's an employee, they only see their own.
    // In our mock, userId 101 represents an employee viewing their own stuff, while 999 is approver
    if (role === 'Employee') {
      return [...this.mockData.filter(d => d.AuthorId === userId)];
    }
    
    // Approvers see everything
    return [...this.mockData];
  }

  public async updateRequestStatus(id: number, newStatus: 'approved' | 'denied'): Promise<ITpcRequestModel> {
    await this.delay(500);
    const index = this.mockData.findIndex(req => req.Id === id);
    if (index === -1) {
      throw new Error(`Request with ID ${id} not found.`);
    }

    // Immutable update
    const updatedRequest = { ...this.mockData[index], Status: newStatus };
    this.mockData = [
      ...this.mockData.slice(0, index),
      updatedRequest,
      ...this.mockData.slice(index + 1)
    ];

    return { ...updatedRequest };
  }

  public async createRequest(request: Partial<ITpcRequestModel>): Promise<ITpcRequestModel> {
    await this.delay(800);
    
    const newRequest: ITpcRequestModel = {
      Id: this.currentId++,
      Title: request.Title || 'New Trade Pre-Clearance',
      Created: new Date().toISOString(),
      AuthorId: request.AuthorId || 101, // Defaulting to the mock employee ID if none provided
      EmployeeName: request.EmployeeName || 'Current User',
      ProductName: request.ProductName || 'Unknown Product',
      Quantity: request.Quantity || 0,
      Direction: request.Direction || 'Buy',
      Status: 'pending',
      TargetDate: request.TargetDate || new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours SLA default
    };

    this.mockData = [newRequest, ...this.mockData];
    return { ...newRequest };
  }

  public async getFormData(): Promise<ITpcFormData> {
    await this.delay(400);
    return {
      productTypes: [
        'Equity-Common',
        'Debt',
        'Convertible Bonds',
        'Structured Note',
        'Option',
        'Certificates'
      ],
      orderTypes: [
        'Day Order',
        'GTC',
        'Rights Issue',
        'Tender Offers'
      ],
      mockProducts: [
        { ticker: 'AAPL', name: 'APPLE INC' },
        { ticker: 'MSFT', name: 'MICROSOFT CORP' },
        { ticker: 'GOOGL', name: 'ALPHABET INC' },
        { ticker: 'AMZN', name: 'AMAZON.COM INC' },
        { ticker: 'TSLA', name: 'TESLA INC' }
      ]
    };
  }
}
