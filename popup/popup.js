function speak(text) {
    const message = new SpeechSynthesisUtterance()
    message.lang = 'en-EN'
    message.text = text
    window.speechSynthesis.speak(message)
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('readAloud')) {
        speak('Select text and press the button.')
    }
})
