// // 面向对象
// let obj = {
//   name: "我",
//   run(stance) {
//     console.log(`我跑了${stance}米`)
//   },
//   eat(food) {
//     console.log(`我吃了顿${food}`)
//   }
// }

// obj.run(50) // 我跑了50米
// obj.eat("海鲜大餐") // 我吃了顿海鲜大餐

// // 面向过程
// function run () {
//   console.log(`${this.name}又跑了100米`) // 我又跑了100米
// }
// function eat() {
//   console.log(`${this.name}又吃了顿中式大餐`) // 我又吃了顿中式大餐
// }

// run.call(obj)
// eat.call(obj)

// // 函数式编程
// function event (name, operate, thing) {
//   return name + operate + thing
// }

// console.log(event("我", "吃", "街边小吃")) // 我吃街边小吃
// console.log(event("你", "打", "麻将")) // 你打麻将

// let arr = [1, 2, 3, 4, 5]

// // 面向过程
// let result1 = []
// for (let i = 0; i < arr.length; i++) {
//   result1.push(`我是${arr[i]}`)
// }
// console.log(result1)

// // 高阶函数
// let result2 = arr.map(item => `我是${item}`)
// console.log(result2)

// function once(fn) {
//   let done = false // 作用范围被延长
//   return (...args) => { // 被外部引用
//     if (!done) {
//       done = true
//       fn.apply(this, args)
//     }
//   }
// }

// let pay = once(money => {
//   console.log(`have paid ￥${money}`)
// })

// pay(100) // have paid ￥100
// pay(100) // 注: 此时没有打印数据

// function rank (basic) { // 基础工资
//   return function (achievements) { // 绩效
//     return basic + achievements
//   }
// }

// let e1 = rank(8000)
// let e2 = rank(10000)

// console.log(e1(2000)) // 10000
// console.log(e2(4000)) // 14000


// let arr = [1, 2, 3, 4]

// // 纯函数slice
// console.log(arr.slice(0, 1)) // [ 1 ]
// console.log(arr.slice(0, 1)) // [ 1 ]

// // 不纯函数splice
// console.log(arr.splice(0, 1)) // [ 1 ]
// console.log(arr.splice(0, 1)) // [ 2 ]

// const { log } = console
// const { first, last, toUpper } = require("lodash")
// const arr = ["a123", "b123", "c123", "d123", "e123"]

// log(first(arr)) // a123

// log(last(arr)) // e123

// log(toUpper(arr)) // A123,B123,C123,D123,E123, 此时因为arr是数组, toUpper方法直接将元素join(",")起来

// log(toUpper(first(arr))) // A123

// // 模拟缓存
// function cache(fn) {
//   let cache = {}
//   return (...args) => {
//     let key = JSON.stringify(args)
//     if (!cache[key]) {
//       console.log(key)
//       cache[key] = fn.apply(fn, args)
//     } 
//     return cache[key]
//   }
// }
// let cache1 = cache((...args) => args.reduce((a, b) => (a + b)))

// console.log(cache1("我", "吃", "小龙虾")) // 控制台打印 ["我","吃","小龙虾"] 我吃小龙虾
// console.log(cache1("我", "吃", "小龙虾")) // 控制台打印 我吃小龙虾
// console.log(cache1("我", "吃", "小龙虾")) // 控制台打印 我吃小龙虾

// // 原函数
// function event (name, operate, thing) {
//   return name + operate + thing
// }
// console.log(event("我", "吃", "小龙虾"))

// // 柯里化
// function event2 (...args) {
//   if (args.length >= 3) return args.reduce((a, b) => a+ b)
//   return (...args2) =>  {
//     args = args.concat(args2)
//     if (args.length >= 3) return args.reduce((a, b) => a+ b)
//     return (...args3) =>  {
//       args = args.concat(args3)
//       return args.reduce((a, b) => a+ b)
//     }
//   }
// }
// console.log(event2("我")("吃")("小龙虾"))
// console.log(event2("我", "吃")("小龙虾"))
// console.log(event2("我")("吃", "小龙虾"))

// // 柯里化原理
// function currency (fn) {
//   let all = []
//   return function self (...args) {
//     all = all.concat(args)
//     if (all.length < fn.length) {
//       return self
//     }
//     return fn(...all)
//   }
// }

// let time = currency((year, month, date) => `${year}-${month}-${date}`)
// let timeY = time("2020")
// let timeM = timeY("05")
// let timeD = timeM("09")
// console.log(timeD) // 2020-05-09

// 洋葱代码
// function getArrFirst (arr) {
//   return arr[0]
// }

// function toUpper (str) {
//   return str.toUpperCase()
// }

// function getStrSecond (str) {
//   return str.charAt(1)
// }

// function test(v) {
//   console.log(v)
//   return v
// }

// let arr = ["jion", "mis", "excute"]
// // console.log(toUpper(getStrSecond(getArrFirst(arr)))) // I

// // 利用 Array.reduce 将函数组合
// function combine (...args) {
//   return value => args.reverse().reduce((val, fn) => fn(val), value)
// }

// combine(toUpper, combine(getStrSecond, test, getArrFirst))(arr) // 此处test打印getArrFirst的返回值是 jion
// const c = combine(toUpper, combine(getStrSecond, getArrFirst))
// console.log(c(arr))

// 函子
// class contain {
//   static of (val) { // 静态方法 创建返回一个新的对象
//     return new contain(val)
//   }

//   constructor (value) {
//     this._value = value
//   }

//   map (fn) { // 传递方法对值进行处理
//     return contain.of(fn(this._value))
//   }
// }

// const val = contain.of(1)
//   .map(item => item + 1)
//   .map(item => item ** item)

// console.log(val) // contain { _value: 4 }


// class contain {
//   static of (val) { // 静态方法 创建返回一个新的对象
//     return new contain(val)
//   }
//   constructor (value) {
//     console.log(value)
//     this._value = value
//   }
//   map (fn) { // 传递方法对值进行处理
//     return this.isNothing ? contain.of(null) : contain.of(fn(this._value))
//   }
//   isNothing () {
//     return [null, undefined].includes(this._value)
//   }
// }


// class contain {
//   static of (val) { // 静态方法 创建返回一个新的对象
//     return new contain(val)
//   }
//   constructor (value) {
//     this._value = value
//   }
//   map (fn) { // 传递方法对值进行处理
//     return contain.of(fn(this._value))
//   }
// }
// // Either 函子
// class wrong {
//   static of (val) {
//     return new wrong(val)
//   }
//   constructor (value) {
//     this._value = value
//   }
//   map (fn) { // 错误调用时直接返回this
//     console.log(this)
//     return this
//   }
// }

// const test = item => {
//   return item
// }

// const split = item => {
//   try {
//     return item.split(" ")
//   } catch (error) {
//     return wrong.of({ error: error.message})
//   }
// }
// let r = split(2)
// console.log(r) // wrong { _value: { error: 'item.split is not a function' } }

// const fp = require("lodash/fp")
// class IO {
//   static of (x) {
//     return new IO (x => x)
//   }
//   constructor (value) {
//     this._value = value
//   }
//   map (fn) {
//     return IO.of(fp.flowRight(fn, this._value))
//   }
// }

// let r = IO.of(process)
//   .map(item => item.execPath)
// console.log(r._value) // [Function]

// const fp = require("lodash/fp")
// class monad {
//   static of (val) {
//     return new monad(val)
//   }
//   constructor (value) {
//     this._value = value
//   }
//   map (fn) {
//     return monad.of(fp.flowRight(fn, this._value))
//   }
//   join () {
//     return this._value()
//   }
//   flatMap(fn) {
//     return this.map(fn).join()
//   }
// }

// function print (item) {
//   return monad.of(() => item + 1)
// }

// function val (item) {
//   return monad.of(() => item + 2)
// }
// const r = val(1)
//   .map(item => item + 10)
//   .map(print)
// console.log(r) // monad { _value: [Function] }
// console.log(r._value()) // monad { _value: [Function] }

// const r2 = val(1)
//   .map(item => item + 10)
//   .flatMap(print)
//   .join()
// console.log(r2) // 14
