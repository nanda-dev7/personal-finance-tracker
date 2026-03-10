import React, { useState, useEffect } from 'react';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onUpdateBudget: (newBudget: number) => void;
}

const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onUpdateBudget }) => {
  const { name, budget, spent, color, icon } = category;
  const [isEditing, setIsEditing] = useState(false);
  const [editedBudget, setEditedBudget] = useState(budget.toString());
  
  useEffect(() => {
    if (!isEditing) {
        setEditedBudget(budget.toString());
    }
  }, [budget, isEditing]);

  const handleSave = () => {
    const newBudget = parseFloat(editedBudget);
    if (!isNaN(newBudget) && newBudget >= 0) {
      onUpdateBudget(newBudget);
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
      setIsEditing(false);
      setEditedBudget(budget.toString());
  };

  const remaining = budget - spent;
  const percentageSpent = budget > 0 ? (spent / budget) * 100 : 0;
  
  const progressBarColor = percentageSpent > 90 ? 'bg-red-500' : percentageSpent > 75 ? 'bg-yellow-500' : 'bg-secondary';


  return (
    <div className="bg-card p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20`, color }}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-text-primary">{name}</h3>
        </div>
        <div className="flex items-center gap-2">
            {!isEditing ? (
                <button onClick={() => setIsEditing(true)} title="Edit Budget" className="text-text-secondary hover:text-primary p-1 rounded-full transition-colors">
                    <PencilIcon />
                </button>
            ) : (
                <>
                    <button onClick={handleSave} title="Save" className="text-green-500 hover:text-green-700 p-1 rounded-full transition-colors">
                        <CheckIcon />
                    </button>
                    <button onClick={handleCancel} title="Cancel" className="text-red-500 hover:text-red-700 p-1 rounded-full transition-colors">
                        <XIcon />
                    </button>
                </>
            )}
        </div>
      </div>

      <div className="my-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${progressBarColor}`}
            style={{ width: `${Math.min(percentageSpent, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-text-secondary mt-2">
            <span>{percentageSpent.toFixed(0)}% Spent</span>
             <div className="flex items-baseline gap-1">
              <span>Budget:</span>
              {isEditing ? (
                  <input
                    type="number"
                    value={editedBudget}
                    onChange={(e) => setEditedBudget(e.target.value)}
                    className="w-24 text-right bg-gray-100 border-b-2 border-primary focus:outline-none p-0.5 rounded-sm font-semibold text-text-primary"
                    autoFocus
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
                    step="100"
                  />
              ) : (
                <span className="font-semibold text-text-primary">{budget.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
              )}
            </div>
        </div>
      </div>
      
      <div className="flex justify-between text-center">
        <div>
          <p className="text-sm text-text-secondary">Spent</p>
          <p className="text-lg font-semibold text-red-500">{spent.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
        </div>
        <div>
          <p className="text-sm text-text-secondary">Remaining</p>
          <p className="text-lg font-semibold text-secondary">{remaining.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;