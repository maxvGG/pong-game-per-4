import Paddle from './paddle';
import { StaticLabel } from './label';

export default class Player {
    constructor(game, index) {
        this.game = game;
        this.index = index;
        this.paddle = new Paddle(game, index);
        if (index === 1) { this.score = new StaticLabel(game, 0, game.canvas.width / 2 - game.blocksize * 3, game.blocksize * 6, 'white', 'left') };
        if (index === 2) { this.score = new StaticLabel(game, 0, game.canvas.width / 2 + game.blocksize * 3, game.blocksize * 6, 'white', 'right') };

    }

    update(deltatime) {
        this.paddle.update(deltatime);
    }

    draw() {
        this.paddle.draw();
    }

    addScore() {

        this.score.setText(++this.score.value);
        this.game.hud.draw();
        this.game.ball.reset();

    }
}