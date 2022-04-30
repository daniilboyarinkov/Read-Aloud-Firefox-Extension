let text = ''
let y = 0
let x = 0

window.onload = () => {
    var readMenu = document.createElement('div')
    readMenu.setAttribute('id', 'BDW__readMenu')
}

const isCyrillic = (text) => /[а-я]/im.test(text)

// озвучивания выделенного текста
const speak = (text) => {
    const message = new SpeechSynthesisUtterance()
    if (isCyrillic(text)) message.lang = 'ru-Ru'
    else message.lang = 'en-EN'
    message.text = text
    window.speechSynthesis.speak(message)
}
const speakListener = () => speak(text)

let formElements = document.querySelectorAll('input')
formElements.forEach(
    (el) =>
        (el.onselect = () => {
            text = el.value.slice(el.selectionStart, el.selectionEnd)
            const rect = el.getBoundingClientRect()

            y = rect.y + rect.height + 5 + 'px'
            x = (rect.right - rect.left) / 2 + 'px'
            readMenu.style.top = y
            readMenu.style.left = x
            readMenu.addEventListener('click', speakListener)
            readMenu.addEventListener('click', () => (svg.style.scale = 1.1))
        })
)

document.onselectionchange = () => {
    // удаляем элемент из DOM
    try {
        readMenu = document.querySelector('#BDW__readMenu')
        readMenu.remove()
    } catch {}

    // создать кнопку
    try {
        readMenu = document.createElement('div')
        readMenu.setAttribute('id', 'BDW__readMenu')
        readMenu.style.position = 'fixed'
        readMenu.style.width = '2rem'
        readMenu.style.height = '2rem'
        readMenu.style.zIndex = 5000
        readMenu.style.userSelect = 'none'
        readMenu.style.visibility = 'visible'
        readMenu.style.scale = 1
        readMenu.style.cursor = 'pointer'
        readMenu.style.backgroundColor = '#fff'
        readMenu.style.borderRadius = '5px'
        readMenu.style.padding = '5px'

        const xmlns = 'http://www.w3.org/2000/svg'
        var svg = document.createElementNS(xmlns, 'svg')
        svg.setAttribute('xlmns', xmlns)
        svg.setAttribute('width', '32px')
        svg.setAttribute('height', '32px')
        svg.setAttribute('viewBox', '0 0 32 32')
        svg.setAttribute('version', '1.1')
        svg.setAttribute('visibility', 'visible')
        svg.style.zIndex = '5000'
        svg.style.scale = 0.9

        var path1 = document.createElementNS(xmlns, 'path')
        path1.setAttribute(
            'd',
            'M 4.253906 25.691406 L 8.289062 24.6875 L 5.761719 14.542969 L 1.726562 15.546875 C 0.507812 15.847656 -0.234375 17.082031 0.0664062 18.304688 L 1.496094 24.03125 C 1.796875 25.253906 3.03125 25.996094 4.253906 25.691406 Z M 4.253906 25.691406 '
        )

        var path2 = document.createElementNS(xmlns, 'path')
        path2.setAttribute(
            'd',
            'M 16.90625 7.273438 C 16.601562 6.054688 15.632812 5.785156 14.742188 6.675781 L 7.226562 14.175781 L 9.75 24.324219 L 20.023438 27.757812 C 21.21875 28.15625 21.9375 27.492188 21.632812 26.273438 Z M 16.90625 7.273438 '
        )

        var path3 = document.createElementNS(xmlns, 'path')
        path3.setAttribute(
            'd',
            'M 22.179688 17.511719 L 30.109375 15.539062 C 30.890625 15.347656 31.363281 14.558594 31.167969 13.78125 C 30.976562 13 30.191406 12.527344 29.410156 12.722656 L 21.480469 14.695312 C 20.699219 14.886719 20.226562 15.675781 20.421875 16.453125 C 20.585938 17.117188 21.179688 17.558594 21.828125 17.558594 C 21.945312 17.558594 22.0625 17.542969 22.179688 17.511719 Z M 22.179688 17.511719 '
        )

        var path4 = document.createElementNS(xmlns, 'path')
        path4.setAttribute(
            'd',
            'M 20.816406 12.789062 C 21.207031 12.789062 21.59375 12.632812 21.878906 12.324219 L 27.222656 6.570312 C 27.769531 5.980469 27.734375 5.0625 27.148438 4.515625 C 26.558594 3.972656 25.640625 4.003906 25.09375 4.59375 L 19.75 10.347656 C 19.207031 10.9375 19.238281 11.855469 19.828125 12.402344 C 20.105469 12.660156 20.460938 12.789062 20.816406 12.789062 Z M 20.816406 12.789062 '
        )

        var path5 = document.createElementNS(xmlns, 'path')
        path5.setAttribute(
            'd',
            'M 31.027344 21.847656 L 23.609375 19.273438 C 22.851562 19.007812 22.023438 19.410156 21.761719 20.167969 C 21.496094 20.925781 21.898438 21.753906 22.65625 22.015625 L 30.074219 24.59375 C 30.230469 24.648438 30.390625 24.675781 30.550781 24.675781 C 31.152344 24.675781 31.714844 24.300781 31.921875 23.699219 C 32.183594 22.941406 31.785156 22.113281 31.027344 21.847656 Z M 31.027344 21.847656 '
        )

        svg.appendChild(path1)
        svg.appendChild(path2)
        svg.appendChild(path3)
        svg.appendChild(path4)
        svg.appendChild(path5)

        var triangle = document.createElement('div')
        triangle.style.width = '28px'
        triangle.style.height = '28px'
        triangle.style.position = 'absolute'
        triangle.style.backgroundColor = 'inherit'
        triangle.style.transform = 'rotate(45deg)'
        triangle.style.top = '16px'
        triangle.style.zIndex = '-1'

        readMenu.appendChild(svg)
        readMenu.appendChild(triangle)
        document.body.append(readMenu)

        // получаем высоту выделения
        const range = document.getSelection().getRangeAt(0)
        const rect = range.getBoundingClientRect()
        // текст
        text = document.getSelection().toString().trim()

        if (text === '') {
            // удаляем кнопку из DOM
            readMenu.remove()
            svg.setAttribute('visibility', 'hidden')
            readMenu.setAttribute('class', 'readMenuBDW')
            readMenu.removeEventListener('click', speakListener)
        } else {
            // рендерим кнопку и делаем её кликабельной
            readMenu.addEventListener('click', speakListener)
            readMenu.addEventListener('click', () => (svg.style.scale = 1.1))
            const width = rect.width / 2 - 22
            y = rect.y - 45 + 'px'
            x = rect.left + width + 'px'
            readMenu.style.top = y
            readMenu.style.left = x
        }
    } catch {}
}
