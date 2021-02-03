/**
 * 使用 call 方法调用函数并且不指定第一个参数
 * 如果没有传递第一个参数，this 的值将会被绑定为全局对象
 * @type {string}
 */
var sData = 'Wisen';

function display() {
  console.log(this)
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen

