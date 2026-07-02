import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const API_KEY = import.meta.env.VITE_APP_COIN_GECKO_API_KEY;

const CoinChart = ({ symbol, market, id }) => {
  const [histData, setHistData] = useState(null);

  useEffect(() => {
    const getCoinHist = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&api_key=` +
          API_KEY
      );

      const json = await response.json();
      console.log(json);
      setHistData(json);
    };
    getCoinHist().catch(console.error);
  }, [market, symbol, id]);

  const getFormattedChartData = () => {
    if (!histData || !histData.prices) return [];

    return histData.prices.map(([timestamp, price]) => {
      return {
        time: new Date(timestamp).toLocaleDateString(),
        price: price,
      };
    });
  };

  const chartData = getFormattedChartData();

  return (
    <div className="chart-wrapper">
      {histData ? (
        <div className="chart-container">
          <h2 className="chart-title">7 Day Price Data for {symbol}</h2>

          <LineChart
            width={350}
            height={160}
            data={chartData}
            margin={{
              top: 10,
              right: 15,
              left: 15,
              bottom: 15,
            }}
          >
            <Line
              type="monotone"
              dataKey="price"
              stroke="var(--terminal-green)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, className: "chart-active-dot" }}
            />

            <CartesianGrid className="chart-grid" strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
              tick={false}
              tickLine={false}
              className="chart-axis"
            />

            <YAxis
              domain={['autoMin', 'autoMax']}
              tickCount={3}
              className="chart-axis chart-y-axis"
              tickFormatter={(value) => `$${Math.round(value)}`}
            />

            <Tooltip
              wrapperClassName="chart-tooltip-wrapper"
              contentClassName="chart-tooltip-content"
              labelClassName="chart-tooltip-label"
              itemClassName="chart-tooltip-item"
              formatter={(value) => [`$${Number(value).toFixed(2)}`, 'PRICE']}
            />
          </LineChart>
        </div>
      ) : null}
    </div>
  );
};

export default CoinChart;