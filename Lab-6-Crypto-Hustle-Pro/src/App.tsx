/* eslint-disable */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import CoinInfo from './components/CoinInfo';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState<any>(null);
  const [filteredResults, setFilteredResults] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key=" + API_KEY
      );
      const json = await response.json();
      setList(json);
    };

    fetchAllCoinData().catch(console.error);
  }, []);

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list?.Data ?? {}).filter((key) => 
        Object.values(list.Data[key])
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
    setCurrentPage(1);
  };

  // Get current coins
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = searchInput.length > 0
    ? filteredResults.slice(indexOfFirstCoin, indexOfLastCoin)
    : list ? Object.keys(list.Data).slice(indexOfFirstCoin, indexOfLastCoin) : [];

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <ul>
        {currentCoins.map((coin) => 
          list?.Data[coin]?.PlatformType === "blockchain" ? (
            <Link to={`/coinDetails/${list.Data[coin].Symbol}`} key={list.Data[coin].Symbol}>
              <CoinInfo
                image={list?.Data[coin]?.ImageUrl}
                name={list?.Data[coin]?.FullName}
                symbol={list.Data[coin].Symbol}
              />
            </Link>
          ) : null
        )}
      </ul>
      <Pagination
        coinsPerPage={coinsPerPage}
        totalCoins={searchInput.length > 0 ? filteredResults.length : list ? Object.keys(list.Data).length : 0}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

interface PaginationProps {
  coinsPerPage: number;
  totalCoins: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ coinsPerPage, totalCoins, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNumbers = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(pageNumbers.length, startPage + maxPageNumbers - 1);

  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  return (
    <nav>
      <ul className='pagination'>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={() => paginate(currentPage - 1)} href='!#' className='page-link'>
            &laquo;
          </a>
        </li>
        {startPage > 1 && (
          <>
            <li className='page-item'>
              <a onClick={() => paginate(1)} href='!#' className='page-link'>1</a>
            </li>
            {startPage > 2 && <li className='page-item disabled'><span className='page-link'>...</span></li>}
          </>
        )}
        {pageNumbers.slice(startPage - 1, endPage).map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
        {endPage < pageNumbers.length && (
          <>
            {endPage < pageNumbers.length - 1 && <li className='page-item disabled'><span className='page-link'>...</span></li>}
            <li className='page-item'>
              <a onClick={() => paginate(pageNumbers.length)} href='!#' className='page-link'>{pageNumbers.length}</a>
            </li>
          </>
        )}
        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <a onClick={() => paginate(currentPage + 1)} href='!#' className='page-link'>
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default App;
