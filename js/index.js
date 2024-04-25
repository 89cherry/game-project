
window.onload = () => {

    Game.init();

    const startButton = document.getElementById("start-button")

    startButton.addEventListener("click", () => {
        Game.startGameLoop()
    })

}