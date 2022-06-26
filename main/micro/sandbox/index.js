import { microWeb } from "../const/windowVariables"
import { performScript } from "./performScript";
// import { SnapShopSandbox } from "./snapShotSandbox";
import { ProxySandbox } from "./proxySandbox";

// 检查子应用是否具有完整的生命周期
const isCheckLifecycle = lifecycle => lifecycle && lifecycle.beforeLoad && lifecycle.mounted && lifecycle.destoryed;

// 子应用生命周期处理， 环境变量设置
export const sandBox = (subApp, script) => {
  const proxy = new ProxySandbox();

  if (!subApp.proxy) {
    subApp.proxy = proxy;
  }

  // 1. 设置环境变量
  window[microWeb] = true;
  // 2. 运行js文件
  const lifeCycle = performScript(script, subApp.name, subApp.proxy.proxy);
  // 将生命周期挂载到app上
  if (isCheckLifecycle(lifeCycle)) {
    subApp.beforeLoad = lifeCycle.beforeLoad;
    subApp.mounted = lifeCycle.mounted;
    subApp.destoryed = lifeCycle.destoryed;
  }
}