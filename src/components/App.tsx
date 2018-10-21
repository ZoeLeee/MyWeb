import * as React from 'react';
import { Layout, Menu, Icon } from 'antd'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
export class App extends React.Component {
  render() {
    return (
      <Router>
      <Layout>
        <Layout.Header>
          <h3 className='logo'>
            Zoe个人网站
          </h3>
          <Menu
            mode="horizontal"
            theme="light"
          >
            <Menu.Item>
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/jx">技术分享</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/blog">生活点滴</Link>
            </Menu.Item>
            <Menu.Item>
              <a href="#" >实用工具</a>
            </Menu.Item>
            <Menu.Item>
              <a href="#" >留言板</a>
            </Menu.Item>
            <Menu.Item>
              <a href="#" >关于我</a>
            </Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content>
              <Route path="/" exact component={Main} />
              <Route path="/jx" component={Main1} />
              <Route path="/blog" component={Main2} />
        </Layout.Content>
        <Layout.Footer>footer</Layout.Footer>
      </Layout>
      </Router>
    )
  }
}


const Main = ()=> 
    <div>主页</div>
const Main1= ()=> 
    <div>主页1</div>
const Main2 = ()=> 
    <div>主页2</div>