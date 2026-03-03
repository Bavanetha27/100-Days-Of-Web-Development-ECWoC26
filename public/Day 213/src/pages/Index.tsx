import { useState } from "react";
import { WeatherSearch } from "@/components/WeatherSearch";
import { CurrentWeather } from "@/components/CurrentWeather";
import { ForecastCards } from "@/components/ForecastCards";
import { TemperatureChart } from "@/components/TemperatureChart";
import { WindHumidityChart } from "@/components/WindHumidityChart";
import {
  fetchCurrentWeather,
  fetchForecast,
  getDailyForecast,
  CurrentWeatherData,
  ForecastData,
} from "@/lib/weather-api";
import { CloudSun, Loader2, CloudOff } from "lucide-react";

const Index = () => {
  const [current, setCurrent] = useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setCurrent(weatherData);
      setForecast(forecastData);
    } catch (err: any) {
      const msg =
        err?.response?.status === 404
          ? "City not found. Please check the spelling."
          : err?.response?.status === 401
          ? "Invalid API key. Please update your OpenWeatherMap API key."
          : "Failed to fetch weather data. Please try again.";
      setError(msg);
      setCurrent(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const dailyForecast = forecast ? getDailyForecast(forecast) : [];

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <CloudSun className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Weather<span className="text-primary">Cast</span>
            </h1>
          </div>
          <p className="text-muted-foreground">Real-time weather forecasts at your fingertips</p>
        </div>

        {/* Search */}
        <WeatherSearch onSearch={handleSearch} isLoading={loading} />

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="weather-card border-destructive/50 text-center py-8">
            <CloudOff className="w-12 h-12 text-destructive mx-auto mb-3" />
            <p className="text-destructive font-medium">{error}</p>
          </div>
        )}

        {/* Results */}
        {!loading && current && forecast && (
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <CurrentWeather data={current} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ForecastCards days={dailyForecast} />
              <TemperatureChart forecast={forecast.list} />
            </div>

            <WindHumidityChart days={dailyForecast} />
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && !current && (
          <div className="text-center py-20 text-muted-foreground">
            <CloudSun className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">Search for a city to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
