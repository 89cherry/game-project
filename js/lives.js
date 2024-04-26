class Lives {
    constructor(gameScreen, gameSize) {
        this.gameScreen = gameScreen;
        this.gameSize = gameSize;
        this.livesSize = { w: 50, h: 50 };


        this.livesPosition = {
            left: 100,
            top: 10,
        };

        this.currentLives = 3;

        this.init();
    }

    init() {
        this.livesElement = document.createElement('h2');
        this.livesElement.id = 'lives';

        this.livesElement.innerHTML = this.currentLives;

        this.livesElement.style.position = "absolute";
        this.livesElement.style.backgroundColor = 'transparent)';
        this.livesElement.style.width = `${this.livesSize.w}px`;
        this.livesElement.style.height = `${this.livesSize.h}px`;
        this.livesElement.style.left = `${this.livesPosition.left}px`;
        this.livesElement.style.top = `${this.livesPosition.top}px`;

        this.livesElement.style.color = 'white';


        document.querySelector('#game-screen').appendChild(this.livesElement);
    }

    updateLives() {
        document.getElementById("lives").innerHTML = `❤️ ${this.currentLives}`;
    }
}

