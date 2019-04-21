import { SET_LOGIN } from ".";
import { iFetch, RequestStatus } from "../utils/Request";
import { ReqApi } from "../utils/Default";

const setLogin=(isLogin:boolean)=>{
  return {
    type:SET_LOGIN,
    isLogin
  }
}

export const getLoginStatus:any =()=>dispatch=>{
  return iFetch(ReqApi.LoginStatus).then(res=>{
    dispatch(setLogin(res.code === RequestStatus.Ok));
  })
}
export const loginOut:any =()=>dispatch=>{
  return iFetch(ReqApi.LoginOut).then(res=>{
    dispatch(setLogin(false));
  })
}

export interface ISignOPtion{
  uname:string;
  pwd:string;
  [key:string]:string;
}

export const login:any=(data:ISignOPtion)=>dispatch=>{
  return iFetch(ReqApi.Login,data).then(data=>{
    if(data.code===RequestStatus.Ok){
      sessionStorage.setItem('user',data.data.userInfo.authority.toString());
      dispatch(setLogin(true));
      return true;
    }
    return false;
  })
}

export const register:any=(data:ISignOPtion)=>dispatch=>{
  return iFetch(ReqApi.Register,data).then(data=>{
    return data.code===RequestStatus.Ok;
  })
}