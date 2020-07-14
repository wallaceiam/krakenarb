import { all } from "redux-saga/effects";

import krakenSaga from "./kraken";
import traderSaga from "./trader";
import binanceSaga from "./binance";

export default function* rootSaga() {
    yield all([
      krakenSaga(),
      binanceSaga(),
      traderSaga()
    ])
    // code after all-effect
  }