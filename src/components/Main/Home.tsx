import * as React from 'react';
import { Layout, Menu, Icon } from 'antd'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { MainComponent } from './Main';
import { ArticleCom } from './ArticleComponent';
import { EditorCom } from '../Editor';
import { History } from 'history';
import { Post, RequestStatus } from '../../utils/Request';
import { DefaultConfig } from '../../utils/Default';
import { AppStatus } from '../..';

interface HomeProps {
  history?: History
}

interface HomeState{
  isLogin:boolean;
}

export class Home extends React.Component<HomeProps, any> {
  private isAdmin: boolean
  constructor(props){
    super(props);
    this.state={
      isLogin:false
    }
  }
  private loginout=()=>{
    Post(DefaultConfig.url+'loginout', this.state,(res) => {
      if (res.status === 200 && res.data.code === RequestStatus.Ok) {
        this.setState({isLogin:false});
      }
    })
  }
  componentWillMount() {
    Post(DefaultConfig.url + 'loginstatus', this.state, (res) => {
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
              AppStatus.isAdmin &&
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
          友情链接：1，2，3，4，5，6，Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus cumque, earum fugit esse, eum nam deleniti velit aliquam, reiciendis praesentium perferendis! Aliquam perferendis ad tempora commodi, officia omnis at nisi!
        </Layout.Footer>
      </Layout>
    );
  }
}

const Jx = () => <div>技术分享</div>
const Jx2 = () => <div>博客</div>