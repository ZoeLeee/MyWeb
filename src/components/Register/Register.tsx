import { Button, Card, Input } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/login';
import { IReduxProps } from '../App';

export interface RegisterState {
  uname: string;
  pwd: string;
}

class Register extends React.Component<IReduxProps, RegisterState> {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
      pwd: "",
    }
  }
  private handClick = () => {
    this.props.dispatch(register(this.state)).then(isOK => {
      if (isOK)
        this.props.history.push('/login');
    })
  }
  public render() {
    return (
      <Card className="login" title="欢迎注册博客">
        <label>
          <span>账号</span>
          <Input placeholder="输入用户名" value={this.state.uname} onChange={e => this.setState({ uname: e.target.value })} />
        </label>
        <label>
          <span>密码</span>
          <Input type="password" placeholder="输入密码" value={this.state.pwd} onChange={e => this.setState({ pwd: e.target.value })} />
        </label>
        <div>
          <Button type="primary" onClick={this.handClick}>注册</Button>
        </div>
      </Card>
    );
  }
}

export default connect()(Register);
