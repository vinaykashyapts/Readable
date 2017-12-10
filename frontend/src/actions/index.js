import * as ReadableAPI from '../utils/ReadableAPI.js'

const requestComments = () => {
  return {
    type: 'REQUEST_COMMENT',
    fetching: true
  }
}

const receiveComments = (comments, parentId) => {
  return {
    type: 'RECEIVE_COMMENT',
    fetching: false,
    comments,
    parentId
  }
}

const requestCategories = () => {
  return {
    type: 'REQUEST_CATEGORIES',
    fetching: true
  }
}

const receiveCategories = (categories) => {
  return {
    type: 'RECEIVE_CATEGORIES',
    fetching: false,
    categories
  }
}

const requestPosts = () => {
  return {
    type: 'REQUEST_POSTS',
    fetching: true
  }
}

const receivePosts = (posts) => {
  return {
    type: 'RECEIVE_POSTS',
    fetching: false,
    posts
  }
}

const postVote = (id, option) => {
  return {
    type: 'POST_VOTE',
    id,
    option
  }
}

const commentVote = (id, option) => {
  return {
    type: 'COMMENT_VOTE',
    id,
    option
  }
}

const deletePost = (id) => {
  return {
    type: 'DELETE_POST',
    id
  }
}

const deleteComment = (id, parentId) => {
  return {
    type: 'DELETE_COMMENT',
    id,
    parentId
  }
}

const errorFound = (message) => {
  return {
    type: 'ERROR_FOUND',
    message
  }
}

const newPost = (post) => {
  return {
    type: 'NEW_POST',
    post
  }
}

const newComment = (comment, parentId) => {
  return {
    type: 'NEW_COMMENT',
    comment
  }
}

const commentSuccess = (comment) => {
  return {
    type: 'NEW_COMMENT_SUCCESS',
    comment
  }
}

const postedSuccess = (post) => {
  return {
    type: 'NEW_POST_SUCCESS',
    post,
    open: false
  }
}

export const selectSort = (value) => {
  return {
    type: 'SELECT_SORT',
    value
  }
}

export const modalSwitch = (open) => {
  return{
    type: 'MODAL_SWITCH',
    open
  }
}

//with thunks
export const createPost = post => {
  return dispatch => {
    dispatch(newPost(post))
    return ReadableAPI.post(post)
      .then(resp => dispatch(postedSuccess(resp)))
    }
}

export const createComment = comment => {
  return dispatch => {
    dispatch(newComment(comment))
    return ReadableAPI.comment(comment)
      .then(comment => dispatch(commentSuccess(comment)))
    }
}

export const editPost = postChanges => {
  return dispatch => {
      dispatch({
        type: 'EDIT_POST',
        postChanges
      })
      return ReadableAPI.postEdit(postChanges)
      .then(resp => dispatch({
        type: 'EDIT_POST_SUCCESS',
        resp
      }))
  }
}

export const editComment = commentChanges => {
  return dispatch => {
      dispatch({
        type: 'EDIT_COMMENT',
        commentChanges
      })
      return ReadableAPI.editComment(commentChanges)
      .then(resp => dispatch({
        type: 'EDIT_COMMENT_SUCCESS',
        resp
      }))
  }
}

export const deletePostCall = (id) => dispatch => {
  return ReadableAPI.postDelete(id)
    .then(resp => dispatch(deletePost(id)))
}

export const deleteCommentCall = (id, parentId) => dispatch => {
  return ReadableAPI.deleteComment(id)
    .then(resp => dispatch(deleteComment(id, parentId)))
}

const fetchCategories = () => {
  return dispatch => {
    dispatch(requestCategories())
    return ReadableAPI.getCategories()
      .then(resp => dispatch(receiveCategories(resp)))
  }
}

const fetchPostComment = () => {
  return (dispatch, getState) => {
    dispatch(requestPosts())
    return ReadableAPI.getPosts()
      .then(posts =>
        dispatch(receivePosts(posts))
      )
      .then(action => {
        dispatch(requestComments())
        Object.keys(action.posts).map(parentId =>
          ReadableAPI.postComments(parentId)
            .then(comments =>
              dispatch(receiveComments(comments, parentId))
            )
          )
      })
    }
}


export const fetchPost = (id) => (dispatch, getState) => {
  if(!getState().entities.posts.byId.hasOwnProperty(id)) {
    dispatch(requestPosts())
    return ReadableAPI.postDetail(id)
      .then(function(response) {
          if (response.error) {
            throw Error(response.statusText);
          }
          return response;
        }
      )
      .then(resp => dispatch(receivePosts(resp)))
      .catch(message => dispatch(errorFound(message)))
  }
}

export const fetchComments = (postId) => (dispatch, getState) => {
  if(shouldFetchComment(postId,getState)){
    dispatch(requestComments())
    return ReadableAPI.postComments(postId)
      .then(resp => dispatch(receiveComments(resp, postId)))
  }
}

export const firstCall = () => (dispatch, getState) => {
  const postsLength = Object.keys(getState().entities.posts.byId).length
  const categoryLength = Object.keys(getState().entities.categories.byId).length
  if(postsLength < 2) {
    dispatch(fetchPostComment())
  }
  if(categoryLength < 2) {
    dispatch(fetchCategories())
  }
}

export const voteIssuing = (id, option) => (dispatch) => {
  return ReadableAPI.postVote(id, option)
    .then(resp => dispatch(postVote(id, option)))
}

export const voteComment = (id, option) => (dispatch) => {
  return ReadableAPI.voteComment(id, option)
    .then(resp => dispatch(commentVote(id, option)))
}

const shouldFetchComment = (postId, getState) => {
  const comments = getState().entities.comments.byId
  return !Object.keys(comments).map(comId => comments[comId].parentId).includes(postId)
}
