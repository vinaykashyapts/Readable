import { createReducer } from '../helper.js'

const initialState = {
  byId: {},
  allIds: []
}

const receivePosts = (state, action) => {
  const { posts } = action
  return {
    ...state,
    byId: {
      ...state.byId,
      ...posts
    },
    allIds: state.allIds.concat(Object.keys(posts))
  }
}

const receivePost = (state, action) => {
  const { post } = action
  return {
    ...state,
    byId: {
      ...state.byId,
      [post.id]: {
        ...state.byId[post.id],
      }
    },
    allIds: state.allIds.concat(post.id)
  }
}

const receiveComment = (state, action) => {
  const { comments, parentId } = action
  return {
    ...state,
    byId: {
     ...state.byId,
     [parentId]: {
       ...state.byId[parentId],
       'comments': Object.keys(comments)
     }
    }
  }
}

const updateVote = (state, action) => {
  const { id, option } = action
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

const deletePost = (state, action) => {
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

const deleteComment = (state, action) => {
  const { id, parentId } = action
  return {
    ...state,
    byId: {
      ...state.byId,
      [parentId]: {
        ...state.byId[parentId],
        comments: state.byId[parentId].comments.filter(comId => comId !== id)
      }
    }
  }
}

const addPost = (state, action) => {
  const { id } = action.post
  return {
    ...state,
    byId:{
      ...state.byId,
      [id]: action.post
    },
    allIds: state.allIds.concat(id)
  }
}

const addComment = (state, action) => {
  const { parentId } = action.comment
  return {
    ...state,
    byId:{
      ...state.byId,
      [parentId]: {
        ...state.byId[parentId],
        'comments': state.byId[parentId].comments ? state.byId[parentId].comments.concat(action.comment.id) : [action.comment.id]
      }
    }
  }
}

const editPost = (state, action) => {
  const { id, title, body } = action.postChanges
  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        title,
        body
      }
    }
  }
}

const postReducer = createReducer(initialState, {
  'RECEIVE_POSTS': receivePosts,
  'RECEIVE_COMMENT': receiveComment,
  'POST_VOTE': updateVote,
  'RECEIVE_POST': receivePost,
  'DELETE_POST': deletePost,
  'DELETE_COMMENT': deleteComment,
  'NEW_POST': addPost,
  'NEW_POST_SUCCESS': addPost,
  'EDIT_POST': editPost,
  'NEW_COMMENT': addComment
});

export default postReducer
