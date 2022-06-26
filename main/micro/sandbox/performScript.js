// 执行搜集好的js代码字符串
export const performScript = (script, appName, global) => {
  window.proxy = global;
  // 通过子应用的webpack - library配置，将子应用的生命周期函数挂载到window[appName]下
  const scriptText = `
    return ((window) => {
      ${script};
      return window['${appName}'];
    })(window.proxy)
  `
  // 使用eval
  return new Function(scriptText)();
}