chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        "animationDuration": "1.5",
        "bgChangeTime": 5
    });
})

// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//     console.log(tabs[0].url)
// });