// 时间戳实现, 首节流, 第一次立即执行. 但是停止触发后, 没办法再次执行.
// function throttle(fn, interval) {
//     let last = 0

//     return function () {
//         let now = +new Date()

//         if (now - last >= interval) {
//             last = now;
//             fn.apply(this, arguments);
//         }
//     }
// }


// 定时器实现, 当第一次触发事件时，不会立即执行函数，而是在delay秒后才执行。而后再怎么频繁触发事件，也都是每delay时间才执行一次。当最后一次停止触发后，由于定时器的delay延迟，可能还会执行一次函数。
// function throttle(func, delay) {
//     let timer = null;
//     return function () {
//         let context = this;
//         let args = arguments;
//         if (!timer) {
//             timer = setTimeout(function () {
//                 func.apply(context, args);
//                 timer = null;
//             }, delay);
//         }
//     }
// }

// 更精确地，可以用时间戳+定时器，当第一次触发事件时马上执行事件处理函数，最后一次触发事件后也还会执行一次事件处理函数。

// 在节流函数内部使用开始时间startTime、 当前时间curTime与delay来计算剩余时间remaining， 
// 当remaining <= 0 时表示该执行事件处理函数了（ 保证了第一次触发事件就能立即执行事件处理函数和每隔delay时间执行一次事件处理函数）。 
// 如果还没到时间的话就设定在remaining时间后再触发（ 保证了最后一次触发事件后还能再执行一次事件处理函数）。 
// 当然在remaining这段时间中如果又一次触发事件， 那么会取消当前的计时器， 并重新计算一个remaining来判断当前状态。

function throttle(func, delay) {
    let timer = null;
    let startTime = 0;
    return function () {
        let curTime = Date.now();
        let remaining = delay - (curTime - startTime);
        let context = this;
        let args = arguments;
        // console.log(`remaining=${remaining}, timer=${timer}`);
        clearTimeout(timer);
        if (remaining <= 0) {
            func.apply(context, args);
            startTime = Date.now();
        } else {
            timer = setTimeout(() => {
                func.apply(context, args);
                startTime = Date.now();
            }, remaining);
        }
    }
}

function handle() {
    console.log(new Date());
}


const throttleHandler = throttle(handle, 2000);

window.addEventListener('scroll', throttleHandler);