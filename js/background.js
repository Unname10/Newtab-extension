chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        "animationDuration": "1.5",
        "bgChangeTime": 5,
        "darkMode": true,
        "recent": {},
        "favorite":{}
    });
})


chrome.runtime.onMessage.addListener((mess, sender) => {
    console.log(sender.tab.url);
    console.log(sender.tab.favIconUrl);
    console.log(sender.tab.title);
})
