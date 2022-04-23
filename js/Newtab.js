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
    //Variable
    var storageData = await chrome.storage.sync.get();
    var bgElement = document.querySelector("#bg");
    var bgElement2 = document.querySelector("#bg2");
    var bgChangeTime = (storageData.bgChangeTime) * 1000;
    var darkmodeSwitch = document.querySelector("#switch");

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

    darkmodeSwitch.onchange = () => {
        var sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("dark")
    }
}