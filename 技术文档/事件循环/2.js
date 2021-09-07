console.log('start');
setTimeout(() => {
    console.log('children2');
    Promise.resolve().then(() => {
        console.log('children3');
    })
}, 0);

new Promise(function (resolve, reject) {
    console.log('children4');
    setTimeout(function () {
        console.log('children5');
        resolve('children6')
    }, 0)
}).then((res) => {
    console.log('children7');
    setTimeout(() => {
        console.log(res);
    }, 0)
})

// 答案
// start
// children4
// children2
// children3
// children5
// children7
// children6

// 这道题跟上面题目不同之处在于，执行代码会产生很多个宏任务，每个宏任务中又会产生微任务

// 1. 从上往下执行代码，先执行同步代码，输出 start
// 2. 遇到setTimeout，先把 setTimeout 的代码放到宏任务队列①中
// 3. 接着往下执行，输出 children4, 遇到setTimeout，先把 setTimeout 的代码放到宏任务队列②中，此时.then并不会被放到微任务队列中，因为 resolve是放到 setTimeout中执行的
// 4. 代码执行完成之后，会查找微任务队列中的事件，发现并没有，于是开始执行宏任务①，即第一个 setTimeout， 输出 children2，此时，会把 Promise.resolve().then放到微任务队列中。
// 5. 宏任务①中的代码执行完成后，会查找微任务队列，于是输出 children3；然后开始执行宏任务②，即第二个 setTimeout，输出 children5，此时将.then放到微任务队列中。
// 6. 宏任务②中的代码执行完成后，会查找微任务队列，于是输出 children7，遇到 setTimeout，放到宏任务队列中。此时微任务执行完成，开始执行宏任务，输出 children6;