 // url:"http://127.0.0.1:3000/"
 const protocol=location.protocol;

export const CURRENT_HOST=protocol==="http"?"http://www.dodream.top:3000/":"https://www.dodream.top/api/";
console.log('CURRENT_HOST: ', CURRENT_HOST);
// export const CURRENT_HOST="http://127.0.0.1:3000/";

export const ReqApi={
  Login:CURRENT_HOST+"login",
  Register:CURRENT_HOST+"register",
  LoginOut:CURRENT_HOST+"loginout",
  LoginStatus:CURRENT_HOST+"loginstatus",
  Update:CURRENT_HOST+"update",
  Write:CURRENT_HOST+"write",
  Article:CURRENT_HOST+"article",
  Upload:CURRENT_HOST+"upload",
  Articles:CURRENT_HOST+"articles",
}