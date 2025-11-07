export type TWeatherPayload = {
  _cached?: boolean;
  cachedAt?: string;
  user?: any;
  weather?: {
    latitude?: number;
    longitude?: number;
    generationtime_ms?: number;
    utc_offset_seconds?: number;
    timezone?: string;
    timezone_abbreviation?: string;
    elevation?: number;
    current_units?: Record<string, any>;
    current?: {
      time?: string;
      interval?: number;
      temperature_2m?: number;
      wind_speed_10m?: number;
    };
    hourly_units?: Record<string, any>;
    hourly?: {
      time?: string[];
      temperature_2m?: number[];
      relative_humidity_2m?: number[];
      wind_speed_10m?: number[];
    };
  };
};
