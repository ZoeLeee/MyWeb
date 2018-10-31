import * as React from 'react';
import { Layout, Menu, Icon } from 'antd'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MainComponent } from './Main/Main';
export class App extends React.Component {
  render() {
    return (
      <Router>
      <Layout>
        <Layout.Header
          style={{
            position:"fixed",
            top:0,
            width:"100%",
            zIndex:10
          }}>
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
              <Link to="/blog">实用工具</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/blog">留言板</Link>
            </Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content
          style={
            {
              marginTop:"64px",
            }
          }
        >
              <Route path="/" exact component={MainComponent} />
              <Route path="/jx" component={MainComponent} />
              <Route path="/blog" component={MainComponent} />
        </Layout.Content>
        <Layout.Footer>
         友情链接：1，2，3，4，5，6，Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus cumque, earum fugit esse, eum nam deleniti velit aliquam, reiciendis praesentium perferendis! Aliquam perferendis ad tempora commodi, officia omnis at nisi!
        </Layout.Footer>
      </Layout>
      </Router>
    )
  }
}