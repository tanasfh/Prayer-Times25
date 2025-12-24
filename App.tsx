import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Settings as SettingsIcon, MapPin, Calendar, Clock, ChevronLeft } from 'lucide-react';
import { AppSettings, PrayerTimes, PrayerState, PrayerName, HijriDate } from './types';
import { DEFAULT_SETTINGS, SAUDI_CITIES, PREDEFINED_THEMES, PRAYER_NAMES_AR } from './constants';
import { fetchPrayerTimes, parsePrayerDate } from './services/prayerService';
import Home from './pages/Home';
import SettingsPage from './pages/Settings';
import QiblaPage from './pages/Qibla';
import BottomNav from './components/BottomNav';

const HeaderContent: React.FC<{ settings: AppSettings; hijriDate: HijriDate | null; activeTheme: any; prayerState: PrayerState }> = ({ settings, hijriDate, activeTheme, prayerState }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isQibla = location.pathname === '/qibla';
  const isSettings = location.pathname === '/settings';

  const getTitle = () => {
    if (isQibla) return 'القبلة';
    if (isSettings) return 'الإعدادات';
    return '';
  };

  return (
    <header className={`p-8 pt-12 text-white rounded-b-[3.5rem] shadow-2xl transition-all duration-700 relative overflow-hidden islamic-pattern ${activeTheme.bgHeader} mb-6`}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

      <div className="relative flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <div className="flex items-center text-white/80 text-xs gap-1.5 font-bold mb-1">
            <MapPin size={14} className="text-white/60" />
            <span>{settings.selectedCity.arabicName}</span>
          </div>
          {hijriDate && isHome && (
            <div className="flex items-center text-white/90 text-[10px] gap-1.5 font-bold">
              <Calendar size={12} className="text-white/40" />
              <span>{hijriDate.day} {hijriDate.month.ar} {hijriDate.year} هـ</span>
            </div>
          )}
          {!isHome && <h1 className="text-2xl font-black">{getTitle()}</h1>}
        </div>
        
        {isHome && (
          <div className="bg-white/10 px-3 py-1.5 rounded-2xl backdrop-blur-md border border-white/10 text-[10px] font-black">
            {hijriDate?.weekday.ar}
          </div>
        )}
      </div>

      {isHome && prayerState.nextPrayerName && (
        <div className="relative mt-2 text-center bg-white/10 p-6 rounded-[2.5rem] backdrop-blur-xl border border-white/20 shadow-inner group transition-transform hover:scale-[1.02]">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/20 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">
            متبقي على {PRAYER_NAMES_AR[prayerState.nextPrayerName]}
          </div>
          <div className="flex flex-col items-center mt-2">
            {prayerState.nextPrayerTime && (
              <Countdown targetDate={prayerState.nextPrayerTime} />
            )}
            <h2 className="text-4xl font-black mt-1 tracking-tighter opacity-80">
              {PRAYER_NAMES_AR[prayerState.nextPrayerName]}
            </h2>
          </div>
        </div>
      )}
    </header>
  );
};

const Countdown: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState('');
  
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    if (diff <= 0) return 'الآن';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (hours > 0) return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [targetDate]);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="flex items-center gap-2">
      <p className="text-5xl font-black tabular-nums tracking-tighter drop-shadow-lg">{timeLeft}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('prayer_app_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [timings, setTimings] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [prayerState, setPrayerState] = useState<PrayerState>({
    lastPrayerTime: null,
    nextPrayerName: null,
    nextPrayerTime: null,
    isPrayerMode: false,
  });

  const activeTheme = PREDEFINED_THEMES.find(t => t.id === settings.themeId) || PREDEFINED_THEMES[0];

  useEffect(() => {
    localStorage.setItem('prayer_app_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const loadTimings = async () => {
      try {
        const data = await fetchPrayerTimes(settings.selectedCity);
        setTimings(data.timings);
        setHijriDate(data.hijri);
      } catch (error) {
        console.error("Load timings error", error);
      }
    };
    loadTimings();
  }, [settings.selectedCity]);

  const updatePrayerState = useCallback(() => {
    if (!timings) return;

    const now = new Date();
    const prayerKeys: PrayerName[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    let next: { name: PrayerName; time: Date } | null = null;
    let last: { name: PrayerName; time: Date } | null = null;

    for (const key of prayerKeys) {
      const pDate = parsePrayerDate(timings[key]);
      
      if (pDate > now) {
        if (!next || pDate < next.time) {
          next = { name: key, time: pDate };
        }
      } else {
        if (!last || pDate > last.time) {
          last = { name: key, time: pDate };
        }
      }
    }

    if (!next) {
      const tomorrowFajr = parsePrayerDate(timings['Fajr']);
      tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
      next = { name: 'Fajr', time: tomorrowFajr };
    }

    let isMode = false;
    if (last) {
      const diffMinutes = (now.getTime() - last.time.getTime()) / (1000 * 60);
      const start = settings.alertDelayMinutes;
      const end = settings.alertDelayMinutes + settings.alertDurationMinutes;
      
      if (diffMinutes >= start && diffMinutes < end) {
        isMode = true;
      }
    }

    setPrayerState({
      lastPrayerTime: last?.time || null,
      nextPrayerName: next.name,
      nextPrayerTime: next.time,
      isPrayerMode: isMode,
    });
  }, [timings, settings]);

  useEffect(() => {
    updatePrayerState();
    const interval = setInterval(updatePrayerState, 1000);
    return () => clearInterval(interval);
  }, [updatePrayerState]);

  if (prayerState.isPrayerMode) {
    return (
      <div className={`fixed inset-0 flex flex-col items-center justify-center text-center p-8 z-50 transition-colors duration-1000 islamic-pattern ${activeTheme.bgHeader.replace('700', '900')}`}>
        <div className="max-w-md space-y-10">
          <Clock className="w-32 h-32 text-white/20 mx-auto animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-black text-white quran-font leading-tight">
            أغلق جوالك <br/> وأخشع بصلاتك
          </h1>
          <div className="w-20 h-1 bg-white/20 mx-auto rounded-full"></div>
          <p className="text-white/60 text-xl font-medium">
            الصلاة صلة بين العبد وربه
          </p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 max-w-lg mx-auto shadow-2xl flex flex-col relative overflow-hidden text-right">
        <HeaderContent settings={settings} hijriDate={hijriDate} activeTheme={activeTheme} prayerState={prayerState} />

        <main className="flex-1 overflow-y-auto px-6 relative z-10">
          <Routes>
            <Route path="/" element={<Home timings={timings} prayerState={prayerState} theme={activeTheme} />} />
            <Route path="/qibla" element={<QiblaPage city={settings.selectedCity} theme={activeTheme} />} />
            <Route path="/settings" element={<SettingsPage settings={settings} setSettings={setSettings} />} />
          </Routes>
        </main>

        <BottomNav theme={activeTheme} />
      </div>
    </HashRouter>
  );
};

export default App;