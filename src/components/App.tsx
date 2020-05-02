import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { applyMiddleware, createStore, Dispatch } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from '../reducers';
import { IEditorState } from './Editor';
import Login from './Login/Login';
import Home from './Main/Home';
import Register from './Register/Register';
import { History } from 'history';
import EditorCom from './Editor';


export interface IReduxProps{
  history:History;
  dispatch:Dispatch;
}

export const articleMap: Map<string, IEditorState> = new Map();
const NotMatchCom = () => <div>404</div>

const initialState={
  isLogin:false,
  articles:[],
  article:{title:"",content:""},
  tags:[],
}

let store = createStore(appReducer,initialState, applyMiddleware(thunk));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/editor" component={EditorCom} />
            <Route path="/" component={Home} />
            <Route component={NotMatchCom} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

 export default App;
