let queue = {
    current: 0, //0 = circle, 1 = cross; 
    match: 1
};
let round = 0;
let winner;

function ending() {
    for (let x = 0; x < document.querySelectorAll(".field > div").length; x++) {
        let elFieldDiv = document.querySelectorAll(".field > div").item(x).classList;
        elFieldDiv.add("animated");
        elFieldDiv.remove("rubberBand");
        elFieldDiv.add("bounceOut");
    }
    winner[0].addEventListener("animationend", function () {
        for (let y = 0; y < 9; y++) {
            document.getElementsByClassName("field")[y].classList.remove("borderFlash");
            document.querySelectorAll(".field").item(y).innerHTML = "";
        }
        //rozpoczęcie gry od nowa
        queue.current = queue.match;
        if (queue.match === 0) {
            queue.match = 1;
        } else {
            queue.match = 0;
        }
        for (let i = 0; i < 9; i++) {
            document.getElementsByClassName("field").item(i).addEventListener("click", mainFn, true);
        }
        round = 0;
    }, true)
    resetEvents();

}

function mainFn() { //główna funkcja dodająca 

    if (queue.current === 0 && this.innerHTML == "") {
        this.appendChild(creatingChar("circle"));
        queue.current = 1;
        if (round == 0) {
            document.getElementById("toogleCross").classList.add("active")
        }
        round++;
        document.getElementById("toogleCross").classList.toggle("active");
        document.getElementById("toogleCircle").classList.toggle("active");
        if (round >= 5) {
            inspection();
        }
    } else if (queue.current === 1 && this.innerHTML == "") {
        this.appendChild(creatingChar("cross"));
        queue.current = 0;
        document.getElementById("toogleCross").classList.toggle("active")

        document.getElementById("toogleCircle").classList.toggle("active")
        round++;
        if (round >= 5) {
            inspection();
        }

    }
}

function animationBfEnd() {
    if (arguments.length !== 0) { //animacja dla elementów na ukos 

        for (let i = 0; i < 3; i++) {
            let quSel = document.querySelector(`${arguments[i]}>div`).classList;
            quSel.remove("bounceIn");
            quSel.add("rubberBand");
        }
        return null;
    } else {
        for (let i = 0; i < 3; i++) { //animacja dla elementów w pionie i poziomie
            winner.item(i).classList.remove("bounceIn");
            winner.item(i).classList.add("rubberBand");
        }
    }
}

function resetEvents() {
    document.getElementsByClassName("game").item(0).removeEventListener("click", ending, true)
}

function drawAnimation() {

    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("field")[i].classList.add("borderFlash");

    }
}

function stopGame() { //zatrzymanie gry 
    if (winner == undefined) {
        winner = document.querySelectorAll(".field");
    }
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("field").item(i).removeEventListener("click", mainFn, true);
    }
    document.getElementsByClassName("game").item(0).addEventListener("click", ending, true);

}

function inspection() {
    let clmnRows = [".first-row", ".second-row", ".third-row", ".first-column", ".second-column", ".third-column", "#field1", "#field5", "#field9", "#field3", "#field5", "#field7"];
    winner = undefined;

    function ch(sel, num = null) {
        if (document.querySelectorAll(`${sel}>div`).item(num)) {
            winner = document.querySelectorAll(`${sel}>div`);
            return document.querySelectorAll(`${sel}>div`).item(num).classList[0];
        } else
            return Math.random() * 1000;
    }
    if (round == 9) { //jeżeli nikt nie wygrał 
        drawAnimation();
        stopGame();


    }
    for (let i = 0; i < 6; i++) { //sprawdzanie czy ktoś wygrał w poziomie i pionie i na ukos
        if ((ch(clmnRows[i], 0) === ch(clmnRows[i], 1) && ch(clmnRows[i], 2) === ch(clmnRows[i], 0))) {
            if (ch(clmnRows[i]) === "circle") { //zmienianie wyniku 
                let elScoreCircle = parseInt(document.getElementById("scoreCircle").innerHTML, 10);
                elScoreCircle++;
                document.getElementById("scoreCircle").innerHTML = elScoreCircle;
                animationBfEnd();
                stopGame();

            } else {
                let elScoreCross = parseInt(document.getElementById("scoreCross").innerHTML, 10);
                elScoreCross++;
                document.getElementById("scoreCross").innerHTML = elScoreCross;
                animationBfEnd();
                stopGame();
            }

        }
    }
    for (let i = 6; i < 12; i += 3) { //sprawdzenie czy ktoś wygrał na ukos 
        let x = i;
        if ((ch(clmnRows[i]) === ch(clmnRows[x += 1]) && ch(clmnRows[i]) === ch(clmnRows[x += 1]))) {
            if (ch(clmnRows[i]) == "circle") {

                let elScoreCircle = parseInt(document.getElementById("scoreCircle").innerHTML, 10);
                elScoreCircle++;
                document.getElementById("scoreCircle").innerHTML = elScoreCircle;
            } else {
                let elScoreCross = parseInt(document.getElementById("scoreCross").innerHTML, 10);
                elScoreCross++;
                document.getElementById("scoreCross").innerHTML = elScoreCross;
            }
            animationBfEnd(clmnRows[i], clmnRows[x - 1], clmnRows[x]);
            stopGame();
        }


    }
}

function creatingChar(sign) { //tworzenie kółka i krzyżyka 
    let cont = document.createElement("div");
    cont.classList = `${sign} animated bounceIn`;
    return cont;
}
for (let i = 0; i < 9; i++) {
    document.getElementsByClassName("field").item(i).addEventListener("click", mainFn, true);
}





//gra dla 1 osoby
function resetGame() {
    //resetowanie zmiennych
    winner = undefined;
    queue = {
        current: 0, //0 = circle, 1 = cross; 
        match: 1
    }
    round = 0;
    //resetowanie wyniku
    document.getElementById("scoreCircle").innerHTML = 0;
    document.getElementById("scoreCross").innerHTML = 0;
    //usuwanie klas aktywnych 
    if (document.getElementById("toogleCross").classList.contains("active")) {
        document.getElementById("toogleCross").classList.remove("active");
    }
    if (document.getElementById("toogleCircle").classList.contains("active")) {
        document.getElementById("toogleCircle").classList.remove("active");
    }


    for (let i = 0; i < document.querySelectorAll(".field").length; i++) {
        document.getElementsByClassName("field").item(i).removeEventListener("click", mainFn, true)
        document.querySelectorAll(".field").item(i).innerHTML = "";
    }


    // funkcja do usuwania klas z selektorów
    function delClass(selector, ...removeClass) {
        if (selector == null) {
            return null;
        }
        if (document.querySelectorAll(selector).length >= 2) {
            for (let i = 0; i < document.querySelectorAll(selector).length; i++) {
                if (removeClass.length >= 2) {
                    for (let x = 0; x <= removeClass.length; x++) {
                        document.querySelectorAll(selector).item(i).classList.remove(removeClass[x])
                    }
                } else {
                    document.querySelectorAll(selector).item(i).classList.remove(removeClass)
                }
            }
        } else {

            document.querySelector(selector).classList.remove(removeClass[0]);
            if (removeClass.length >= 2) {
                for (let x = 0; x <= removeClass.length; x++) {
                    document.querySelector(selector).classList.remove(removeClass[x])
                }
            }
        }

    }

    delClass(".field", "borderFlash");


}

/*function computerMove() {
    //funkcje dla poszczególnych ruchów
    //jeśli komputer zaczyna
    function movementZero() {
        let rand = Math.round(Math.random() * 4);
        document.getElementsByClassName("corner")[rand].appendChild(creatingChar("cross"));
    }
    if (document.querySelectorAll(".field > div").length == 0 && queue.match == 0) {
        movementZero();
    } else if (document.querySelectorAll(".field > div").length == 1) {
        if (document.getElementsByClassName("circle")[0].parentElement.classList.contains("corner")) {
            console.log("jestem w rogu")
        } else if (document.getElementsByClassName("circle")[0].parentElement.classList.contains("side")) {
            console.log("jestem w boku")
        } else {
            console.log("jestem na środku")
        }
    }
}*/



function onePlayerMainFn() {
    if (this.innerHTML == "") {
        this.appendChild(creatingChar("circle"));

        round++;
        if (round >= 4) {
            inspection();
        }
        computerMove();
    }
}
document.getElementById("onePlayer").addEventListener("click", function () {
    resetGame();
    resetEvents();
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("field").item(i).addEventListener("click", onePlayerMainFn, true);
    }
}, true);

function minMaxFn() {
    let score = 0;
    let tb = []
    for (let i = 0; i < 9; i++) {
        if (document.querySelectorAll(".field div").item(i) == null) {
            tb.push(null);
        } else {
            tb.push(document.querySelectorAll(".field div").item(i).classList.item(0))
        }
    
    }

    function elooo(){
            let char = "cross"
            function scoreBilans(amount){if (char=="cross")score+=amount ; else score-=amount;}        
        //zmiana o 2 
        for(let x=0;x<=8;x++){ console.log("pierwsza ok");if(tb[x]===char)scoreBilans(4); if(tb[++x]==char)scoreBilans(2)}
        
        if(tb[4]==char){scoreBilans(3)}
        //zmiana po 1
        for(let x=-1;x<=8;x){console.log("druga ok");if(tb[x++]===char&&tb[x++]===char&&tb[x++]===char){scoreBilans(100)}}
        //zmiana po 3 z innymi początkami
        
        for(let y=0;y<=2;y++){if(tb[y]===char&&tb[y+=3]===char&&tb[y+=3]===char){ scoreBilans(100)}console.log(y--);if(y<-20){return null;}}
        //zmiana po 
        if(tb[0]===char&&tb[4]===char&&tb[8]===char){scoreBilans(100)}
        if(tb[2]===char&&tb[4]===char&&tb[6]===char){scoreBilans(100)}
        
        /*for(let x=0; x<=8; x-=3){ console.log("tu nawet nie dojde");if((tb[x]===char&&tb[x++]===char)||(tb[x]===char&&tb[x++]===char)){sc=+5}; if((tb[x-2]===char&&tb[x+=3]===char)||(tb[x]===char&&tb[x+=3]===char)){scoreBilans(5)};}*/
        
        
        if((tb[0]===char&&tb[4]===char)||(tb[4]===char&&tb[8]===char)){scoreBilans(5)};
        if((tb[2]===char&&tb[4]===char)||(tb[4]===char&&tb[6]===char)){scoreBilans(5)};
        
        console.log("ten ruch wynosi" + score);
    }
    elooo();
}

function computerMove() {
    let elFields = document.querySelectorAll(".field");

    for (let i = 0; i < 9; i++) {
        if (elFields.item(i).childNodes.length === 1) {} else {
            elFields.item(i).appendChild(creatingChar("cross"))
            elFields.item(i).childNodes.item(0).classList.add("notVisible")
            minMaxFn();
            elFields.item(i).innerHTML = "";
        }
    }
}




//stawienie wszędzie znaku sprawdzenie ile w tym polu jest pkt do zdobycia wrzucienie tego do tablicy i wyciągnięcie najwyższej wartości
