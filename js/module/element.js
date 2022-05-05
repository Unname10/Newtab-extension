export function changeRandomImage(element) {
    let i = Math.floor((Math.random() * 24))+1;
    element.style.backgroundImage = `url("../images/bg/${("0" + i).slice(-2)}.png")`;
}

export function transitionBg(element1, element2, time) {
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

export function toggle(element, status, displayType) {
    if (status) element.style.display = displayType;
    else element.style.display = "none";
}

export function addContent(element, storageData, onError) {
    if (storageData.length === 0){
        element.innerHTML = `<p class="alert-content">${onError}</p>`
    } else{
        for (let i of storageData){
            element.innerHTML = `
                <div class="subs-content">
                    <img class="icons-content" src="https://s2.googleusercontent.com/s2/favicons?domain_url=${i.url}">
                    <a class="texts-content" href="${i.url}">${i.title}</a>
                </div>
            `
        }
    }
}

export function toggleClass(toggleClass, ...element) {
    element.forEach(value => value.classList.toggle(toggleClass))
}

export function closeSidebar(sidebarELement) {
    sidebarELement.style.left = `-${sidebarELement.offsetWidth}px`;
    for (let i of [bgElement, bgElement2]) {
        i.removeEventListener("click", closeSidebar);
    }
}

export function openSidebar(sidebarELement) {
    sidebarELement.style.left = "0";
    document.onclick = e => {
        if (e.target !== sidebarELement) closeSidebar(sidebarELement)
    }
}