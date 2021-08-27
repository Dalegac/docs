/*
 * @Author: Dalegac
 * @Date: 2021-08-26 15:00:45
 * @LastEditTime: 2021-08-26 15:34:44
 * @LastEditors: Dalegac
 * @Description: 莱文斯坦距离 https://www.zhihu.com/question/315634571/answer/620984468
 */

const levenshteinDistance = (s, t) => {
  if (s.length === 0) return t.length;
  if (t.length === 0) return s.length;
  const dp = [];
  for (let i = 0; i <= t.length; i++) {
    dp[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      dp[i][j] =
        i === 0
          ? j
          : Math.min(
              dp[i - 1][j] + 1,
              dp[i][j - 1] + 1,
              dp[i - 1][j - 1] + (s[i - 1] === t[j - 1] ? 0 : 1)
            );
    }
  }
  console.log(dp);
  return dp[t.length][s.length];
};

console.log(levenshteinDistance("aba", "bbbb"));
