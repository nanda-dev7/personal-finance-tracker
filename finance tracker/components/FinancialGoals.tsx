import React, { useState } from 'react';
import type { Goal } from '../types';
import AddGoalModal from './AddGoalModal';
import GoalCard from './GoalCard';

interface FinancialGoalsProps {
    goals: Goal[];
    onAddGoal: (goal: Omit<Goal, 'id' | 'currentAmount'>) => void;
    onDeleteGoal: (goalId: string) => void;
    onContribute: (goalId: string, amount: number) => void;
    availableCash: number;
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const FinancialGoals: React.FC<FinancialGoalsProps> = ({ goals, onAddGoal, onDeleteGoal, onContribute, availableCash }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-card p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-text-primary">Financial Goals</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                    <PlusIcon />
                    New Goal
                </button>
            </div>
            
            {goals.length === 0 ? (
                <p className="text-text-secondary text-center py-8">You haven't set any goals yet. Click "New Goal" to start planning!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {goals.map(goal => (
                        <GoalCard 
                            key={goal.id} 
                            goal={goal} 
                            onDelete={onDeleteGoal}
                            onContribute={onContribute}
                            availableCash={availableCash}
                        />
                    ))}
                </div>
            )}

            <AddGoalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddGoal={onAddGoal}
            />
        </div>
    );
};

export default FinancialGoals;