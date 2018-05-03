'use strict'
document.getElementsByClassName("icon-github-circled").item(0).addEventListener("mouseover", function () {
    document.getElementsByClassName("icon-github-circled").item(0).classList.add("animate-spin")
}, true);
document.getElementsByClassName("icon-github-circled").item(0).addEventListener("animationend", function () {
    document.getElementsByClassName("icon-github-circled").item(0).classList.remove("animate-spin")
}, true);



function addingClass(themeColor) {
    document.body.classList.toggle(themeColor);
    document.getElementsByClassName("ending-footer")[0].classList.toggle(themeColor);
    document.getElementsByClassName("playground")[0].classList.toggle(themeColor);
    document.getElementsByClassName("main-header")[0].classList.toggle(themeColor);
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("field")[i].classList.toggle(themeColor);
    }
    document.getElementsByClassName("game")[0].classList.toggle(themeColor);
    if (themeColor == "animated") {
        theme = 0;
    }
}

function showCookie(name) {
    if (document.cookie != "") {
        const cookies = document.cookie.split(/; */);

        for (let i = 0; i < cookies.length; i++) {
            const cookieName = cookies[i].split("=")[0];
            const cookieVal = cookies[i].split("=")[1];
            if (cookieName === decodeURIComponent(name)) {
                return decodeURIComponent(cookieVal);
            }
        }

    }
}


function animated() {
    document.body.classList.add("animated");
    document.getElementsByClassName("ending-footer")[0].classList.add("animated");
    document.getElementsByClassName("playground")[0].classList.add("animated");
    document.getElementsByClassName("main-header")[0].classList.add("animated");
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("field")[i].classList.add("animated");
    }
    document.getElementsByClassName("game")[0].classList.add("animated");
    theme = 0;
}

function themeCookie() {
    if (document.cookie = "") {
        document.cookie = "theme=black; expires=Thu, 18 Dec 2019 12:00:00 UTC;  path=/"
    }
    if (showCookie("theme") == "black") {
        animated();
        addingClass("white");
        document.cookie = "theme=white";
    } else {

        animated();
        addingClass("white")
        document.cookie = "theme=black";
    }
}
document.getElementById("themeChanger").addEventListener("click", themeCookie, true)
