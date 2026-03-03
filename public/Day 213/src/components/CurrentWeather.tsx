import { CurrentWeatherData, getWeatherIconUrl } from "@/lib/weather-api";
import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset } from "lucide-react";

interface CurrentWeatherProps {
  data: CurrentWeatherData;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const formatTime = (ts: number, tz: number) => {
    const date = new Date((ts + tz) * 1000);
    return date.toISOString().slice(11, 16);
  };

  return (
    <div className="weather-card-glow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Main temp */}
        <div className="flex items-center gap-4">
          <img
            src={getWeatherIconUrl(data.weather[0].icon)}
            alt={data.weather[0].description}
            className="w-24 h-24 drop-shadow-lg"
          />
          <div>
            <h2 className="text-5xl font-bold tracking-tight">
              {Math.round(data.main.temp)}°
            </h2>
            <p className="text-lg text-muted-foreground capitalize mt-1">
              {data.weather[0].description}
            </p>
            <p className="text-sm text-muted-foreground">
              Feels like {Math.round(data.main.feels_like)}° · H:{Math.round(data.main.temp_max)}° L:{Math.round(data.main.temp_min)}°
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="text-right">
          <h3 className="text-2xl font-semibold">{data.name}</h3>
          <p className="text-muted-foreground">{data.sys.country}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
        <div className="weather-stat">
          <Wind className="w-5 h-5 text-primary" />
          <span className="text-xs text-muted-foreground">Wind</span>
          <span className="text-sm font-semibold">{data.wind.speed} m/s</span>
        </div>
        <div className="weather-stat">
          <Droplets className="w-5 h-5 text-weather-rain" />
          <span className="text-xs text-muted-foreground">Humidity</span>
          <span className="text-sm font-semibold">{data.main.humidity}%</span>
        </div>
        <div className="weather-stat">
          <Gauge className="w-5 h-5 text-accent" />
          <span className="text-xs text-muted-foreground">Pressure</span>
          <span className="text-sm font-semibold">{data.main.pressure} hPa</span>
        </div>
        <div className="weather-stat">
          <Eye className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Visibility</span>
          <span className="text-sm font-semibold">{(data.visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="weather-stat">
          <Sunrise className="w-5 h-5 text-weather-sun" />
          <span className="text-xs text-muted-foreground">Sunrise</span>
          <span className="text-sm font-semibold">{formatTime(data.sys.sunrise, data.timezone)}</span>
        </div>
        <div className="weather-stat">
          <Sunset className="w-5 h-5 text-accent" />
          <span className="text-xs text-muted-foreground">Sunset</span>
          <span className="text-sm font-semibold">{formatTime(data.sys.sunset, data.timezone)}</span>
        </div>
      </div>
    </div>
  );
}
