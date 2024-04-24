const Game = {
    gameScreen: document.querySelector("#game-screen"),

    gameSize: {
        w: window.innerWidth * .6,
        h: window.innerHeight / 2,
    },
    framesCounter: 0,
    dinosaur: undefined,
    obstacles: undefined,
    obstaclesMilk: undefined,
    obstaclesDensity: 400,
    obstaclesMilkDensity: 500,
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
        this.incrementScore()
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
        this.obstaclesMilk = []
        this.score = new Score(this.gameScreen, this.gameSize)
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
            this.generateObstaclesMilk()

            this.isCollision() && this.gameOver()
            this.isCollisionMilk() && this.gameOver()

        }, 30)
    },
    drawAll() {
        this.dinosaur.move()
        this.obstacles.forEach(obs => obs.move())
        this.obstaclesMilk.forEach(obs => obs.move())
    },

    generateObstacles() {
        if (this.framesCounter % this.obstaclesDensity === 0) {
            this.obstacles.push(new Obstacles(this.gameScreen, this.gameSize, this.dinosaur.dinoPos, this.dinosaur.dinoSize))
        }
    },

    generateObstaclesMilk() {
        // if (this.framesCounter % this.obstaclesMilkDensity === 0)
        if (Math.random() > 0.80 && this.obstaclesMilk.length < 1) {
            this.obstaclesMilk.push(new ObstaclesMilk(this.gameScreen, this.gameSize, this.dinosaur.dinoPos, this.dinosaur.dinoSize))
        }

        // if (Math.random() > 0.80 && this.obstaclesMilk.length < 1003) {
        //     this.obstaclesMilk.push(new ObstaclesMilk(this.gameScreen, this.gameSize, this.dinosaur.dinoPos, this.dinosaur.dinoSize))
        // }
    },

    clearAll() {
        this.obstacles.forEach((obs, idx) => {
            if (obs.obstaclePos.left <= 0) {
                obs.obstacleElement.remove()
                this.obstacles.splice(idx, 1)
            }
        })

        this.obstaclesMilk.forEach((obs, idx) => {
            if (obs.obstacleMilkPos.left <= 0) {
                obs.obstacleMilkElement.remove()
                this.obstaclesMilk.splice(idx, 1)
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

    isCollisionMilk() {
        for (let i = 0; i < this.obstaclesMilk.length; i++) {
            if (
                this.dinosaur.dinoPos.left + this.dinosaur.dinoSize.w >= this.obstaclesMilk[i].obstacleMilkPos.left &&
                this.dinosaur.dinoPos.top + this.dinosaur.dinoSize.h >= this.obstaclesMilk[i].obstacleMilkPos.top &&
                this.dinosaur.dinoPos.left <= this.obstaclesMilk[i].obstacleMilkPos.left + this.obstaclesMilk[i].obstacleMilkSize.w
            ) {
                return true
            }
        }

    },

    gameOver() {
        console.log('GAME OVER')
    }
}