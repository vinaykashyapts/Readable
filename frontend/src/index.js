import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import MainContainer from './containers/MainContainer/MainContainer';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { firstCall } from './actions';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

store.dispatch(firstCall())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MainContainer />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
