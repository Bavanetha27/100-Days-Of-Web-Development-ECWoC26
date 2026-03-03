import { getWeatherIconUrl } from "@/lib/weather-api";
import { Droplets } from "lucide-react";

interface DayForecast {
  date: string;
  tempMin: number;
  tempMax: number;
  weather: { main: string; description: string; icon: string };
  humidity: number;
  pop: number;
}

interface ForecastCardsProps {
  days: DayForecast[];
}

export function ForecastCards({ days }: ForecastCardsProps) {
  const formatDay = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return "Today";
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  return (
    <div className="weather-card">
      <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {days.map((day) => (
          <div
            key={day.date}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/30 transition-colors"
          >
            <span className="text-sm text-muted-foreground w-28">{formatDay(day.date)}</span>
            <div className="flex items-center gap-2">
              <img src={getWeatherIconUrl(day.weather.icon)} alt={day.weather.description} className="w-8 h-8" />
              <span className="text-xs text-muted-foreground capitalize w-20 hidden sm:block">{day.weather.description}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-weather-rain">
              <Droplets className="w-3 h-3" />
              <span>{Math.round(day.pop * 100)}%</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted-foreground">{Math.round(day.tempMin)}°</span>
              <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: `${((day.tempMax - day.tempMin) / 20) * 100}%` }}
                />
              </div>
              <span className="font-semibold">{Math.round(day.tempMax)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
