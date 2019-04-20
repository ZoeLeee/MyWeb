import { SET_LOGIN, IAciton, GET_ARTICLES, SHOW_ARTICLE } from "../actions";
import { combineReducers } from 'redux';
import { IArticleOption } from "../components/Main/Main";

export interface IModel extends IAciton {
  isLogin: boolean;
  articles: IArticleOption[];
  article:IArticleOption;
}

function loginRedcuer(state = false, action: IModel) {
  switch (action.type) {
    case SET_LOGIN:
      return action.isLogin
    default:
      return state;
  }
}

function setArticles(state = [], action: IModel): IArticleOption[] {
  switch (action.type) {
    case GET_ARTICLES:
      return action.articles;
    default:
      return state;
  }
}

function showArticle(state={title:"",content:""},action:IModel):IArticleOption{
  switch (action.type) {
    case SHOW_ARTICLE:
      return Object.assign({},state,action.data);
    default:
      return state;
  }
}



export const appReducer = combineReducers({
  articles:setArticles,
  isLogin: loginRedcuer,
  article:showArticle
})