chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        darkMode: true,
        bookmark: [
            {
                title: 'Youtube',
                url: 'https://www.youtube.com/',
            },
            {
                title: 'MyAnimeList.net - Anime and Manga Database and Community',
                url: 'https://myanimelist.net/',
            },
            {
                title: 'Xem Phim Anime - Hoạt Hình Trung Quốc Hay Online || AnimeHay',
                url: 'https://animehay.club/',
            },
            {
                title: 'Facebook',
                url: 'https://www.facebook.com/',
            },
        ],
        setting: {
            numberOfPicture: 24,
            imgSlide: true,
            effectRuntime: '1.5',
            imgSlideTime: 5000,
            recentlyVisibility: true,
            favoriteVisibility: true,
        },
    });
});

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: 'chrome://newtab' });
});
