export function changeRandomImage(element, numberOfPicture) {
    let i = Math.floor((Math.random() * 24))+1;
    element.style.backgroundImage = `url("../images/bg/${("0" + i).slice(-2)}.png")`;
}

export function transitionBg(element1, element2, time, numberOfPicture) {
    return setInterval(() => {   
        if (element1.style.display == "none"){
            element2.style.display = "none";
            element1.style.display = "block";
            element1.classList.add("fadeIn");
            changeRandomImage(element2, numberOfPicture);
        } else{
            element1.style.display = "none";
            element2.style.display = "block";
            element2.classList.add("fadeIn");
            changeRandomImage(element1, numberOfPicture);
        }
    }, time)
}

export function toggle(element, status, displayType = "flex") {
    if (status) element.style.display = displayType;
    else element.style.display = "none";
}

export function addContent(element, storageData, onError) {
    if (storageData.length === 0){
        element.innerHTML = `<p class="alert-content">${onError}</p>`
    } else{
        let content = "";
        for (let i of storageData){
            content += `
                <div class="subs-content">
                    <img class="icons-content" src="https://s2.googleusercontent.com/s2/favicons?domain_url=${i.url}">
                    <a class="texts-content" href="${i.url}">${i.title}</a>
                </div>
            `
        }
        element.innerHTML = content;
    }
}

export function toggleClass(toggleClass, ...element) {
    element.forEach(value => value.classList.toggle(toggleClass))
}

export function closeSidebar(sidebarELement, ...element) {
    sidebarELement.style.left = `-${sidebarELement.offsetWidth}px`;
    element.forEach(e => {
        e.addEventListener("click", () => closeSidebar(sidebarELement));
    })
}

export function openSidebar(sidebarELement, ...element) {
    sidebarELement.style.left = "0";
    element.forEach(e => {
        e.addEventListener("click", () => {closeSidebar(sidebarELement)});
    })
}