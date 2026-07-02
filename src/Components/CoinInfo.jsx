const CoinInfo = ({ image, name, symbol, price }) => {
  return (
    <li className="main-list">
      <img
        className="icons"
        src={image}
        alt={`Small icon for ${name} crypto coin`}
      />
      {name} <span className="tab"> </span>
      <span className="coin-price">
        {price && price.USD
          ? ` $${price.USD} USD`
          : ` $${price?.toLocaleString()} USD`}
      </span>
     
    </li>
  );
};

export default CoinInfo;
