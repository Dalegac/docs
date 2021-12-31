/*
 * @Author: Dalegac
 * @Date: 2021-10-22 23:52:54
 * @LastEditTime: 2021-10-23 00:11:44
 * @LastEditors: Dalegac
 * @Description: Just say something
 */
var Sequence = (function () {
  var instance;
  var Sequence = function () {
    if (instance) {
      return instance;
    }
    this.count = 0;
    return (instance = this);
  };
  Sequence.prototype.next = function () {
    return ++this.count;
  };
  return Sequence;
})();
module.exports = { Sequence };
