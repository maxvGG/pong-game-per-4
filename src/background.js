import Canvas from './canvas';

export default class Background extends Canvas {
    constructor(game) {
        super('bg_canvas', 'black', 'white', 1);

        this.game = game;
        // console.log(this.game.canvas.height)
    }

    draw() {
        const cw = this.game.canvas.width;
        const ch = this.game.canvas.height;
        const bl = this.game.blocksize;

        this.context.fillRect(0, 0, cw, bl);
        this.context.fillRect(0, ch - bl, cw, bl);

        const count = (ch / 2 / bl) | 0;
        for (let i = 1; i <= count; i++) {
            if (i % 2 !== 0) {
                this.context.fillRect(cw / 2 - bl / 2, ch / 2 - bl / 2 - (i - 1) * bl, bl, bl);
                this.context.fillRect(cw / 2 - bl / 2, ch / 2 - bl / 2 + (i - 1) * bl, bl, bl);
            }
        }
    }
}