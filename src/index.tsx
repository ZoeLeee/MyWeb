import * as React from "react"
import * as ReactDOM from "react-dom"
import './style.less'
import App from "./components/App";
import { hot } from 'react-hot-loader/root';


export const AppStatus = {
  isAdmin: false
}

if(location.host.includes("localhost")){
  const Com=hot(App);
  ReactDOM.render(<Com />,document.getElementById("app"));
}
else{
  ReactDOM.render(<App />,document.getElementById("app"));
}
