function Person (name, age, gender) {
  this.name = name
  this.age = age
  this.gender = gender
  this.sayName = function () {
    alert(this.name)
  }
}
var per = new Person('孙悟空', 18, '男')
function Dog (name, age, gender) {
  this.name = name
  this.age = age
  this.gender = gender
}
var dog = new Dog('旺财', 4, '雄')
console.log(per)// 当我们直接在页面中打印一个对象时，事件上是输出的对象的toString()方法的返回值
console.log(dog)
