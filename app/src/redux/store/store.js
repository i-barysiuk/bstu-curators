import {combineReducers} from 'redux';
import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const allReducers = combineReducers({
});

const store = createStore(allReducers , applyMiddleware ( thunk ));

export default store;