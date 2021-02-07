/**
 * 了解arguments的结构及转化成真实数组的方法
 * arguments 是一个对应于传递给函数的参数的类数组对象。
 * @param a
 * @param b
 * @param c
 */
function func1(a, b, c) {
  console.log(typeof arguments);    // 'object'

  //打印类数组
  console.log(arguments)
  //转化成数组
  console.log(Array.prototype.slice.call(arguments))
  console.log([].slice.call(arguments))
  console.log(Array.from(arguments))
  console.log([...arguments])


  console.log(arguments[0]);
  // expected output: 1

  console.log(arguments[1]);
  // expected output: 2

  console.log(arguments[2]);
  // expected output: 3
}

func1(1, 2, 3);
