import Player from "./player";

export default class Computer extends Player {
    constructor(game, index) {
        super(game, index);
        console.log('computer speker')

    }

    checkInput() {
        const distance = Math.abs(this.paddle.position.y - this.game.ball.position.y) | 0;
        // console.log('distance: ', distance);

        if (distance < 20) {
            this.paddle.velocity.y = 0;
        } else if (distance < 40) {
            this.paddle.velocity.y = (this.paddle.speed / 4) * (this.paddle.position.y > this.game.ball.position.y ? -1 : 1);
        } else if (distance < 120) {
            this.paddle.velocity.y = (this.paddle.speed / 2) * (this.paddle.position.y > this.game.ball.position.y ? -1 : 1);
        } else {
            this.paddle.velocity.y = (this.paddle.speed) * (this.paddle.position.y > this.game.ball.position.y ? -1 : 1);
        }
    }
}