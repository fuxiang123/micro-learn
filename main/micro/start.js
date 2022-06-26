import { getCurApp } from "../micro/utils";
import { setMainLifecycle } from "../_micro/const/mainLifeCycle";
import { getList, setList } from "./const/subApps"
import { prefetch } from "./loader/prefetch";
import { rewriteRouter } from "./router/rewriteRouter"

rewriteRouter();
// 注册主应用
export const registerMicroApps = (appList, lifeCycle) => {
  console.log("appList", appList);
  setList(appList)
  setMainLifecycle(lifeCycle);
}

// 启动微前端框架
export const start = () => {
  const apps = getList();
  if (!apps.length) {
    throw Error("子应用列表为空，请正确注册");
  }

  const { pathname, hash } = window.location

  const app = getCurApp();
  if (app && hash) {
    const url = `${pathname}${hash}`;
    window.history.pushState({}, '', url);
  }
  
  if (!hash) {
    // 当前没有在使用的子应用
    // 1. 抛出一个错误，请访问正确的连接
    // 2. 访问一个默认的路由，通常为首页或登录页面
    window.history.pushState(null, null, '/vue3#/index')
  }

  // 预加载子应用
  prefetch();
}