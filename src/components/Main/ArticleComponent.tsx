import { Card, Icon, Spin, Button } from "antd";
import * as React from "react";
import { match } from "react-router";
import { DefaultConfig } from "../../utils/Default";
import { Get, Post, RequestStatus } from "../../utils/Request";
import { AppStatus } from "../..";
import { History } from "history";

interface IArticleComState {
  title: string,
  content: string
}

export class ArticleCom extends React.Component<{ match: match ,history:History}, IArticleComState> {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    }
  }
  private EditorArtice = () => {
    let data={...this.state,id:this.props.match.params["id"]}
    this.props.history.push("/editor",data);
  }
  componentDidMount() {
    let id = this.props.match.params["id"];
    Get(DefaultConfig.url + 'article/' + id, (res) => {
      if (res.status === 200 && res.data.code === RequestStatus.Ok) {
        let newData = res.data.data[0];
        this.setState({ title: newData.title, content: newData.content });
        newData.scanCount = (parseFloat(newData.scanCount) + 1).toString();
        //更新浏览数量
        Post(DefaultConfig.url + 'update', newData)
      }
    })
  }
  render() {
    if (this.state.title === "" && this.state.content === "") {
      return <div className="spin">
        <Spin />
      </div>
    }
    return (
      <Card>
        <h1 style={{ textAlign: "center" }}>{this.state.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
        {
          AppStatus.isAdmin && <div style={{ textAlign: "right" }}>
            <Button onClick={this.EditorArtice} type="primary">编辑</Button>
          </div>}
      </Card>
    )
  }
}