function PromiseAll(promiseArray) {
    return new Promise(function (resolve, reject) {
        //判断参数类型
        if (!Array.isArray(promiseArray)) {
            return reject(new TypeError('arguments muse be an array'))
        }
        let counter = 0;
        let promiseNum = promiseArray.length;
        let resolvedArray = [];
        for (let i = 0; i < promiseNum; i++) {
            // 3. 这里为什么要用Promise.resolve?
            Promise.resolve(promiseArray[i]).then((value) => {
                counter++;
                resolvedArray[i] = value; // 2. 这里直接Push, 而不是用索引赋值, 有问题吗
                if (counter == promiseNum) { // 1. 这里如果不计算counter++, 直接判断resolvedArr.length === promiseNum， 会有问题吗?
                    // 4. 如果不在.then里面, 而在外层判断, 可以吗?
                    resolve(resolvedArray)
                }
            }).catch(e => reject(e));
        }
    })
}

// 测试
const pro1 = new Promise((res, rej) => {
    setTimeout(() => {
        res('1')
    }, 1000)
})
const pro2 = new Promise((res, rej) => {
    setTimeout(() => {
        res('2')
    }, 2000)
})
const pro3 = new Promise((res, rej) => {
    setTimeout(() => {
        res('3')
    }, 3000)
})

const proAll = PromiseAll([pro1, pro2, pro3])
    .then(res =>
        console.log(res) // 3秒之后打印 ["1", "2", "3"]
    )
    .catch((e) => {
        console.log(e)
    })