
import { PrayerTimes, City, PrayerData, HijriDate } from '../types';
import { ALADHAN_METHOD } from '../constants';

export async function fetchPrayerTimes(city: City): Promise<PrayerData> {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const url = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${city.lat}&longitude=${city.lng}&method=${ALADHAN_METHOD}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch prayer times');
    const data = await response.json();
    
    return {
      timings: data.data.timings,
      hijri: {
        date: data.data.date.hijri.date,
        day: data.data.date.hijri.day,
        weekday: data.data.date.hijri.weekday,
        month: data.data.date.hijri.month,
        year: data.data.date.hijri.year,
      }
    };
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    throw error;
  }
}

export function formatTo12Hour(time24: string): string {
  const [hourStr, minuteStr] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'م' : 'ص';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  return `${hour}:${minuteStr} ${ampm}`;
}

export function parsePrayerDate(time24: string): Date {
  const [hour, minute] = time24.split(':').map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
}
