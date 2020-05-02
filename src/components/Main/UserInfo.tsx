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
          <h2>Joe</h2>
          <h4>Web前端开发工程师</h4>
          <div className="user-sign">
            不忘初心，方得始终。
            在此分享自己工作生活的点滴
          </div>
          <h4 style={{marginTop:20}}>博客源码</h4>
          <div>
            前端:<a href="https://github.com/ZoeLeee/MyWeb" target="blank">https://github.com/ZoeLeee/MyWeb</a>
          </div>
          <div>
            后端:<a href="https://github.com/ZoeLeee/mywebserver" target="blank">https://github.com/ZoeLeee/mywebserver</a>
          </div>
      </div>
    )
  }
}
