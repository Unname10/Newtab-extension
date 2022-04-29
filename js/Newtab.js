// Function
function changeRandomImage(element) {
    let i = Math.floor((Math.random() * 24))+1;
    element.style.backgroundImage = `url("../images/bg/${twoDigitNumber(i)}.png")`;
}
function twoDigitNumber(number) {
    let formattedNumber = ("0" + number).slice(-2);
    return formattedNumber
}
function changeBg(element1, element2, time) {
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

window.onload = async function () {
    //Local Function
    function closeSidebar() {
        sidebar.style.left = `-${sidebar.offsetWidth}px`;
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

    //Variable
    var storageData = await chrome.storage.sync.get();
    var bgElement = document.querySelector("#bg");
    var bgElement2 = document.querySelector("#bg2");
    var bgChangeTime = (storageData.bgChangeTime) * 1000;
    var sidebar = document.querySelector(".sidebar");
    var darkmodeSwitch = document.querySelector("#switch");
    var openSidebarBtn = document.querySelector(".open-sidebar");
    var closeSidebarBtn = document.querySelector(".fa-arrow-left");
    var recentElement = document.querySelector(".recently");

    //Execute
    changeRandomImage(bgElement);
    changeRandomImage(bgElement2);

    if (bgChangeTime !== 0) {
        var autoChange = changeBg(bgElement, bgElement2, bgChangeTime);
    }

    var varNewTabCss = document.querySelector(":root");
    varNewTabCss.style.setProperty("--animation-duration", `${storageData.animationDuration}s`);

    chrome.storage.onChanged.addListener((changes) => {
        if (changes.bgChangeTime){
            if (changes.bgChangeTime.oldValue !== 0) {
                clearInterval(autoChange);
            }
            autoChange = changeBg(bgElement, bgElement2, changes.bgChangeTime.newValue * 1000);
        }
        if (changes.animationDuration){
            varNewTabCss.style.setProperty("--animation-duration", `${changes.animationDuration.newValue}s`);
        }
    })

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

    // recentElement.onmouseenter = () => {
        
    // }

}