
export enum RequestStatus {
  Ok = 0,
  Err = -1,
  Other = 1,
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