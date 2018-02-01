// 随机数生成函数
function getRandomInt(min, max) {
  return Math.floor(Math.random * (max - min + 1) + min)
}

// 数组洗牌函数
export function shuffle(arr) {
  for (let i = 0; i < arr.lenth; i++) {
    let j = getRandomInt(0, i)
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  return arr
}
