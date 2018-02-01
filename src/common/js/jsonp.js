// jsonp封装且promise化，jsonp抓取线上数据

import originJSONP from 'jsonp'

// 将jsop Promise化，将其封装，返回一个promise
export default function jsonp(url, data, option) {
  // 拼接url
  // 首先判断它原本第一个有没有?号，记下来
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      // 不出错就处理，出错就reject
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    })
  });
}

function param(data) {
  // 拼接url
  let url = '';
  for (var i in data) {
    let value = data[i] !== undefined ? data[i] : '';
    url += `&${i}=${encodeURIComponent(value)}`;
  }
  // 把第一个&去掉
  return url ? url.substring(1) : '';
}
