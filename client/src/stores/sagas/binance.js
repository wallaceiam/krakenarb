import { put, takeEvery } from 'redux-saga/effects'

function* message(action) {
    const data = JSON.parse(action.payload.event.data);
    yield put({
        type: "DATA_UPDATE", payload: {
            exchange: 'binance',
            ts: data.E,
            o: data.o,
            h: data.h,
            l: data.l,
            c: data.c,
        }
    });
}

function* binanceSaga() {
    yield takeEvery("REDUX_WEBSOCKET_BINANCE::MESSAGE", message);
}

export default binanceSaga;