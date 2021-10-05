/*
@author Kiwi
@date 2021-10-5

I'm trying to clone the simple puzzle game, Knights
https://store.steampowered.com/app/476240/KNIGHTS/

planning
    draw board
    simulate sebastian lague's board animation at t=29s
        this requires square particles for the board :P
        iterate through board: column » rows each slightly delayed from previous

 */
let font
let lightColor, darkColor
let squareSize

class ChessboardSquare {
    constructor(x, y) {
        this.x = x
        this.y = y

        this.growtime = 100
    }

    //
    show() {

    }

    // slowly get bigger
    update() {

    }
}

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)

    lightColor = color(0, 0, 80)
    darkColor = color(0, 0, 20)
    squareSize = 25
}

function draw() {
    background(234, 34, 24)
    let isLightSquare
    let squareColor
    let squarePosition

    translate(width/2-squareSize*4, height/2-squareSize*4)

    for (let file=0; file<8; file++) {
        for (let rank=0; rank<8; rank++) {
            isLightSquare = (file + rank) % 2 != 0

            if (isLightSquare) {
                squareColor = lightColor
            } else squareColor = darkColor

            squarePosition = new p5.Vector(squareSize*file, squareSize*rank)

            drawSquare(squareColor, squarePosition)
        }
    }
}

function drawSquare(color, pos) {
    noStroke()
    fill(color)
    square(pos.x, pos.y, squareSize)
}