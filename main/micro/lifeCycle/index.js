import { getMainLifecycle } from '../../_micro/const/mainLifeCycle';
import { originApp, curSubApp } from '../const/windowVariables';
import { findAppByRouter } from '../utils';
import { loadHtml } from '../loader';

// 切换路由时，执行路由对应生命周期
export const lifeCycle = async () => {
  const prevApp = findAppByRouter(window[originApp]);
  const nextApp = findAppByRouter(window[curSubApp]);

  if (!nextApp) {
    return;
  }

  if (prevApp) {
    if (prevApp.proxy && prevApp.proxy.inactive) {
      prevApp.proxy.inactive(); // 沙箱销毁
    }
    await destoryed(prevApp);
  }
  const app = await beforeLoad(nextApp);
  await mounted(app);
}

// 以下三个生命周期中，只需要分别执行子应用和主应用对应的生命周期即可
export const beforeLoad = async (app) => {
  await runMainLifeCycle('beforeLoad');
  const subApp = await loadHtml(app); // 加载子应用html
  subApp && subApp.beforeLoad && subApp.beforeLoad(); // 执行子应用生命周期
  console.log("subApp", subApp);
  return subApp; 
};
export const mounted = async (app) => {
  app && app.mounted && app.mounted({
    appInfo: app.appInfo,
    entry: app.entry,
  }); // 执行子应用的生命周期，将当前app信息传入生命周期，方便子应用获取
  await runMainLifeCycle('mounted');
};
export const destoryed = async (app) => {
  app && app.destoryed && app.destoryed(); // 执行子应用的生命周期
  await runMainLifeCycle('destoryed');
};

// 执行主应用的生命周期
export const runMainLifeCycle = async (lifeCycleName) => {
  const mainlife = getMainLifecycle();
  mainlife[lifeCycleName].map(async item => await item());
}