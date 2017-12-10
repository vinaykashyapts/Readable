import React, { Component } from 'react'
import capitalize from 'capitalize'
import './NewPost.css'


class NewPost extends Component {
  state = {
    category: 'default',
    title: '',
    body:'',
    author: '',
    id: '',
    timestamp: ''
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleNewPostInfo = () => {
    this.props.newPost(this.state)
    this.setState({
      category: 'default',
      title: '',
      author: '',
      body: ''
    })
  }

  render() {
    const { categories, switchModal } = this.props
    const { category, title, body, author } = this.state
    const disabled = category !== 'default' && title.length > 0 && author.length > 0 && body.length > 0
    return (
      <div className="new-post">
        <h1>Create new post</h1>
        <input placeholder='Title' value={title} name='title' onChange={this.handleInputChange}></input>
        <select onChange={this.handleInputChange} value={category} name='category'>
          <option disabled value="default">Categories</option>
          {categories.allIds.map(cat => (
              <option key={cat} value={cat}>
                {capitalize.words(cat)}
              </option>
            )
          )}
        </select>
        <textarea placeholder='Body' rows="20" cols="50" value={body} name='body' onChange={this.handleInputChange}></textarea>
        <input placeholder='Written by' value={author} name='author' onChange={this.handleInputChange}></input>
        <div className='actions'>
          <button className='cancel' onClick={() => switchModal(false)}>Cancel</button>
          <button className='post' onClick={() => this.handleNewPostInfo()} disabled={!disabled}>Post!</button>
        </div>
      </div>
    );
  }
}

export default NewPost
