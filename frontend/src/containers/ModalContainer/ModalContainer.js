import React, { Component } from 'react';
import Modal from 'react-modal'
import NewPost from '../../components/NewPost/NewPost'
import { connect } from 'react-redux'
import { modalSwitch, createPost } from '../../actions'
import uuidv1 from 'uuid/v1'

class ModalContainer extends Component {
  handleNewPost = (partialPost) => {
    const post = {
      ...partialPost,
      id: uuidv1(),
      timestamp: Date.now()
    }
    this.props.newPost(post)
  }

  render() {
    const { isOpen, categories, switchModal } = this.props
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
    return (
      <div>
        <Modal
          isOpen={isOpen}
          style={customStyles}
        >
          <NewPost categories={categories} switchModal={switchModal} newPost={this.handleNewPost}/>
        </Modal>

      </div>
    )
  }
}

const mapStateProps = ({ uiState, entities }) => {
  const { isOpen } = uiState.modal
  const { categories } = entities
  return {
    isOpen,
    categories
  }
}

const mapDispatchProps = dispatch => {
  return {
    switchModal: (open) => dispatch(modalSwitch(open)),
    newPost: (post) => dispatch(createPost(post))
  }
}


export default connect(mapStateProps, mapDispatchProps)(ModalContainer)
