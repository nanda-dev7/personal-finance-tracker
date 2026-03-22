import { ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  percentage: number;   
  color: string;
  icon: ReactNode;
  budget: number;
  spent: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  date: string;
}

export interface Transaction extends Expense {
    categoryName: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}
