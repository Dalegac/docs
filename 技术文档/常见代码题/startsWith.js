/*
 * @Author: Dalegac
 * @Date: 2021-10-15 22:46:22
 * @LastEditTime: 2021-10-18 16:36:04
 * @LastEditors: Dalegac
 * @Description: Just say something
 */
function startsWith(search) {
  /*! http://mths.be/startswith v0.1.0 by @mathias */
  var string = String(this);
  if (
    this == null ||
    Object.prototype.toString.call(search) == "[object RegExp]"
  ) {
    throw TypeError();
  }
  var stringLength = string.length;
  var searchString = String(search);
  var position = arguments.length > 1 ? arguments[1] : undefined;
  // `ToInteger`
  var pos = position ? Number(position) : 0;
  if (isNaN(pos)) {
    pos = 0;
  }
  var start = Math.min(Math.max(pos, 0), stringLength);
  return String.prototype.indexOf.call(string, searchString, pos) == start;
}
Object.defineProperty(String.prototype, "startsWith", {
  value: startsWith,
});

var str = "fsfdfydfsdfs";
console.log(str.startsWith("fsfdfdfsdfs", 0));
