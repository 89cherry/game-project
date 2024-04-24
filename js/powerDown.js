class powerDown {

    constructor(gameScreen, gameSize, dinoPos, dinoSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.dinoPos = dinoPos
        this.dinoSize = dinoSize


        this.powerDownSize = {
            w: 100,
            h: 100
        }

        this.powerDownPos = {
            left: 0,
            top: this.gameSize.h - this.obstacleSize.h - 20,
            base: this.gameSize.h - this.obstacleSize.h - 20

        }

        this.powerDownVel = {
            left: 5

        }

        this.init()
    }



}