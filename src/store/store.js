import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {applyMiddleware, combineReducers, createStore} from "redux"

/* Import Reducers */
import {decentralizedexchange, provider, tokens} from "./reducers"

const reducer = combineReducers({
    provider,
    tokens,
    decentralizedexchange
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
