import { combineReducers } from 'redux'
import sortBy from './sortReducer'
import modal from './modalReducer'

export default combineReducers({
  sortBy,
  modal
})
