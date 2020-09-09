import Rectangle from "./rectangle";

export default class Paddle extends Rectangle {
    constructor(game, index) {
        super(0, 0, game.blocksize * 3, game.blocksize * 12);

        this.game = game;
        this.index = index;
        this.speed = 900;
        this.reset();
    }
    update(deltatime) {

        if (this.top + this.velocity.y * deltatime < this.game.blocksize) {
            this.position.y = this.size.y / 2 + this.game.blocksize;
            this.velocity.y = 0;
        } else if (this.bottom + this.velocity.y * deltatime > this.game.canvas.height - this.game.blocksize) {
            this.position.y = this.game.canvas.height - this.size.y / 2 - this.game.blocksize;
            this.velocity.y = 0;
        }
        this.position.x += this.velocity.x * deltatime;
        this.position.y += this.velocity.y * deltatime;

    }

    draw() {
        this.game.context.fillRect(this.left | 0, this.top | 0, this.size.x, this.size.y);

    }

    reset() {
        this.position.x = (this.index === 1) ? this.size.x / 2 + this.game.blocksize : this.game.canvas.width - this.size.x / 2 - this.game.blocksize;
        this.position.y = this.game.canvas.height / 2;
    }
}