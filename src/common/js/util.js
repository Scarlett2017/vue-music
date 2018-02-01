// 随机数生成函数
function getRandomInt(min, max) {
  return Math.floor(Math.random * (max - min + 1) + min)
}

// 数组洗牌函数
export function shuffle(arr) {
  let _arr = arr.slice()//创建arr副本，不会直接修改原数组顺序
  for (let i = 0; i < _arr.lenth; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
