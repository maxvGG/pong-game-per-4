import Rectangle from './rectangle';

export default class Ball extends Rectangle {
    constructor(game) {
        super(0, 0, game.blocksize * 4, game.blocksize * 4);

        this.game = game;
        this.speed = 800;
        this.velocity.x = 1;
        this.velocity.y = 2;

        this.reset();
    }
    update(deltatime) {
        this.position.x += this.velocity.x * deltatime;
        this.position.y += this.velocity.y * deltatime;

    }
    draw() {
        this.game.context.fillRect(this.left | 0, this.top | 0, this.size.x, this.size.y);
    }
    reset() {
        this.position.x = this.game.canvas.width / 2;
        this.position.y = this.game.canvas.height / 2;
        const degrees = this.game.getRandNumBetween(0, 60) + (this.game.getRandNumBetween(1, 2) === 2 ? 330 : 150)
        this.setAngle(degrees)
    }

    setAngle(degrees) {

        const radians = this.game.toRadians(degrees);
        this.velocity.x = this.speed * Math.cos(radians);
        this.velocity.y = this.speed * -Math.sin(radians);
    }
}