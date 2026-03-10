import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Category } from '../types';

interface BudgetChartProps {
  data: Category[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
        <p className="font-bold">{`${data.name}`}</p>
        <p className="text-sm">{`Budget: ${data.budget.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}`}</p>
      </div>
    );
  }
  return null;
};

const BudgetChart: React.FC<BudgetChartProps> = ({ data }) => {
    
  if (data.length === 0) {
    return <div className="bg-card p-6 rounded-xl shadow-md text-center text-text-secondary">No budget data available.</div>;
  }

  return (
    <div className="bg-card p-4 rounded-xl shadow-md h-96 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="budget"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.id}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;