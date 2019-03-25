import * as React from 'react';
import { Avatar } from 'antd';


export  class UserInfoComponent extends React.Component {
  render() {
    return (
      <div className="user-info"> 
          <Avatar 
            size={100}
            src={require('../../images/ava1.jpg')}
          />
          <h2>Zoe</h2>
          <h4>Web前端开发工程师</h4>
          <div className="user-sign">
            不忘初心，方得始终。
            在此分享自己工作生活的点滴
          </div>
          <h4 style={{marginTop:20}}>博客源码</h4>
          <div>
            前端:https://github.com/ZoeLeee/MyWeb
          </div>
          <div>
            后端:https://github.com/ZoeLeee/mywebserver
          </div>
      </div>
    )
  }
}
