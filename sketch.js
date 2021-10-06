/*
@author Kiwi
@date 2021-10-5

I'm trying to clone the simple puzzle game, Knights
https://store.steampowered.com/app/476240/KNIGHTS/

ideas: consider an 8-bit board!

planning
.   draw board
.   simulate sebastian lague's board animation at t=29s
    .   this requires square particles for the board :P
    .   iterate through board: column » rows each slightly delayed from previous
        look at sebastian's video
 */

class ChessboardSquare {
    constructor(x, y, r, c, delay) {
        this.x = x
        this.y = y
        this.c = c
        this.r = r

        this.originalGrowTime = 50
        this.growTime = 50
        this.delay = delay
        // some sort of grow time offset variable to delay the grow time
    }

    //
    show() {
        noStroke()
        fill(this.c)
        square(this.x, this.y,
            map(this.growTime, this.originalGrowTime, 0, 0, this.r))
    }

    // we want this square to slowly grow, but some will have a delay before
    // growing depending on where it is on the board
    update() {
        if (this.delay > 0) {
            this.delay -= 1
        } else if (this.growTime > 0)
            // when growTime reaches 0, we are all grown up!
            this.growTime -= 1
    }
}

let font
let lightColor, darkColor
let squareSize
let squares

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    rectMode(CENTER)

    lightColor = color(0, 0, 80)
    darkColor = color(0, 0, 20)
    squareSize = 35
    squares = []

    let isLightSquare
    let squareColor
    let squarePosition
    let counter=0

    for (let file=-4; file<4; file++) {
        for (let rank=-4; rank<4; rank++) {
            isLightSquare = (file + rank) % 2 !== 0

            if (isLightSquare) {
                squareColor = lightColor
            } else squareColor = darkColor

            squarePosition = new p5.Vector(
                squareSize*file+squareSize/2,
                squareSize*rank+squareSize/2)

            squares.push(new ChessboardSquare(
                squarePosition.x,
                squarePosition.y,
                squareSize,
                squareColor,
                counter))
            // drawSquare(squareColor, squarePosition)
            counter += 1
        }
    }
}

function draw() {
    background(234, 34, 24)

    // this centers the board, but I should really fully center and tweak
    // the loop bounds
    // translate(width/2-squareSize*4, height/2-squareSize*4)
    //
    // for (let file=0; file<8; file++) {
    //     for (let rank=0; rank<8; rank++) {
    translate(width/2, height/2)

    squares.forEach(s => s.update())
    squares.forEach(s => s.show())

}

function drawSquare(color, pos) {
    noStroke()
    fill(color)
    square(pos.x, pos.y, squareSize)
}