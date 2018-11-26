import * as React from "react";
import { UserInfoComponent } from "./UserInfo";
import { SearchComponent } from "./Search";
import { KeyWordTabsComponment } from "./KeyWordTags";
import { ArticleListCom } from "./ArticleList";
import { List } from "antd";
import { ArticleItem } from "./ArticleItem";
import { Link } from "react-router-dom";
import axios from "axios";
import { DefaultConfig } from "../../Utility/Default";

export interface IArticleOption{
  id:string,
  title:string;
  content:string;
  imgUrl?:string;
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
    axios.get(DefaultConfig.url+'articles')
    .then(res=>{
      if(res.status===200){
        if(res.data.success==="ok"){
          let div=document.createElement('div');
          let ars=this.state.articles;
          for(let article of res.data.data){
            div.innerHTML=article.content;
            ars.push({
              id:article._id,
              title:article.title,
              content:div.innerText
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
          <div>
          <Link to="/editor">新建</Link>
          <List
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