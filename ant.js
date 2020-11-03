let grid = 40;
let gridHalf = Math.round(grid / 2)
let antPosition = grid * gridHalf - grid + gridHalf;
let numberOfSquares = grid * grid;
let antDirection = 'r';
let isRunning = false;

//Check to see if a square is filled
let isFilled = (square) => $('.antField .square:nth-child(' + (square) + ')').hasClass('filled');

//Toggle square fill
let toggleSquare = (square) => $('.antField .square:nth-child(' + (square) + ')').toggleClass('filled');

//Toggle ant fill
let toggleAnt = (square) => $('.antField .square:nth-child(' + (square) + ')').toggleClass('ant');

//Move the ant
let move = function () {

    toggleAnt(antPosition);

    //If the ant is traveling right...
    if (antDirection === 'r') {

        //...and if the next square is filled
        if (isFilled(antPosition + 1)) {
            antDirection = 'u';
        } else {
            antDirection = 'd';
        }

        toggleAnt(antPosition + 1);
        toggleSquare(antPosition + 1);

        antPosition += 1;

        //If the ant is traveling left...
    } else if (antDirection === 'l') {

        //...and if the next square is filled
        if (isFilled(antPosition - 1)) {
            antDirection = 'd';
        } else {
            antDirection = 'u';
        }

        toggleAnt(antPosition - 1);
        toggleSquare(antPosition - 1);

        antPosition -= 1;

        //If the ant is travelling up...
    } else if (antDirection === 'u') {

        //...and the next square is filled
        if (isFilled(antPosition - grid)) {
            antDirection = 'l';
        } else {
            antDirection = 'r';
        }

        toggleAnt(antPosition - grid);
        toggleSquare(antPosition - grid);

        antPosition -= grid;

        //If the ant is travelling down...
    } else {

        //...and if the next square is filled
        if (isFilled(antPosition + grid)) {
            antDirection = 'r';
        } else {
            antDirection = 'l';
        }

        toggleAnt(antPosition + grid);
        toggleSquare(antPosition + grid);

        antPosition += grid;

    }
}

$(document).ready(function () {
    //Create the container
    $('.antField').css({
        width: grid * 20 + 2 + "px"
    });
    //Fill the container with squares
    for (i = 0; i < numberOfSquares; i++) {
        $('<div class="square"></div>').appendTo('.antField');
    }

    //Fill the initial squares
    toggleSquare(antPosition);

    //Place the ant
    toggleAnt(antPosition);

    $(".button").click(() => {
        if (!isRunning) {
            isRunning = true;
            for (i = 1; i < 4000; i++) {
                setTimeout(move, 80 * i);
            };
        }
    });

});