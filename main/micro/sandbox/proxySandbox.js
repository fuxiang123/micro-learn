// 代理沙箱，性能较好，但依赖proxy.适用于版本较高的浏览器

let defaultValue = {}; // 子应用的沙箱容器
export class ProxySandbox {
  constructor() {
    // 1. 代理对象
    this.proxy = null;
    this.active();
  }
  // 沙箱激活
  active() {
    this.proxy = new Proxy(window, {
      set(target, key, value) {
        defaultValue[key] = value;
        return true;
      },
      get(target, key) {
        if (typeof target[key] === 'function') {
          return target[key].bind(target); // 让this指向window而非proxy
        }
        return defaultValue[key] || target[key];
      },
    })
  }
  // 沙箱销毁
  inactive() {
    defaultValue = {};
  }
}