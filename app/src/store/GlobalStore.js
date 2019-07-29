import {combineReducers} from 'redux';
import CarsReducers from './carsDate';
import {createStore} from 'redux';

const allReducers = combineReducers({
    cars: CarsReducers 
});

const GlobalStore = createStore(allReducers);

export default GlobalStore;