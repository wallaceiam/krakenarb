import { put, takeEvery, select } from 'redux-saga/effects'

const spread = ({ ethbtc }) => {
    const binance = ethbtc.binance;
    const kraken = ethbtc.kraken;
    const bc = binance.length > 0 ? binance[0].c : undefined;
    const bk = kraken.length > 0 ? kraken[0].c : undefined;

    const diff = (bc - bk);
    const spread = diff / bc;
    return { diff, spread }
}

const tradeDecisionTree = ({ ethbtc }) => {
    if (ethbtc.position.isTrading) {
        if (Math.abs(ethbtc.spread.spread * 100) < 0.02 &&
            ethbtc.kraken[0].c !== ethbtc.position.open) {
            // close poistion 
            return ({
                history: [{ close: ethbtc.kraken[0].c, open: ethbtc.position.open }],
                position: {
                    isTrading: false,
                    longOrShort: false,
                    open: 0
                }
            })
        }

    } else if (Math.abs(ethbtc.spread.spread * 100) > 0.08) {
        return ({
            history: [],
            position: {
                isTrading: true,
                longOrShort: ethbtc.spread.spread > 0,
                open: ethbtc.kraken[0].c
            }
        })
    }

    return ({
        history: [],
        position: ethbtc.position
    })
}

function* trader(action) {
    const state = yield select(state => state.symbols);
    if (action.type === 'DATA_UPDATE') {

        const sp = spread(state);

        yield put({ type: "SPREAD_UPDATE", payload: sp });
    } else if (action.type === 'SPREAD_UPDATE') {
        const result = tradeDecisionTree(state);

        yield put({ type: 'TRADER_UPDATE', payload: result });
    }
}


function* traderSage() {
    yield takeEvery('DATA_UPDATE', trader);
    yield takeEvery('SPREAD_UPDATE', trader);
}

export default traderSage;