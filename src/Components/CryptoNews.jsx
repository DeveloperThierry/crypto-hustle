import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_MESSARI_API_KEY;

// Mock data structured exactly like Messari's expected schema
const MOCK_NEWS = [
  {
    title: "BTC Holds Support Level Amid Increased Institutional Inflows",
    url: "https://messari.io/"
  },
  {
    title: "Ethereum Layer-2 Gas Fees Drop to Record Lows Post-Upgrade",
    url: "https://messari.io/"
  },
  {
    title: "DeFi Protocol Total Value Locked (TVL) Crosses New Milestone",
    url: "https://messari.io/"
  },
  {
    title: "Regulatory Clarity Sparks Venture Capital Surge in Web3 Infrastructure",
    url: "https://messari.io/"
  },
  {
    title: "Solana Network Activity Spikes as Decentralized Exchanges Volume Climbs",
    url: "https://messari.io/"
  }
];

function CryptoNews() {
  const [newsList, setNewsList] = useState(null);

  useEffect(() => {
    const getNewsArticles = async () => {
      try {
        const response = await fetch(
          "https://api.messari.io/api/v1/news/topics?limit=10",
          { headers: { "x-messari-api-key": API_KEY } }
        );
        
        if (!response.ok) {
          throw new Error("Network response was not ok. Falling back to mock data.");
        }

        const json = await response.json();
        
        if (json.data && json.data.length > 0) {
          setNewsList(json.data);
        } else {
          // Fallback if the API returns an empty array successfully
          setNewsList(MOCK_NEWS);
        }
      } catch (error) {
        console.warn("Messari API error, loading terminal backup stream:", error);
        // Fallback to our hardcoded data stream on network/API failure
        setNewsList(MOCK_NEWS);
      }
    };

    getNewsArticles();
  }, []);

  return (
    <div>
      <h3>Crypto News</h3>
      <ul className="side-list">
        {newsList &&
          newsList.map((article, index) => (
            /* Using a combination of title and index for the key to ensure uniqueness */
            <li className="news-article" key={`${article.title}-${index}`}>
              <a href={article.url} target="_blank" rel="noreferrer">
                {article.title}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CryptoNews;