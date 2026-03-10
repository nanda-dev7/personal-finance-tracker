import React from 'react';
import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-card p-6 rounded-xl shadow-md text-center">
        <p className="text-text-secondary">No transactions yet. Add an expense to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-xl shadow-md max-h-[40rem] overflow-y-auto">
        <div className="flow-root">
             <ul role="list" className="-my-4 divide-y divide-gray-200">
                {transactions.map((transaction) => (
                    <li key={transaction.id} className="flex items-center py-4 space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                               <span className="text-primary font-bold">{transaction.categoryName.charAt(0)}</span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-md font-medium text-text-primary truncate">{transaction.description}</p>
                            <p className="text-sm text-text-secondary truncate">{transaction.categoryName} - {transaction.date}</p>
                        </div>
                        <div className="inline-flex items-center text-lg font-semibold text-red-500">
                            -{transaction.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default TransactionList;