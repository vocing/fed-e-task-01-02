一、简答题

1、描述引用计数的工作原理和优缺点
答：监听所有空间的引用数量，当引用数量发生变化时发生修改，当引用数量为0时，回收该空间
    优点：及时回收，并优化程序效率
    缺点：监听耗费大量资源，而且可能存在闭包内空间的循环引用而无法回收

2、描述标记整理算法的工作流程
答：触发垃圾回收时，
    1、遍历所有可达对象，标记处理活动中的对象；
    2、整理标记对象的空间、没有标记的对象空间分别连续；
    3、回收没有标记的对象空间，并清除所有标记便于下次GC。

3、描述V8中新生代存储区垃圾回收的流程
答：新生代存储区空间会分为两个等大小的空间，一个为From代表正在活动中的空间，一个为To代表备用空间
    1、先对From空间进行标记整理，标记并整理出活动对象；
    2、空间复制，将活动对象复制到To空间；
    3、空间转换，To空间转化为活动空间、From空间转化为备用空间，然后清除备用空间的内容；
    4、可能会出现晋升，满足的条件有两个：a、一轮GC后还存活的对象；b、To空间转化活动空间时，空间使用率高于25%(如果空间使用率过高，会导致后续准备新生成的对象或已存在对象新增属性无法申请空间)

4、描述增量标记算法在何时使用及工作原理
答：使用：增量标记算法，在老年代存储区达到阈值时触发
    原理：标记与程序交替执行，使得程序不会将阻塞时间全挤在一块儿，用户体验感更好

二、代码题
const fp = require("lodash/fp")
数据
horsepower 马力, dollar_value 价格，in_stock库存
const cars = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
  { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
  { name: "Jaguar XKR-s", horsepower: 550, dollar_value: 132000, in_stock: false},
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
  { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
  { name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false},
]

练习1：
使用函数组合fp.flowRight重新实现下面这个函数
let isLastInStock = function (cars) {
  // 获取最后一条数据
  let last_car = fp.last(cars)
  // 获取最后一条数据的 in_stock 属性值
  return fp.prop("in_stock", last_car)
}

答：
let isLastInStock = fp.flowRight(fn => fp.prop("in_stock", fn), fp.last)

练习2：
使用fp.flowRight()、 fp.prop() 和 fp.first()获取第一个car的name
let getAttribute = function (attr) {
  return fp.flowRight(fn => fp.prop(attr, fn), fp.first)
}
console.log(getAttribute("name")(cars))

练习3：
使用帮助函数 _average重构averageDollarValue 使用函数组合的方式实现
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}

let averageDollarValue = function (cars) {
  let dollar_value = fp.map(function(car) {
    return car.dollar_value
  }, cars)
  return _average(dollar_value)
}


答：
let averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))

练习4：
使用flowRight写一个sanitizeNames()函数，
返回一个下划线连接的小写字符串，把数组中的name转换为这种形式：
例如：sanitizeNames(["Hello World"]) => ["hello_world"]
let sanitizeNames = fp.map(fp.flowRight(fp.toLower, fp.join("_"),fp.split(" ")))

代码题2
基于下面提供的代码，完成后续的四个练习
// suport.js
class Container {
  static of (value) {
    return new Container(value)
  }
  constructor (value) {
    this._value = value
  }
  map(fn) {
    return Container.of(fn(this._value))
  }
}

class Maybe {
  static of (x) {
    return new Maybe(x)
  }
  isNothing () {
    return this._value === undefined || this._value === null
  }
  constructor (x) {
    this._value = x
  }
  map(fn) {
    return this.isNothing() ? this : Container.of(fn(this._value))
  }
}
  
module.exports = {
  Maybe,
  Container
}

练习1：
使用fp.add(x, y)和fp.map(f, x)创建一个能让functor里的值增加的函数ex1
const fp = require("lodash/fp")
const { Maybe, Container } = require("./support")

let maybe = Maybe.of([5, 6, 1])
let ex1 = num => {
  return fp.map(item => fp.add(num, item))
}
console.log(maybe.map(ex1(1)))

练习2：
实现一个ex2函数，能够使用fp.first获取列表的第一个元素
const fp = require("lodash/fp")
const { Maybe, Container } = require("./support")
let xs = Container.of(["do", "ray", "me", "fa", "so", "la", "ti", "do"])
let ex2 = item => fp.first(item)
console.log(xs.map(ex2))

练习3：
实现一个ex3函数，使用safeProp和fp.first找到user的名字和首字母
const fp = require("lodash/fp")
const { Maybe, Container } = require("./support")

let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x])
})
let user = { id: 2, name: "Albert"}
let ex3 = (user, attr) => {
  let obj = safeProp(attr)(user)
  return {
    name: obj,
    firstLetter: obj.map(fp.first)
  }
}
console.log(ex3(user, "name"))

练习4：
使用Maybe重写ex4, 不要有if语句
const fp = require("lodash/fp")
const { Maybe, Container } = require("./support")
let ex4 = function (n) {
  if (n) {
    return parseInt(n)
  }
}

let ex4 = n => Maybe.of(n).map(parseInt)._value
