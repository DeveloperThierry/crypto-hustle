import "./App.css";
import { useState, useEffect } from "react";
import CoinInfo from "./Components/CoinInfo";
import SideNav from "./Components/SideNav";
import CoinDetail from "./Components/CoinDetail";
function App() {
  const API_KEY = import.meta.env.VITE_APP_COIN_GECKO_API_KEY;
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
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

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
  };
  return (
    <div className="whole-page">
      <SideNav />
      <div className="main-content">
        {/* {selectedCoin && (
          <div className="detail-view-container">
            <button className="close-btn" onClick={() => setSelectedCoin(null)}>
              ❌ Close Details
            </button>
            <CoinDetail id={selectedCoin} />
          </div>
        )} */}
        <h1>My Crypto List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <ul>
          {searchInput.length > 0
            ? filteredResults.map((coin) => (
                <div
                  onClick={() => setSelectedCoin(coin.id)}
                  className="clickable-row"
                  key={coin.id}
                  >
                  <CoinInfo
                    id={coin.id}
                    image={coin.image}
                    name={coin.name}
                    symbol={coin.symbol}
                    price={coin.current_price}
                  />
                </div>
              ))
            : list?.map((coin) => (
                <div
                  onClick={() => setSelectedCoin(coin.id)}
                  className="clickable-row"
                  key={coin.id}
                  >
                  <CoinInfo
                    id={coin.id}
                    image={coin.image}
                    name={coin.name}
                    symbol={coin.symbol}
                    price={coin.current_price}
                  />
                </div>
              ))}
        </ul>
      </div>
      {selectedCoin && (
        <div className="modal-backdrop" onClick={() => setSelectedCoin(null)}>
          <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedCoin(null)}>❌ CLOSE</button>
            <CoinDetail id={selectedCoin} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
