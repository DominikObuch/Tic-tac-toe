'use strict'
document.getElementsByClassName("icon-github-circled").item(0).addEventListener("mouseover", function () {
    document.getElementsByClassName("icon-github-circled").item(0).classList.add("animate-spin")
}, true);
document.getElementsByClassName("icon-github-circled").item(0).addEventListener("animationend", function () {
    document.getElementsByClassName("icon-github-circled").item(0).classList.remove("animate-spin")
}, true);
//zmiana theme
let theme = 0;

//ciasteczko do zapamiętania theme 
if (document.cookie = "") {
    document.cookie = "theme=black; expires=Thu, 18 Dec 2019 12:00:00 UTC;  path=/"
}

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
    document.body.classList.toggle("animated");
    document.getElementsByClassName("ending-footer")[0].classList.toggle("animated");
    document.getElementsByClassName("playground")[0].classList.toggle("animated");
    document.getElementsByClassName("main-header")[0].classList.toggle("animated");
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("field")[i].classList.toggle("animated");
    }
    document.getElementsByClassName("game")[0].classList.toggle("animated");
    theme = 0;
}
function elo() {
    let cookie = true;
    if (document.cookie == "") {
        document.cookie = "theme=black";
        cookie = false;
        
    }
    if (showCookie("theme") == "black") {
        addingClass("white");
        if (theme == 1 && cookie) {
            addingClass("animated");
        }
        document.cookie = "theme=white"
        theme++;
    } else if (showCookie("theme") == "white") {
        addingClass("white");
        if (theme == 1) {
            addingClass("animated")
        }
        document.cookie = "theme=black"
        theme++;
    }


}
document.getElementById("themeChanger").addEventListener("click", elo, true)

elo()
/*
sprawdzanie czy cookie jest puste
jesli jest to tworzy nowe z wartoscia black
jesli nie jest to sprawdza wartosc
uruchamia funkcj3 ustawiajaca odpowiedni theme
na klikniecie przycisku zmieniamy ciastko i uruchamiamy funkcje do zmiany theme
*/
