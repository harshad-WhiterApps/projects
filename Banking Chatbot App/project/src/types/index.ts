export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountNumber: string;
  balance: number;
  isAuthenticated: boolean;
  role: 'customer' | 'agent' | 'admin';
  kycStatus: 'pending' | 'verified' | 'rejected';
  preferredLanguage: string;
  lastLogin: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'transaction' | 'balance' | 'menu' | 'kyc' | 'loan' | 'alert';
  sentiment?: 'positive' | 'negative' | 'neutral';
  confidence?: number;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: Date;
  balance: number;
  category: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: Message[];
  isActive: boolean;
  createdAt: Date;
  sentiment: 'positive' | 'negative' | 'neutral';
  resolved: boolean;
  escalated: boolean;
}

export interface CreditCard {
  id: string;
  cardNumber: string;
  cardType: 'visa' | 'mastercard' | 'rupay';
  creditLimit: number;
  availableLimit: number;
  dueDate: Date;
  minimumDue: number;
  totalDue: number;
  status: 'active' | 'blocked' | 'expired';
}

export interface Loan {
  id: string;
  type: 'personal' | 'home' | 'car' | 'business';
  amount: number;
  remainingAmount: number;
  emiAmount: number;
  nextEmiDate: Date;
  interestRate: number;
  tenure: number;
  status: 'active' | 'closed' | 'overdue';
}

export interface Bill {
  id: string;
  type: 'electricity' | 'water' | 'gas' | 'mobile' | 'internet' | 'dth';
  provider: string;
  accountNumber: string;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'paid' | 'overdue';
}

export interface Notification {
  id: string;
  type: 'transaction' | 'security' | 'reminder' | 'offer' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface KYCDocument {
  id: string;
  type: 'aadhaar' | 'pan' | 'passport' | 'driving_license';
  documentNumber: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadDate: Date;
  verificationDate?: Date;
}

export interface Analytics {
  totalChats: number;
  resolvedChats: number;
  averageResponseTime: number;
  customerSatisfaction: number;
  topIntents: string[];
  sentimentDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
}