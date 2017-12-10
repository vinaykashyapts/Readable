import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './PostCard.css'
import { MdAccountCircle, MdComment } from 'react-icons/lib/md'
import CategoryTag from '../CategoryTag/CategoryTag'
import VoteController from '../VoteController/VoteController'
import ButtonsBox from '../ButtonsBox/ButtonsBox'
import PostEdit from '../PostEdit/PostEdit'


class PostCard extends Component {
  state = {
    openEdit: false
  }

  handleDelete = () => {
    this.props.onDelete(this.props.post.id)
  }

  handleVote = (option) => {
    this.props.onVote(this.props.post.id, option)
  }

  openEdit = () => {
    this.setState({
      openEdit: true
    })
  }

  closeEdit = () => {
    this.setState({
      openEdit: false
    })
  }

  handleEdit = (partialPost) => {
    const changes = {
      ...partialPost,
      id: this.props.post.id
    }
    this.props.onEdit(changes)
    this.closeEdit()
  }

  render() {
    const { title, author, comments = [], voteScore, id, category } = this.props.post
    const { openEdit } = this.state
    return (
      <div className='post-card'>
        <div className='post-card-info'>
          <CategoryTag category={category}/>
          <h3><Link to={`/${category}/${id}`}>{title}</Link></h3>
          <p><MdAccountCircle/> by {author}. <MdComment/> {comments.length === 1 ? `${comments.length} comment` : `${comments.length} comments`}.</p>
          <ButtonsBox deleteFunc={this.handleDelete} editFunc={this.openEdit}/>
        </div>
        <VoteController score={voteScore} voteFunction={this.handleVote}/>
        <PostEdit open={openEdit} post={this.props.post} editFunction={this.handleEdit} close={this.closeEdit}></PostEdit>
      </div>
    )
  }
}

export default PostCard
