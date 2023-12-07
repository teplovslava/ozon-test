/**
 * Get HTML element
 * @param {string} selector  
 */

export function getHtmlElement(selector) {
    const el = document.querySelector(selector);
    return el;
}


/**
 * Create HTML element
 * @param {string} selector 
 * @param {string} inner 
 * @param {string[]} className 
 */

export function createHtmlElement(selector, inner = '', className = [], ) {
    const el = document.createElement(selector);
    el.innerHTML = inner;
    className.forEach((style) => el.classList.add(style))
    return el
}


/**
 * 
 * @param {HTMLElement} selector 
 * @param {HTMLElement} parent 
 */

export function setHtmlElement(selector, parent) {
    parent.appendChild(selector)
}


/**
 * 
 * @param {string} type 
 * @param {object} attr
 * @param {boolean} checked
 * @param {string} label
 * @param {string[]} labelClass
 * @return {HTMLElement} 
 */

export function createInput(type, attr = {}, checked, label = '', labelClass = []) {
    const lbl = document.createElement('label');
    labelClass.forEach((cls) => lbl.classList.add(cls))
    const input = document.createElement('input');
    input.setAttribute('type', type)
    checked ? input.setAttribute('checked', checked) : input.removeAttribute('checked')
    for (let value in attr) {
        input.setAttribute(value, attr[value])
    }

    const span = document.createElement('span')
    span.innerHTML += label

    setHtmlElement(input, lbl)
    setHtmlElement(span, lbl)

    return lbl
}


/**
 * 
 * @return {error | undefined}
 */

export function pushProgress() {
    const input = getHtmlElement('.progress-input')
    const progressBar = getHtmlElement('.progress-bar')

    if (!input || !progressBar) return new Error('wrong node')

    let interval
    input.addEventListener('input', function (e) {
        const newValue = checkInput(e.target.value);
        input.value = newValue;
        let progressValue = Number(getComputedStyle(progressBar).getPropertyValue('--progress'))

        clearInterval(interval)

        interval = setInterval(() => {
            if (newValue <= progressValue) {
                progressValue -= 1
            } else {
                progressValue += 1
            }

            progressBar.style.setProperty('--progress', progressValue);
            if (Number(newValue) === Number(progressValue)) {
                clearInterval(interval);
            }

        }, 16 / 1000);
    })
}



/**
 * Create click listener
 * @param {string} selector 
 * @param {() => void} func 
 */
export function clickListener(selector, func) {
    const el = getHtmlElement(selector)
    el.addEventListener('click', func)
}






/**
 * 
 * @param {string} value 
 * @return {string}
 */

export function checkInput(value) {
    if (value[0] === '0') {
        return parseInt(value.slice(1)) || 0
    }
    if (value >= 100) {
        return value = 100
    }
    if (value.length < 1) {
        return value = 0
    }

    return parseInt(value.match(/\d+/)) || 0
}