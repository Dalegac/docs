const {
    urls,
    loadImg
} = require('./mock');

function promiseLimit(arr, maxCount) {
    let current = 0;
    let pendingList = []
    for (let i = 0; i < arr.length; i++) {
        doSend(arr[i])
    }

    function doSend(item) {
        if (current < maxCount) {
            current++
            loadImg(item).then(() => {
                current--
                if (pendingList.length > 0) {
                    doSend(pendingList.shift())
                }
            })
        } else {
            pendingList.push(item)
        }

    }
}
promiseLimit(urls, 3)