const isCyrillic = (text) => /[а-я]/im.test(text)

// озвучивания выделенного текста
const speak = (text) => {
    const message = new SpeechSynthesisUtterance()
    if (isCyrillic(text)) message.lang = 'ru-Ru'
    else message.lang = 'en-EN'
    message.text = text
    window.speechSynthesis.speak(message)
}

browser.contextMenus.create({
    id: 'BDW__ReadAloud',
    title: 'Прочитать',
    contexts: ['selection'],
})

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case 'BDW__ReadAloud':
            speak(info.selectionText)
    }
})
