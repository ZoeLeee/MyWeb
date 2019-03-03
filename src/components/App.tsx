import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IEditorState } from './Editor';
import { Login } from './Login/Login';
import { Home } from './Main/Home';
import { Register } from './Register/Register';
import {hot } from 'react-hot-loader/root'
export const articleMap: Map<string, IEditorState> = new Map();

const NotMatchCom = () => <div>404</div>
class App extends React.Component{
  render() {
    return (
      <Router>
        <Switch>
          <Route  exact path="/login" component={Login} />
          <Route  exact path="/register" component={Register} />
          <Route  path="/" component={Home} />
          <Route  component={NotMatchCom} />
        </Switch>
      </Router>
    )
  }
}

export default hot(App)