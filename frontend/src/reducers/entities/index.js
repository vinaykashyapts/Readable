import { combineReducers } from 'redux'
import postReducer from './postReducer.js'
import categoriesReducer from './categoriesReducer.js'
import commentsReducer from './commentsReducer.js'


export default combineReducers({
  posts: postReducer,
  categories: categoriesReducer,
  comments: commentsReducer
})
