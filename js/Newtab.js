function changeRandomImage(e) {
    let i = Math.floor((Math.random() * 25));
    e.style.backgroundImage = `url("../images/bg/${i}.png")`;
}

window.onload = function () {
    var bgElement = document.querySelector("#bg");
    var bgElement2 = document.querySelector("#bg2");
    changeRandomImage(bgElement);
    changeRandomImage(bgElement2);
    setTimeout(() => {
        bgElement.classList.remove("fadeIn");
    }, 1500)
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
    }, 5000);
    
}