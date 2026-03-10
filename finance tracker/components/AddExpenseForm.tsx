import React, { useState } from 'react';
import type { Category, Expense } from '../types';

interface AddExpenseFormProps {
  categories: Category[];
  onAddExpense: (expense: Expense) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ categories, onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);

    if (!description.trim() || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please fill in all fields with valid values.');
      return;
    }
    
    if(!categoryId) {
        setError('Please select a category.');
        return;
    }

    setError('');
    
    onAddExpense({
      id: new Date().toISOString(),
      description,
      amount: numericAmount,
      categoryId,
      date: new Date().toLocaleDateString(),
    });

    setDescription('');
    setAmount('');
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text-secondary">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Coffee, groceries"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-text-secondary">Amount</label>
           <div className="relative">
             <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">₹</span>
             <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="mt-1 block w-full pl-7 pr-3 border border-gray-300 rounded-md shadow-sm py-2 focus:outline-none focus:ring-primary focus:border-primary"
                step="0.01"
              />
            </div>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-text-secondary">Category</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;