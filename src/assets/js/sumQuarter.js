/**
 * 针对数字运算解决、兼容了数字精度丢失问题
 * @type {*[]}
 */
// 测试数据
const saleItems = [
  {month: 1, date: 1, transationId: "1", salePrice: 100.22},
  {month: 1, date: 2, transationId: "2", salePrice: 102.01},
  {month: 5, date: 3, transationId: "3", salePrice: 1020.99},
  {month: 3, date: 1, transationId: "4", salePrice: 89.22},
  {month: 12, date: 1, transationId: "5", salePrice: 78.45},
  {month: 9, date: 2, transationId: "6", salePrice: 343.22},
  {month: 9, date: 2, transationId: "7", salePrice: 23.01},
  {month: 10, date: 3, transationId: "8", salePrice: 11.11}
]

/**
 * 计算季度销量
 * @param saleItems
 * @returns {[]}
 */
function sumByQuarter(saleItems) {
  let array = []
  let quarterMap = {}
  saleItems.forEach(item => {
    let quarter = parseInt((item.month - 1) / 3) + 1
    quarterMap[quarter] = quarterMap[quarter] || []
    quarterMap[quarter].push(item)
  })

  for (let quarter in quarterMap) {
    let value = quarterMap[quarter]
    let transactionNums = value.length
    let totalPrices = value.reduce((prev, cur) => {
      return accAdd(prev, cur.salePrice)
    }, 0)

    array.push({
      quarter: quarter,
      totalPrices:totalPrices,
      transactionNums: transactionNums
    })
  }

  return array
}

/**
 * 计算季度平均销量
 * @param saleItems
 * @returns {*|*[]}
 */
function averageByQuarter(saleItems){
  let array = sumByQuarter(saleItems)
  array.forEach(item => {
    item.totalPrices = accDiv(item.totalPrices, item.transactionNums, 2)
  })

  array = JSON.parse(JSON.stringify(array).replace(/totalPrices/g,"averagePrices"));
  return array
}

/**
 * 除法 解决数字精度丢失
 * @param arg1
 * @param arg2
 * @param decimals 保留小数的位数
 * @returns {number|*}
 */
function accDiv(arg1, arg2, decimals) {
  let [t1, t2] = getDitLength(arg1, arg2);
  let r1 = Number(arg1.toString().replace(".", ""));
  let r2 = Number(arg2.toString().replace(".", ""));
  let num = Number((r1 / r2) * Math.pow(10, t2 - t1));
  return decimalsFormat(num, decimals);
}

/**
 * 加法
 * @param arg1
 * @param arg2
 * @returns {number|*}
 */
function accAdd(arg1, arg2) {
 let [r1, r2] = getDitLength(arg1, arg2);
 let m = Math.pow(10, Math.max(r1, r2));
 return accDiv((accMul(arg1, m) + accMul(arg2, m)) , m, 2);
}

/**
 * 乘法
 * @param arg1
 * @param arg2
 * @param decimals 保留小数的位数
 * @returns {number|*}
 */
function accMul(arg1, arg2, decimals) {
  let s1 = arg1.toString(), s2 = arg2.toString();
  let [r1, r2] = getDitLength(arg1, arg2);
  let m = r1 + r2;
  let num = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  return decimalsFormat(num, decimals);
}

/**
 * 获取小数点的位数
 * @param arg1
 * @param arg2
 * @returns {[number, number]}
 */
function getDitLength(arg1, arg2) {
  let r1, r2;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }

  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }

  return [r1, r2]
}

/**
 * 保留小数位
 * @param num
 * @param decimals
 * @returns {number}
 */
function decimalsFormat(num, decimals) {
  if (decimals != undefined && decimals >= 0) {
    num = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
  return num;
}

// 方法调用
console.log('sumByQuarter:%o', sumByQuarter(saleItems))
console.log('averageByQuarter:%o', averageByQuarter(saleItems))



