export interface UserData {
  name: string;
  email: string;
  password: string;
  userName: string;
  PhoneNo: number;
  accountNumber: number;
  verified: boolean;
  wallet: {}[];
  history: {}[];
  isAdmin: boolean;
}

export interface WalletData {
  Balance: number;
  credit: number;
  debit: number;
  quickSave: {}[];
  saveLock: {}[];
  Target: {}[];
  Invest: {}[];
}

export interface HistoryData {
  message: string;
  transactionRefrence: number;
  transactionType: string;
}

export interface Quick {
  amount: number;
  autoSave: boolean;
  dateTime: number | string;
  interest: number;
}

export interface Locks {
  amount: number;
  PayBackTime: string;
  interest: number;
  lock: boolean;
  title: string;
}

export interface TargetData {
  amount: number;
  fixedAmount: number;
  interest: number;
  dateTime: string;
  title: string;
  targetValue: boolean;
}

export interface Invest {
  title: string;
  percentagePerUnit: number;
  amountPerUnit: number;
  description: string;
  investors: {}[];
  startTime: string;
  duration: string;
  category: string;
  status: boolean;
  totalUnit: number;
}

export interface investors {
  investorId: string;
  amount: number;
  unit: number;
}
