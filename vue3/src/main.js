import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setMain } from './utils/global'

let instance = null;

function render() {
  instance = createApp(App);
  instance
    .use(router)
    .mount('#app');
}

// 未启动微前端时，正常渲染页面，作为普通项目访问
if (!window.__MICRO_WEB__) {
  render();
}
/**
 * 定义生命周期，可以直接在window[library]中访问到
 * 启动微前端时，加载下列生命周期
 */
// 生命周期：开始加载
export async function beforeLoad() {
  console.log('vue3开始加载');
}

// 生命周期：渲染成功
export async function mounted(app) {
  window.a = 1;
  console.log("vue3渲染成功");
  setMain(app)
  render();
  console.log("instance", instance);
}

// 生命周期：卸载
export async function destoryed(ctx) {
  console.log('vue3卸载');
  instance.unmount();
  instance = null;
  if (ctx && ctx.container) {
    document.querySelector(ctx.container).innerHTML = ''
  }
}
