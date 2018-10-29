import * as React from "react";
import { Card, List } from "antd";

interface IArticle {
  title: string;
  imgUrl: string;
  content: string;
}

export class ArticleListCom extends React.Component<{ title: string }>{
  private listData: IArticle[] = [];
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    for (let i = 0; i < 6; i++) {
      this.listData.push({
        title: "【活动作品】柠檬绿兔小白个人博客模板30...",
        imgUrl: require('../../images/t02.jpg'),
        content: "展示的是首页html，博客页面布局格式简单，没有复杂的背景，色彩局部点缀，动态的幻灯片展示，切换卡，标..."
      })
    }
  }
  render() {
    return (
      <Card title={this.props.title} className="article" bordered={false}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.listData}
          renderItem={(item: IArticle) => (
            <List.Item
              key={item.title}
            >
              <List.Item.Meta
                title={<a href="javascript:;">{item.title}</a>}
              />
              <div className="article-item">
                <span>{item.content}</span>
                <img  src={item.imgUrl} />
              </div>
              
            </List.Item>
          )}
        />
      </Card>
    )
  }
}