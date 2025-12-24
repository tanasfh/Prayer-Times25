
import { City, AppSettings, Theme } from './types';

export const SAUDI_CITIES: City[] = [
  { name: 'Buraidah', arabicName: 'بريدة', lat: 26.3273, lng: 43.9750 },
  { name: 'Riyadh', arabicName: 'الرياض', lat: 24.7136, lng: 46.6753 },
  { name: 'Jeddah', arabicName: 'جدة', lat: 21.5433, lng: 39.1728 },
  { name: 'Makkah', arabicName: 'مكة المكرمة', lat: 21.3891, lng: 39.8579 },
  { name: 'Madinah', arabicName: 'المدينة المنورة', lat: 24.4672, lng: 39.6068 },
  { name: 'Dammam', arabicName: 'الدمام', lat: 26.4207, lng: 50.0888 },
  { name: 'Abha', arabicName: 'أبها', lat: 18.2164, lng: 42.5053 },
  { name: 'Tabuk', arabicName: 'تبوك', lat: 28.3835, lng: 36.5662 },
];

export const PREDEFINED_THEMES: Theme[] = [
  { id: 'emerald', name: 'زمردي', primary: 'emerald', bgHeader: 'bg-emerald-700', accent: 'text-emerald-600' },
  { id: 'indigo', name: 'نيلي', primary: 'indigo', bgHeader: 'bg-indigo-700', accent: 'text-indigo-600' },
  { id: 'slate', name: 'رصاصي', primary: 'slate', bgHeader: 'bg-slate-700', accent: 'text-slate-600' },
  { id: 'rose', name: 'وردي', primary: 'rose', bgHeader: 'bg-rose-700', accent: 'text-rose-600' },
];

export const DEFAULT_SETTINGS: AppSettings = {
  selectedCity: SAUDI_CITIES[0], // Buraidah
  alertDelayMinutes: 10,
  alertDurationMinutes: 15,
  themeId: 'emerald',
};

export const PRAYER_NAMES_AR: Record<string, string> = {
  Fajr: 'الفجر',
  Sunrise: 'الشروق',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
};

export const ALADHAN_METHOD = 4; // Umm Al-Qura University, Makkah
