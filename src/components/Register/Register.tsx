import * as React from 'react';
import { Card, Input, Button } from 'antd';
import { Post, RequestStatus } from '../../utils/Request';
import { DefaultConfig } from '../../utils/Default';
import { History } from 'history';

export interface RegisterProps {
  history?:History
}
export interface RegisterState {
  uname:string;
  pwd:string;
}

export  class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props){
    super(props);
    this.state={
      uname:"",
      pwd:"",
    }
  }
  private handClick=()=>{
    Post(DefaultConfig.url+'register', this.state,(res) => {
      if (res.status === 200 && res.data.code === RequestStatus.Ok) {
         this.props.history.push('/login');
      }
    })
  }
  public render() {
    return (
      <Card className="login" title="欢迎注册博客">
        <label>
          <span>账号</span>
          <Input placeholder="输入用户名" value={this.state.uname} onChange={e=>this.setState({uname:e.target.value})} />
        </label>
        <label>
          <span>密码</span>
          <Input type="password" placeholder="输入密码"  value={this.state.pwd}  onChange={e=>this.setState({pwd:e.target.value})} />
        </label>
        <div>
          <Button type="primary" onClick={this.handClick}>注册</Button>
        </div>
      </Card>
    );
  }
}
