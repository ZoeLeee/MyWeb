import { Layout, Menu } from 'antd';
import { History } from 'history';
import * as React from 'react';
import { Link, Route, Switch } from "react-router-dom";
import { AppStatus } from '../..';
import { ReqApi } from '../../utils/Default';
import { Get, RequestStatus } from '../../utils/Request';
import { EditorCom } from '../Editor';
import { ArticleCom } from './ArticleComponent';
import { MainComponent } from './Main';

interface HomeProps {
  history?: History
}

interface HomeState{
  isLogin:boolean;
}

export class Home extends React.Component<HomeProps, any> {
  constructor(props){
    super(props);
    this.state={
      isLogin:false
    }
  }
  private loginout=()=>{
    Get(ReqApi.LoginOut,(res) => {
      if (res.status === 200 && res.data.code === RequestStatus.Ok) {
        this.setState({isLogin:false});
      }
    })
  }
  componentWillMount() {
    Get(ReqApi.LoginStatus, (res) => {
      if (res.status === 200 && res.data.code === RequestStatus.Ok) {
        this.setState({isLogin:true});
      }
    })
    let authority = sessionStorage.getItem('user');
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
              this.state.isLogin&&AppStatus.isAdmin &&
              <Menu.Item>
                <Link to="/editor">发表</Link>
              </Menu.Item>
            }
            {
              !this.state.isLogin? <Menu.Item>
                <Link to="/login">登陆</Link>
              </Menu.Item>:<Menu.Item>
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
            <Route exact path="/editor" component={EditorCom} />
          </Switch>
        </Layout.Content>
        <Layout.Footer>
         闽ICP备19012108号
        </Layout.Footer>
      </Layout>
    );
  }
}

const Jx = () => <div>技术分享</div>
const Jx2 = () => <div>博客</div>
