// 有许多[start, end]的闭区间, 请设计一个算法, 算出这些区间中, 最多有几个互不相交的区间。
// 比如intvs = [[1,3], [2,4], [3,6]]
// 这些区间最多有两个区间互不相交, 即 [1,3], [3,6], intervalSchedule函数此时应该返回2

function intervalSchedule(intvs) {
    if (intvs.length === 0) {
        return 0;
    }

    const sortArray = intvs.sort((a, b) => a[1] - b[1]);

    let count = 1; // 最少有一个区间不相交
    let xEnd = sortArray[0][1];

    for (let item of intvs) {
        const start = item[0];
        // 这里是> 或者 >=取决于, [1,3][3,6], 3算不算相交
        if (start >= xEnd) {
            count++;
            xEnd = item[1];
        }
    }
    return count;
}

console.log(intervalSchedule([
    [1, 3],
    [2, 4],
    [3, 6]
]))