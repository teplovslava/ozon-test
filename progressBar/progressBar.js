import {
    checkInput,
    clickListener,
    createHtmlElement,
    createInput,
    getHtmlElement,
    pushProgress,
    setHtmlElement
} from "../services/helper.js";


export class ProgressBar {

    /**
     * Initialize ProgressBar
     * @param {HTMLElement} HTMLElement
     * @param {string} placeholder
     * @param {object} state
     */

    constructor(node, placeholder = '', state = {
        value: 60,
        isAnimate: false,
        isHide: false
    }) {
        this.state = state

        if (!node || !(node instanceof HTMLElement)) {
            return new Error("wrong node");
        }

        this.progressBarContainer = createHtmlElement('div', '', ['progress-bar-container'])
        let title = createHtmlElement('div', '', ['progress-bar-container-title'])
        title.innerHTML = placeholder
        setHtmlElement(this.progressBarContainer, node)
        setHtmlElement(title, this.progressBarContainer)

        const circle = createHtmlElement('div', '', ['progress-bar'])
        circle.style.setProperty('--progress', String(this.state.value));
        setHtmlElement(circle, this.progressBarContainer)


        this.createSettingsField.apply(this)
        getHtmlElement('.progress-input').value = this.state.value
        pushProgress()


        clickListener('.progress-animation', () => this.state.isAnimate ? this.changeAnimationOff() : this.changeAnimationOn())
        clickListener('.progress-hide', () => this.state.isHide ? this.changeHideOff() : this.changeHideOn())
    }


    /**
     * Creating settings(inputs) fields
     */

    createSettingsField() {
        const inputContainer = createHtmlElement('div')
        inputContainer.classList.add('input-container')

        setHtmlElement(createInput('text', {
            class: 'progress-input'
        }, false, 'Value', ['progress-input-label', 'input-label']), inputContainer)
        setHtmlElement(createInput('checkbox', {
            name: 'progress-animation',
            class: 'progress-animation'
        }, this.state.isAnimate, 'Animate', ['progress-animation-label', 'input-label']), inputContainer)
        setHtmlElement(createInput('checkbox', {
            name: 'progress-hide',
            class: 'progress-hide'
        }, this.state.isHide, 'Hide', ['progress-hide-label', 'input-label']), inputContainer)

        setHtmlElement(inputContainer, this.progressBarContainer)
    }


    /**
     * Turn on animation
     * @return {Error | undefined}
     */

    changeAnimationOn() {
        this.state.isAnimate = true
        getHtmlElement('.progress-bar').classList.add('progress-bar_animated')
        const checkbox = getHtmlElement('.progress-animation')
        if (!checkbox) return new Error('checkbox not found')
        checkbox.checked = true
    }


    /**
     * Turn off animation
     * @return {Error | undefined}
     */

    changeAnimationOff() {
        this.state.isAnimate = false
        getHtmlElement('.progress-bar').classList.remove('progress-bar_animated')
        const checkbox = getHtmlElement('.progress-animation')
        if (!checkbox) return new Error('checkbox not found')
        checkbox.checked = false
    }



    /**
     * Turn off visibility
     * @return {Error | undefined}
     */

    changeHideOn() {
        this.state.isHide = true
        getHtmlElement('.progress-bar').classList.add('progress-bar_hide')
        const checkbox = getHtmlElement('.progress-hide')
        if (!checkbox) return new Error('checkbox not found')
        checkbox.checked = true
    }


    /**
     * Turn on visibility
     * @return {Error | undefined}
     */

    changeHideOff() {
        this.state.isHide = false
        getHtmlElement('.progress-bar').classList.remove('progress-bar_hide')
        const checkbox = getHtmlElement('.progress-hide')
        if (!checkbox) return new Error('checkbox not found')
        checkbox.checked = false
    }


    /**
     * Change progress bar value
     * @param {string | number} val 
     * @return {Error | undefined}
     */
    changeValue(val) {
        const stringVal = String(val)
        const inputField = getHtmlElement('.progress-input')
        if (!inputField) return new Error('wrong node')
        const newValue = checkInput(stringVal)
        this.state.value = newValue
        inputField.value = newValue
        inputField.dispatchEvent(new Event('input', {
            bubbles: true
        }));
    }


}