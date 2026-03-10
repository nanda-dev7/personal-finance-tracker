import React from 'react';

interface SummaryProps {
    income: number;
    totalBudgeted: number;
    totalSpent: number;
    totalSaved: number;
    cashRemaining: number;
}

const SummaryCard: React.FC<{ title: string; amount: number; colorClass: string }> = ({ title, amount, colorClass }) => (
    <div className="bg-card p-6 rounded-xl shadow-md flex-1">
        <h3 className="text-lg font-medium text-text-secondary mb-2">{title}</h3>
        <p className={`text-3xl font-bold ${colorClass}`}>
            {amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
        </p>
    </div>
);

const BudgetStatusBar: React.FC<{ income: number; totalBudgeted: number }> = ({ income, totalBudgeted }) => {
    const percentageBudgeted = income > 0 ? (totalBudgeted / income) * 100 : 0;
    const isOverBudget = totalBudgeted > income;
    const unbudgeted = income - totalBudgeted;

    return (
        <div className="bg-card p-4 rounded-xl shadow-md mt-6">
            <div className="flex justify-between items-center mb-2">
                 <h3 className="text-lg font-medium text-text-primary">Budget Status</h3>
                 {isOverBudget ? (
                    <span className="font-semibold text-sm text-red-500">
                        Over Budget by {(totalBudgeted - income).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </span>
                ) : (
                    <span className="text-sm text-text-secondary">
                        {unbudgeted.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} Unbudgeted
                    </span>
                )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                <div
                    className={`h-4 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-primary'} transition-all duration-500`}
                    style={{ width: `${Math.min(percentageBudgeted, 100)}%` }}
                ></div>
            </div>
            <div className="flex justify-between text-sm text-text-secondary mt-2">
                <span>{totalBudgeted.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} of {income.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                <span>{percentageBudgeted.toFixed(0)}% Budgeted</span>
            </div>
        </div>
    );
};


const Summary: React.FC<SummaryProps> = ({ income, totalBudgeted, totalSpent, totalSaved, cashRemaining }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard title="Monthly Income" amount={income} colorClass="text-primary" />
                <SummaryCard title="Total Spent" amount={totalSpent} colorClass="text-red-500" />
                <SummaryCard title="Total Saved" amount={totalSaved} colorClass="text-purple-500" />
                <SummaryCard title="Cash Remaining" amount={cashRemaining} colorClass="text-secondary" />
            </div>
            <BudgetStatusBar income={income} totalBudgeted={totalBudgeted} />
        </>
    );
};

export default Summary;