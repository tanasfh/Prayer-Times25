import React from 'react';
import { PRAYER_NAMES_AR } from '../constants';
import { formatTo12Hour } from '../services/prayerService';
import { Theme } from '../types';
import { Moon, Sunrise, Sun, CloudSun, Sunset, Stars } from 'lucide-react';

interface PrayerCardProps {
  name: string;
  time: string;
  isNext: boolean;
  theme: Theme;
}

const getPrayerIcon = (name: string, size: number = 20) => {
  switch (name) {
    case 'Fajr': return <Moon size={size} />;
    case 'Sunrise': return <Sunrise size={size} />;
    case 'Dhuhr': return <Sun size={size} />;
    case 'Asr': return <CloudSun size={size} />;
    case 'Maghrib': return <Sunset size={size} />;
    case 'Isha': return <Stars size={size} />;
    default: return <Sun size={size} />;
  }
};

const PrayerCard: React.FC<PrayerCardProps> = ({ name, time, isNext, theme }) => {
  const bgActive = {
    emerald: 'bg-emerald-600 ring-emerald-100 shadow-emerald-200',
    indigo: 'bg-indigo-600 ring-indigo-100 shadow-indigo-200',
    slate: 'bg-slate-800 ring-slate-200 shadow-slate-200',
    rose: 'bg-rose-600 ring-rose-100 shadow-rose-200',
  }[theme.id] || 'bg-emerald-600 ring-emerald-100';

  const textAccent = {
    emerald: 'text-emerald-600',
    indigo: 'text-indigo-600',
    slate: 'text-slate-800',
    rose: 'text-rose-600',
  }[theme.id] || 'text-emerald-600';

  return (
    <div className={`flex items-center justify-between p-5 rounded-[2rem] transition-all duration-500 ${
      isNext 
        ? `${bgActive} text-white shadow-2xl scale-[1.02] ring-4 z-10 relative overflow-hidden` 
        : 'bg-white text-slate-700 shadow-sm border border-slate-100/50 hover:border-slate-200 active:scale-95'
    }`}>
      {isNext && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      )}
      
      <div className="flex items-center gap-4 relative z-10">
        <div className={`p-3.5 rounded-2xl ${isNext ? 'bg-white/20' : 'bg-slate-50 text-slate-400'}`}>
          {getPrayerIcon(name, 24)}
        </div>
        <div className="flex flex-col">
          <span className={`text-[9px] uppercase tracking-widest font-black ${isNext ? 'text-white/60' : 'text-slate-300'}`}>
            {name === 'Sunrise' ? 'دخول' : 'صلاة'}
          </span>
          <span className="text-xl font-black tracking-tight">{PRAYER_NAMES_AR[name] || name}</span>
        </div>
      </div>

      <div className="text-right relative z-10">
        <span className={`text-2xl font-black tabular-nums ${isNext ? 'text-white' : textAccent}`}>
          {formatTo12Hour(time)}
        </span>
      </div>
    </div>
  );
};

export default PrayerCard;