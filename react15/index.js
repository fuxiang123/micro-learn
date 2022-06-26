import React from 'react'
import ReactDOM from 'react-dom'
import BasicMap from './src/router/index.jsx';
import "./index.scss"

const render = () => {
  ReactDOM.render((
    <BasicMap />
  ), document.getElementById('app-react'))
}

if (!window.__MICRO_WEB__) {
  render()
}

export const beforeLoad = () => {
  console.log('react15开始加载')
}

export const mounted = () => {
  render()
  console.log('react15加载成功')
}

export const destoryed = () => {
  console.log('react15卸载')
}
