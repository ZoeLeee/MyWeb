import { Card, Icon } from "antd";
import { Meta } from "antd/lib/list/Item";
import * as React from "react";
import { Link } from "react-router-dom";

export class ArticleItem extends React.Component {

  render() {
    return (
      <Card>
        <div className="article-li">
          <div>
            <img src={require('../../images/zd03.jpg')} alt="" />
          </div>
          <div>
            <Meta
              title="陌上花开，可缓缓归矣"
              description="用最简单的代码，实现瀑布流布局，没有繁琐的css，没有jq，只需要做到以下就可以实现瀑布流的效果。思路很简单，看成是三列布局，分别用三个ul来调用。帝国cms列表模板，..."
            />
          </div>
        </div>
        <div className=" article-info">
          <ul className="list-unstyle-inline">
            <li>
              <a href="">
                <Icon type="paper-clip" theme="outlined" />
                CSS3|Html5
              </a>
            </li>
            <li>
              <Icon type="clock-circle" theme="outlined" />
              <span>2018-05-04</span>
            </li>
            <li>
              <Icon type="eye" theme="outlined" />
              <span>
                浏览（{0}）
              </span>
            </li>
          </ul>
            <Link to="/article">阅读原文</Link>
        </div>
      </Card>
    )
  }
}