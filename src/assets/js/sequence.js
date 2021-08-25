// 默认值
let SequenceConfig = {
  idx: 0
};

// 主键生成器
class Sequence{
  constructor(incr = 1){
    this.incr = incr;
    this.config = SequenceConfig;
  }

  increaseIdx () {
    this.config['idx'] += this.incr;
    return this.config['idx'];
  }

  next () {
    let idx = this.increaseIdx();
    return idx;
  }
}

// 测试
let sequence1 = new Sequence();
let sequence3 = new Sequence();
let sequence2 = new Sequence();
console.log(sequence1.next())
console.log(sequence2.next())
console.log(sequence3.next())
console.log(sequence1.next())
console.log(sequence2.next())
console.log(sequence3.next())
console.log(sequence1.next())
