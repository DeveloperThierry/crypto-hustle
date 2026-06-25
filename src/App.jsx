import "./App.css";
import { useState, useEffect } from "react";
import CoinInfo from "./Components/CoinInfo"


function App() {
  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const [list, setList] = useState(null);
  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1",
        {
          headers: {
            "x-cg-demo-api-key": API_KEY,
          },
        }
      );
      const data = await response.json();
      setList(data);
    };
    fetchAllCoinData().catch(console.error);
  }, []);
  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <ul>
        {list?.map((coin) => (
          <CoinInfo
          key={coin.id}
          id={coin.id}
          image={coin.image}
          name={coin.name}
          symbol={coin.symbol}
          price={coin.current_price}
        />
        ))}
      </ul>
    </div>
  );
}

export default App;
