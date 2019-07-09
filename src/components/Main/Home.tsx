import { Layout, Menu } from 'antd';
import * as React from 'react';
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import { AppStatus } from '../..';
import { getLoginStatus, loginOut } from '../../actions/login';
import { IReduxProps } from '../App';
import ArticleCom from './ArticleComponent';
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
            <Route exact path="/" component={MainComponent} />
            <Route exact path="/jx" component={Jx} />
            <Route exact path="/blog" component={Jx2} />
            <Route exact path="/article/:id" component={ArticleCom} />
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
const Jx2 = () => <div>博客</div>


function mapStatetoProps({ isLogin }) {
  return {
    isLogin
  }
}

export default connect(mapStatetoProps)(Home);
