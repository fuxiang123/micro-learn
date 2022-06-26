import { turnApp } from "./routerHandler"
import { patchRouter } from '../utils/index'

export const rewriteRouter = () => {
  window.history.pushState = patchRouter(window.history.pushState, 'micro_pushState')
  window.history.replaceState = patchRouter(window.history.replaceState, 'micro_replaceState')

  window.addEventListener('micro_pushState', (e) => {
    turnApp(e)
  })
  window.addEventListener('micro_replaceState', (e) => {
    turnApp(e)
  })
  window.onpopstate = (e) => {
    turnApp(e)
  }
}