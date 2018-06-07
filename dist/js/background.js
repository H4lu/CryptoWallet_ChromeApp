
chrome.app.runtime.onLaunched.addListener(() => {

    chrome.app.window.create('../main.html', {
        'outerBounds': {
            'minWidth': 1024,
            'minHeight': 720
        }
    })
})
