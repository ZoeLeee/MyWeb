import { Card, Icon } from "antd";
import { Meta } from "antd/lib/list/Item";
import * as React from "react";
import { Link } from "react-router-dom";
import { IArticleOption } from "../Main/Main";
export class ArticleItem extends React.Component<IArticleOption,{}> {

  render() {
    return (
      <Card>
        <div className="article-li">
          <div>
            <img src={require('../../images/zd03.jpg')} alt="" />
          </div>
          <Link  to={"/article/"+this.props.id}>
            <Meta
              title={this.props.title}
              description={this.props.content.substr(0,100)+"..."}
            />
          </Link>
        </div>
        <div className=" article-info">
          <ul className="list-unstyle-inline">
            <li>
              <a href="">
                <Icon type="paper-clip" theme="outlined" />
                {this.props.tag.join("|")}
              </a>
            </li>
            <li>
              <Icon type="clock-circle" theme="outlined" />
              <span>{this.props.time}</span>
            </li>
            <li>
              <Icon type="eye" theme="outlined" />
              <span>
                浏览（{this.props.scanCount}）
              </span>
            </li>
          </ul>
            <Link to={"/article/"+this.props.id}>阅读原文</Link>
        </div>
      </Card>
    )
  }
}