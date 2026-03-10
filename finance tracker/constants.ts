import React from 'react';

// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const HomeIcon: React.FC = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" })
    )
);

// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const CarIcon: React.FC = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" })
    )
);

// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const FoodIcon: React.FC = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1v3l3-3h5a1 1 0 001-1z" }),
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 12h-4a2 2 0 00-2 2v2a2 2 0 002 2h4v-1a1 1 0 011-1V9a1 1 0 00-1-1h-4a1 1 0 00-1 1v1" })
    )
);

// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const UtilitiesIcon: React.FC = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 10V3L4 14h7v7l9-11h-7z" })
    )
);

// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const SavingsIcon: React.FC = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" })
    )
);

// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const PersonalIcon: React.FC = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" })
    )
);

const ExtraIcon: React.FC = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" })
    )
);

const EmergencyIcon: React.FC = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" })
    )
);


// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
export const INITIAL_CATEGORIES = [
    { id: 'housing', name: 'Housing', percentage: 0, color: '#3b82f6', icon: React.createElement(HomeIcon) },
    { id: 'transportation', name: 'Transportation', percentage: 0, color: '#10b981', icon: React.createElement(CarIcon) },
    { id: 'food', name: 'Food', percentage: 0, color: '#f97316', icon: React.createElement(FoodIcon) },
    { id: 'utilities', name: 'Utilities', percentage: 0, color: '#f59e0b', icon: React.createElement(UtilitiesIcon) },
    { id: 'savings', name: 'Savings', percentage: 0, color: '#8b5cf6', icon: React.createElement(SavingsIcon) },
    { id: 'personal', name: 'Personal', percentage: 0, color: '#ec4899', icon: React.createElement(PersonalIcon) },
    { id: 'extra', name: 'Extra Expenses', percentage: 0, color: '#14b8a6', icon: React.createElement(ExtraIcon) },
    { id: 'emergency', name: 'Emergency Fund', percentage: 0, color: '#6366f1', icon: React.createElement(EmergencyIcon) },
];