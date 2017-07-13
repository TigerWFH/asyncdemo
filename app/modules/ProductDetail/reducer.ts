// actions
import * as Actions from './actions';

let PDInitialState = {};

export default (state = PDInitialState, action) => {
    switch (action.type) {
        case Actions.PRODUCT_DETAI:
            return action.data;

        default:
            return state;
    }
}