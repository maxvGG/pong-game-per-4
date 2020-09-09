import Canvas from "./canvas";

export default class Hud extends Canvas {
    constructor(game) {
        super("hud_canvas", null, 'white', 3);
        // console.log(game);
        this.game = game;
        console.log(game);
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    draw() {
        this.clear();
        this.game.player1.score.render = true;
        this.game.player2.score.render = true;

        // this.game.player1.score.update();
        this.game.player1.score.draw();
        // this.game.player2.score.update();
        this.game.player2.score.draw();
    }
}