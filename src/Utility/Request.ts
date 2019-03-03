import axios from 'axios';

export function Get(url,callback?:(res)=>void,config?:any){
  return axios.get(url,config).then(callback)
}

export function Post(url:string,data:any,callback?:(res)=>void){
  return axios.post(url,data).then(callback)
}