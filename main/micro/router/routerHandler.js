import { lifeCycle } from '../lifeCycle';
import { getPrefix, isTurnChild } from '../utils';
import { curSubApp, originApp } from '../const/windowVariables';

// 保存当前路由和即将切换的下一个路由
const changeActiveAppState = () => {
  if (window[curSubApp]) {
    window[originApp] = window[curSubApp];
  }
  window[curSubApp] = getPrefix();
}

// 切换app
export const turnApp = () => {
  if (isTurnChild()) {
    changeActiveAppState();
    lifeCycle();
  }
}
