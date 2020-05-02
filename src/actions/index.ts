export const SET_LOGIN="SET_LOGIN";
export const GET_ARTICLES = "GET_ARTICLES";
export const SHOW_ARTICLE="SHOW_ARTICLE";


export interface IAciton{
  type:string;
  [key:string]:any;
}
