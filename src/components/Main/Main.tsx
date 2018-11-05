import * as React from "react";
import { UserInfoComponent } from "./UserInfo";
import { SearchComponent } from "./Search";
import { KeyWordTabsComponment } from "./KeyWordTags";
import { ArticleListCom } from "./ArticleList";
import { List } from "antd";
import { ArticleItem } from "./ArticleItem";
import { Link } from "react-router-dom";


export class MainComponent extends React.Component {
  private articles=[
    {
      title: "陌上花开，可缓缓归矣",
      des: "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板，..."
    },
    {
      title: "陌上花开，可缓缓归矣",
      des: "用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板，..."
    },
  ]
  render() {
    return (
        <div className="content">
          <div>
          <Link to="/editor">新建</Link>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={this.articles}
            renderItem={(item) => (
              <List.Item
                key={item.title}
              >
                <ArticleItem />
              </List.Item>
            )}
          />
          </div>
          <div className='side-info'>
            <UserInfoComponent />
            <SearchComponent />
            <KeyWordTabsComponment />
          <ArticleListCom title="点击排行" />
        </div>
      </div>
    )
  }
}