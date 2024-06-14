import type { City, Format, LocalTime, Timezones } from '@/types/types';

export const useGetLocalTime = () => {
  const localTime = ref<LocalTime>({
    full: '',
    hours: '',
    minutes: '',
    seconds: '',
  });

  const AVAILABLE_TIMEZONES: Timezones = {
    "duisburg": 'Europe/Berlin',
    "sydney": 'Australia/Sydney',
    "new-york": 'America/New_York',
  }

  /**
   * Get the local time for a given city
   *
   * @param city (bocholt, sydney, new-york)
   * @param format (12, 24)
   */
  const makeTime =  (city: City, format: Format) => {
    if (!city || !format) return;

    const time = new Date().toLocaleTimeString('de-DE', {
      hour: format === 12 ? '2-digit' : 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: format === 12,
      timeZone: AVAILABLE_TIMEZONES[city]
    });

    localTime.value.full = time;
    localTime.value.hours = time.split(':')[0];
    localTime.value.minutes = time.split(':')[1];
    localTime.value.seconds = time.split(':')[2];

    if (format === 12 && localTime.value.hours.startsWith('0')) {
      localTime.value.hours = localTime.value.hours.slice(1);
    }
  }

  return {
    localTime,
    makeTime
  }
}