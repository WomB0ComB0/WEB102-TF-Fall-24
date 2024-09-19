import React, { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

interface CoinDetailProps {
  symbol: string;
}

const CoinDetail: React.FC<CoinDetailProps> = ({ symbol }) => {
  const [fullDetails, setFullDetails] = useState<any>(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      const [detailsResponse, descriptionResponse] = await Promise.all([
        fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`),
        fetch(`https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`)
      ]);

      const [detailsJson, descriptionJson] = await Promise.all([
        detailsResponse.json(),
        descriptionResponse.json()
      ]);

      setFullDetails({
        numbers: detailsJson.DISPLAY,
        textData: descriptionJson.Data
      });
    };

    fetchCoinDetails().catch(console.error);
  }, [symbol]);

  if (!fullDetails) return <div>Loading...</div>;

  const coinData = fullDetails.numbers[symbol].USD;
  const coinInfo = fullDetails.textData[symbol];

  return (
    <div>
      <h2>{coinInfo.FullName}</h2>
      <img
        src={`https://www.cryptocompare.com${coinData.IMAGEURL}`}
        alt={`${symbol} icon`}
      />
      <p>{coinInfo.Description}</p>
      <table>
        <tbody>
          <tr><th>Price</th><td>{coinData.PRICE}</td></tr>
          <tr><th>Market Cap</th><td>{coinData.MKTCAP}</td></tr>
          <tr><th>24h Change</th><td>{coinData.CHANGE24HOUR}</td></tr>
          <tr><th>Algorithm</th><td>{coinInfo.Algorithm}</td></tr>
          <tr><th>Proof Type</th><td>{coinInfo.ProofType}</td></tr>
          <tr><th>Start Date</th><td>{coinInfo.AssetLaunchDate}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default CoinDetail;