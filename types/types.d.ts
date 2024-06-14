export type City = String<'duisburg' | 'sydney' | 'new-york'>;
export type Format = Number<12 | 24>;

export type LocalTime = {
  full: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export type Timezones = {
  [city in City]: string;
};