class Dinosaur {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize

        this.dinoSize = {
            w: 80,
            h: 80
        }

        this.dinoPos = {
            left: 20,
            top: this.gameSize.h - this.dinoSize.h - 5,
            base: this.gameSize.h - this.dinoSize.h - 20
        }

        this.dinoSpeed = {
            left: 10,
            top: gameSize.h - this.dinoSize.h - 10,

        }

        this.dinoGravity = {
            gravity: 0.6
        }


        this.init()

    }

    init() {

        this.dinoElement = document.createElement('img')
        this.dinoElement.src = "./image/dinosaur.png"


        this.dinoElement.style.position = "absolute"
        this.dinoElement.style.width = `${this.dinoSize.w}px`
        this.dinoElement.style.height = `${this.dinoSize.h}px`
        this.dinoElement.style.left = `${this.dinoPos.left}px`
        this.dinoElement.style.top = `${this.dinoPos.top}px`


        document.querySelector('#game-screen').appendChild(this.dinoElement)

    }


    move() {

        if (this.dinoPos.top < this.dinoPos.base) {
            this.dinoPos.top += this.dinoSpeed.top;
            this.dinoSpeed.top += this.dinoGravity.gravity;
        } else {
            this.dinoPos.top = this.dinoPos.base;
            this.dinoSpeed.top = 1;
        }


        this.updatePosition()
        this.checkBordersCollision()

    }

    jump() {
        if (this.dinoPos.top >= this.dinoPos.base) {
            this.dinoPos.top -= 40;
            this.dinoSpeed.top -= 8;
        }
    }



    checkBordersCollision() {
        if (this.dinoPos.left >= this.gameSize.w - this.dinoSize.w) {
            this.moveLeft()
        }

        if (this.dinoPos.top >= this.gameSize.h - this.dinoSize.h) {
            this.turnTop()
        }

        if (this.dinoPos.left <= 0) {
            this.moveRight()
        }

        if (this.dinoPos.top <= 0) {
            this.turnTop()

        }
    }

    moveLeft() {
        this.dinoPos.left -= this.dinoSpeed.left
    }

    turnTop() {
        this.dinoSpeed.top *= -1
    }

    moveRight() {
        this.dinoPos.left += this.dinoSpeed.left
    }

    updatePosition() {
        this.dinoElement.style.left = `${this.dinoPos.left}px`
        this.dinoElement.style.top = `${this.dinoPos.top}px`
    }
}
