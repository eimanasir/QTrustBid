import { User } from '@/types';

// Test users - admin and regular users
export const mockUsers: Record<string, { password: string; user: User }> = {
  // Admin user
  'admin@qtrustbid.com': {
    password: 'admin123',
    user: {
      id: 'admin-1',
      email: 'admin@qtrustbid.com',
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      phone: '+1 (555) 000-0001',
      bio: 'Platform administrator with full system access',
      verified: true,
      createdAt: '2024-01-01T00:00:00Z',
      totalBids: 0,
      totalListings: 0,
      totalSales: 0,
    },
  },
  
  // Regular users (can both buy and sell)
  'user@qtrustbid.com': {
    password: 'user123',
    user: {
      id: 'user-1',
      email: 'user@qtrustbid.com',
      name: 'Sarah Johnson',
      role: 'user',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      phone: '+1 (555) 123-4567',
      bio: 'Real estate enthusiast - buying and selling properties',
      verified: true,
      createdAt: '2024-02-15T00:00:00Z',
      totalBids: 5,
      totalListings: 3,
      totalSales: 2,
    },
  },
  
  'john@qtrustbid.com': {
    password: 'john123',
    user: {
      id: 'user-2',
      email: 'john@qtrustbid.com',
      name: 'John Smith',
      role: 'user',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      phone: '+1 (555) 345-6789',
      bio: 'Looking for investment opportunities',
      verified: true,
      createdAt: '2024-04-10T00:00:00Z',
      totalBids: 8,
      totalListings: 1,
      totalSales: 0,
    },
  },
};
