import React, { Component } from 'react';
import './PostEdit.css'
import Modal from 'react-modal'

class PostEdit extends Component {
  state = {
    title: '',
    body: ''
  }

  componentWillReceiveProps() {
    this.setState({
      title:this.props.post.title || '',
      body: this.props.post.body || ''
    })
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleEditPostInfo = () => {
    this.props.editFunction(this.state)
    this.setState({
      title: '',
      body: ''
    })
  }

  render() {
    const { title, body } = this.state
    const { open, close } = this.props
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        borderRadius          : '5px',
        boxShadow             : '1px 1px 0.5px 0.8px rgba(0, 0, 0, .2)'
      }
    }
    const disabled = title.length > 0 && body.length > 0
    return (
      <Modal
        isOpen={open}
        style={customStyles}
        >
        <div className="edit-post">
          <h1>Edit Post</h1>
          <textarea name='title' value={title} onChange={this.handleInputChange}></textarea>
          <textarea rows="20" cols="50" name='body' value={body}  onChange={this.handleInputChange}></textarea>
          <div className='actions'>
            <button className="cancel" onClick={() => close()}>Cancel</button>
            <button className="edit" onClick={this.handleEditPostInfo} disabled={!disabled}>Update</button>
          </div>
        </div>
      </Modal>
    );
  }

}

export default PostEdit;
