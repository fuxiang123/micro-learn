import { getList } from "../const/subApps";
import { curSubApp } from '../const/windowVariables';

// 给当前的路由打补丁
export const patchRouter = (windowEvent, eventName) => {
  const e = new Event(eventName);
  return function() {
    /* eslint-disable no-undef */
    windowEvent.apply(this, arguments);
    window.dispatchEvent(e);
  }
}

// 获取pathname前缀
export const getPrefix = (path = window.location.pathname) => {
  const pathnameMatch = path.match(/\/\w+/);
  return pathnameMatch ? pathnameMatch[0] : ''
}

// 获取当前的子应用
export const getCurApp = () => {
  const app = filterApp('activeRule', getPrefix());
  return app;
}

// 找到key值 === value的子应用配置信息
export const filterApp = (key, value) => {
  const appList = getList();
  const app = appList.filter(item => item[key] === value);
  if (app && app.length) {
    return app[0];
  }
  return {};
}

// 通过路径获取子应用配置信息
export const findAppByRouter = (router) => {
  return filterApp('activeRule', getPrefix(router));
}

// 是否可以切换子应用
export const isTurnChild = () => {
  console.log(window[curSubApp], getPrefix());
  return window[curSubApp] !== getPrefix();
}
