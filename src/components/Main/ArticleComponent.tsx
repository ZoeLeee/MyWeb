import { Card, Icon } from "antd";
import * as React from "react";
import { match } from "react-router";
import { articleMap } from "../App";

export class ArticleCom extends React.Component<{match:match}> {
  render() {
    return (
      <Card>
        <div 
          dangerouslySetInnerHTML = {{ __html: articleMap.has(this.props.match.params["content"])?
          articleMap.get(this.props.match.params["content"]):""}}></div>
      </Card>
    )
  }
}