export type PrayerSettingsForm = {
  Country: {
    isoCode: string;
    name: string;
  };
  City: string;
  CalculationMethod: string;
  JuristicMethod: "0" | "1";
  MidnightMode: "0" | "1";
  Tune: {
    Fajr: number;
    Sunrise: number;
    Dhuhr: number;
    Asr: number;
    Maghrib: number;
    Isha: number;
  };
};

export type PrayerDataType={
  yesterdayIsha: string;
  today: AladhanResponse["data"];
  tomorrowsFajr: string;
}





//API Response Type

export interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: Timings;
    date: {
      readable: string;
      timestamp: string;
      hijri: HijriData;
      gregorian: GregorianData;
    };
    meta: Meta;
  };
}

export interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface Designation {
  abbreviated: string;
  expanded: string;
}

export interface Weekday {
  en: string;
  ar?: string;
}

export interface Month {
  number: number;
  en: string;
  ar?: string;
  days?: number;
}

export interface HijriData {
  date: string;
  format: string;
  day: string;
  weekday: Weekday;
  month: Month;
  year: string;
  designation: Designation;
  holidays: string[];
  adjustedHolidays: string[];
  method: string;
}

export interface GregorianData {
  date: string;
  format: string;
  day: string;
  weekday: Pick<Weekday, "en">;
  month: Pick<Month, "number" | "en">;
  year: string;
  designation: Designation;
  lunarSighting: boolean;
}

export interface Meta {
  latitude: number;
  longitude: number;
  timezone: string;
  method: {
    id: number;
    name: string;
    params: { Fajr: number; Isha: number };
    location: { latitude: number; longitude: number };
  };
  latitudeAdjustmentMethod: string;
  midnightMode: string;
  school: string;
  offset: Record<keyof Timings, number>; // Maps all timing keys to numbers
}
