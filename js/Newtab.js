var images = ['bg-02.jpg', 'bg-03.jpg', 'bg-08.jpg', 'bg-10.jpg', 'bg-11.jpg']
function changeRandomImage(e) {
    let i = Math.floor((Math.random() * images.length));
    e.style.backgroundImage = `url("../images/bg/${images[i]}")`;
}

window.onload = function () {
    var bgElement = document.querySelector("#bg");
    var bgElement2 = document.querySelector("#bg2");
    changeRandomImage(bgElement);
    setTimeout(() => {
        bgElement.classList.remove("fadeIn");
    }, 1500)
    setInterval(() => {   
        changeRandomImage(bgElement)
        bgElement.classList.add("fadeIn")
        setTimeout(() => {
            bgElement.classList.remove("fadeIn");
        }, 1500)
    }, 5000);
}