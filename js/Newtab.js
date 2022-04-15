function changeRandomImage(e) {
    let i = Math.floor((Math.random() * 24))+1;
    e.style.backgroundImage = `url("../images/bg/${twoDigitNumber(i)}.png")`;
}

function twoDigitNumber(number) {
    let formattedNumber = ("0" + number).slice(-2);
    return formattedNumber
}

async function changeBg(timeChangeBg) {
    var bgElement = document.querySelector("#bg");
    var bgElement2 = document.querySelector("#bg2");

    changeRandomImage(bgElement);
    changeRandomImage(bgElement2);

    setTimeout(() => {
        bgElement.classList.remove("fadeIn");
    }, 1500)
    if (timeChangeBg !== 0) {
        setInterval(() => {   
                if (bgElement.style.display == "none"){
                    bgElement.style.display = "block";
                    bgElement2.style.display = "none";
                    bgElement.classList.add("fadeIn");
                    changeRandomImage(bgElement2);
                } else{
                    bgElement.style.display = "none";
                    bgElement2.style.display = "block";
                    bgElement2.classList.add("fadeIn");
                    changeRandomImage(bgElement);
                }

                setTimeout(() => {
                    bgElement.classList.remove("fadeIn");
                    bgElement2.classList.remove("fadeIn");
                }, 1500)
        }, timeChangeBg);
    }
    
}
window.onload = async function () {
    var storageData = await chrome.storage.sync.get(["timeChangeBg"]);
    var timeChangeBg = (storageData.timeChangeBg) * 1000;
    changeBg(timeChangeBg);
}