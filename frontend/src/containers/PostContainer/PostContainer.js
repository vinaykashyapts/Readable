import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as Actions from '../../actions'
import PostLayout from '../../components/PostLayout/PostLayout'
import CommentsBox from '../../components/CommentsBox/CommentsBox'
import './PostContainer.css'
import uuidv1 from 'uuid/v1'
import NoMatch from '../../components/NoMatch'

class PostContainer extends Component {
  handlerNewComment = (partialComment) => {
    const comment = {
      ...partialComment,
      id: uuidv1(),
      timestamp: Date.now(),
      parentId: this.props.post.id
    }
    this.props.addComment(comment)
  }

  render() {
    const { post, postVote, postDelete, comments, commentDelete, commentVote, postEdit, commentEdit } = this.props
    const postExist = post.hasOwnProperty('deleted') && !post.deleted
    if(postExist) {
      return (
        <div className='post-container'>
           <div>
             <PostLayout post={post} onPostVote={postVote} onPostDelete={postDelete} onPostEdit={postEdit}/>
             <CommentsBox comments={comments} onCommentVote={commentVote} onCommentDelete={commentDelete} onAddComment={this.handlerNewComment} onCommentEdit={commentEdit}/>
           </div>
         </div>
      )
    } else {
      return <NoMatch/>
    }
  }
}

const mapStateToProps = ({ entities }, ownProps) => {
  const { id } = ownProps.match.params
  const post = entities.posts.byId[id] || {}
  const comments = Object.keys(entities.comments.byId).map(comId => entities.comments.byId[comId]).filter(comment => comment.parentId === id && comment.deleted === false)
  return {
    post,
    comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postDelete: (id) => dispatch(Actions.deletePostCall(id)),
    postVote: (id, option) => dispatch(Actions.voteIssuing(id,option)),
    postEdit: (postChanges) => dispatch(Actions.editPost(postChanges)),
    commentVote: (id, option) => dispatch(Actions.voteComment(id, option)),
    commentDelete: (id, parentId) => dispatch(Actions.deleteCommentCall(id, parentId)),
    commentEdit: (commentChanges) => dispatch(Actions.editComment(commentChanges)),
    addComment: (comment) => dispatch(Actions.createComment(comment))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostContainer))
