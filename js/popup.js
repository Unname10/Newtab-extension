window.onload = async function() {
    var tabItems = document.querySelectorAll(".tab-item");
    var tabPanes = document.querySelectorAll(".tab-pane");
    var tabActive = document.querySelector(".active");
    var line = document.querySelector(".line");
     
    requestIdleCallback(function () {
        line.style.left = tabActive.offsetLeft + "px";
        line.style.width = tabActive.offsetWidth + "px";
    });
      
    tabItems.forEach((tab, index) => {
        const pane = tabPanes[index];
    
        tab.onclick = function () {
            document.querySelector(".tab-item.active").classList.remove("active");
            document.querySelector(".tab-pane.active").classList.remove("active");
        
            line.style.left = this.offsetLeft + "px";
            line.style.width = this.offsetWidth + "px";
        
            this.classList.add("active");
            pane.classList.add("active");
        };
    });

    //Thời gian chuyển ảnh
    var storageData = await chrome.storage.sync.get();

    var timeChangeBg = document.querySelector("#time-change-bg");
    timeChangeBg.value = storageData.timeChangeBg;

    var animationDuration = document.querySelector("#animation-duration-bg");
    animationDuration.value = storageData.animationDuration;

    timeChangeBg.onchange = () => {
        chrome.storage.sync.set({"timeChangeBg": parseInt(timeChangeBg.value)});
    };
    animationDuration.onchange = () => {
        chrome.storage.sync.set({"animationDuration": animationDuration.value});
    }
};