import * as React from 'react';
import { Input } from 'antd';


export class SearchComponent extends React.Component {
  render() {
    return (
      <div className="search">
        <Input.Search
          placeholder="请输入关键字"
          enterButton="搜索"
          size="large"
        />
      </div>
    )
  }
}