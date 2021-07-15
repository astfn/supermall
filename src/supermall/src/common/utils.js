function DeBounce(func, delay = 200) {
  let timer = null;
  return function(...argu) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      //call、apply会立即执行函数
      func.apply(this, argu);
    }, delay);
  };
}

export { DeBounce };
