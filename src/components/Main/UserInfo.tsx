import * as React from 'react';
import { Avatar } from 'antd';


export  class UserInfoComponent extends React.Component {
  render() {
    return (
      <div className="user-info"> 
          <Avatar 
            size={100}
            src={require('../../images/avaters/avatar.jpg')}
          />
          <h2>Zoe</h2>
          <h4>Web前端开发工程师</h4>
          <div>
            不忘初心，方得始终。
            在此分享自己工作生活的点滴
          </div>
      </div>
    )
  }
}
