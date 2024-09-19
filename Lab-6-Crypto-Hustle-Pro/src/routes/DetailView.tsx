import { useParams } from 'react-router-dom';
import CoinDetail from '../components/CoinDetail';

const DetailView = () => {
  const { symbol } = useParams<{ symbol: string }>();

  return (
    <div>
      <h1>Coin Details</h1>
      {symbol && <CoinDetail symbol={symbol} />}
    </div>
  );
};

export default DetailView;