import * as React from "react";
import { UserInfoComponent } from "./UserInfo";
import { SearchComponent } from "./Search";
import { KeyWordTabsComponment } from "./KeyWordTags";

export class Main extends React.Component{
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
          </div>
        </div>
      </div>
    )
  }
}