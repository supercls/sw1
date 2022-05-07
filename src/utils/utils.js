export function funCalc(arrList, operator = 1, precision = 2) {
    if (arrList.length === 0) return 0;
    // 计算最大数度值,避免精度丢失，先扩大位数，再缩小
    let mPow = Math.pow(10, precision); // 默认2位小数
    let total = 0;
    if (operator == 2) {
      total = 1;
      mPow = 1;
    }
    for (const item of arrList) {
      let tem = 0;
      if (item) {
        tem = parseFloat(item) ?? 0; // parseFloat处理，转化失败时给0
        tem = !isNaN(tem) ? tem : 0; // 处理 NaN 情况
      }
      switch (operator) {
        case 1:
          total += tem * mPow;
          break;
        case 2:
          total *= tem * mPow;
          break;
        default:
          total += tem * mPow;
      }
    }
    const res = (total / mPow).toFixed(precision);
    return res;
  }
