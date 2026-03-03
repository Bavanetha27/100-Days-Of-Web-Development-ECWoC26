import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface DayData {
  date: string;
  humidity: number;
  wind: number;
}

interface WindHumidityChartProps {
  days: DayData[];
}

export function WindHumidityChart({ days }: WindHumidityChartProps) {
  const labels = days.map((d) =>
    new Date(d.date).toLocaleDateString("en-US", { weekday: "short" })
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Humidity (%)",
        data: days.map((d) => d.humidity),
        backgroundColor: "hsla(210, 80%, 60%, 0.6)",
        borderRadius: 6,
      },
      {
        label: "Wind (m/s)",
        data: days.map((d) => Math.round(d.wind * 10) / 10),
        backgroundColor: "hsla(160, 60%, 45%, 0.6)",
        borderRadius: 6,
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
    },
    scales: {
      x: {
        ticks: { color: "hsl(215, 15%, 55%)" },
        grid: { color: "hsla(215, 18%, 22%, 0.5)" },
      },
      y: {
        ticks: { color: "hsl(215, 15%, 55%)" },
        grid: { color: "hsla(215, 18%, 22%, 0.5)" },
      },
    },
  };

  return (
    <div className="weather-card">
      <h3 className="text-lg font-semibold mb-4">Wind & Humidity</h3>
      <div className="h-64">
        <Bar data={data} options={options as any} />
      </div>
    </div>
  );
}
