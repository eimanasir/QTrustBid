import { User } from '@/types';

// Test users with different roles
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
  
  // Seller/Agent users
  'seller@qtrustbid.com': {
    password: 'seller123',
    user: {
      id: 'seller-1',
      email: 'seller@qtrustbid.com',
      name: 'Sarah Johnson',
      role: 'seller',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      phone: '+1 (555) 123-4567',
      bio: 'Experienced real estate seller with 10+ years in the industry',
      verified: true,
      createdAt: '2024-02-15T00:00:00Z',
      agencyName: 'Premium Properties LLC',
      licenseNumber: 'RE-2024-12345',
      totalBids: 0,
      totalListings: 12,
      totalSales: 8,
    },
  },
  
  'agent@qtrustbid.com': {
    password: 'agent123',
    user: {
      id: 'seller-2',
      email: 'agent@qtrustbid.com',
      name: 'Michael Chen',
      role: 'seller',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      phone: '+1 (555) 234-5678',
      bio: 'Top-rated property agent specializing in luxury homes',
      verified: true,
      createdAt: '2024-03-01T00:00:00Z',
      agencyName: 'Elite Realty Group',
      licenseNumber: 'RE-2024-67890',
      totalBids: 0,
      totalListings: 25,
      totalSales: 18,
    },
  },
  
  // Buyer users
  'buyer@qtrustbid.com': {
    password: 'buyer123',
    user: {
      id: 'buyer-1',
      email: 'buyer@qtrustbid.com',
      name: 'John Smith',
      role: 'buyer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      phone: '+1 (555) 345-6789',
      bio: 'First-time home buyer looking for the perfect family home',
      verified: true,
      createdAt: '2024-04-10T00:00:00Z',
      totalBids: 5,
      totalListings: 0,
      totalSales: 0,
    },
  },
  
  'bidder@qtrustbid.com': {
    password: 'bidder123',
    user: {
      id: 'buyer-2',
      email: 'bidder@qtrustbid.com',
      name: 'Emily Davis',
      role: 'buyer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      phone: '+1 (555) 456-7890',
      bio: 'Investment property buyer seeking great opportunities',
      verified: true,
      createdAt: '2024-05-20T00:00:00Z',
      totalBids: 12,
      totalListings: 0,
      totalSales: 0,
    },
  },
};
