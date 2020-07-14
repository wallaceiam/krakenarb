import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reduxWebsocket, { connect } from '@giantmachines/redux-websocket';

import reducer from './reducers'
import sagas from './sagas';

const loggerMiddleware = createLogger()

const reduxWebsocketMiddlewareBinance = reduxWebsocket({ prefix: "REDUX_WEBSOCKET_BINANCE",})
const reduxWebsocketMiddlewareKraken = reduxWebsocket({ prefix: "REDUX_WEBSOCKET_KRAKEN",})

const rootReducer = combineReducers({
    symbols: reducer
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        // loggerMiddleware, // neat middleware that logs actions
        reduxWebsocketMiddlewareBinance,
        reduxWebsocketMiddlewareKraken,
        sagaMiddleware,
    )
)

sagaMiddleware.run(sagas)

store.dispatch(connect('wss://stream.binance.com:9443/ws/ethbtc@miniTicker', 'REDUX_WEBSOCKET_BINANCE'));
store.dispatch(connect('wss://ws.kraken.com', 'REDUX_WEBSOCKET_KRAKEN'));