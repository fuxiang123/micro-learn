import { fetchResource } from "../utils/fetchResource";
import { sandBox } from "../sandbox";

// 加载html
export const loadHtml = async (app) => {
  let container = app.container;

  let entry = app.entry;
  const [dom, scripts] = await parseHtml(entry, app.name)
  const ct = document.querySelector(container);
  if (!ct) {
    throw new Error(`容器${container}不存在`);
  }
  ct.innerHTML = dom;
  scripts.forEach(script => sandBox(app, script));
  
  return app;
}

const cache = {};

export const parseHtml = async (entry, name) => {
  if (cache[name]) {
    return cache[name];
  }
  // 请求对应子路由的html资源
  const html = await fetchResource(entry);

  const div = document.createElement('div');
  div.innerHTML = html;

  const [dom, scriptUrl, script] = getResources(div, entry);

  const fetchedSrcipts  = await Promise.all(scriptUrl.map(async item => await fetchResource(item)));
  // 将所有的js搜集到一起
  const allScripts = [...script, ...fetchedSrcipts];
  const res = [dom, allScripts];

  cache[name] = res;
  return res;
}

// 获取元素的dom, scriptUrl，script
export const getResources = (root, entry) => {
  const scriptUrl = []; // 收集url形式的script标签中的js
  const script = []; // 收集普通script标签中的js
  const dom = root.outerHTML;

  const deepParse = (element) => {
    const children = element.children;
    const parent = element.parent;
    // 处理script标签中的内容
    if (element.nodeName.toLowerCase() === 'script') {
      const src = element.getAttribute('src');
      if (src) {
        if (src.startsWith('http')) {
          scriptUrl.push(src);
        } else {
          // 如果不是以http开头的，需要拼接上子应用的入口路径，这样才能访问到子应用资源
          // 否则资源会错误导向当前主应用
          scriptUrl.push(`http:${entry}/${src}`);
        }
      } else {
        script.push(element.outerHTML);
      }

      if (parent) {
        parent.replaceChild(document.createComment('次js文件已被微前端替换'), element);
      }
    }

    // 处理link标签内容
    if (element.nodeName.toLowerCase() === 'link') {
      const href = element.getAttribute('href');
      if (href.endsWith('.js')) { 
        if (href.startsWith('http')) {
          scriptUrl.push(href);
        } else {
          scriptUrl.push(`http:${entry}/${href}`);
        }
      }
    }

    for (let i = 0; i < children.length; i++) {
      deepParse(children[i]);
    }
  }

  deepParse(root);
  return [dom, scriptUrl, script];
}