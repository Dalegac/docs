// 可继续遍历的数据类型
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

// 不可继续遍历的数据类型
const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const bigintTag = "[object BigInt]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

/**
 * @description: 工具函数 - 通用while循环
 * @param {Array}array 待遍历数组
 * @param {Function}iteratee 执行函数
 * @return {Array}
 */
function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}
/**
 * @description: 工具函数 - 判断是否为引用类型
 * @param {Any} target
 * @return {Boolean} 是否是引用类型
 */
function isObject(target) {
  const type = typeof target;
  return target !== null && (type === "object" || type === "function");
}
/**
 * @description: 工具函数 - 获取实际类型
 * @param {Any} target
 * @return {String} 格式化类型
 */
function getType(target) {
  return Object.prototype.toString.call(target);
}

/**
 * @description:工具函数 - 初始化被克隆函数
 * @param {Any} target
 * @return {*}
 */
function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}
/**
 * @description: 工具函数 - 克隆Symbol
 * @param {Symbol}
 * @return {*}
 */
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

/**
 * @description: 工具函数 - 克隆正则
 * @param {Regexp} target
 * @return {*}
 */
function cloneReg(target) {
  const { source, flags, lastIndex } = target;
  const result = new RegExp(source, flags);
  result.lastIndex = lastIndex;
  return result;
}

/**
 * @description: 工具函数 - 克隆函数
 * @param {Function} target
 * @return {*}
 */
function cloneFunction(target) {
  const bodyReg = /(?<={)(.)+(?=})/ms;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = target.toString();
  if (target.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(",");
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

/**
 * @description: 工具函数 - 克隆不可遍历类型
 * @param {Any} target 被克隆对象
 * @param {String} type 对象类型
 * @return {*}
 */
function cloneOtherType(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case bigintTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return cloneReg(target);
    case symbolTag:
      return cloneSymbol(target);
    case funcTag:
      return cloneFunction(target);
    default:
      return null;
  }
}

/**
 * @description: 克隆函数
 * @param {Any} target 被克隆对象
 * @param {WeakMap} map 引用对象缓存池
 * @return {*}
 */
function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }
  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });
  return cloneTarget;
}
module.exports = { clone };
