import React, { Component } from 'react';
import './CommentEdit.css'
import Modal from 'react-modal'

class CommentEdit extends Component {
  state = {
    timestamp: '',
    body: ''
  }

  componentWillReceiveProps() {
    this.setState({
      timestamp:this.props.comment.timestamp || '',
      body: this.props.comment.body || ''
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

  handleEditCommentInfo = () => {
    this.props.editFunction(this.state)
    this.setState({
      title: '',
      body: ''
    })
  }

  render() {
    const { body } = this.state
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
    const disabled = body.length > 0
    return (
      <Modal
        isOpen={open}
        style={customStyles}
        >
        <div className="edit-comment">
          <h1>Edit Comment</h1>
          <textarea rows="20" cols="50" name='body' value={body}  onChange={this.handleInputChange}></textarea>
          <div className='actions'>
            <button className="cancel" onClick={() => close()}>Cancel</button>
            <button className="edit" onClick={this.handleEditCommentInfo} disabled={!disabled}>Update</button>
          </div>
        </div>
      </Modal>
    );
  }

}

export default CommentEdit;
