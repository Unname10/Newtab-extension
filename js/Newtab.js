// Global Function
function changeRandomImage(element) {
    let i = Math.floor((Math.random() * 24))+1;
    element.style.backgroundImage = `url("../images/bg/${twoDigitNumber(i)}.png")`;
}
function twoDigitNumber(number) {
    let formattedNumber = ("0" + number).slice(-2);
    return formattedNumber
}
function transitionBg(element1, element2, time) {
    return setInterval(() => {   
        if (element1.style.display == "none"){
            element2.style.display = "none";
            element1.style.display = "block";
            element1.classList.add("fadeIn");
            changeRandomImage(element2);
        } else{
            element1.style.display = "none";
            element2.style.display = "block";
            element2.classList.add("fadeIn");
            changeRandomImage(element1);

        }
    }, time)
}

function toggle(element, status) {
    if (status) element.style.display = "flex";
    else element.style.display = "none";
}

window.onload = async function () {
    //Local Function
    function closeSidebar() {
        sidebar.style.left = `-${sidebar.offsetWidth}px`;
        addDialog.style.display = "none";
        for (let i of [bgElement, bgElement2]) {
            i.removeEventListener("click", closeSidebar);
        }
    }

    function openSidebar() {
        sidebar.style.left = "0";
        for (let i of [bgElement, bgElement2]) {
            i.addEventListener("click", closeSidebar)
        }
    }

    function switchMode() {
        sidebar.classList.toggle("dark-sidebar")
        openSidebarBtn.classList.toggle("dark-content");
    }

    function addContent(element, storageData, onError) {
        if (storageData.length === 0){
            let alertMess = document.createElement("p");
            alertMess.classList.add("alert-content");
            alertMess.innerText = onError;
            element.appendChild(alertMess);   
        } else
        for (let i of storageData){
            let subContent = document.createElement("div");
            subContent.classList.add("subs-content");

            let iconContent = document.createElement("img");
            iconContent.classList.add("icons-content");
            iconContent.src = `https://s2.googleusercontent.com/s2/favicons?domain_url=${i.url}`;

            let textContent = document.createElement("a");
            textContent.classList.add("texts-content");
            textContent.innerText = i.title;
            textContent.href = i.url;

            subContent.appendChild(iconContent);
            subContent.appendChild(textContent);

            element.appendChild(subContent);
        }
    }

    //Variable
    var storageData = await chrome.storage.sync.get();
    var bgElement = document.querySelector("#bg");
    var bgElement2 = document.querySelector("#bg2");
    var sidebar = document.querySelector(".sidebar");
    var darkmodeSwitch = document.querySelector("#darkMode");
    var openSidebarBtn = document.querySelector(".open-sidebar");
    var closeSidebarBtn = document.querySelector(".fa-arrow-left");
    var recentElement = document.querySelector(".recently");
    var recentContentElement = document.querySelector(".recent-content");
    var favoriteElement = document.querySelector(".favorite");
    var favoriteContentElement = document.querySelector(".favorite-content");
    var bookmarkElement = document.querySelector(".bookmark");
    var bookmarkContentElement = document.querySelector(".bookmark-content");
    var settingElement = document.querySelector(".setting");
    var settingContentElement = document.querySelector(".setting-content");    
    var imgSlide = document.querySelector("#img-slide");
    var clock = document.querySelector("#clock");
    var recentlyVisibility = document.querySelector("#recently");
    var favoriteVisibility = document.querySelector("#favorite");
    var imgSlideChildOptions = document.querySelector(".child-options__img");
    var clockChildOptions = document.querySelector(".child-options__clock-format");
    var imgSlideTimeChange = document.querySelector("#img-slide-time");
    var effectRuntimeChange = document.querySelector("#effect-runtime");


    console.log(storageData.setting.effectRuntime)

    //Execute
    changeRandomImage(bgElement);
    changeRandomImage(bgElement2);

    var varNewTabCss = document.querySelector(":root");
    varNewTabCss.style.setProperty("--animation-duration", `${storageData.setting.effectRuntime}s`);

    if (storageData.darkMode) {
        darkmodeSwitch.checked = true;
        switchMode();
    }

    openSidebarBtn.onclick = openSidebar;
    closeSidebarBtn.onclick = closeSidebar;

    darkmodeSwitch.onchange = () => {
        switchMode();
        chrome.storage.sync.set({"darkMode":darkmodeSwitch.checked})
    }
    
    addContent(recentContentElement, storageData.recent, "Bạn chưa truy cập trang nào gần đây!");
    addContent(favoriteContentElement, storageData.favorite, "Bạn chưa truy cập trang nào gần đây!");

    let subContentElement = `
        <div class="add-content-dialog">
            <div class="dialog-items dialog-header">
                <h2 class="dialog-header">Thêm Bookmark:</h3>
                <i class="fa-solid fa-plus"></i>
            </div>
            <div class="form__group url-block">
                <input type="input" class="form__field" placeholder="URL" name="URL" id='URL' required />
                <label for="URL" class="form__label">URL trang Web:</label>
            </div>
            <div class="form__group title-block">
                <input type="input" class="form__field" placeholder="title" name="title" id='title'/>
                <label for="URL" class="form__label">Tiêu đề:</label>
            </div>
        </div>
        <div class="subs-content add-content">
            <i class='bx bx-add-to-queue'></i>
            <p class="add-content-title">Thêm Bookmark</p>
        </div>
    `;
    if (storageData.bookmark.length === 0)
        subContentElement += `
            <p class="alert-content">Bạn chưa thêm Bookmark nào!</p>
        `;
    else {
        for (let i = 0; i < storageData.bookmark.length; ++i){
            subContentElement += `
                <div class="subs-content">
                    <img class="icons-content" src="https://s2.googleusercontent.com/s2/favicons?domain_url=${storageData.bookmark[i].url}"/>
                    <a class="texts-content" href="${storageData.bookmark[i].url}">${storageData.bookmark[i].title}</a>
                    <i class="fa-solid fa-trash" data-id="${i}"></i>
                </div>
            `    
        }
    }
    bookmarkContentElement.innerHTML = subContentElement;

    var trashIcon = document.querySelectorAll(".fa-trash");
    for (let i of trashIcon) {
        i.onclick = () => {
            storageData.bookmark.splice(i.dataset.id, 1);
            chrome.storage.sync.set({"bookmark": storageData.bookmark})
        }
    }

    var addELement = document.querySelector(".add-content");
    var addDialog = document.querySelector(".add-content-dialog");
    addELement.onclick = () => {
        addDialog.style.display = "flex";
        var addBtn = document.querySelector(".fa-plus")
        var inputField = document.querySelectorAll(".form__field")
        addBtn.onclick = () => {
            if (!inputField[0].value){
                alert("Bạn chưa nhập URL trang Web!");
            } else{
                storageData.bookmark.push({
                    "url": inputField[0].value,
                    "title": (inputField[1].value) ? inputField[1].value : inputField[0].value
                })
                chrome.storage.sync.set({"bookmark": storageData.bookmark});
            }
        }
    }
    
    recentElement.addEventListener("mouseenter", () => toggle(recentContentElement, true));
    recentElement.addEventListener("mouseleave", () => toggle(recentContentElement, false));
    favoriteElement.addEventListener("mouseenter", () => toggle(favoriteContentElement, true));
    favoriteElement.addEventListener("mouseleave", () => toggle(favoriteContentElement, false));
    bookmarkElement.addEventListener("mouseenter", () => toggle(bookmarkContentElement, true));
    bookmarkElement.addEventListener("mouseleave", () => toggle(bookmarkContentElement, false));
    settingElement.addEventListener("mouseenter", () => toggle(settingContentElement, true));
    settingElement.addEventListener("mouseleave", () => toggle(settingContentElement, false));

    if (storageData.setting.imgSlide) {
        imgSlide.checked = true;
        toggle(imgSlideChildOptions, true);
        var autoChange = transitionBg(bgElement, bgElement2, storageData.setting.imgSlideTime);
        imgSlideTimeChange.value = storageData.setting.imgSlideTime;
        effectRuntimeChange.vakue = storageData.setting.effectRuntime;
    }
    if (storageData.setting.clock){ 
        clock.checked = true;
        toggle(clockChildOptions, true);
    }
    if (storageData.setting.recentlyVisibility) recentlyVisibility.checked = true;
    else toggle(recentElement, false);
    if (storageData.setting.favoriteVisibility) favoriteVisibility.checked = true;
    else toggle(favoriteElement, false);

    imgSlide.onchange = () => {
        if (imgSlide.checked) var autoChange = transitionBg(bgElement, bgElement2, storageData.setting.imgSlideTime);
        else clearInterval(autoChange);
        toggle(imgSlideChildOptions, imgSlide.checked);
        storageData.setting.imgSlide = imgSlide.checked;
        chrome.storage.sync.set({"setting":storageData.setting})
        imgSlideTimeChange.value = storageData.setting.imgSlideTime;
        effectRuntimeChange.vakue = storageData.setting.effectRuntime;
    }

    imgSlideTimeChange.onchange = () => {
        console.log(imgSlideTimeChange.value);
        clearInterval(autoChange);
        autoChange = transitionBg(bgElement, bgElement2, imgSlideTimeChange.value);
        storageData.setting.imgSlideTime = parseInt(imgSlideTimeChange.value);
        chrome.storage.sync.set({"setting": storageData.setting});
    }
    
    effectRuntimeChange.onchange = () => {
        console.log(effectRuntimeChange.value)
        varNewTabCss.style.setProperty("--animation-duration", `${effectRuntimeChange.value}s`);
        storageData.setting.effectRuntime = effectRuntimeChange.value;
        chrome.storage.sync.set({"effectRuntime": storageData.setting});
    }

    clock.onchange = () => {
        toggle(clockChildOptions, clock.checked);
        storageData.setting.clock = clock.checked;
        chrome.storage.sync.set({"setting":storageData.setting})
    }

    recentlyVisibility.onchange = () => {
        storageData.setting.recentlyVisibility = recentlyVisibility.checked;
        chrome.storage.sync.set({"setting":storageData.setting})
        toggle(recentElement, recentlyVisibility.checked)
    }
    
    favoriteVisibility.onchange = () => {
        storageData.setting.favoriteVisibility = favoriteVisibility.checked;
        chrome.storage.sync.set({"setting":storageData.setting})
        toggle(favoriteElement, favoriteVisibility.checked)
    }
}