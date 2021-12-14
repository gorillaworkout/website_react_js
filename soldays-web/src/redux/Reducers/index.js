import {combineReducers} from 'redux'
import AuthReducers from './AuthReducers'
import ProductReducers from './ProductReducers'
// import ParcelReducers from './ParcelReducers'

export default combineReducers({
    Auth    : AuthReducers,
    Product : ProductReducers
    // Parcel  : ParcelReducers
});