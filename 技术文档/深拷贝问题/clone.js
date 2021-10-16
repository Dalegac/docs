/*
 * @Author: Dalegac
 * @Date: 2021-10-03 23:09:47
 * @LastEditTime: 2021-10-05 10:14:52
 * @LastEditors: Dalegac
 * @Description: Just say something
 */
const mapTag = "[object Map]";
const setTag = "[object Set]";
const objectTag = "[object Object]";
const arrayTag = "[object Array]";
const argsTag = "[object Arguments]";

const stringTag = "[object String]";
const bigintTag = "[object BigInt]";
const boolTag = "[object Boolean]";
const numberTag = "[object Number]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const dateTag = "[object Date]";
const funcTag = "[object Function]";

const deepTag = [mapTag, setTag, objectTag, arrayTag, argsTag];

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === "object" || type === "function");
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

function cloneRegExp(target) {
  const { source, flags, lastIndex } = target;
  const result = new RegExp(source, flags);
  result.lastIndex = lastIndex;
  return result;
}

function cloneFunction(target) {
  const bodyReg = /(?<={)(.|\s)+(?=})/m;
  const paramReg = /(?=>\().+(?=\)\s+?=})/;
  const funcString = target.toString();
  if (target.prototype) {
    const body = bodyReg.exec(funcString);
    if (body) {
      const param = paramReg.exec(funcString);
      if (param) {
        return new Function(...param[0].split(","), body[0]);
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

function cloneOtherType(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case stringTag:
    case boolTag:
    case numberTag:
    case bigintTag:
    case dateTag:
    case errorTag:
      return new Ctor(target);
    case regexpTag:
      return cloneRegExp(target);
    case symbolTag:
      return cloneSymbol(target);
    case funcTag:
      return cloneFunction(target);
  }
}

function clone(target, map = new WeakMap()) {
  if (!isObject(target)) {
    return target;
  }

  const type = getType(target);
  let cloneTarget;
  if (!deepTag.includes(type)) {
    return cloneOtherType(target, type);
  } else {
    cloneTarget = getInit(target);
  }
  if (map.get(target)) {
    return map.get(target);
  } else {
    map.set(target, cloneTarget);
  }

  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

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
