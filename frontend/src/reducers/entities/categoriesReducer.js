import { createReducer } from '../helper.js'

const initialState = {
  byId: {},
  allIds: []
}

const receiveCategories = (state, action) => {
  const { categories } = action
  return {
    ...state,
    byId: {
      ...state.byId,
      ...categories
    },
    allIds: Object.keys(categories)
  }
}

const categoriesReducer = createReducer(initialState, {
  'RECEIVE_CATEGORIES': receiveCategories,
});

export default categoriesReducer
