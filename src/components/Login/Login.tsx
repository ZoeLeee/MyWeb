import { Button, Card, Input } from 'antd';
import { History } from 'history';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { login } from '../../actions/login';

export interface ILoginState {
  uname:string;
  pwd:string;
}

class Login extends React.Component<{history?:History, dispatch?: Dispatch}, ILoginState> {
  constructor(props){
    super(props);
    this.state={
      uname:"",
      pwd:"",
    }
  }
  private handClick=()=>{
    this.props.dispatch(login(this.state)).then(data=>{
      if(data)
        this.props.history.push('/');
    })
  }
  public render() {
    return (
      <Card className="login" title="欢迎登陆博客">
        <label>
          <span>账号</span>
          <Input 
            placeholder="输入用户名" 
            value={this.state.uname}
            onChange={e=>this.setState({uname:e.target.value})}
            />
        </label>
        <label>
          <span>密码</span>
          <Input 
            type="password" 
            placeholder="输入密码" 
            value={this.state.pwd}
            onChange={e=>this.setState({pwd:e.target.value})}
          />
        </label>
        <div>
          <Button type="primary" onClick={this.handClick}>登陆</Button>
          <Link className="ant-btn ant-btn-primary" to="/register">注册</Link>
          <Link className="ant-btn" to="/">游客登陆</Link>
        </div>
      </Card>
    );
  }
}

export default connect()(Login);