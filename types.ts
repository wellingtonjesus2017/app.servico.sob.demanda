
export enum UserRole {
  CLIENT = 'CLIENT',
  PROVIDER = 'PROVIDER'
}

export enum AppScreen {
  ONBOARDING = 'ONBOARDING',
  AUTH = 'AUTH',
  HOME = 'HOME',
  SERVICE_REQUEST = 'SERVICE_REQUEST',
  PAYMENT = 'PAYMENT',
  REVIEW = 'REVIEW',
  HISTORY = 'HISTORY',
  PROFILE = 'PROFILE'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  suggestedRate: string;
}

export interface Provider {
  id: string;
  name: string;
  rating: number;
  category: string;
  distance: string;
  price: number;
  avatar: string;
  verified: boolean;
}

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  time: string;
  amount: number;
  provider: string;
  status: 'COMPLETED' | 'CANCELLED' | 'UPCOMING';
  rating?: number;
}
