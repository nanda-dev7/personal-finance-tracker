
import React from 'react';

interface HeaderProps {
    onReset: () => void;
    onLogout: () => void;
    showReset: boolean;
}

const Header: React.FC<HeaderProps> = ({ onReset, onLogout, showReset }) => {
    return (
        <header className="w-full max-w-7xl mx-auto p-4 md:p-6 flex justify-between items-center">
             <div className="flex items-center gap-3">
                 <div className="bg-primary p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                 </div>
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                    Finance Tracker
                </h1>
            </div>
            <div className="flex items-center gap-4">
                {showReset && (
                    <button
                        onClick={onReset}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                        Reset
                    </button>
                )}
                <button
                    onClick={onLogout}
                    className="bg-slate-200 text-text-primary font-bold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors duration-300"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
