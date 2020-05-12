import * as React from 'react';
import './index.less';
import { Card } from 'antd';


export function ProjectComponent(){
  return (
    <div className="project">
      <Card className="project-item">
          <img src="https://cdn.jsdelivr.net/gh/ZoeLeee/cdn/123.gif" alt=""/>
          <p>
            Obj查看器
          </p>
          <p>
            扫码，导入Obj查看的小程序
          </p>
      </Card>
      <Card className="project-item">
          <img src="https://cdn.jsdelivr.net/gh/ZoeLeee/cdn/123.gif" alt=""/>
          <p>
            Obj查看器
          </p>
          <p>
            扫码，导入Obj查看的小程序
          </p>
      </Card>
      <Card className="project-item">
          <img src="https://cdn.jsdelivr.net/gh/ZoeLeee/cdn/123.gif" alt=""/>
          <p>
            Obj查看器
          </p>
          <p>
            扫码，导入Obj查看的小程序
          </p>
      </Card>
    </div>
  )
}
