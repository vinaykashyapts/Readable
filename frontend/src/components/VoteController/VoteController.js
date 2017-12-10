import React, { Component } from 'react';
import { MdThumbUp, MdThumbDown } from 'react-icons/lib/md'
import './VoteController.css'

class VoteController extends Component {

  render() {
    const { voteFunction, score } = this.props
    return (
      <div className='vote-controller'>
        <a className="thump-up" onClick={() => voteFunction('upVote')}><MdThumbUp/></a>
        <span>{score}</span>
        <a className="thump-down" onClick={() => voteFunction('downVote')}><MdThumbDown/></a>
      </div>
    );
  }

}

export default VoteController;
