import { combineReducers } from 'redux'
import entities from './entities'
import uiState from './uistate'

export default combineReducers({
  entities,
  uiState
})
