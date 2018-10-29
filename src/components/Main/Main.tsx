import * as React from "react";
import { UserInfoComponent } from "./UserInfo";
import { SearchComponent } from "./Search";
import { KeyWordTabsComponment } from "./KeyWordTags";
import { ArticleListCom } from "./ArticleList";

export class MainComponent extends React.Component{
  render(){
    return (
      <div>
        <div className="content">
          <div>
            文章区
          </div>
          <div className='side-info'>
            <UserInfoComponent />
            <SearchComponent />
            <KeyWordTabsComponment />
            <ArticleListCom title="点击排行" />
          </div>
        </div>
      </div>
    )
  }
}