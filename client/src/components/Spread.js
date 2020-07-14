import React from 'react';
import { useSelector } from 'react-redux';

const Spread = () => {

    const spread = useSelector(state => state.symbols.ethbtc.spread);

    if(spread === undefined) return <div></div>

    return (
        <div>
            <h1>Spread</h1>
            <div>{spread.diff.toFixed(8)}</div>
            <div>{(spread.spread * 100).toFixed(4)}%</div>
        </div>
    )
}

export default Spread