import { List, Spin } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchActicles } from "../../actions/articles";
import { ArticleItem } from "./ArticleItem";
import { ArticleListCom } from "./ArticleList";
import { KeyWordTabsComponment } from "./KeyWordTags";
import { SearchComponent } from "./Search";
import { UserInfoComponent } from "./UserInfo";

export interface IArticleOption{
  id?:string,
  title:string;
  content:string;
  time?:string;
  imgUrl?:string;
  scanCount?:string;
  tag?:string[];
}

class MainComponent extends React.Component<{dispatch?:Dispatch,articles?:IArticleOption[]},{}> {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.dispatch(fetchActicles());
  }
  render() {
    return (
        <div className="content">
          {
            this.props.articles&&this.props.articles.length>0?(  <List
              itemLayout="vertical"
              size="large"
              dataSource={this.props.articles}
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

function mapStateToProps({articles}) {
  return {
    articles
  }
}

export default connect(mapStateToProps)(MainComponent);