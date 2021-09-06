//  防抖函数
export function debounce(func, delay) {
  // 设置一个空值
  let timer = null;
  return function(...args) {
    // 如果有值就清除上一个定时器
    if (timer) clearTimeout(timer);
    // 每次调用都会赋一个新的值
    timer = setTimeout(() => {
      // func就是我们上面传递的this.$refs.scroll.refresh
      // apply可以改变this指向 args是调用函数时传递的参数
      func.apply(this, args);
    }, delay);
  };
}

//转换时间戳
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

//04:04:04
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
