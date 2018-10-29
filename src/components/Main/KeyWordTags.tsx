import * as React from 'react';
import { Input, Card, Tag } from 'antd';


export class KeyWordTabsComponment extends React.Component {
  render() {
    return (
        <Card title="标签" className="tag" bordered={false}>
          <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          <Tag color="volcano">volcano</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="gold">gold</Tag>
          <Tag color="lime">lime</Tag>
          <Tag color="green">green</Tag>
          <Tag color="cyan">cyan</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="geekblue">geekblue</Tag>
          <Tag color="purple">purple</Tag>
        </Card>
    )
  }
}