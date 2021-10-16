/*
 * @Author: Dalegac
 * @Date: 2021-10-02 13:25:43
 * @LastEditTime: 2021-10-05 20:49:40
 * @LastEditors: Dalegac
 * @Description: Just say something
 */

const { clone } = require("./deepClone");

const map = new Map();
map.set("key", "value");
map.set("ConardLi", "code秘密花园");

const set = new Set();
set.add("ConardLi");
set.add("code秘密花园");

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  bigInt: BigInt(4325435345346436345346346),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log("code秘密花园");
  },
  func2: function (a, b) {
    return a + b;
  },
};
// console.log(target);
const obj = clone(target);
// const obj = JSON.parse(JSON.stringify(target));

const obj1 = clone(obj);
console.log(obj1);
