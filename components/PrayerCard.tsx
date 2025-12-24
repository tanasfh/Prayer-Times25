
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
    emerald: 'bg-emerald-600 ring-emerald-100',
    indigo: 'bg-indigo-600 ring-indigo-100',
    slate: 'bg-slate-700 ring-slate-200',
    rose: 'bg-rose-600 ring-rose-100',
  }[theme.id] || 'bg-emerald-600 ring-emerald-100';

  const textAccent = {
    emerald: 'text-emerald-600',
    indigo: 'text-indigo-600',
    slate: 'text-slate-600',
    rose: 'text-rose-600',
  }[theme.id] || 'text-emerald-600';

  return (
    <div className={`flex items-center justify-between p-5 rounded-3xl transition-all duration-500 ${
      isNext 
        ? `${bgActive} text-white shadow-xl scale-[1.02] ring-4 z-10` 
        : 'bg-white text-slate-700 shadow-sm border border-slate-100 hover:border-slate-200'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${isNext ? 'bg-white/20' : 'bg-slate-50 text-slate-400'}`}>
          {getPrayerIcon(name, 24)}
        </div>
        <div className="flex flex-col">
          <span className={`text-[10px] uppercase tracking-wider font-bold ${isNext ? 'text-white/60' : 'text-slate-400'}`}>
            {name === 'Sunrise' ? 'وقت' : 'صلاة'}
          </span>
          <span className="text-lg font-extrabold tracking-tight">{PRAYER_NAMES_AR[name] || name}</span>
        </div>
      </div>
      <div className="text-right">
        <span className={`text-2xl font-black tabular-nums ${isNext ? 'text-white' : textAccent}`}>
          {formatTo12Hour(time)}
        </span>
      </div>
    </div>
  );
};

export default PrayerCard;
