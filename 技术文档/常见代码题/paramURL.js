/*
 * @Author: Dalegac
 * @Date: 2021-10-14 09:26:30
 * @LastEditTime: 2021-10-14 23:37:43
 * @LastEditors: Dalegac
 * @Description: Just say something
 * @Reference: https://juejin.cn/post/6844903697198088199#heading-6
 */
function parseUrl(url) {
  let pattern = RegExp(
    "^(?:([^/?#]+))?//(?:([^:]*)(?::?(.*))@)?(?:([^/?#:]*):?([0-9]+)?)?([^?#]*)(\\?(?:[^#]*))?(#(?:.*))?"
  );

  let matches = url.match(pattern) || [];
  return {
    protocol: matches[1],
    username: matches[2],
    password: matches[3],
    hostname: matches[4],
    port: matches[5],
    pathname: matches[6],
    search: matches[7],
    hash: matches[8],
  };
}
function parseQueryString(query) {
  const getQueryType = (key) => {
    if (key.endsWith("[]")) return "ARRAY";
    if (key.endsWith("{}")) return "JSON";
    return "DEFAULT";
  };
  if (!query) {
    return {};
  }
  console.log(query);
  query = query.replace(/^\?/, "");
  const queryArr = query.split("&");
  const result = {};
  queryArr.forEach((query) => {
    let [key, value] = query.split("=");
    try {
      value = decodeURIComponent(value || "").replace(/\+/g, " ");
      key = decodeURIComponent(key || "").replace(/\+/g, " ");
    } catch (e) {
      // 非法
      console.log(e);
      return;
    }
    const type = getQueryType(key);
    switch (type) {
      case "ARRAY":
        key = key.replace(/\[\]$/, "");
        if (!result[key]) {
          result[key] = [value];
        } else {
          result[key].push(value);
        }
        break;
      case "JSON":
        key = key.replace(/\{\}$/, "");
        value = JSON.parse(value);
        result[key] = value;
        break;
      default:
        result[key] = value;
    }
  });
  return result;
}

console.log(
  parseQueryString(
    parseUrl(
      "https://juanni:miao@www.foo.com:8080/file;foo=1;bar=2?name=coder&age=20&callback=https%3A%2F%2Fmiaolegemi.com%3Fname%3Dtest&list[]=a&list[]=b&json{}=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D&illegal=C%9E5%H__a100373__b4#test"
    ).search
  )
);
