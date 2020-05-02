import { Layout, Menu } from 'antd';
import * as React from 'react';
import { connect } from "react-redux";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { AppStatus } from '../..';
import { getLoginStatus, loginOut } from '../../actions/login';
import { IReduxProps } from '../App';
import ArticleCom from '../Articles/ArticleComponent';
import MainComponent from './Main';

interface HomeProps extends IReduxProps {
  isLogin?: boolean,
  articles?: any;
}


class Home extends React.Component<HomeProps, {}> {
  private loginout = () => {
    this.props.dispatch(loginOut());
  }
  componentWillMount() {
    this.props.dispatch(getLoginStatus());
    let authority = localStorage.getItem('user');
    if (authority)
      AppStatus.isAdmin = authority === "1";
  }
  public render() {
    return (
      <Layout>
        <Layout.Header
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 10
          }}>
          <h3 className='logo'>
            Joe个人网站
              </h3>
          <Menu
            mode="horizontal"
            theme="light"
          >
            <Menu.Item>
              <Link to="/blog">首页</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/jx">技术分享</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/project">作品展</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/remarks">留言板</Link>
            </Menu.Item>
            {
              this.props.isLogin && AppStatus.isAdmin &&
              <Menu.Item>
                <Link to="/editor">发表</Link>
              </Menu.Item>
            }
            {
              !this.props.isLogin ? <Menu.Item>
                <Link to="/login">登陆</Link>
              </Menu.Item> : <Menu.Item>
                  <a onClick={this.loginout} href="javascript:;">退出登陆</a>
                </Menu.Item>
            }

          </Menu>
        </Layout.Header>
        <Layout.Content
          style={
            {
              marginTop: "64px",
            }
          }
        >
          <Switch>
            <Route exact path="/jx" component={Jx} />
            <Route exact path="/blog" component={MainComponent} />
            <Route exact path="/article/:id" component={ArticleCom} />
            <Redirect from="/" to="/blog" />
          </Switch>
        </Layout.Content>
        <Layout.Footer
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 10
          }}
        >
          <a href="http://www.beian.miit.gov.cn/">闽ICP备19012108号</a>
        </Layout.Footer>
      </Layout>
    );
  }
}

const Jx = () => <div>技术分享</div>

function mapStatetoProps({ isLogin }) {
  return {
    isLogin
  }
}

export default connect(mapStatetoProps)(Home);
