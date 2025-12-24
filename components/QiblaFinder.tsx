import React, { useMemo } from 'react';
import { City, Theme } from '../types';
import { Compass, Navigation } from 'lucide-react';

interface QiblaFinderProps {
  city: City;
  theme: Theme;
}

const QiblaFinder: React.FC<QiblaFinderProps> = ({ city, theme }) => {
  // Kaaba coordinates
  const KAABA_LAT = 21.422487;
  const KAABA_LNG = 39.826206;

  const qiblaAngle = useMemo(() => {
    const phi1 = (city.lat * Math.PI) / 180;
    const phi2 = (KAABA_LAT * Math.PI) / 180;
    const delL = ((KAABA_LNG - city.lng) * Math.PI) / 180;

    const y = Math.sin(delL);
    const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(delL);
    let angle = (Math.atan2(y, x) * 180) / Math.PI;
    
    return Math.round((angle + 360) % 360);
  }, [city]);

  const themeColor = {
    emerald: 'bg-emerald-600',
    indigo: 'bg-indigo-600',
    slate: 'bg-slate-800',
    rose: 'bg-rose-600',
  }[theme.id] || 'bg-emerald-600';

  return (
    <div className="flex flex-col items-center justify-center space-y-10 py-10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-slate-800">اتجاه القبلة</h2>
        <p className="text-slate-500 text-sm font-medium">من {city.arabicName} نحو مكة المكرمة</p>
      </div>

      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-100 shadow-inner"></div>
        <div className="absolute inset-4 rounded-full border border-slate-50"></div>
        
        {/* Cardinal Points */}
        <span className="absolute top-4 font-bold text-slate-300 text-xs">N</span>
        <span className="absolute bottom-4 font-bold text-slate-300 text-xs">S</span>
        <span className="absolute left-4 font-bold text-slate-300 text-xs">W</span>
        <span className="absolute right-4 font-bold text-slate-300 text-xs">E</span>

        {/* Compass Needle Container */}
        <div 
          className="relative w-full h-full transition-transform duration-1000 ease-out flex items-center justify-center"
          style={{ transform: `rotate(${qiblaAngle}deg)` }}
        >
          {/* Needle Shadow */}
          <div className="absolute w-1 h-32 bg-black/5 rounded-full blur-sm translate-x-1"></div>
          
          {/* Main Needle */}
          <div className="relative w-2 h-48 flex flex-col items-center">
             <div className={`w-full h-1/2 rounded-t-full ${themeColor}`}></div>
             <div className="w-full h-1/2 rounded-b-full bg-slate-200"></div>
             
             {/* Kaaba Icon at the tip */}
             <div className="absolute -top-8 bg-white p-2 rounded-full shadow-lg border border-slate-100 float-animation">
                <span className="text-xl">🕋</span>
             </div>
          </div>
          
          {/* Center Pivot */}
          <div className="absolute w-4 h-4 rounded-full bg-white border-4 border-slate-800 z-10"></div>
        </div>
      </div>

      <div className="bg-white px-8 py-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${themeColor.replace('bg-', 'bg-opacity-10 ')} ${themeColor.replace('bg-', 'text-')}`}>
          <Navigation size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">زاوية الانحراف</span>
          <span className="text-2xl font-black text-slate-800">{qiblaAngle}°</span>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 px-10 text-center leading-relaxed">
        * ملاحظة: هذا الحساب يعتمد على الموقع الجغرافي للمدينة، تأكد من توجيه أعلى الهاتف نحو الشمال للحصول على دقة أفضل.
      </p>
    </div>
  );
};

export default QiblaFinder;