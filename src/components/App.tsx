import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { applyMiddleware, createStore, Dispatch } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from '../reducers';
import Login from './Login/Login';
import Home from './Home/Home';
import Register from './Register/Register';
import { History } from 'history';


export interface IReduxProps {
  history: History;
  dispatch: Dispatch;
}

const initialState = {
  isLogin: false,
  articles: [],
  article: { title: "", content: "" },
  // tags: [],
};

let store = createStore(appReducer, initialState, applyMiddleware(thunk));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
