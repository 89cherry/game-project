class Score {


    constructor(gameScreen, gameSize, start) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.scoreSize = { w: gameSize.w, h: 50 }
        this.start = start()

        this.scorePosition = {
            left: gameSize.w - 112,
            top: 20,
        }

        // this.currentTime = 0


        this.init()

    }


    init() {

        this.scoreElement = document.createElement('h2');
        this.scoreElement.id = 'contador';
        this.scoreElement.textContent = '0000000000';

        this.scoreElement.style.position = "absolute"
        this.scoreElement.style.backgroundColor = `transparent`
        this.scoreElement.style.width = `${this.scoreSize.w}px`
        this.scoreElement.style.height = `${this.scoreSize.h}px`
        this.scoreElement.style.left = `${this.scorePosition.left}px`
        this.scoreElement.style.top = `${this.scorePosition.top}px`

        this.scoreElement.style.color = 'white'


        document.querySelector('#game-screen').appendChild(this.scoreElement)



    }

    // incrementScore() {
    //     if this.start() {
    //         this.currentTime++
    //     }
    // }

}


