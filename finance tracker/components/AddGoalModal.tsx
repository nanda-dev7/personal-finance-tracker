import React, { useState, Fragment } from 'react';
import type { Goal } from '../types';

interface AddGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddGoal: (goal: Omit<Goal, 'id' | 'currentAmount'>) => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAddGoal }) => {
    const [name, setName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(targetAmount);
        if (!name.trim() || isNaN(amount) || amount <= 0) {
            setError('Please enter a valid name and target amount.');
            return;
        }

        onAddGoal({ name, targetAmount: amount });
        setName('');
        setTargetAmount('');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity" aria-modal="true" role="dialog">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold text-text-primary">Create a New Goal</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="goal-name" className="block text-sm font-medium text-text-secondary">Goal Name</label>
                            <input
                                type="text"
                                id="goal-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Vacation to Goa"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="target-amount" className="block text-sm font-medium text-text-secondary">Target Amount</label>
                            <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">₹</span>
                                <input
                                    type="number"
                                    id="target-amount"
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(e.target.value)}
                                    placeholder="e.g., 50000"
                                    className="block w-full pl-7 pr-3 border border-gray-300 rounded-md shadow-sm py-2 focus:outline-none focus:ring-primary focus:border-primary"
                                    step="1000"
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="pt-4 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-200 text-text-primary font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                             <button
                                type="submit"
                                className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Add Goal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddGoalModal;
