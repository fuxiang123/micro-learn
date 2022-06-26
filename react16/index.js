import React from 'react'
import "./index.scss"
import ReactDOM from 'react-dom'
import BasicMap from './src/router';
import { setMain } from './src/utils/main';

const render = () => {
  ReactDOM.render(<BasicMap />, document.getElementById('app-react'))
}

if (!window.__MICRO_WEB__) {
  render()
}

export const beforeLoad = () => {
  console.log('react16开始加载')
}

export const mounted = (app) => {
  setMain(app)
  render()
}

export const destoryed = () => {
  console.log('react16卸载')
}
