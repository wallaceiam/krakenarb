import { put, takeEvery } from 'redux-saga/effects'
import { send } from '@giantmachines/redux-websocket';

function* message(action) {
    const data = JSON.parse(action.payload.event.data);
    if (data.length === 4) {
        if (data[2] === 'ticker' && data[3] === 'ETH/XBT') {
            yield put({
                type: "DATA_UPDATE", payload: {
                    exchange: 'kraken',
                    ts: Date.now(),
                    o: +data[1].o[0],
                    h: +data[1].h[0],
                    l: +data[1].l[0],
                    c: +data[1].c[0],
                }
            });
        }
    } else if (data.connectionID) {
        yield put(send({
            event: "subscribe",
            pair: [
                "ETH/XBT"
            ],
            subscription: {
                name: "ticker",
            }
        }, "REDUX_WEBSOCKET_KRAKEN"))
    }
}

function* krakenSaga() {
    yield takeEvery("REDUX_WEBSOCKET_KRAKEN::MESSAGE", message);
}

export default krakenSaga;