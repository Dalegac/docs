<!--
 * @Author: Dalegac
 * @Date: 2021-10-09 17:55:11
 * @LastEditTime: 2021-10-09 17:55:12
 * @LastEditors: Dalegac
 * @Description: Just say something
-->

```js
function isDef(v) {
  return v !== undefined && v !== null;
}

function isPromise(val) {
  return (
    isDef(val) &&
    typeof val.then === "function" &&
    typeof val.catch === "function"
  );
}
```
