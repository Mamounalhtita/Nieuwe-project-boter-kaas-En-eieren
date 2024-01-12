// Selecteer alle HTML-elementen met de klasse "box" en sla ze op in de variabele 'boxes'
let boxes = document.querySelectorAll(".box");

// Variabele 'turn' houdt bij welke speler aan de beurt is ( "X")
let turn = "X";

// Variabele 'isGameOver' geeft aan of het spel is afgelopen 
let isGameOver = false;

// Loop door elk element met de klasse "box"
boxes.forEach(e => {
    // Maak de inhoud van elk element leeg
    e.innerHTML = "";
    
    // Voeg een click eventlistener toe aan elk element
    e.addEventListener("click", () => {
        // Controleer of het spel niet is afgelopen en het huidige element leeg is
        if (!isGameOver && e.innerHTML === "") {
            // Vul de inhoud van het huidige element met de huidige speler ('X' of 'O')
            e.innerHTML = turn;
            
            // Controleer of er een winnaar is
            checkWin();
            
            // Controleer of het gelijkspel is
            checkDraw();
            
            // Wissel de beurt
            changeTurn();
        }
    });
});

// Functie om de beurt te wisselen tussen 'X' en 'O'
function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

// Functie om te controleren of er een winnaar is
function checkWin() {
    // Array met arrays van mogelijke winnende combinaties op het speelbord
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Loop door elke winnende combinatie
    for (let i = 0; i < winConditions.length; i++) {
        // Haal de inhoud van de drie vakjes in de huidige winnende combinatie op
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        // Controleer of alle drie de vakjes dezelfde inhoud hebben en niet leeg zijn
        if (v0 !== "" && v0 === v1 && v0 === v2) {
            // Er is een winnaar
            isGameOver = turn;
            
            // Toon de winnaar in het resultaatelement
            document.querySelector("#results").innerHTML = turn + " wint";
            
            // Toon de "Speel opnieuw" knop
            document.querySelector("#play-again").style.display = "inline";

            // Kleur de winnende vakjes anders
            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = " rgb(26, 66, 53)";
                boxes[winConditions[i][j]].style.color = "#000";
            }
        }
    }
}

// Functie om te controleren of het gelijkspel is
function checkDraw() {
    // Als het spel nog niet is afgelopen
    if (!isGameOver) {
        // Controleer of alle vakjes zijn gevuld (geen lege vakjes meer)
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") {
                isDraw = false;
            }
        });

        // Als alle vakjes zijn gevuld, maar er is geen winnaar
        if (isDraw) {
            // Het is een gelijkspel
            isGameOver = turn;
            document.querySelector("#results").innerHTML = "Gelijkspel";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

// Voeg een eventlistener toe aan de "Speel opnieuw" knop
document.querySelector("#play-again").addEventListener("click", () => {
    // Reset het spel
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    // Herstel de kleuren van de vakjes
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});