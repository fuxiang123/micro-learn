// 快照沙箱,如果对象较多的话，性能会比较差
// 适应于老版本的浏览器
export class SnapShopSandbox {
  constructor() {
    // 1. 代理对象
    this.proxy = window;
    this.active();
  }
  // 沙箱激活
  active() {
    // 创建一个沙箱快照
    this.snapShop = new Map();
    // 遍历全局环境,记录window上的所有key
    // 在子路由生命周期之前执行，只保存的初始的window状态
    Object.keys(window).forEach(key => {
      this.snapShop[key] = window[key];
    })
  }
  // 沙箱销毁
  inactive() {
    Object.keys(window).forEach(key => {
      if (window[key] !== this.snapShop[key]) {
        // 还原window上的所有key，并且生命周期之后挂载的全局状态会被赋值undefined
        window[key] = this.snapShop[key]; 
      }
    })
  }
}