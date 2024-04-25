
class Dinosaur {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize

        this.dinoSize = {
            w: 80,
            h: 80
        }

        this.dinoPos = {
            left: gameSize.w / 2,
            top: this.gameSize.h - this.dinoSize.h - 20,
            base: this.gameSize.h - this.dinoSize.h - 20
        }

        this.dinoSpeed = {
            left: 40,
            top: gameSize.h - this.dinoSize.h - 10,
        }

        this.dinoGravity = {
            gravity: 0.8
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

        if (this.dinoPos.top < this.dinoPos.base) {     // is jumping D:
            this.dinoPos.top += this.dinoSpeed.top;
            this.dinoSpeed.top += this.dinoGravity.gravity;
            //this.dinoPos.left += 5;

        } else {
            this.dinoPos.top = this.dinoPos.base;
            this.dinoSpeed.top = 1;
        }

        this.updatePosition()
        this.checkBordersCollision()
    }

    jump() {
        if (this.dinoPos.top >= this.dinoPos.base) {
            this.dinoPos.top -= 30;
            this.dinoSpeed.top -= 20;
        }
    }



    checkBordersCollision() {
        if (this.dinoPos.left >= this.gameSize.w - this.dinoSize.w) {
            this.moveLeft()
        }

        if (this.dinoPos.left <= 0) {
            this.moveRight()
        }

        if (this.dinoPos.top <= 0) {
            this.turnTop()

        }

        if (this.dinoPos.base <= 0) {


            this.moveBase()
        }


    }

    moveLeft() {
        this.dinoPos.left -= this.dinoSpeed.left
    }

    moveRight() {
        this.dinoPos.left += this.dinoSpeed.left
    }

    turnTop() {
        this.dinoPos.top *= 1
    }

    moveBase() {
        this.dinoPos.base *= -1

    }

    updatePosition() {
        this.dinoElement.style.left = `${this.dinoPos.left}px`
        this.dinoElement.style.top = `${this.dinoPos.top}px`
    }

}
