import { Card, Icon } from "antd";
import * as React from "react";
import { match } from "react-router";
import { IEditorState } from "../Editor";
import axios from 'axios';
import { DefaultConfig } from "../../Utility/Default";

export class ArticleCom extends React.Component<{match:match},IEditorState> {
  constructor(props){
    super(props);
    this.state={
      title:"",
      content:""
    }
  }
  componentDidMount(){
    let id=this.props.match.params["id"];
    axios.get(DefaultConfig.url+'article/'+id).then((res)=>{
      if(res.status===200&&res.data.success==="ok"){
        let newData=res.data.data[0];
        this.setState({title:newData.title,content:newData.content})
      } 
    })
  }
  render() {
    return (
      <Card>
        <h1 style={{textAlign:"center"}}>{this.state.title}</h1>
        <div 
          dangerouslySetInnerHTML = {{ __html: this.state.content}}></div>
      </Card>
    )
  }
}