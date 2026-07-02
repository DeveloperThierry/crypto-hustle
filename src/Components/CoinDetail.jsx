import React, { useState, useEffect } from "react";
import CoinChart from "./CoinChart";

const API_KEY = import.meta.env.VITE_APP_COIN_GECKO_API_KEY;

const CoinDetail = ({ id }) => {
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      // Fetch data for the specific coin ID passed via props
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
        { headers: { "x-cg-demo-api-key": API_KEY } }
      );
      const json = await response.json();
      setCoinData(json);
    };

    if (id) {
      fetchCoinDetails().catch(console.error);
    }
  }, [id]); // Refetch if the user clicks a different coin

  if (!coinData)
    return <div className="loading-text">Loading Terminal Data...</div>;

  return (
    <div className="coin-detail-card">
      <div className="detail-header">
        <img src={coinData.image?.small} alt={coinData.name} />
        <h2>
          {coinData.name} ({coinData.symbol?.toUpperCase()})
        </h2>
      </div>
      <hr />
      <div className="detail-body">
        <h3>Description:</h3>
        {/* dangerouslySetInnerHTML allows parsing the HTML links CoinGecko returns in descriptions */}
        <p
          dangerouslySetInnerHTML={{
            __html: coinData.description?.en || "No description available.",
          }}
        ></p>
      </div>

      <div className="detail-chart-section">
        <CoinChart
          symbol={coinData?.symbol}
          market={coinData?.fullDetails?.numbers[coinData?.symbol]?.USD?.MARKET}
          id={id}
        />
      </div>
    </div>
  );
};

export default CoinDetail;
