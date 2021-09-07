function onInput(event) {
    const value = event.target.value;
    if (value) {
        console.log(event.target.value);
    }
}


function debounce(fn, wait) {
    var timeout = null;
    return function () {
        if (timeout !== null)
            clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, wait);
    }
}

const debounceOnInput = debounce(onInput, 300);