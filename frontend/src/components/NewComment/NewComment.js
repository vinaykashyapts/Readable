import React, { Component } from 'react';
import './NewComment.css'

class NewComment extends Component {
  state = {
    body: '',
    author: '',
    id: '',
    timestamp: '',
    parentId: '',
    deleted: false
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  createComment = () => {
    this.props.newComment(this.state)
    this.setState({
      body: '',
      author: ''
    })
  }

  render() {
    const { body, author } = this.state
    const disabled = body.length > 0 && author.length > 0
    return (
      <div className="new-comment">
        <input name='body' placeholder='Your comment here' value={body} onChange={this.handleInputChange}></input>
        <input name='author' placeholder='Written by' value={author} onChange={this.handleInputChange}></input>
        <div className='button-container'>
          <button onClick={() => this.createComment()} disabled={!disabled}>Comment!</button>
        </div>
      </div>
    );
  }
}

export default NewComment
