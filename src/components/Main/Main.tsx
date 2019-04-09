import { List, Spin } from "antd";
import * as React from "react";
import { ReqApi } from "../../utils/Default";
import { Get, RequestStatus } from "../../utils/Request";
import { ArticleItem } from "./ArticleItem";
import { ArticleListCom } from "./ArticleList";
import { KeyWordTabsComponment } from "./KeyWordTags";
import { SearchComponent } from "./Search";
import { UserInfoComponent } from "./UserInfo";

export interface IArticleOption{
  id?:string,
  title:string;
  content:string;
  time:string;
  imgUrl?:string;
  scanCount:string;
  tag:string[];
}
interface IArticelesState{
  articles:IArticleOption[]
}

export class MainComponent extends React.Component<{},IArticelesState> {
  constructor(props){
    super(props);
    this.state={
      articles:[]
    }
  }
  componentWillMount(){
    Get(ReqApi.Articles,(res)=>{
      if(res.status===200){
        if(res.data.code===RequestStatus.Ok){
          let div=document.createElement('div');
          let ars=this.state.articles;
          for(let article of res.data.data){
            div.innerHTML=article.content;
            ars.push({
              id:article._id,
              title:article.title,
              content:div.innerText,
              time:article.time,
              scanCount:article.scanCount,
              tag:article.tag
            })
          }
          this.setState({articles:ars});
        }
      }
    })
  }
  render() {
    return (
        <div className="content">
          {
            this.state.articles.length>0?(  <List
              itemLayout="vertical"
              size="large"
              dataSource={this.state.articles}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                >
                  <ArticleItem {...item} />
                </List.Item>
              )}
            />):<Spin />
          }
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