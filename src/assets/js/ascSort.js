/**
 * 针对数组排序问题解答
 * @type {*[]}
 */

// 测试数据
const extensions = [
  {firstName: 'a', lastName: 'pn', ext: 33, extType: 'DigitalUser'},
  {firstName: 'b', lastName: 'pn', ext: 32, extType: 'DigitalUser'},
  {firstName: 'a', lastName: 'pn', ext: 50, extType: 'AO'},
  {firstName: 'a', lastName: 'ab', ext: '123', extType: 'AO'},
  {firstName: 'b', lastName: 'pn', ext: 40, extType: 'Dept'},
  {firstName: 'b', lastName: '', ext: '34', extType: 'AO'},
  {firstName: 'b', lastName: 'nb', ext: '', extType: 'VirtualUser'},
  {firstName: 'en', lastName: 'ww', ext: 32, extType: 'FaxUser'}
];

// extType的排序数据
const extTypeSort = ['Dept', 'AO', 'FaxUser', 'VirtualUser', 'DigitalUser']

/**
 * 排序方法、只支持升序
 * @param item1
 * @param item2
 * @param propArray 排序属性数组
 * @returns {boolean|*}
 */
function ascSort(item1, item2, propArray) {
  let compareArray = []
  for (let i = 0; i < propArray.length; i++) {
    let prop = propArray[i]
    if (item1[prop] > item2[prop]) {
      compareArray.push(1);
      break;
    } else if (item1[prop] === item2[prop]) {
      compareArray.push(0);
    } else {
      compareArray.push(-1);
      break;
    }
  }

  for (let j = 0; j < compareArray.length; j++) {
    if (compareArray[j] === 1 || compareArray[j] === -1) {
      return compareArray[j];
    }
  }
  return false;
}

/**
 * sort extensions by "firstName" + "lastName" + "ext" ASC
 * @param extensions
 */
function sortExtensionsByName(extensions){
  let sortProp = ['firstName', 'lastName', 'ext']
  extensions.sort((a, b) => {
    return ascSort(a, b, sortProp)
  })
  return extensions
}

/**
 * sort extensions by extType follow these orders ASC
 * 方法一：执行效率更高，数据量大推荐使用
 * @param extensions
 * @returns {Array}
 */
function sortExtensionsByExtType(extensions){
  let array = []
  let map = {}
  //转化成map
  extensions.forEach(item => {
    map[item.extType] = map[item.extType] || []
    map[item.extType].push(item)
  })

  extTypeSort.forEach(extType => {
    array = array.concat(map[extType])
  })

  return array
}

/**
 * sort extensions by extType follow these orders ASC
 * 方法二:代码比较少，数据量少可以使用
 * @param extensions
 * @returns {Array}
 */
function sortExtensionsByExtType1(extensions){
  let array = []
  extTypeSort.forEach(extType => {
    extensions.forEach(item => {
      if (item.extType === extType) {
        array.push(item)
      }
    })
  })

  return array
}

// 方法调用
console.log('sortExtensionsByName:%o', sortExtensionsByName(extensions))
console.log('sortExtensionsByExtType:%o', sortExtensionsByExtType(extensions))
console.log('sortExtensionsByExtType1:%o', sortExtensionsByExtType1(extensions))

