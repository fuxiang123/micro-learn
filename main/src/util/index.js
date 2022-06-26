import { registerMicroApps, start } from '../../micro';
import * as loading from '../store/loading';

// const store = createStore()

// window.store = store
// store.subscribe((newValue, oldValue) => {
//   console.log(newValue, oldValue, '---')
// })

export const registerApp = (list) => {
  // 注册到微前端框架里
  registerMicroApps(list, {
    beforeLoad: [
      () => {
        loading.changeLoading(true)
      }
    ],
    mounted: [
      () => {
        loading.changeLoading(false)
      }
    ],
    destoryed: [
      () => {
      }
    ]
  })
  start();
} 
