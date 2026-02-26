import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

function ChartModal({ coin, close }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChart();
  }, []);

  const fetchChart = async () => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart`,
      { params: { vs_currency: "usd", days: 7 } }
    );
    setChartData(res.data.prices);
  };

  const data = {
    labels: chartData.map((p) =>
      new Date(p[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: coin.name,
        data: chartData.map((p) => p[1]),
        borderColor: "cyan",
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
  <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl w-11/12 md:w-2/3 shadow-2xl">

    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
      {coin.name} - 7 Day Trend
    </h2>

    <Line data={data} />

    <button
      onClick={close}
      className="mt-6 px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-80 transition"
    >
      Close
    </button>
  </div>
</div>
  );
}

export default ChartModal;