/*
 * @Author: Dalegac
 * @Date: 2021-08-30 19:05:00
 * @LastEditTime: 2021-08-30 19:23:10
 * @LastEditors: Dalegac
 * @Description: 几何级数
 */

const geometricProgression = (end, start = 1, step = 2) => {
  if (step === 1) {
    return (() => {
      throw new Error("step can not equal 1!");
    })();
  }
  return Array.from({
    length: Math.floor(Math.log(end / start) / Math.log(step)) + 1,
  }).map((_, index) => start * Math.pow(step, index)); // step**i
};

console.log(geometricProgression(9, 1, 2));
