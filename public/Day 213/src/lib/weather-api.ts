import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export interface CurrentWeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number; gust?: number };
  clouds: { all: number };
  visibility: number;
  dt: number;
  timezone: number;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number };
  pop: number;
}

export interface ForecastData {
  list: ForecastItem[];
  city: { name: string; country: string; timezone: number };
}

export async function fetchCurrentWeather(city: string): Promise<CurrentWeatherData> {
  const { data } = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, appid: API_KEY, units: "metric" },
  });
  return data;
}

export async function fetchForecast(city: string): Promise<ForecastData> {
  const { data } = await axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, appid: API_KEY, units: "metric" },
  });
  return data;
}

export function getWeatherIconUrl(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function getDailyForecast(forecast: ForecastData) {
  const dailyMap = new Map<string, { temps: number[]; item: ForecastItem }>();
  
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toISOString().split("T")[0];
    if (!dailyMap.has(date)) {
      dailyMap.set(date, { temps: [], item });
    }
    dailyMap.get(date)!.temps.push(item.main.temp);
  });

  return Array.from(dailyMap.entries())
    .slice(0, 7)
    .map(([date, { temps, item }]) => ({
      date,
      tempMin: Math.min(...temps),
      tempMax: Math.max(...temps),
      tempAvg: temps.reduce((a, b) => a + b, 0) / temps.length,
      weather: item.weather[0],
      humidity: item.main.humidity,
      wind: item.wind.speed,
      pop: item.pop,
    }));
}

export function getWindDirection(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}
