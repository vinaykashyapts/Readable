const api = "http://localhost:3001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

//categories
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(res => res.categories.reduce((acum, category) => {
      return acum = {
        ...acum,
        [category.path]: category
      }
    },{}))

export const getCategoryPost = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

//posts
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(res => res.reduce((acum, post) => {
      return acum = {
        ...acum,
        [post.id]: post
      }
    },{}))

export const post = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers:{
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())


export const postDetail = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())

export const postVote = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers:{
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())

export const postEdit = ({ id, title, body }) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers:{
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  }).then(res => res.json())

export const postDelete = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: { ...headers }
  })

export const postComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => res.json())
  .then(res => res.reduce((acum,com) => {
    return acum = {
      ...acum,
      [com.id]: com
    }
  },{}))

//comments
export const comment = (comment) =>
    fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const commentDetail = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
  .then(res => res.json())

export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())

export const editComment = ({id, timestamp, body}) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp, body })
  }).then(res => res.json())

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: { ...headers }
  }).then(res => res.json())
