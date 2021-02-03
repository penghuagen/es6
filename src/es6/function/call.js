/**
 * 使用 call 方法调用父构造函数
 * @param name
 * @param price
 * @constructor
 */
function Product(name, price) {
  this.name = name;
  this.price = price;
  // this.getName = function () {
  //   return this.name
  // }
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

/**
 * 原型
 * @type {string}
 */
Food.prototype.color = 'red'
Food.prototype.getName = function () {
  return '11313' + this.name
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
console.log(fun)
console.log(cheese)
console.log(cheese.getName())

