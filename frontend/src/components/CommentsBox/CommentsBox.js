import React, {Component} from 'react';
import CommentCard from '../CommentCard/CommentCard'
import NewComment from '../NewComment/NewComment'
import './CommentsBox.css'


class CommentsBox extends Component {

  render() {
    const { comments, onCommentVote, onCommentDelete, onAddComment, onCommentEdit } = this.props
    return (
      <div className="comments-box">
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <CommentCard comment={comment} deleteComment={onCommentDelete} voteComment={onCommentVote} editComment={onCommentEdit} />
            </li>
          ))}
          <NewComment newComment={onAddComment}/>
        </ul>
      </div>
    );
  }
}

export default CommentsBox
