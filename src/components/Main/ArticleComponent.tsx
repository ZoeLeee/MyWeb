import { Button, Card, Spin } from "antd";
import { History } from "history";
import * as React from "react";
import { match } from "react-router";
import { AppStatus } from "../..";
import { IModel } from "../../reducers";
import { connect } from "react-redux";
import { IArticleOption } from "./Main";
import { Dispatch } from "redux";
import { fetchArticleData, showArticle } from "../../actions/articles";

interface IArticleProps{
  match: match;
  history:History;
  article:IArticleOption;
  dispatch:Dispatch;
}

class ArticleCom extends React.Component<IArticleProps, {}> {
  constructor(props) {
    super(props);
  }
  private editorArtice = () => {
    let data={...this.props.article,id:this.props.match.params["id"]}
    this.props.history.push("/editor",data);
  }
  private deleteArticle=()=>{
    
  }
  componentWillUnmount(){
    this.props.dispatch(showArticle({title:"",content:""}))
  }
  componentDidMount() {
    let id = this.props.match.params["id"];
    this.props.dispatch(fetchArticleData(id))
  }
  render() {
    if (this.props.article.title === "" && this.props.article.content === "") {
      return <div className="spin">
        <Spin />
      </div>
    }
    return (
      <Card>
        <h1 style={{ textAlign: "center" }}>{this.props.article.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: this.props.article.content }}></div>
        {
          AppStatus.isAdmin && <div style={{ textAlign: "right" }}>
            <Button onClick={this.editorArtice} type="primary">编辑</Button>
            <Button onClick={this.editorArtice} type="primary">删除</Button>
          </div>}
      </Card>
    )
  }
}

function mapStateToProps({article}:IModel){
  return {article}
}

export default connect(mapStateToProps)(ArticleCom)