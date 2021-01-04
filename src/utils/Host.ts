// url:"http://127.0.0.1:3000/"
const protocol = location.protocol;

export const CURRENT_HOST = protocol === "http:" ? "http://api.dodream.wang:3000/api/" : "https://www.dodream.wang/api/";
// export const CURRENT_HOST = "http://127.0.0.1:3000/api/";

export const ReqApi = {
  Login: CURRENT_HOST + "login",
  Register: CURRENT_HOST + "register",
  LoginOut: CURRENT_HOST + "loginout",
  LoginStatus: CURRENT_HOST + "loginstatus",
  Update: CURRENT_HOST + "update",
  Write: CURRENT_HOST + "write",
  Article: CURRENT_HOST + "article",
  Upload: CURRENT_HOST + "upload",
  Articles: CURRENT_HOST + "articles",
};

export const ProjectApi = {
  CategoryList: CURRENT_HOST + "projects-categorys",
  ProjectList: CURRENT_HOST + "projects",
  GetProjectList: CURRENT_HOST + "getProject",
};