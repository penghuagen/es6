/**
 * 使用 call 方法调用匿名函数
 * @type {({species: string, name: string}|{species: string, name: string})[]}
 */
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  /**
   * 匿名函数的传i
   */
  (function(i) {
    //此处的this是传进来的对象
    console.log(this)
    this.print = function() {
      console.log('#' + i + ' ' + this.species
        + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}

/**
 * 使用 call 方法调用函数并且指定上下文的 'this'
 */
function greet() {
  console.log(this)
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours
