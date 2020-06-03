import { IArticleOption } from "../components/Main/Main";
import { iFetch, RequestStatus } from "../utils/Request";
import { ReqApi } from "../utils/Host";
import { GET_ARTICLES, SHOW_ARTICLE } from ".";
import { saveScanIdAndIsUpdate } from "../utils/Utils";


const getArticles = (articles: IArticleOption[]) => {
  return {
    type:GET_ARTICLES,
    articles
  }
}

export const showArticle=(article:IArticleOption)=>{
  return {
    type:SHOW_ARTICLE,
    data: article
  }
}

export const fetchActicles:any = () => dispatch => {
  return iFetch(ReqApi.Articles).then(data => {
    if (data.code === RequestStatus.Ok) {
      let div = document.createElement('div');
      let articles: IArticleOption[] = [];
      for (let art of data.data) {
        div.innerHTML = art.content;
        articles.push({
          id: art._id,
          title: art.title,
          content: div.innerText,
          time: art.time,
          scanCount: art.scanCount,
          tag: art.tag
        })
      }
      dispatch(getArticles(articles));
    }
  })
}



export const fetchArticleData:any=(id:string)=>dispatch=>{
  return iFetch(ReqApi.Article+'/'+id).then(data=>{
    if(data.code===RequestStatus.Ok){
      let newData=data.data[0];
      dispatch(showArticle(newData));
      return newData;
    }
  }).then(data=>{
    if(saveScanIdAndIsUpdate(id)){
      data.scanCount = (parseFloat(data.scanCount) + 1).toString();
      iFetch(ReqApi.Update,data);
    }
  })
}

export const updateArticle:any=(data)=>dispatch=>{
  return iFetch(ReqApi.Update,data).then(res=>{
    return res.code === RequestStatus.Ok;
  });
}

export const writeArticle:any=(data)=>dispatch=>{
  return iFetch(ReqApi.Write,data).then(res=>{
    return res.data ;
  });
}