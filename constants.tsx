
import React from 'react';
import { Gym, Booking, GymReview, Payout, User, UserRole } from './types';
import { Globe, Shield, Zap as Flash } from 'lucide-react';

export const APP_NAME = "Flexly";
export const TAGLINE = "One Pass. Endless Gyms.";

export const PLATFORM_CONFIG = {
  commissionRate: 0.15, // 15%
  gstRate: 0.18, // 18%
  minWithdrawalThreshold: 5000,
  payoutProcessingDays: 1
};

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Amit Kumar', email: 'amit@gmail.com', role: UserRole.USER, city: 'Mumbai', state: 'Maharashtra', subscriptionStatus: 'SUBSCRIBED', totalSpend: 4500, joinDate: '2024-01-15' },
  { id: 'u2', name: 'Sonal Singh', email: 'sonal@gmail.com', role: UserRole.USER, city: 'Delhi', state: 'Delhi', subscriptionStatus: 'LEAD', totalSpend: 0, joinDate: '2024-03-10' },
  { id: 'u3', name: 'Vikram Rao', email: 'vikram@yahoo.com', role: UserRole.USER, city: 'Bangalore', state: 'Karnataka', subscriptionStatus: 'SUBSCRIBED', totalSpend: 12000, joinDate: '2023-11-20' },
  { id: 'u4', name: 'Neha Gupta', email: 'neha@flexly.com', role: UserRole.USER, city: 'Pune', state: 'Maharashtra', subscriptionStatus: 'LEAD', totalSpend: 0, joinDate: '2024-05-01' },
];

export const MOCK_GYMS: Gym[] = [
  {
    id: '1',
    ownerId: 'owner1',
    ownerName: 'Rajesh Kumar',
    name: 'Iron Temple Elite',
    location: 'Bandra West, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    coordinates: { lat: 19.0596, lng: 72.8295 },
    description: 'Premium bodybuilding gym.',
    amenities: ['Showers', 'WiFi'],
    photos: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'],
    pricing: { daily: 299, weekly: 1499, monthly: 3499 },
    timings: { weekdays: "05:00 AM - 11:00 PM", weekends: "07:00 AM - 09:00 PM" },
    rating: 4.8,
    status: 'APPROVED',
    reviewsCount: 156,
    tags: ['Premium']
  },
  {
    id: '2',
    ownerId: 'owner2',
    ownerName: 'Sunil Shetty',
    name: 'Power Grid Gym',
    location: 'Indiranagar, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    coordinates: { lat: 12.9719, lng: 77.6412 },
    description: 'Crossfit specialist.',
    amenities: ['Locker'],
    photos: ['https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80'],
    pricing: { daily: 199, weekly: 999, monthly: 2499 },
    timings: { weekdays: "06:00 AM - 10:00 PM", weekends: "08:00 AM - 06:00 PM" },
    rating: 4.2,
    status: 'PENDING',
    reviewsCount: 0,
    tags: ['Crossfit']
  }
];

export const MOCK_PAYMENTS: Booking[] = [
  {
    id: 'TXN-9901',
    userId: 'u1',
    userName: 'Amit Kumar',
    gymId: '1',
    gymName: 'Iron Temple Elite',
    type: 'DAILY',
    startDate: '2024-05-15',
    expiryDate: '2024-05-16',
    status: 'ACTIVE',
    grossAmount: 299,
    gstAmount: 53.82,
    commissionAmount: 44.85,
    netPayoutToOwner: 200.33,
    qrCode: 'FLX-IT-8821',
    paymentId: 'pay_ABC123',
    paymentMethod: 'UPI',
    date: '2024-05-15'
  },
  {
    id: 'TXN-9902',
    userId: 'u3',
    userName: 'Vikram Rao',
    gymId: '1',
    gymName: 'Iron Temple Elite',
    type: 'WEEKLY',
    startDate: '2024-05-10',
    expiryDate: '2024-05-17',
    status: 'ACTIVE',
    grossAmount: 1499,
    gstAmount: 269.82,
    commissionAmount: 224.85,
    netPayoutToOwner: 1004.33,
    qrCode: 'FLX-IT-9921',
    paymentId: 'pay_XYZ789',
    paymentMethod: 'Credit Card',
    date: '2024-05-10'
  }
];

// Add MOCK_PAYOUTS to resolve missing member error in OwnerPortal.tsx
export const MOCK_PAYOUTS: Payout[] = [
  {
    id: 'PO-9901',
    ownerId: 'owner1',
    gymId: '1',
    userName: 'Amit Kumar',
    grossAmount: 299,
    commissionRate: 0.15,
    netAmount: 200.33,
    status: 'COMPLETED',
    date: '2024-05-15',
    bankRef: 'SETTLE_8812'
  },
  {
    id: 'PO-9902',
    ownerId: 'owner1',
    gymId: '1',
    userName: 'Vikram Rao',
    grossAmount: 1499,
    commissionRate: 0.15,
    netAmount: 1004.33,
    status: 'PENDING',
    date: '2024-05-10'
  }
];

export const FEATURES = [
  { icon: <Globe className="w-10 h-10" />, title: "Pan-India Access", desc: "Access 2,500+ gyms across India." },
  { icon: <Flash className="w-10 h-10" />, title: "No Monthly Lock-ins", desc: "Pay only when you workout." },
  { icon: <Shield className="w-10 h-10" />, title: "Safety First", desc: "Verified and audited facilities." }
];

export const TOP_CITIES = ["Mumbai", "Bangalore", "Delhi", "Pune", "Hyderabad"];
export const MOCK_REVIEWS: GymReview[] = [];
