class PowerUp {

    constructor(gameScreen, gameSize, dinoPos, dinoSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.dinoPos = dinoPos
        this.dinoSize = dinoSize


        this.powerUpSize = {
            w: 100,
            h: 100
        }

        this.powerUpPos = {
            left: Math.random() * (this.gameSize.w - this.powerUpSize.w),
            top: 0,
            base: this.gameSize.h - this.powerUpSize.h - 20
        };

        this.powerUpVel = {
            top: 5

        }

        this.init()
    }

    init() {
        this.powerUpElement = document.createElement('img')
        this.powerUpElement.src = "./image/chocolate.png"

        this.powerUpElement.style.position = "absolute"
        this.powerUpElement.style.width = `${this.powerUpSize.w}px`
        this.powerUpElement.style.height = `${this.powerUpSize.h}px`
        this.powerUpElement.style.left = `${this.powerUpPos.left}px`
        this.powerUpElement.style.top = `${this.powerUpPos.top}px`

        document.querySelector('#game-screen').appendChild(this.powerUpElement)
    }

    move() {
        this.powerUpPos.top += this.powerUpVel.top;
        this.updatePosition();
    }

    updatePosition() {
        this.powerUpElement.style.left = `${this.powerUpPos.left}px`
        this.powerUpElement.style.top = `${this.powerUpPos.top}px`
    }







}