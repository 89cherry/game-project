const Game = {
    gameScreen: document.querySelector("#game-screen"),

    gameSize: {
        w: window.innerWidth * .6,
        h: window.innerHeight / 2,
    },
    framesCounter: 0,
    dinosaur: undefined,
    obstacles: undefined,
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
        this.createDino()
    },

    createDino() {
        this.dinosaur = new Dinosaur(this.gameScreen, this.gameSize)
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
            this.moveAll()
        }, 30)

    },

    moveAll() {
        this.dinosaur.move()
    }

}