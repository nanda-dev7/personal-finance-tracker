import React, { useState } from 'react';
import type { Goal } from '../types';

interface GoalCardProps {
    goal: Goal;
    onDelete: (goalId: string) => void;
    onContribute: (goalId: string, amount: number) => void;
    availableCash: number;
}

const TargetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


const GoalCard: React.FC<GoalCardProps> = ({ goal, onDelete, onContribute, availableCash }) => {
    const [contribution, setContribution] = useState('');
    const [error, setError] = useState('');

    const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 100;

    const handleContribute = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(contribution);
        if (isNaN(amount) || amount <= 0) {
            setError('Enter a valid amount.');
            return;
        }
        if (amount > availableCash) {
            setError('Amount exceeds available cash.');
            return;
        }
        onContribute(goal.id, amount);
        setContribution('');
        setError('');
    }

    return (
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                            <TargetIcon />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary">{goal.name}</h3>
                    </div>
                     <button onClick={() => onDelete(goal.id)} title="Delete Goal" className="text-text-secondary hover:text-red-500 p-1 rounded-full transition-colors">
                        <TrashIcon />
                    </button>
                </div>

                <div className="my-2">
                    <div className="flex justify-between text-sm text-text-secondary mb-1">
                        <span>Progress</span>
                        <span>{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                    </div>
                     <p className="text-sm text-text-secondary mt-2 text-right">
                        <span className="font-semibold text-text-primary">{goal.currentAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                        {' '}of{' '}
                        {goal.targetAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <form onSubmit={handleContribute} className="space-y-2">
                     <div>
                        <label htmlFor={`contribution-${goal.id}`} className="block text-sm font-medium text-text-secondary">Add Funds</label>
                        <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">₹</span>
                            <input
                                type="number"
                                id={`contribution-${goal.id}`}
                                value={contribution}
                                onChange={(e) => setContribution(e.target.value)}
                                placeholder="0.00"
                                className="block w-full pl-7 pr-12 border border-gray-300 rounded-md shadow-sm py-2 focus:outline-none focus:ring-primary focus:border-primary"
                                step="100"
                            />
                            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                                <button type="submit" className="inline-flex items-center rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm bg-secondary hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors">
                                    Add
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GoalCard;
