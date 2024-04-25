class Obstacles {

    constructor(gameScreen, gameSize, dinoPos, dinoSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.dinoPos = dinoPos
        this.dinoSize = dinoSize


        this.obstacleSize = {
            w: 80,
            h: 80
        }

        this.obstaclePos = {
            left: 0,
            top: this.gameSize.h - this.obstacleSize.h - 20,
            base: this.gameSize.h - this.obstacleSize.h - 20

        }

        this.obstacleVel = {
            left: 5

        }

        this.init()
    }

    init() {
        this.obstacleElement = document.createElement('img')
        this.obstacleElement.src = "./image/milkshake.png"

        this.obstacleElement.style.background = "transparent"
        this.obstacleElement.style.position = "absolute"
        this.obstacleElement.style.width = `${this.obstacleSize.w}px`
        this.obstacleElement.style.height = `${this.obstacleSize.h}px`
        this.obstacleElement.style.left = `${this.obstaclePos.left}px`
        this.obstacleElement.style.top = `${this.obstaclePos.top}px`

        document.querySelector('#game-screen').appendChild(this.obstacleElement)
    }

    move() {
        this.obstaclePos.left += this.obstacleVel.left
        this.updatePosition()
    }

    updatePosition() {
        this.obstacleElement.style.left = `${this.obstaclePos.left}px`
        this.obstacleElement.style.top = `${this.obstaclePos.top}px`
    }

}




