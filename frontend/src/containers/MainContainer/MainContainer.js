import React, { Component } from 'react';
import ListsContainer from '../ListsContainer/ListsContainer'
import PostContainer from '../PostContainer/PostContainer'
import ModalContainer from '../ModalContainer/ModalContainer'
import NoMatch from '../../components/NoMatch'
import { Route, Switch } from 'react-router-dom'
import './MainContainer.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { modalSwitch } from '../../actions'

class MainContainer extends Component {

  render() {
    const { location, history, modalSwitch } = this.props
    return (
      <div className="blog">
        <div className="blog-title">
          <h1>Readable App</h1>
          {location.pathname !== '/' &&
            <div className="go-back">
              <a onClick={history.goBack}>Go back</a>
            </div>
          }
          <div className="add-post">
            <a onClick={()=> modalSwitch(true)} >New post</a>
          </div>
        </div>
        <div className='main-container'>
          <Switch>
            <Route exact path="/:category?" component={ListsContainer}/>
            <Route exact path="/:category/:id" component={PostContainer}/>
            <Route path="*" component={NoMatch}/>
          </Switch>
        </div>
        <ModalContainer />
      </div>

    );
  }
}

export default withRouter(connect(null, { modalSwitch } )(MainContainer))
