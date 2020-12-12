import { Layout, Menu } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { AppStatus } from '../..';
import { getLoginStatus, loginOut } from '../../actions/login';
import { IReduxProps } from '../App';
import ArticleCom from '../Articles/ArticleComponent';
import MainComponent from '../Main/Main';
import { ProjectComponent } from '../../containers/Project/index';
require('./index.less');
import NoMatch from './../NoMatch/index';


interface HomeProps extends IReduxProps {
  isLogin?: boolean,
  articles?: any;
}


const Home = (props: HomeProps) => {

  useEffect(() => {
    return () => {
      props.dispatch(getLoginStatus());
      let authority = localStorage.getItem('user');
      if (authority)
        AppStatus.isAdmin = authority === "1";
    };
  }, []);

  return (
    <Layout>
      <Layout.Header>
        <h3 className='logo'>
          Do Dream
            </h3>
        <Menu
          mode="horizontal"
          theme="light"
        >
          <Menu.Item>
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/project">作品展</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/remarks">留言板</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content>
        <Switch>
          <Route exact path="/" component={MainComponent} />
          <Route path="/project" component={(props) => <ProjectComponent {...props} />} />
          <Route exact path="/remarks" component={Jx} />
          <Route exact path="/article/:id" component={ArticleCom} />
          <Route>
            <NoMatch {...props} />
          </Route>
        </Switch>
      </Layout.Content>
      <Layout.Footer >
        <a href="http://www.beian.miit.gov.cn/">闽ICP备19012108号</a>
      </Layout.Footer>
    </Layout>
  );
};

const Jx = () => <div>技术分享</div>;

function mapStatetoProps({ isLogin }) {
  return {
    isLogin
  };
}

export default connect(mapStatetoProps)(Home);
