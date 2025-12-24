import React, { useState } from 'react';
import { AppSettings, City } from '../types';
import { SAUDI_CITIES, PREDEFINED_THEMES } from '../constants';
import { Clock, Save, Info, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SettingsPageProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, setSettings }) => {
  const navigate = useNavigate();
  const [localSettings, setLocalSettings] = useState(settings);
  const [showAddCity, setShowAddCity] = useState(false);
  const [newCity, setNewCity] = useState({ name: '', arabicName: '', lat: 0, lng: 0 });

  const activeTheme = PREDEFINED_THEMES.find(t => t.id === localSettings.themeId) || PREDEFINED_THEMES[0];

  const handleSave = () => {
    setSettings(localSettings);
    navigate('/');
  };

  const handleAddCity = () => {
    if (newCity.name && newCity.arabicName) {
      setLocalSettings({ ...localSettings, selectedCity: newCity });
      setShowAddCity(false);
    }
  };

  return (
    <div className="py-6 space-y-8 pb-32">
      {/* Theme Selection */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <Palette size={20} className={activeTheme.accent} />
          مظهر التطبيق
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {PREDEFINED_THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setLocalSettings({ ...localSettings, themeId: t.id })}
              className={`flex flex-col items-center gap-2 p-2 rounded-2xl border-2 transition-all ${
                localSettings.themeId === t.id 
                  ? 'border-slate-800 scale-105 bg-slate-50' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-full shadow-inner ${t.bgHeader}`}></div>
              <span className="text-[10px] font-bold">{t.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* City Selection */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold flex items-center gap-2">
            <span>🌍</span> اختر المدينة
          </h3>
          <button 
            onClick={() => setShowAddCity(!showAddCity)}
            className={`text-xs font-bold px-2 py-1 rounded-lg ${activeTheme.accent} bg-slate-50`}
          >
            {showAddCity ? 'إلغاء' : 'إضافة مدينة'}
          </button>
        </div>

        {showAddCity ? (
          <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <input 
              type="text" 
              placeholder="اسم المدينة (عربي)" 
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 ring-slate-200 text-right"
              value={newCity.arabicName}
              onChange={(e) => setNewCity({...newCity, arabicName: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="City Name (English)" 
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 ring-slate-200 text-right"
              value={newCity.name}
              onChange={(e) => setNewCity({...newCity, name: e.target.value})}
            />
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Latitude" 
                className="w-1/2 p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 ring-slate-200 text-right"
                value={newCity.lat || ''}
                onChange={(e) => setNewCity({...newCity, lat: parseFloat(e.target.value)})}
              />
              <input 
                type="number" 
                placeholder="Longitude" 
                className="w-1/2 p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 ring-slate-200 text-right"
                value={newCity.lng || ''}
                onChange={(e) => setNewCity({...newCity, lng: parseFloat(e.target.value)})}
              />
            </div>
            <button 
              onClick={handleAddCity}
              className={`w-full text-white p-3 rounded-xl font-bold ${activeTheme.bgHeader}`}
            >
              حفظ وتعيين المدينة
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {SAUDI_CITIES.map((city) => (
              <button
                key={city.name}
                onClick={() => setLocalSettings({ ...localSettings, selectedCity: city })}
                className={`p-3 rounded-2xl text-sm font-medium transition-all ${
                  localSettings.selectedCity.name === city.name
                    ? `${activeTheme.bgHeader} text-white shadow-md`
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {city.arabicName}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Timing Config */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <h3 className="font-bold flex items-center gap-2">
          <span>🔔</span> تنبيهات الصلاة
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500 flex justify-between">
              <span>ظهور التنبيه بعد الصلاة (دقيقة)</span>
              <span className={`font-bold ${activeTheme.accent}`}>{localSettings.alertDelayMinutes}</span>
            </label>
            <input 
              type="range" min="0" max="30" step="1"
              value={localSettings.alertDelayMinutes}
              onChange={(e) => setLocalSettings({...localSettings, alertDelayMinutes: parseInt(e.target.value)})}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500 flex justify-between">
              <span>مدة بقاء التنبيه (دقيقة)</span>
              <span className={`font-bold ${activeTheme.accent}`}>{localSettings.alertDurationMinutes}</span>
            </label>
            <input 
              type="range" min="1" max="60" step="1"
              value={localSettings.alertDurationMinutes}
              onChange={(e) => setLocalSettings({...localSettings, alertDurationMinutes: parseInt(e.target.value)})}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
            />
          </div>
        </div>

        <div className="flex gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <Info size={20} className="text-blue-500 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed text-right">
            سيتم تحويل التطبيق تلقائياً إلى وضع "أغلق جوالك" بعد {localSettings.alertDelayMinutes} دقائق من دخول وقت الأذان، وسيبقى لمدة {localSettings.alertDurationMinutes} دقيقة.
          </p>
        </div>
      </section>

      <button 
        onClick={handleSave}
        className={`w-full py-4 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all ${activeTheme.bgHeader} hover:brightness-110 active:scale-95`}
      >
        <Save size={20} />
        حفظ الإعدادات
      </button>
    </div>
  );
};

export default SettingsPage;