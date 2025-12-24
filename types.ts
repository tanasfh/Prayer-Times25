
export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface HijriDate {
  date: string;
  day: string;
  weekday: { ar: string; en: string };
  month: { number: number; ar: string; en: string };
  year: string;
}

export interface PrayerData {
  timings: PrayerTimes;
  hijri: HijriDate;
}

export interface City {
  name: string;
  arabicName: string;
  lat: number;
  lng: number;
}

export interface Theme {
  id: string;
  name: string;
  primary: string; // emerald, indigo, slate, etc.
  bgHeader: string;
  accent: string;
}

export interface AppSettings {
  selectedCity: City;
  alertDelayMinutes: number;
  alertDurationMinutes: number;
  themeId: string;
}

export type PrayerName = keyof PrayerTimes;

export interface PrayerState {
  lastPrayerTime: Date | null;
  nextPrayerName: PrayerName | null;
  nextPrayerTime: Date | null;
  isPrayerMode: boolean;
}
