class PowerDown {


    constructor(gameScreen, gameSize, dinoPos, dinoSize) {


        this.gameScreen = gameScreen;
        this.gameSize = gameSize;
        this.dinoPos = dinoPos;
        this.dinoSize = dinoSize;

        this.powerDownSize = {
            w: 100,
            h: 100
        };

        this.powerDownPos = {
            left: Math.random() * (this.gameSize.w - this.powerDownSize.w),
            top: 0,
            base: this.gameSize.h - this.powerDownSize.h - 20
        };

        this.powerDownVel = {
            top: 5
        };

        this.init();
    }

    init() {
        this.powerDownElement = document.createElement('img');
        this.powerDownElement.src = "./image/monster.png";

        this.powerDownElement.style.position = "absolute";
        this.powerDownElement.style.width = `${this.powerDownSize.w}px`;
        this.powerDownElement.style.height = `${this.powerDownSize.h}px`;
        this.powerDownElement.style.left = `${this.powerDownPos.left}px`;
        this.powerDownElement.style.top = `${this.powerDownPos.top}px`;

        document.querySelector('#game-screen').appendChild(this.powerDownElement);
    }

    move() {
        this.powerDownPos.top += this.powerDownVel.top;
        this.updatePosition();
    }

    updatePosition() {
        this.powerDownElement.style.left = `${this.powerDownPos.left}px`;
        this.powerDownElement.style.top = `${this.powerDownPos.top}px`;
    }
}