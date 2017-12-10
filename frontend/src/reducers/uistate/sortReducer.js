import { createReducer } from '../helper.js'

const initialState = {
  options: [
    { value: 'timestamp', label: 'Date: Low to High' },
    { value: '-timestamp', label: 'Date: High to Low' },
    { value: 'voteScore', label: 'Score: Low to High'},
    { value: '-voteScore', label: 'Score: High to Low'}
  ],
  selected: 'NO_SORT'
}

const selectSort = (state, action) => {
  return {
    ...state,
    selected: action.value
  }
}


const sortReducer = createReducer(initialState, {
    'SELECT_SORT': selectSort
})

export default sortReducer
