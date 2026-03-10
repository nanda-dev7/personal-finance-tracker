import React, { useState } from 'react';

interface IncomeInputProps {
  onSetIncome: (income: number) => void;
}

const IncomeInput: React.FC<IncomeInputProps> = ({ onSetIncome }) => {
  const [income, setIncome] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const incomeValue = parseFloat(income);
    if (isNaN(incomeValue) || incomeValue <= 0) {
      setError('Please enter a valid, positive income amount.');
      return;
    }
    setError('');
    onSetIncome(incomeValue);
  };

  return (
    <div className="bg-card p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-text-primary mb-2">Welcome!</h2>
      <p className="text-center text-text-secondary mb-6">Let's start by setting your monthly income.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="income" className="block text-sm font-medium text-text-secondary mb-1">
            Monthly Income (₹)
          </label>
          <div className="relative">
             <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">₹</span>
             <input
              type="number"
              id="income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g., 50000"
              className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
              step="0.01"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105"
        >
          Set Budget & Get Started
        </button>
      </form>
    </div>
  );
};

export default IncomeInput;