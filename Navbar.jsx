import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Wallet, LogOut, User } from 'lucide-react';

export const Navbar = () => {
  const { logout, userEmail } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">FinanceTracker</span>
            </div>

            <div className="h-6 w-px bg-slate-200" />

            <a
              href="https://geolab.edu.ge/"
              target="_blank"
              rel="noopener noreferrer"
              title="GeoLab - ჯეოლაბი"
              className="flex items-center hover:opacity-80 transition"
            >
              <img
                src="/geolab-logo.jpg"
                alt="GeoLab Logo"
                className="h-9 w-9 object-contain rounded-lg shadow-sm"
              />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {userEmail && (
              <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                <User className="w-4 h-4 text-indigo-600" />
                <span>{userEmail}</span>
              </div>
            )}
            <button
              onClick={logout}
              className="flex items-center space-x-1.5 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>გასვლა</span>
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              aria-label="Toggle Menu"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-indigo-600 p-2 rounded-lg focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-4 space-y-3 shadow-lg">
          {userEmail && (
            <div className="flex items-center space-x-2 text-sm text-slate-600 px-2 py-1">
              <User className="w-4 h-4 text-indigo-600" />
              <span>{userEmail}</span>
            </div>
          )}
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-100 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>გასვლა</span>
          </button>
        </div>
      )}
    </nav>
  );
};
