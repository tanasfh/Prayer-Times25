import React from 'react';
import { PrayerTimes, PrayerState, Theme } from '../types';
import PrayerCard from '../components/PrayerCard';

interface HomeProps {
  timings: PrayerTimes | null;
  prayerState: PrayerState;
  theme: Theme;
}

const Home: React.FC<HomeProps> = ({ timings, prayerState, theme }) => {
  if (!timings) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-6">
        <div className={`w-14 h-14 border-4 rounded-full animate-spin border-t-transparent ${theme.accent.replace('text', 'border')}`}></div>
        <p className="text-slate-400 font-bold animate-pulse text-sm">جاري تحديث المواقيت...</p>
      </div>
    );
  }

  const prayersToDisplay = [
    { key: 'Fajr', name: 'Fajr' },
    { key: 'Sunrise', name: 'Sunrise' },
    { key: 'Dhuhr', name: 'Dhuhr' },
    { key: 'Asr', name: 'Asr' },
    { key: 'Maghrib', name: 'Maghrib' },
    { key: 'Isha', name: 'Isha' },
  ];

  return (
    <div className="pb-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 gap-4">
        {prayersToDisplay.map((p) => (
          <PrayerCard 
            key={p.key}
            name={p.name}
            time={timings[p.key as keyof PrayerTimes]}
            isNext={prayerState.nextPrayerName === p.key}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;