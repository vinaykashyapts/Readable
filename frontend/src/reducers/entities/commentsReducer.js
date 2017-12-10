import { createReducer } from '../helper.js'

const initialState = {
  byId: {},
  allIds: []
}

const receiveComment = (state, action) => {
  const { comments } = action
  return {
    ...state,
    byId:{
      ...state.byId,
      ...comments
    },
    allIds: state.allIds.concat(Object.keys(comments))
  }
}

const commentVote = (state, action) => {
  const { option, id } = action
  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        voteScore: option === 'upVote' ? state.byId[id].voteScore + 1 : state.byId[id].voteScore - 1
      }
    }
  }
}

const deleteComment = (state, action) => {
  const { id } = action
  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        deleted: true
      }
    }
  }
}

const addComment = (state, action) => {
  const { id } = action.comment
  return {
    ...state,
    byId:{
      ...state.byId,
      [id]: action.comment
    },
    allIds: state.allIds.concat(id)
  }
}

const editComment = (state, action) => {
  const { id, body, timestamp } = action.commentChanges
  return {
    ...state,
    byId:{
      ...state.byId,
      [id]:{
        ...state.byId[id],
        body,
        timestamp
      }
    }
  }
}

const commentsReducer = createReducer(initialState, {
  'RECEIVE_COMMENT': receiveComment,
  'COMMENT_VOTE': commentVote,
  'DELETE_COMMENT': deleteComment,
  'NEW_COMMENT': addComment,
  'NEW_COMMENT_SUCCESS': addComment,
  'EDIT_COMMENT': editComment
});

export default commentsReducer
