import Rectangle from './rectangle';
import Char from './char';
export class Label extends Rectangle {
    constructor(game, text, x, y, color, aligning) {
        super(x, y, 0, 0);
        this.game = game;
        this.color = color;
        this.aligning = aligning;
        this.render = true;
        this.setText(text);
    }
    setText(text) {
        this.charWidth = []; // Measure width of char!
        this.value = text;
        this.pixels = this.rasterize(text);
        this.size.x = this.pixels[0].length * this.game.blocksize;
        this.size.y = this.pixels.length * this.game.blocksize;
        if (this.aligning === 'left') this.align = -this.size.x / 2;
        if (this.aligning === 'right') this.align = this.size.x / 2;
        if (this.aligning === 'center') this.align = 0;
        this.render = true;
    }
    rasterize(value) {
        const string = value.toString();
        const array = [
            [],
            [],
            [],
            [],
            []
        ];
        for (let i = 0; i < string.length; i++) {
            const char = Char.getArray(string[i]);
            const height = char.length;
            this.charWidth.push(char[0].length); // Add width of char!
            for (let y = 0; y < height; y++) {
                let isLastElement = i === string.length - 1 ? true : false;
                array[y] = array[y].concat(!isLastElement ? char[y].concat([0]) : char[y]);
            }
        }
        return array;
    }
    clear(index = null) {
        if (index !== null) {
            const width = this.charWidth[index] * this.game.blocksize;
            let x = 0;
            for (let i = 0; i < index; i++) x += this.charWidth[i] * this.game.blocksize + this.game.blocksize;
            this.game.hud.context.clearRect(this.left + this.align + x, this.top, width, this.size.y);
            return;
        }
        this.game.hud.context.clearRect(0, this.top, this.game.canvas.width, this.size.y);
    }
    update() {
        console.log('update');
    }
    draw() {
        //console.log('draw label', this.value);
        const bl = this.game.blocksize;
        const width = this.pixels[0].length;
        const height = this.pixels.length;
        this.game.hud.context.save();
        this.game.hud.context.fillStyle = this.color;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (this.pixels[y][x]) {
                    this.game.hud.context.fillRect(this.left + this.align + x * bl, this.top + y * bl, bl, bl);
                }
            }
        }
        this.game.hud.context.restore();
    }
}
export class StaticLabel extends Label {

    constructor(...params) {
        super(...params);
    }
    update() {
        super.update();
    }
    draw() {
        if (this.render) {
            super.draw();
            this.render = false;
        }
    }
}
export class DynamicLabel extends Label {
    constructor(...params) {
        super(...params);
        this.delay = false;
        this.visible = true;
    }
    update() {
        if (!this.delay) {
            this.delay = true;
            this.game.createDelay(125).then(() => {
                this.visible = this.visible === true ? false : true;
                this.render = true;
                this.delay = false;
            });
        }
    }
    draw() {
        if (this.render) {
            if (this.visible) {
                super.draw();
            } else {
                super.clear();
            }
            this.render = false;
        }
    }
}
export class InputLabel extends Label {
    constructor(...params) {
        super(...params);
        this.delay = false;
        this.visible = true;
        this.name = '___';
        this.pointer = 0;
        this.finished = false;
    }
    update() {
        if (!this.delay) {
            this.delay = true;
            this.game.createDelay(125).then(() => {
                this.visible = this.visible === true ? false : true;
                this.render = true;
                this.delay = false;
            });
        }
    }
    draw() {
        if (this.render) {
            super.draw();
            if (!this.visible) {
                super.clear(this.pointer);
            }
            this.render = false;
        }
    }
}