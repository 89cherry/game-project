class ObstaclesMilk {

    constructor(gameScreen, gameSize, dinoPos, dinoSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.dinoPos = dinoPos
        this.dinoSize = dinoSize


        this.obstacleMilkSize = {
            w: 100,
            h: 100
        }

        this.obstacleMilkPos = {
            left: gameSize.w,
            top: this.gameSize.h - this.obstacleMilkSize.h - 5,
            base: this.gameSize.h - this.obstacleMilkSize.h - 5

        }

        this.obstacleMilkVel = {
            left: 5

        }

        this.init()
    }

    init() {
        this.obstacleMilkElement = document.createElement('img')
        this.obstacleMilkElement.src = "./image/milk-bottle.png"

        this.obstacleMilkElement.style.position = "absolute"
        this.obstacleMilkElement.style.width = `${this.obstacleMilkSize.w}px`
        this.obstacleMilkElement.style.height = `${this.obstacleMilkSize.h}px`
        this.obstacleMilkElement.style.left = `${this.obstacleMilkPos.left}px`
        this.obstacleMilkElement.style.top = `${this.obstacleMilkPos.top}px`

        document.querySelector('#game-screen').appendChild(this.obstacleMilkElement)
    }

    move() {
        this.obstacleMilkPos.left -= this.obstacleMilkVel.left
        this.updatePosition()
    }

    updatePosition() {
        this.obstacleMilkElement.style.left = `${this.obstacleMilkPos.left}px`
        this.obstacleMilkElement.style.top = `${this.obstacleMilkPos.top}px`
    }

}