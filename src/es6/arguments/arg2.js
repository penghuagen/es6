/**
 * arguments 是一个对应于传递给函数的参数的类数组对象。
 * @param separator
 */
function myConcat(separator) {
  console.log(separator)
  console.log(arguments)
  var args = Array.prototype.slice.call(arguments, 1);
  console.log(args.join(separator))
}

// returns "red, orange, blue"
myConcat(", ", "red", "orange", "blue");

// returns "elephant; giraffe; lion; cheetah"
myConcat("; ", "elephant", "giraffe", "lion", "cheetah");

// returns "sage. basil. oregano. pepper. parsley"
myConcat(". ", "sage", "basil", "oregano", "pepper", "parsley");
