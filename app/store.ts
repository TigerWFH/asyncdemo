// libs
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

// reducers
import productDetail from './modules/ProductDetail/reducer';

function rootReducer(state = {}, action) {
    switch (action.type) {
        case "Test":
            return state;
        default:
            return state;
    }
}

let store = createStore(combineReducers({
    rootReducer,
    productDetail
}),
    applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    console.log('store data--->', store.getState());
})

export default store;

