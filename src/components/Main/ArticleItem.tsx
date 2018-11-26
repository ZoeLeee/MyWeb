import { Card, Icon } from "antd";
import { Meta } from "antd/lib/list/Item";
import * as React from "react";
import { Link } from "react-router-dom";
import { IArticleOption } from "./Main";
export class ArticleItem extends React.Component<IArticleOption,{}> {

  render() {
    return (
      <Card>
        <div className="article-li">
          <div>
            <img src={require('../../images/zd03.jpg')} alt="" />
          </div>
          <div>
            <Meta
              title={this.props.title}
              description={this.props.content+"..."}
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
            <Link to={"/article/"+this.props.id}>阅读原文</Link>
        </div>
      </Card>
    )
  }
}