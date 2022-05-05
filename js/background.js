chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        "darkMode": true,
        "recent": [],
        "favorite": [],
        "bookmark": [
            {
                title: "Youtube",
                url: "https://www.youtube.com/"
            },
            {
                title: "MyAnimeList.net - Anime and Manga Database and Community",
                url: "https://myanimelist.net/"
            },
            {
                title: "Xem Phim Anime - Hoạt Hình Trung Quốc Hay Online || AnimeHay",
                url: "https://animehay.club/"
            },
            {
                title: "Facebook",
                url: "https://www.facebook.com/"
            }
        ],
        setting: {
            "imgSlide": true,
            "effectRuntime": "1.5",
            "imgSlideTime": 5000,
            "clock": true,
            "recentlyVisibility": true,
            "favoriteVisibility": true
        }
    });
})


chrome.runtime.onMessage.addListener(async (mess, sender) => {
    let dataStorage = await chrome.storage.sync.get();
    let recentArrStoraged = dataStorage.recent;
    let favoriteArrStoraged = dataStorage.favorite;
    let indexOfRecent = recentArrStoraged.findIndex(page => {return page.url == sender.tab.url});
    let indexOfFavorite = favoriteArrStoraged.findIndex(page => {return page.url == sender.tab.url});
    let pageInfo = {
        "url": sender.tab.url,
        "title": sender.tab.title
    }

    if (indexOfRecent == -1) {
        recentArrStoraged.unshift(pageInfo);
    } else {
        recentArrStoraged.splice(indexOfRecent, 1);
        recentArrStoraged.unshift(Object.assign(pageInfo));
    }
    if (recentArrStoraged.length > 10) recentArrStoraged.pop();


    if (indexOfFavorite == -1)
        favoriteArrStoraged.unshift({
            ...pageInfo,
            "counter": 1
        });
    else {
        favoriteArrStoraged[indexOfFavorite].counter++;
        favoriteArrStoraged.sort((a,b) => {
            if (a.counter < b.counter) return -1;
            else if (a.counter > b.counter) return 1;
            return 0;
        })
    }
    if (favoriteArrStoraged.length > 10) favoriteArrStoraged.pop()

    chrome.storage.sync.set({
        "recent": recentArrStoraged,
        "favorite": favoriteArrStoraged
    })
})
