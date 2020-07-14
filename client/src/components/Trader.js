import React from 'react';
import { useSelector } from 'react-redux';

const Trader = () => {

    const ehtbtc = useSelector(state => state.symbols.ethbtc);

    if(ehtbtc === undefined || ehtbtc.position === undefined) return <div></div>

    const { position, history } = ehtbtc;

    return (
        <div>
            <h1>Trader</h1>
            <div>{position.isTrading ? 'True' : 'False'}</div>
            <div>{position.longOrShort ? 'Long' : 'Short'}</div>
            <div>{position.open}</div>
            {history && history.map((h, i) => (<div key={i}>Open: {h.open} - Close: {h.close} ({(((h.open - h.close)/h.open)*100).toFixed(2)}%)</div>))}
        </div>
    )
}

export default Trader