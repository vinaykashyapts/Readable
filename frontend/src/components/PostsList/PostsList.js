import React, { Component } from 'react';
import PostCard from '../PostCard/PostCard.js'
import './PostsList.css'
import sortBy from 'sort-by'

class PostsList extends Component {
  render() {
    const { posts, selected, onDeletePost, onVotePost, onEditPost } = this.props
    return (
      <div className="blog-posts">
        <ul>
          {posts.length ?
            posts.sort(sortBy(selected.value)).map(post => (
              <li key={post.id}>
                <PostCard post={post} onDelete={onDeletePost} onVote={onVotePost} onEdit={onEditPost}/>
              </li>
            ))
            :
            <h3>There is no post here! </h3>
        }
        </ul>
      </div>
   )}
}

export default PostsList
