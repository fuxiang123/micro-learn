import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

const render = () => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app-vue')
}

// 未启动微前端时，正常渲染页面，作为普通项目访问
if (!window.__MICRO_WEB__) {
  render()
}
/**
 * 定义生命周期，可以直接在window[library]中访问到
 * 启动微前端时，加载下列生命周期
 */
// 生命周期：开始加载
export async function beforeLoad() {
  console.log('vue2开始加载');
}

// 生命周期：渲染成功
export async function mounted() {
  console.log('vue2加载成功');
  render()
}

// 生命周期：卸载
export async function destoryed(ctx) {
  console.log('vue2卸载');
  if (ctx && ctx.container) {
    document.querySelector(ctx.container).innerHTML = ''
  }
}
