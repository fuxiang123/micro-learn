import { parseHtml } from ".";
import { getList } from "../const/subApps"

// 预加载
export const prefetch = async () => {
  // 获取剩下的子应用
  const list = getList().filter(item => !window.location.pathname.startsWith(item.activeRule));
  // 预加载剩下的子应用
  await Promise.all(list.map(async item => await parseHtml(item.entry, item.name)));
}