import axios from 'axios';
axios.defaults.withCredentials = true;

export enum RequestStatus {
  Ok = 0,
  Err = -1,
  Other = 1,
}

export function Get(url, callback?: (res) => void, config?: any) {
  return axios.get(url, config).then(callback)
}

export function Post(url: string, data: any, callback?: (res) => void) {
  return axios.post(url, data).then(callback)
}

export async function iFetch(url: string, data?: any, option?: any) {
  let opt:any = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
    credentials: 'include',
    headers:{
      'Content-Type': 'application/json'
   },
  }
  if(data){
    opt.method="POST";
    opt.body= JSON.stringify(data);
  }
  return fetch(url, opt)
    .then(response => response.json());
}