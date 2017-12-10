import React, { Component } from 'react'
import './PostLayout.css'
import CategoryTag from '../CategoryTag/CategoryTag'
import ButtonsBox from '../ButtonsBox/ButtonsBox'
import PostEdit from '../PostEdit/PostEdit'
import VoteController from '../VoteController/VoteController'
import { MdAccountCircle } from 'react-icons/lib/md'


class PostLayout extends Component {
  state = {
    openEdit: false
  }

  handleVote = (option) => {
    this.props.onPostVote(this.props.post.id, option)
  }

  handleDelete = () => {
    this.props.onPostDelete(this.props.post.id)
  }

  openEditModal = () => {
    this.setState({
      openEdit: true
    })
  }

  closeEditModal = () => {
    this.setState({
      openEdit: false
    })
  }

  handleEdit = (partialPost) => {
    const changes = {
      ...partialPost,
      id: this.props.post.id
    }
    this.props.onPostEdit(changes)
    this.closeEditModal()
  }

  render() {
    const { post } = this.props
    const { openEdit } = this.state
    return (
    <div className='post-layout'>
        <div>
          <div className="post-header">
            <div className="post-header-tag">
              <CategoryTag category={post.category}/>
            </div>
            <div className="post-header-buttons">
              <ButtonsBox deleteFunc={this.handleDelete} editFunc={this.openEditModal}/>
            </div>
          </div>
          <h1>{post.title}</h1>
          <em>Posted by <MdAccountCircle/> {post.author}.</em>
          <p>{post.body}</p>
          <VoteController score={post.voteScore} voteFunction={this.handleVote}/>
          <PostEdit open={openEdit} post={post} editFunction={this.handleEdit} close={this.closeEditModal}></PostEdit>
          <hr></hr>
        </div>
    </div>);
  }
}





export default PostLayout
