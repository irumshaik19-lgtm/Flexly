
export enum UserRole {
  USER = 'USER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  city?: string;
  state?: string;
  kycStatus?: 'PENDING' | 'VERIFIED' | 'REJECTED';
  subscriptionStatus: 'SUBSCRIBED' | 'LEAD';
  totalSpend: number;
  joinDate: string;
}

export interface GymTimings {
  weekdays: string;
  weekends: string;
}

export interface Gym {
  id: string;
  ownerId: string;
  ownerName?: string;
  name: string;
  location: string;
  city: string;
  state: string;
  coordinates: { lat: number; lng: number };
  description: string;
  amenities: string[];
  photos: string[];
  videoUrl?: string;
  pricing: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  timings: GymTimings;
  rating: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reviewsCount: number;
  tags: string[];
  gstNumber?: string;
}

export interface Booking {
  id: string;
  userId: string;
  userName?: string;
  gymId: string;
  gymName: string;
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  startDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'USED' | 'EXPIRED';
  grossAmount: number;
  gstAmount: number;
  commissionAmount: number;
  netPayoutToOwner: number;
  qrCode: string;
  paymentId: string;
  paymentMethod: string;
  date: string;
}

export interface Payout {
  id: string;
  ownerId: string;
  gymId: string;
  userName: string;
  grossAmount: number;
  commissionRate: number;
  netAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'PROCESSING';
  date: string;
  bankRef?: string;
}

export interface GymReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}
