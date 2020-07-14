import React from 'react';
import { useSelector } from 'react-redux';

const Ticker = ({ symbol, exchange }) => {

    const state = useSelector(state => state.symbols.ethbtc[exchange]);
    const close = state.length > 0 ? state[0].c : undefined;
    const lastClose = state.length > 1 ? state[1].c : close;
    const className = (close || 0) > (lastClose || 0) ? 'Quote-Diff-Green' : 'Quote-Diff-Red';
    return (
        <div>
            <h1>{symbol}</h1>
            <div className={className}>{close}</div>
            <div>{lastClose}</div>
        </div>
    )
}

export default Ticker