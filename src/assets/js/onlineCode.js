/**
 * 针对数组排序问题解答
 * @type {*[]}
 */
let ascSort = {
  // 测试数据
  extensions: [
    {firstName: 'a', lastName: 'pn', ext: 33, extType: 'DigitalUser'},
    {firstName: 'b', lastName: 'pn', ext: 32, extType: 'DigitalUser'},
    {firstName: 'a', lastName: 'pn', ext: 50, extType: 'AO'},
    {firstName: 'a', lastName: 'ab', ext: '123', extType: 'AO'},
    {firstName: 'b', lastName: 'pn', ext: 40, extType: 'Dept'},
    {firstName: 'b', lastName: '', ext: '34', extType: 'AO'},
    {firstName: 'b', lastName: 'nb', ext: '', extType: 'VirtualUser'},
    {firstName: 'en', lastName: 'ww', ext: 32, extType: 'FaxUser'}
  ],
  // extType的排序数据
  extTypeSort: ['Dept', 'AO', 'FaxUser', 'VirtualUser', 'DigitalUser'],
  sortProp:['firstName', 'lastName', 'ext'],
  // 排序方法、只支持升序
  ascSort (item1, item2, propArray) {
    let compareArray = []
    for (let i = 0; i < propArray.length; i++) {
      let prop = propArray[i]
      if (item1[prop] > item2[prop]) {
        compareArray.push(1)
        break
      } else if (item1[prop] === item2[prop]) {
        compareArray.push(0)
      } else {
        compareArray.push(-1)
        break
      }
    }

    for (let j = 0; j < compareArray.length; j++) {
      if (compareArray[j] === 1 || compareArray[j] === -1) {
        return compareArray[j]
      }
    }
    return false
  },

  // 按名称排序
  sortExtensionsByName () {
    this.extensions.sort((a, b) => {
      return this.ascSort(a, b, this.sortProp)
    })
    return this.extensions
  },

  /**
   * sort extensions by extType follow these orders ASC
   * 方法一：执行效率更高，数据量大推荐使用
   * @param extensions
   * @returns {Array}
   */
  sortExtensionsByExtType () {
    let array = []
    let map = {}
    // 转化成map
    this.extensions.forEach(item => {
      map[item.extType] = map[item.extType] || []
      map[item.extType].push(item)
    })

    this.extTypeSort.forEach(extType => {
      array = array.concat(map[extType])
    })

    return array
  },

  /**
   * sort extensions by extType follow these orders ASC
   * 方法二:代码比较少，数据量少可以使用
   * @param
   * @returns {Array}
   */
  sortExtensionsByExtType1 () {
    let array = []
    this.extTypeSort.forEach(extType => {
      this.extensions.forEach(item => {
        if (item.extType === extType) {
          array.push(item)
        }
      })
    })
    return array
  }
}

let sumQuarter = {
  saleItems: [
    {month: 1, date: 1, transationId: '1', salePrice: 100.22},
    {month: 1, date: 2, transationId: '2', salePrice: 102.01},
    {month: 5, date: 3, transationId: '3', salePrice: 1020.99},
    {month: 3, date: 1, transationId: '4', salePrice: 89.22},
    {month: 12, date: 1, transationId: '5', salePrice: 78.45},
    {month: 9, date: 2, transationId: '6', salePrice: 343.22},
    {month: 9, date: 2, transationId: '7', salePrice: 23.01},
    {month: 10, date: 3, transationId: '8', salePrice: 11.11}
  ],
  // 计算季度销量
  sumByQuarter () {
    let array = []
    let quarterMap = {}
    this.saleItems.forEach(item => {
      let quarter = parseInt((item.month - 1) / 3) + 1
      quarterMap[quarter] = quarterMap[quarter] || []
      quarterMap[quarter].push(item)
    })

    for (let quarter in quarterMap) {
      let value = quarterMap[quarter]
      let transactionNums = value.length
      let totalPrices = value.reduce((prev, cur) => {
        return math.accAdd(prev, cur.salePrice)
      }, 0)

      array.push({
        quarter: quarter,
        totalPrices: totalPrices,
        transactionNums: transactionNums
      })
    }

    return array
  },

  // 计算季度平均销量
  averageByQuarter () {
    let array = this.sumByQuarter(this.saleItems)
    array.forEach(item => {
      item.totalPrices = math.accDiv(item.totalPrices, item.transactionNums, 2)
    })
    // 属性名替换
    array = JSON.parse(JSON.stringify(array).replace(/totalPrices/g, 'averagePrices'))
    return array
  }
}

// 数组过滤
function getUnUsedKeys (allKeys, usedKeys = []) {
  let dataType = Object.prototype.toString.call(allKeys)
  if (dataType === '[object Number]') {
    let array = []
    for (let i = 0; i <= allKeys; i++) {
      array.push(i)
    }
    return array.filter(key => !usedKeys.includes(key))
  } else if (dataType === '[object Array]') {
    return allKeys.filter(key => !usedKeys.includes(key))
  } else {
    console.log('allKeys should be an array or number')
  }
}

// 默认值
let SequenceConfig = {
  idx: 0
}

// 序列号生成器
class Sequence {
  constructor (incr = 1) {
    this.incr = incr
    this.config = SequenceConfig
  }

  increaseIdx () {
    this.config['idx'] += this.incr
    return this.config['idx']
  }

  next () {
    let idx = this.increaseIdx()
    return idx
  }
}

/**
 * 数字运算
 */
let math = {
  // 除法
  accDiv (arg1, arg2, decimals) {
    let [t1, t2] = this.getDitLength(arg1, arg2)
    let num = Number((this.decimalToInt(arg1) / this.decimalToInt(arg2)) * Math.pow(10, t2 - t1))
    return this.decimalsFormat(num, decimals)
  },
  // 加法
  accAdd (arg1, arg2) {
    let [r1, r2] = this.getDitLength(arg1, arg2)
    let m = Math.pow(10, Math.max(r1, r2))
    return this.accDiv((this.accMul(arg1, m) + this.accMul(arg2, m)), m, 2)
  },
  // 乘法
  accMul (arg1, arg2, decimals) {
    let [r1, r2] = this.getDitLength(arg1, arg2)
    let m = r1 + r2
    let num = this.decimalToInt(arg1) * this.decimalToInt(arg2) / Math.pow(10, m)
    return this.decimalsFormat(num, decimals)
  },
  // 获取小数点的位数
  getDitLength (arg1, arg2) {
    let r1, r2
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }

    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    return [r1, r2]
  },
  // 保留小数位
  decimalsFormat (num, decimals) {
    if (decimals != undefined && decimals >= 0) {
      num = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
    }
    return num
  },
  decimalToInt (param) {
    return Number(param.toString().replace('.', ''))
  }
}

// 名称排序
console.log('sortExtensionsByName:%o', ascSort.sortExtensionsByName())
// extType 按指定数组排序
console.log('sortExtensionsByExtType:%o', ascSort.sortExtensionsByExtType())
// extType 按指定数组排序
console.log('sortExtensionsByExtType1:%o', ascSort.sortExtensionsByExtType1())
// 计算季度销量
console.log('sumByQuarter:%o', sumQuarter.sumByQuarter())
// 计算季度平均销量
console.log('averageByQuarter:%o', sumQuarter.averageByQuarter())
// 迭代器
let sequence1 = new Sequence()
let sequence3 = new Sequence()
let sequence2 = new Sequence()
console.log(sequence1.next())
console.log(sequence2.next())
console.log(sequence3.next())
console.log(sequence1.next())
console.log(sequence2.next())
console.log(sequence3.next())
console.log(sequence1.next())
// getUnUsedKeys 按指定数组排序
console.log('getUnUsedKeys:%o', getUnUsedKeys(100, [1, 2, 3, 4, 5, 2, 3, 4, 100]))
console.log('getUnUsedKeys:%o', getUnUsedKeys([1,2,3,4,5], [1, 2]))
