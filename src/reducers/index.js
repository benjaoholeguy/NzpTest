import { combineReducers } from 'redux';
import GraphReducer from './GraphReducer'

export default combineReducers({
  graph: GraphReducer
})
