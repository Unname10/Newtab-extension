import * as Module from "./module/element.js"

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

window.onload = async function () {
    //Variables
    var storageData = await chrome.storage.sync.get();
    var darkMode = storageData.darkMode;
    var recent = await chrome.history.search({text: '', maxResults: 10});
    var favorite = (await chrome.topSites.get()).slice(0, 10);
    var bookmark = storageData.bookmark;
    var setting = storageData.setting;
    var sidebar = $(".sidebar");
    var bgElement = $("#bg");
    var bgElement2 = $("#bg2");
    var openSidebarBtn = $(".open-sidebar");
    var closeSidebarBtn = $(".fa-arrow-left");
    var recentElement = $(".recently");
    var recentContentElement = $(".recent-content");
    var favoriteElement = $(".favorite");
    var favoriteContentElement = $(".favorite-content");
    var bookmarkElement = $(".bookmark");
    var bookmarkContentElement = $(".bookmark-content");
    var settingElement = $(".setting");
    var settingContentElement = $(".setting-content");
    var numberOfPicture = $("#number-of-picture");
    var submitNumberOfPicture = $(".bxs-send");
    var imgSlide = $("#img-slide");
    var recentlyVisibility = $("#recently");
    var favoriteVisibility = $("#favorite");
    var imgSlideChildOptions = $(".child-options__img");
    var imgSlideTimeChange = $("#img-slide-time");
    var effectRuntimeChange = $("#effect-runtime");
    var darkmodeSwitch = $("#darkMode");
    var iconMode = $("#icon-mode");
    var autoChange;
    

    // Initialize

    // Chuyển hình ảnh ban đầu
    Module.changeRandomImage(bgElement, setting.numberOfPicture);
    Module.changeRandomImage(bgElement2, setting.numberOfPicture);

    function bg(trans) {
        if (trans) autoChange = Module.transitionBg(bgElement, bgElement2, setting.imgSlideTime, setting.numberOfPicture);
        else clearInterval(autoChange);
    }


    // Thiết lập thời gian chuyển ảnh
    if (setting.imgSlide) { // Kiểm tra xem có bật chuyển ảnh hay không
        imgSlide.checked = true;
        Module.toggle(imgSlideChildOptions, true);
        bg(true);
        imgSlideTimeChange.value = setting.imgSlideTime;
        effectRuntimeChange.value = setting.effectRuntime;
    }

    // Thiết lập thời gian chạy hiệu ứng chuyển ảnh
    $(":root").style.setProperty("--animation-duration", `${setting.effectRuntime}s`);

    // Kiểm tra Darkmode có được bật hay không
    if (darkMode) {
        darkmodeSwitch.checked = true;
        Module.toggleClass("dark-sidebar", sidebar);
        Module.toggleClass("dark-content",openSidebarBtn);
    } else{
        Module.toggleClass("bx-moon", iconMode);
        Module.toggleClass("bx-sun", iconMode);
    }

    // Kiểm tra hiển thị mục Gần đây
    if (storageData.setting.recentlyVisibility) recentlyVisibility.checked = true;
    else Module.toggle(recentElement, false);

    // Kiểm tra hiển thị mục Yêu thích
    if (storageData.setting.favoriteVisibility) favoriteVisibility.checked = true;
    else Module.toggle(favoriteElement, false);

    // Thêm nội dung vào hai thẻ Recent và Favorite
    Module.addContent(recentContentElement, recent, "Bạn chưa truy cập trang nào gần đây!");
    Module.addContent(favoriteContentElement, favorite, "Bạn chưa truy cập trang nào gần đây!");

    //Thêm nội dung vào thẻ Bookmark
    function bookmarkInit() {
        let subContentElement = `
            <div class="add-content-dialog">
                <div class="dialog-items dialog-header">
                    <h2 class="dialog-header">Thêm Bookmark:</h3>
                    <div id="icons-queue">
                        <i class="fa-solid fa-plus"></i>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div class="form__group url-block">
                    <input type="input" class="form__field" placeholder="URL" name="URL" id='URL' required />
                    <label for="URL" class="form__label">URL trang Web:</label>
                </div>
                <div class="form__group title-block">
                    <input type="input" class="form__field" placeholder="title" name="title" id='title'/>
                    <label for="title" class="form__label">Tiêu đề:</label>
                </div>
            </div>
            <div class="subs-content add-content">
                <i class='bx bx-add-to-queue'></i>
                <p class="add-content-title">Thêm Bookmark</p>
            </div>
        `;
        if (bookmark.length === 0){
            subContentElement += `
                <p class="alert-content">Bạn chưa thêm Bookmark nào!</p>
            `;
        } else {
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
    };
    bookmarkInit();

    // Thêm số lượng hình ảnh vào hộp nhập
    numberOfPicture.value = setting.numberOfPicture;

    //Phần tử trong mục Bookmark
    var trashIcon = $$(".fa-trash");
    var addELement = $(".add-content");
    var addDialog = $(".add-content-dialog");
    var addBtn = $(".fa-plus");
    var inputField = $$(".form__field");

    // Khởi tạo các sự kiện (events)

    // Đóng mở Sidebar
    openSidebarBtn.onclick = () => Module.openSidebar(sidebar, bgElement, bgElement2);
    closeSidebarBtn.onclick = () => Module.closeSidebar(sidebar, bgElement, bgElement2);


    // Hiện/ẩn các mục khi di chuột vào/ra các mục
    recentElement.addEventListener("mouseenter", () => Module.toggle(recentContentElement, true));
    recentElement.addEventListener("mouseleave", () => Module.toggle(recentContentElement, false));
    favoriteElement.addEventListener("mouseenter", () => Module.toggle(favoriteContentElement, true));
    favoriteElement.addEventListener("mouseleave", () => Module.toggle(favoriteContentElement, false));
    bookmarkElement.addEventListener("mouseenter", () => Module.toggle(bookmarkContentElement, true));
    bookmarkElement.addEventListener("mouseleave", () => Module.toggle(bookmarkContentElement, false));
    settingElement.addEventListener("mouseenter", () => Module.toggle(settingContentElement, true));
    settingElement.addEventListener("mouseleave", () => Module.toggle(settingContentElement, false));


    //Bookmark
    // Sự kiện xóa các mục trong bookmark
    trashIcon.forEach(element => {
        element.onclick = () => {
            bookmark.splice(element.dataset.id, 1);
            chrome.storage.sync.set({"bookmark": bookmark});
            bookmarkInit();
        }
    });


    // Hiện thị form nhập bookmark khi nhấp vào dấu +
    addELement.onclick = () => {
        Module.toggle(addDialog, true); //Hiển thị form
        addBtn.onclick = () => { //Kiểm tra đầu vào người dùng nhập
            if (!inputField[0].value){
                alert("Bạn chưa nhập URL trang Web!");
            } else{
                bookmark.push({
                    "url": inputField[0].value,
                    "title": (inputField[1].value) ? inputField[1].value : inputField[0].value
                })
                chrome.storage.sync.set({"bookmark": bookmark});
                bookmarkInit();
            }
        }
    }
    
    //Settings
    // Lấy số lượng hình ảnh
    submitNumberOfPicture.onclick = () => {
        setting.numberOfPicture = numberOfPicture.value;
        chrome.storage.sync.set({"setting":setting});
    }
    

    // Thay đổi thời gian trình chiếu
    imgSlide.onchange = () => {
        // Thêm/xóa sự kiện thay đổi hình ảnh tự động
        if (imgSlide.checked) bg(true)
        else bg(false)
        // Hiện/ẩn các mục tùy chỉnh con
        Module.toggle(imgSlideChildOptions, imgSlide.checked);
        // Cập nhật giá trị vào storage
        setting.imgSlide = imgSlide.checked;
        chrome.storage.sync.set({"setting":setting})
        imgSlideTimeChange.value = setting.imgSlideTime;
        effectRuntimeChange.value = setting.effectRuntime;
    }

    // Thay đổi thời gian chuyển ảnh
    imgSlideTimeChange.onchange = () => {
        // Xóa sự kiện chuyển ảnh hiện tại
        bg(false);
        // Thêm lại sự kiện mới
        bg(true);
        // Cập nhật giá trị vào storage
        setting.imgSlideTime = parseInt(imgSlideTimeChange.value);
        chrome.storage.sync.set({"setting": setting});
    }
    
    // Thay đổi thời gian chạy hiệu ứng
    effectRuntimeChange.onchange = () => {
        //Thay đổi biến trong css
        $(":root").style.setProperty("--animation-duration", `${effectRuntimeChange.value}s`);
        // Cập nhật giá trị vào storage
        setting.effectRuntime = effectRuntimeChange.value;
        chrome.storage.sync.set({"effectRuntime": setting});
    }


    // Thay đổi hiện/ẩn mục Gần đây
    recentlyVisibility.onchange = () => {
        Module.toggle(recentElement, recentlyVisibility.checked)
        // Cập nhật giá trị vào storage
        setting.recentlyVisibility = recentlyVisibility.checked;
        chrome.storage.sync.set({"setting":setting})
    }
    
    // Thay đổi hiện/ẩn mục Yêu thích
    favoriteVisibility.onchange = () => {
        Module.toggle(favoriteElement, favoriteVisibility.checked)
        // Cập nhật giá trị vào storage
        setting.favoriteVisibility = favoriteVisibility.checked;
        chrome.storage.sync.set({"setting":setting})
    }

    
    // Thay đổi trạng thái Darkmode và chỉnh sửa storage
    darkmodeSwitch.onchange = () => {
        Module.toggleClass("bx-moon", iconMode);
        Module.toggleClass("bx-sun", iconMode);
        Module.toggleClass("dark-sidebar", sidebar);
        Module.toggleClass("dark-content",openSidebarBtn);
        chrome.storage.sync.set({"darkMode":darkmodeSwitch.checked})
    }
}