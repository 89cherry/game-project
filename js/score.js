class Score {


    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.scoreSize = { w: gameSize.w, h: 50 }


        this.scorePosition = {
            left: gameSize.w - 180,
            top: 20,
        }

        this.currentTime = 0


        this.init()

    }


    init() {

        this.scoreElement = document.createElement('h2');
        this.scoreElement.id = 'time-counter';
        this.scoreElement.innerHTML = this.currentTime;

        this.scoreElement.style.position = "absolute"
        this.scoreElement.style.backgroundColor = `transparent`
        this.scoreElement.style.width = `${this.scoreSize.w}px`
        this.scoreElement.style.height = `${this.scoreSize.h}px`
        this.scoreElement.style.left = `${this.scorePosition.left}px`
        this.scoreElement.style.top = `${this.scorePosition.top}px`

        this.scoreElement.style.color = 'white'


        document.querySelector('#game-screen').appendChild(this.scoreElement)



    }

    incrementTime() {
        this.currentTime++;
        document.getElementById('time-counter').innerHTML = `SCORE: ${this.currentTime}`;
    }

}


