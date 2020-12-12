import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
require('./style.less');

export const AppStatus = {
  isAdmin: false
};

ReactDOM.render(<App />, document.getElementById("app"));
