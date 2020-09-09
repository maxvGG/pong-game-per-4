import Game from './game'
import Char from './char'

export default class Keyboard {
    constructor(game) {
        this.game = game;
        this.reset();



        document.addEventListener('keydown', (event) => {
            this.keys[event.keyCode] = true;

            switch (this.game.currentState) {
                case Game.state.enter:
                    if (!this.input.blocked) {
                        if (this.input.lastSubmittedCharCode === null) {
                            this.input.lastSubmittedCharCode = event.keyCode;

                            const lastSubmittedChar = String.fromCharCode(event.keyCode).toLowerCase();
                            const isValidInput = Char.indexes.substr(0, 36).indexOf(lastSubmittedChar) !== -1 ? true : false
                            const inputLabel = this.game.label[1];

                            if (isValidInput) {
                                inputLabel.name = this.game.replaceAt(inputLabel.name, inputLabel.pointer, lastSubmittedChar);
                                inputLabel.setText(inputLabel.name);
                                inputLabel.pointer++;

                                this.game.Sound.play(this.game.Sound.bounce);
                            }

                            if (inputLabel.pointer === 3 || (event.keyCode === this.enter && inputLabel.pointer >= 1)) {
                                this.input.blocked = true;
                                this.input.lastSubmittedCharCode = null;
                                inputLabel.finished = true;
                            }
                        }
                    }
                    break;
            }
        }, false);

        document.addEventListener('keyup', (event) => {
            this.keys[event.keyCode] = false;
            switch (this.game.currentState) {
                case Game.state.enter:
                    if (event.keyCode === this.input.lastSubmittedCharCode) {
                        this.input.blocked = false;
                        this.input.lastSubmittedCharCode = null;
                    }
                    break;
            }
        }, false)
    }

    isKeyDown(key) {
        return this.keys[key] === true ? true : false;
    }

    reset() {
        this.up = 38;
        this.down = 40;
        this.spacebar = 32;
        this.enter = 13;
        this.keys = [];
        this.input = { blocked: false, lastSubmittedCharCode: null }
    }
}