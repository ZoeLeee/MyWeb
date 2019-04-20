import { SET_LOGIN } from ".";
import { iFetch, RequestStatus, Post } from "../utils/Request";
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


export const login:any=(data:{uname:string,pwd:string})=>dispatch=>{
  return iFetch(ReqApi.Login,data).then(data=>{
    if(data.code===RequestStatus.Ok){
      sessionStorage.setItem('user',data.data.userInfo.authority.toString());
      dispatch(setLogin(true));
      return true;
    }
    return false;
  })
}