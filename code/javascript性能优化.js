// 循环引用
// function fn () {
//   const obj1 = {}
//   const obj2 = {}
//   obj1.name = obj2
//   obj2.name = obj1
// }
// fn()


// function test (fn) {
//   fn() 
// }
// // 多定义一个函数会增加时间消耗
// function test2() {
//   var name = "dsad"
//   return name
// }

// // 只看执行时的时间消耗
// test(function () {
//   var name = "dsad"
//   return name
// }) // 稍慢
// test(test2) // 稍快


// for循环优化
// let arr = [1,2,3,4,5,6,7,8,9]
// let b = {}
// let c = {}

// // 少量数据直接循环占优
// let len = arr.length;
// for (let i = 0; i < len; i++) {
//   b[i] = arr[i]
// }

// // 大量数据需要对第一个值处理
// // 如果不考虑第一个值，此方法最优
// c[0] = arr[0]
// for (let i = arr.length - 1; i; i--) {
//   c[i] = arr[i]
// }

// console.log(b)
// console.log(c)



