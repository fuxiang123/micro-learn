// 获取资源的文本
export const fetchResource = url => fetch(url).then(async res=> await res.text());