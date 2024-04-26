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
    powerDown: undefined,
    powerUp: undefined,
    obstaclesDensity: 400,
    obstaclesMilkDensity: 500,

    score: undefined,
    background: undefined,
    lives: undefined,
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
        this.createElements()
    },

    createElements() {
        this.dinosaur = new Dinosaur(this.gameScreen, this.gameSize)
        this.obstacles = []
        this.obstaclesMilk = []
        this.score = new Score(this.gameScreen, this.gameSize)
        this.powerUp = []
        this.powerDown = []
        this.lives = new Lives(this.gameScreen, this.gameSize)


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
            this.generatePowerUp()
            this.generatePowerDown()
            this.gameSpeed()

            this.isCollisionPowerDown() && this.reduceLives()
            this.isCollisionPowerUp() && this.sumLives()
            this.isCollision() && this.gameOver()
            this.isCollisionMilk() && this.gameOver()


        }, 30)
    },
    drawAll() {
        this.dinosaur.move()
        this.obstacles.forEach(obs => obs.move())
        this.obstaclesMilk.forEach(obs => obs.move())
        this.score.incrementTime()
        this.powerUp.forEach(pUp => pUp.move())
        this.powerDown.forEach(pDown => pDown.move())
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

    },

    generatePowerUp() {
        // if (Math.random() > 0.80 && this.powerUp.length < 1) 
        if (this.framesCounter % 50 === 0) {
            this.powerUp.push(new PowerUp(this.gameScreen, this.gameSize, this.dinosaur.dinoPos, this.dinosaur.dinoSize))
        }
    },


    generatePowerDown() {

        if (this.framesCounter % 50 === 0) {
            this.powerDown.push(new PowerDown(this.gameScreen, this.gameSize, this.dinosaur.dinoPos, this.dinosaur.dinoSize))
        }

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

        this.powerUp.forEach((obs, idx) => {
            if (obs.powerUpPos.top <= 0) {
                obs.powerUpElement.remove()
                this.powerUp.splice(idx, 1)
            }
        })


        this.powerDown.forEach((obs, idx) => {
            if (obs.powerDownPos.top <= 0) {
                obs.powerDownElement.remove()
                this.powerDown.splice(idx, 1)
            }
        })

    },

    isCollision() {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (
                this.dinosaur.dinoPos.left + this.dinosaur.dinoSize.w / 2 >= this.obstacles[i].obstaclePos.left &&
                this.dinosaur.dinoPos.top + this.dinosaur.dinoSize.h / 2 >= this.obstacles[i].obstaclePos.top &&
                this.dinosaur.dinoPos.left <= this.obstacles[i].obstaclePos.left + this.obstacles[i].obstacleSize.w
            ) {
                return true
            }
        }

    },

    isCollisionMilk() {
        for (let i = 0; i < this.obstaclesMilk.length; i++) {
            if (
                this.dinosaur.dinoPos.left + this.dinosaur.dinoSize.w / 2 >= this.obstaclesMilk[i].obstacleMilkPos.left &&
                this.dinosaur.dinoPos.top + this.dinosaur.dinoSize.h / 2 >= this.obstaclesMilk[i].obstacleMilkPos.top &&
                this.dinosaur.dinoPos.left <= this.obstaclesMilk[i].obstacleMilkPos.left + this.obstaclesMilk[i].obstacleMilkSize.w
            ) {
                return true
            }
        }

    },
    isCollisionPowerDown() {

        const dinoBottom = this.dinosaur.dinoPos.top + this.dinosaur.dinoSize.h;

        for (let i = 0; i < this.powerDown.length; i++) {
            if (
                dinoBottom >= this.powerDown[i].powerDownPos.top &&
                this.dinosaur.dinoPos.left + this.dinosaur.dinoSize.w >= this.powerDown[i].powerDownPos.left &&
                this.dinosaur.dinoPos.left <= this.powerDown[i].powerDownPos.left + this.powerDown[i].powerDownSize.w
            ) {
                this.powerDown[i].powerDownElement.remove();
                this.powerDown.splice(i, 1);
                this.lives.currentLives -= 1;
                this.lives.updateLives()
                return true;
            }
            if (this.lives.currentLives === 0) {
                this.gameOver();
            }
        }
        return false;
    },


    isCollisionPowerUp() {
        for (let i = 0; i < this.powerUp.length; i++) {
            if (
                this.dinosaur.dinoPos.top + this.dinosaur.dinoSize.h >= this.powerUp[i].powerUpPos.top &&
                this.dinosaur.dinoPos.left + this.dinosaur.dinoSize.w >= this.powerUp[i].powerUpPos.left &&
                this.dinosaur.dinoPos.left <= this.powerUp[i].powerUpPos.left + this.powerUp[i].powerUpSize.w
            ) {

                this.powerUp[i].powerUpElement.remove();
                this.powerUp.splice(i, 1);
                this.lives.currentLives += 1;
                this.lives.updateLives()
                return true;

            }
        }
        return false;
    },



    // reduceLives() {
    //     if (this.isCollisionPowerDown() && this.lives.currentLives > 0) {
    //         this.lives.currentLives -= 1;
    //         alert(this.lives.currentLives)
    //         this.lives.updateLives()
    //         if (this.lives.currentLives === 0) {
    //             this.gameOver();
    //         }
    //     }

    //     this.powerDown.forEach((obs, idx) => {
    //         if (obs.powerDownPos.top <= 0) {
    //             // obs.powerDownElement.remove();
    //             obs.powerDownElement.style.background = 'red'
    //             // this.powerDown.splice(idx, 1);
    //         }
    //     });
    // },


    // sumLives() {
    //     for (let i = 0; i < this.powerUp.length; i++) {
    //         if (this.isCollisionPowerUp() && this.lives.currentLives > 0) {
    //             this.lives.currentLives += 1;
    //             this.lives.updateLives()
    //             this.lives.livesElement.innerHTML = this.lives.currentLives;

    //             this.powerUp[i].powerUpElement.remove();
    //             this.powerUp.splice(i, 1);
    //         }
    //     }
    // },


    gameSpeed() {
        if (this.score.currentTime >= 400 && this.score.currentTime <= 500) {
            this.obstaclesMilk.forEach(milk => {
                milk.obstacleMilkVel.left = 15;
            });
        }
        if (this.score.currentTime >= 600 && this.score.currentTime <= 1000) {
            // Increment speed of obstacles
            this.obstacles.forEach(eachObs => {
                eachObs.obstacleVel.left = 15; // Increment the speed
            });
        }
        if (this.score.currentTime >= 1500 && this.score.currentTime <= 2000) {
            // Increment speed of obstacles
            this.obstacles.forEach(eachObs => {
                eachObs.obstacleVel.left = 20; // Increment the speed
            });
        }
    },



    gameOver() {
        alert(`SCORE: ${this.score.currentTime} GAME OVER`)
    }
}