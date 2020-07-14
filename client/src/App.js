import React from 'react';
import Ticker from './components/Ticker';
import Spread from "./components/Spread";
import './App.css';
import Trader from './components/Trader';

import { KrakenClient } from "./stores/clients/kraken";

function App() {
  const client = new KrakenClient(process.env.REACT_APP_KRAKEN_API_KEY,
    process.env.REACT_APP_KRAKEN_API_SECRET);

    client.api("Balance", (e, i) => {
      console.log(e);
      console.log(i);
    });
    
  return (
    <>
      <div className="flex">
        <Ticker symbol={"ethbtc"} exchange={"binance"} />
        <Ticker symbol={"ethbtc"} exchange={"kraken"} />
        <Spread />
      </div>
      <div className="flex">
        <Trader />
      </div>
    </>
  );
}

export default App;
