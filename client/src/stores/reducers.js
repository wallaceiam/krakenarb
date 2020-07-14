const initialState = {
    ethbtc: {
        binance: [],
        kraken: [],
        spread: {
            diff: 0,
            spread: 0
        },
        position: {
            isTrading: false,
            open: 0,
            longOrShort: false,
        },
        history: [],
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DATA_UPDATE': {
            const { exchange, ...rest } = action.payload;
            let array = state.ethbtc[exchange];
            array.push(rest);
            array = array.reverse().slice(0, 2);
            let data = {};
            data[exchange] = array;
            const newState = { ...state, ethbtc: { ...state.ethbtc, ...data } };
            return newState;
        }
        case 'SPREAD_UPDATE': {
            const { diff, spread } = action.payload;
            const newState = { ...state, ethbtc: { ...state.ethbtc, spread: { diff, spread } } };
            return newState;
        }
        case 'TRADER_UPDATE': {
            const newState = { ...state, ethbtc: { ...state.ethbtc, position: action.payload.position, history: [...state.ethbtc.history, ...action.payload.history] } };
            return newState;
        }
        default:
            return state
    }
}

export default reducer