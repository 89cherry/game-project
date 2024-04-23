const Game = {
    gameScreen: document.querySelector("#game-screen"),

    gameSize: {
        w: window.innerWidth * .6,
        h: window.innerHeight / 2,
    },
    framesCounter: 0,
    dinosaur: undefined,
    obstacles: undefined,
    obstaclesDensity: 80,
    background: undefined,
    score: 0,
    lives: 3,
    gameIsOver: false,

    keys: {
        JUMP: 'ArrowUp',
        RIGHT: 'ArrowRight',
        LEFT: 'ArrowLeft',
    },

    init() {
        this.setDimensions()
        this.start()
        this.setEventListeners()
    },

    setDimensions() {
        this.gameScreen.style.width = `${this.gameSize.w}px`
        this.gameScreen.style.height = `${this.gameSize.h}px`

    },

    start() {
        this.startGameLoop()
        this.createElements()

    },

    createElements() {
        this.dinosaur = new Dinosaur(this.gameScreen, this.gameSize)
        this.obstacles = []
    },

    setEventListeners() {
        document.onkeydown = event => {

            const { code } = event

            switch (code) {
                case this.keys.LEFT:
                    this.dinosaur.moveLeft()
                    break
                case this.keys.RIGHT:
                    this.dinosaur.moveRight()
                    break
                case this.keys.JUMP:
                    this.dinosaur.jump()
                    break;
            }
        }
    },

    startGameLoop() {

        setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

            this.drawAll()
            this.clearAll()

            this.generateObstacles()

            this.isCollision() && this.gameOver()
        }, 20)
    },
    drawAll() {
        this.dinosaur.move()
        this.obstacles.forEach(obs => obs.move())
    },

    generateObstacles() {
        if (this.framesCounter % this.obstaclesDensity === 0) {
            this.obstacles.push(new Obstacles(this.gameScreen, this.gameSize, this.dinosaur.dinoPos, this.dinosaur.dinoSize))
        }
    },

    clearAll() {
        this.obstacles.forEach((obs, idx) => {
            if (obs.obstaclePos.left <= 0) {
                obs.obstacleElement.remove()
                this.obstacles.splice(idx, 1)
            }
        })
    },

    isCollision() {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (
                this.dinosaur.dinoPos.left + this.dinosaur.dinoSize.w >= this.obstacles[i].obstaclePos.left &&
                this.dinosaur.dinoPos.top + this.dinosaur.dinoSize.h >= this.obstacles[i].obstaclePos.top &&
                this.dinosaur.dinoPos.left <= this.obstacles[i].obstaclePos.left + this.obstacles[i].obstacleSize.w
            ) {
                return true
            }
        }
    },

    gameOver() {
        console.log('GAME OVER')
    }
}