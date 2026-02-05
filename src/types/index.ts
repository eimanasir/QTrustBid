// User Types
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  bio?: string;
  verified: boolean;
  createdAt: string;
  agencyName?: string;
  licenseNumber?: string;
  totalBids?: number;
  totalListings?: number;
  totalSales?: number;
}

// Property Types
export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  currentBid?: number;
  startingBid: number;
  reservePrice?: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize?: number;
  yearBuilt: number;
  propertyType: 'house' | 'condo' | 'land' | 'commercial';
  images: string[];
  virtualTourUrl?: string;
  amenities: string[];
  features: string[];
  status: 'active' | 'pending' | 'sold' | 'expired';
  sellerId: string;
  sellerName: string;
  sellerRating?: number;
  isVerified: boolean;
  matchScore?: number;
  viewCount: number;
  bidCount: number;
  isFavorited?: boolean;
  listingDate: string;
  expiryDate: string;
  location: {
    lat: number;
    lng: number;
  };
}

// Bid Types
export interface Bid {
  id: string;
  propertyId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: string;
  status: 'active' | 'outbid' | 'won' | 'lost' | 'withdrawn';
  isPreApproved: boolean;
}

// AI Recommendation Types
export interface AIRecommendation {
  property: Property;
  matchScore: number;
  matchReasons: string[];
  confidence: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'bid' | 'outbid' | 'won' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'auto';
