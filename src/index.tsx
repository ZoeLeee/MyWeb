import * as React from "react"
import * as ReactDOM from "react-dom"
import 'antd/dist/antd.css';
import './style.less'
import App from "./components/App";


export const AppStatus = {
  isAdmin: false
}

ReactDOM.render(<App />,document.getElementById("app")
)