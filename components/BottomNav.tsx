import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Settings } from 'lucide-react';
import { Theme } from '../types';

interface BottomNavProps {
  theme: Theme;
}

const BottomNav: React.FC<BottomNavProps> = ({ theme }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const activeColor = {
    emerald: 'text-emerald-600',
    indigo: 'text-indigo-600',
    slate: 'text-slate-800',
    rose: 'text-rose-600',
  }[theme.id] || 'text-emerald-600';

  const activeBg = {
    emerald: 'bg-emerald-50',
    indigo: 'bg-indigo-50',
    slate: 'bg-slate-100',
    rose: 'bg-rose-50',
  }[theme.id] || 'bg-emerald-50';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 px-6 py-3 pb-6 flex justify-around items-center z-40 bottom-nav-shadow max-w-lg mx-auto">
      <Link to="/" className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${isActive('/') ? `${activeBg} ${activeColor}` : 'text-slate-400'}`}>
        <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
        <span className="text-[10px] font-bold">الرئيسية</span>
      </Link>
      <Link to="/qibla" className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${isActive('/qibla') ? `${activeBg} ${activeColor}` : 'text-slate-400'}`}>
        <Compass size={24} strokeWidth={isActive('/qibla') ? 2.5 : 2} />
        <span className="text-[10px] font-bold">القبلة</span>
      </Link>
      <Link to="/settings" className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${isActive('/settings') ? `${activeBg} ${activeColor}` : 'text-slate-400'}`}>
        <Settings size={24} strokeWidth={isActive('/settings') ? 2.5 : 2} />
        <span className="text-[10px] font-bold">الإعدادات</span>
      </Link>
    </nav>
  );
};

export default BottomNav;