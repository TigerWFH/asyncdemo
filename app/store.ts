// libs
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

// reducers
function rootReducer(state={}, action){
    switch(action.type){
        case "Test":
        return state;
        default:
        return state;
    }
}

let store = createStore(rootReducer,
    applyMiddleware(thunkMiddleware));
    
store.subscribe(() => {
	console.log('store data--->', store.getState());
})

export default store;

