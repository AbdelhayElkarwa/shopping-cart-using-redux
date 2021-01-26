import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { productReducer } from './reducer/productReducer'

const initialState = {}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    products: productReducer
}), initialState,
    composeEnhancers(applyMiddleware(thunk))
)

export default store