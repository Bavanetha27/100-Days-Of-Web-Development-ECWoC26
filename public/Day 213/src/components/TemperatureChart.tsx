import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ForecastItem } from "@/lib/weather-api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface TemperatureChartProps {
  forecast: ForecastItem[];
}

export function TemperatureChart({ forecast }: TemperatureChartProps) {
  // Take next 24 data points (3-hour intervals = 3 days)
  const items = forecast.slice(0, 24);

  const labels = items.map((item) =>
    new Date(item.dt * 1000).toLocaleString("en-US", {
      weekday: "short",
      hour: "numeric",
    })
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: items.map((i) => Math.round(i.main.temp * 10) / 10),
        borderColor: "hsl(199, 89%, 48%)",
        backgroundColor: "hsla(199, 89%, 48%, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: "hsl(199, 89%, 48%)",
      },
      {
        label: "Feels Like (°C)",
        data: items.map((i) => Math.round(i.main.feels_like * 10) / 10),
        borderColor: "hsl(38, 92%, 60%)",
        backgroundColor: "hsla(38, 92%, 60%, 0.05)",
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        borderDash: [5, 5],
        pointBackgroundColor: "hsl(38, 92%, 60%)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "hsl(215, 15%, 55%)", font: { family: "Space Grotesk" } },
      },
      tooltip: {
        backgroundColor: "hsl(215, 25%, 14%)",
        titleColor: "hsl(210, 20%, 92%)",
        bodyColor: "hsl(210, 20%, 92%)",
        borderColor: "hsl(215, 18%, 22%)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "hsl(215, 15%, 55%)", font: { size: 10 }, maxRotation: 45 },
        grid: { color: "hsla(215, 18%, 22%, 0.5)" },
      },
      y: {
        ticks: { color: "hsl(215, 15%, 55%)", callback: (v: unknown) => `${v}°` },
        grid: { color: "hsla(215, 18%, 22%, 0.5)" },
      },
    },
  };

  return (
    <div className="weather-card">
      <h3 className="text-lg font-semibold mb-4">Temperature Trend</h3>
      <div className="h-64">
        <Line data={data} options={options as any} />
      </div>
    </div>
  );
}
