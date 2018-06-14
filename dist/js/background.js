chrome.app.runtime.onLaunched.addListener(() => {
    chrome.app.window.create('../main.html', {
        frame: 'none',
        'resizable': false,
        id: 'frameLessWin',
        outerBounds: {
            'minWidth': 1024,
            'minHeight': 720
        }

    })
})
