import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type { Category, Expense, Transaction, Goal } from './types';
import { INITIAL_CATEGORIES } from './constants';
import Header from './components/Header';
import IncomeInput from './components/IncomeInput';
import CategoryCard from './components/CategoryCard';
import AddExpenseForm from './components/AddExpenseForm';
import BudgetChart from './components/BudgetChart';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import FinancialGoals from './components/FinancialGoals';
import LoginPage from './components/LoginPage';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [income, setIncome] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);

    useEffect(() => {
        const savedUser = localStorage.getItem('finance_user');
        if (savedUser) {
            setIsLoggedIn(true);
            setUserEmail(savedUser);
        }
    }, []);

    const handleLogin = (email: string) => {
        setIsLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem('finance_user', email);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserEmail(null);
        localStorage.removeItem('finance_user');
        handleReset();
    };

    const handleSetIncome = useCallback((newIncome: number) => {
        setIncome(newIncome);
        const budgetedCategories = INITIAL_CATEGORIES.map(cat => ({
            ...cat,
            budget: 0,
            spent: 0,
        }));
        setCategories(budgetedCategories);
        setTransactions([]);
        setGoals([]);
    }, []);

    const handleAddExpense = useCallback((expense: Expense) => {
        setCategories(prevCategories =>
            prevCategories.map(cat =>
                cat.id === expense.categoryId
                    ? { ...cat, spent: cat.spent + expense.amount }
                    : cat
            )
        );
        const categoryName = categories.find(c => c.id === expense.categoryId)?.name || 'Unknown';
        setTransactions(prev => [{...expense, categoryName }, ...prev]);
    }, [categories]);

    const handleUpdateCategoryBudget = useCallback((categoryId: string, newBudget: number) => {
        setCategories(prevCategories =>
            prevCategories.map(cat =>
                cat.id === categoryId
                    ? { ...cat, budget: newBudget }
                    : cat
            )
        );
    }, []);

    const handleAddGoal = useCallback((goal: Omit<Goal, 'id' | 'currentAmount'>) => {
        const newGoal: Goal = {
            ...goal,
            id: new Date().toISOString(),
            currentAmount: 0,
        };
        setGoals(prev => [...prev, newGoal]);
    }, []);

    const handleDeleteGoal = useCallback((goalId: string) => {
        setGoals(prev => prev.filter(g => g.id !== goalId));
    }, []);

    const handleContributeToGoal = useCallback((goalId: string, amount: number) => {
        setGoals(prev =>
            prev.map(g =>
                g.id === goalId
                    ? { ...g, currentAmount: g.currentAmount + amount }
                    : g
            )
        );
    }, []);

    const handleReset = useCallback(() => {
        setIncome(null);
        setCategories([]);
        setTransactions([]);
        setGoals([]);
    }, []);

    const summaryData = useMemo(() => {
        if (!income) return { income: 0, totalBudgeted: 0, totalSpent: 0, totalSaved: 0, cashRemaining: 0 };
        const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0);
        const totalBudgeted = categories.reduce((acc, cat) => acc + cat.budget, 0);
        const totalSaved = goals.reduce((acc, goal) => acc + goal.currentAmount, 0);
        const cashRemaining = income - totalSpent - totalSaved;
        return {
            income,
            totalBudgeted,
            totalSpent,
            totalSaved,
            cashRemaining,
        };
    }, [income, categories, goals]);

    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} />;
    }

    if (!income) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center font-sans p-4">
                <Header onReset={handleReset} onLogout={handleLogout} showReset={false} />
                <main className="w-full max-w-md">
                    <IncomeInput onSetIncome={handleSetIncome} />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background font-sans text-text-primary">
            <Header onReset={handleReset} onLogout={handleLogout} showReset={true} />
            <main className="p-4 md:p-8 max-w-7xl mx-auto">
                <Summary {...summaryData} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-4 text-text-primary">Categories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {categories.map(cat => (
                                <CategoryCard
                                  key={cat.id}
                                  category={cat}
                                  onUpdateBudget={(newBudget) => handleUpdateCategoryBudget(cat.id, newBudget)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                         <div>
                            <h2 className="text-2xl font-bold mb-4 text-text-primary">Add Expense</h2>
                            <AddExpenseForm categories={categories} onAddExpense={handleAddExpense} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-text-primary">Budget Overview</h2>
                            <BudgetChart data={categories} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-2">
                        <FinancialGoals 
                            goals={goals}
                            onAddGoal={handleAddGoal}
                            onDeleteGoal={handleDeleteGoal}
                            onContribute={handleContributeToGoal}
                            availableCash={summaryData.cashRemaining}
                        />
                    </div>
                     <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold mb-4 text-text-primary">Recent Transactions</h2>
                        <TransactionList transactions={transactions} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;