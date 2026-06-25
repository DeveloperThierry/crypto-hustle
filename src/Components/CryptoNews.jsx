import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_CRYPTO_COMPARE_API_KEY;


const MOCK_NEWS = [
  {
    TITLE: "BTC Holds Support Level Amid Increased Institutional Inflows",
    URL: "https://messari.io/"
  },
  {
    TITLE: "Ethereum Layer-2 Gas Fees Drop to Record Lows Post-Upgrade",
    URL: "https://messari.io/"
  },
  {
    TITLE: "DeFi Protocol Total Value Locked (TVL) Crosses New Milestone",
    URL: "https://messari.io/"
  },
  {
    TITLE: "Regulatory Clarity Sparks Venture Capital Surge in Web3 Infrastructure",
    URL: "https://messari.io/"
  },
  {
    TITLE: "Solana Network Activity Spikes as Decentralized Exchanges Volume Climbs",
    URL: "https://messari.io/"
  }
];

function CryptoNews() {
  const [newsList, setNewsList] = useState(null);

  useEffect(() => {
    const getNewsArticles = async () => {
      try {
        const response = await fetch(
          `https://data-api.coindesk.com/news/v1/search?search_string=Ethereum%20ecosystem&lang=EN&source_key=coindesk&limit=3&api_key=${API_KEY}`);
        
        if (!response.ok) {
          throw new Error("Network response was not ok. Falling back to mock data.");
        }

        const json = await response.json();
        console.log(json)
        if (json.Data && json.Data.length > 0) {
          setNewsList(json.Data);
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
            /* Using a combination of TITLE and index for the key to ensure uniqueness */
            <li className="news-article" key={`${article.TITLE}-${index}`}>
              <a href={article.URL} target="_blank" rel="noreferrer">
                {article.TITLE}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CryptoNews;