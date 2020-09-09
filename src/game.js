import Canvas from './canvas';
import Ball from './ball';
import Human from './human';
import Computer from './computer';
import Keyboard from './keyboard';
import Collision from './collision';
import Background from './background';
import { StaticLabel, DynamicLabel, InputLabel } from './label';
import Hud from './hud';
import Sound from './sound';
import Paddle from './paddle';


export default class Game extends Canvas {
    constructor() {
        super('game_canvas', null, 'white', 3);

        this.currentState = Game.state.init;
        this.currentStep = 0;
        this.blocksize = 10;
        this.roundsToWin = 5;

        this.background = new Background(this);
        this.hud = new Hud(this);
        this.Sound = new Sound();
        this.keyboard = new Keyboard(this);
        this.player1 = new Human(this, 1);
        this.player2 = new Computer(this, 2);
        this.ball = new Ball(this);

        this.collision = new Collision(this);

        this.createDelay(500).then(() => {
            this.createAdvancedGameLoop();
        });
    }

    createAdvancedGameLoop() {

            this.step = 1 / 120;
            this.accumulator = 0;

            let lastTime;
            const callback = (millis) => {

                if (lastTime) {

                    const deltatime = (millis - lastTime) / 1000;


                    switch (this.currentState) {
                        case Game.state.init:
                            this.clear();

                            this.player1.paddle.reset();
                            this.player1.update(deltatime);
                            this.player1.score.setText(0);
                            this.player1.draw();

                            this.player2.paddle.reset();
                            this.player2.update(deltatime);
                            this.player2.score.setText(0);
                            this.player2.draw();


                            this.background.draw();
                            this.keyboard.reset();
                            this.ball.reset();

                            this.hud.draw();

                            this.data = null;

                            this.label = new DynamicLabel(this, 'press spacebar to start', this.canvas.width / 2, this.canvas.height / 2, 'grey', 'center');
                            this.currentState = Game.state.intro;
                            break;
                        case Game.state.intro:

                            this.label.update();
                            this.label.draw();

                            if (this.keyboard.isKeyDown(this.keyboard.spacebar)) {
                                this.label.clear();
                                this.label = null;
                                this.currentState = Game.state.play;
                            }

                            break;
                        case Game.state.play:

                            this.player1.checkInput();
                            this.player2.checkInput();
                            this.update(deltatime);
                            this.draw();
                            break;
                        case Game.state.winner:
                            switch (this.currentStep) {
                                case 0:
                                    this.createDelay(500).then(() => {
                                        this.label = new StaticLabel(this, 'you win!', this.canvas.width / 2, this.canvas.height / 2, 'green', 'center');
                                        this.Sound.play(this.Sound.lose);
                                        this.currentStep = 2;

                                    });

                                    this.createDelay(1500).then(() => {
                                        this.label.clear();
                                        this.label = null;
                                        this.currentStep = 3
                                    });

                                    this.createDelay(2000).then(() => {
                                        this.currentStep = 0;
                                        this.currentState = Game.state.enter;
                                    });

                                    this.currentStep++;
                                    break;
                                case 1:

                                    break;
                                case 2:
                                    this.label.update();
                                    this.label.draw();
                                    break;
                                case 3:

                                    break;
                            }

                            break;
                        case Game.state.loser:
                            switch (this.currentStep) {
                                case 0:

                                    this.createDelay(500).then(() => {
                                        this.label = new StaticLabel(this, 'you lose!', this.canvas.width / 2, this.canvas.height / 2, 'red', 'center');
                                        this.Sound.play(this.Sound.lose);
                                        this.currentStep = 2;
                                    });

                                    this.createDelay(1500).then(() => {
                                        this.label.clear();
                                        this.label = null;
                                        this.currentStep = 3
                                    });

                                    this.createDelay(2000).then(() => {
                                        this.currentStep = 0;
                                        this.currentState = Game.state.init;
                                    });

                                    this.currentStep++;
                                    break;
                                case 1:

                                    break;
                                case 2:
                                    this.label.update();
                                    this.label.draw();
                                    break;
                                case 3:
                                    break;
                            }


                            break;
                        case Game.state.enter:
                            switch (this.currentStep) {
                                case 0:
                                    this.label = [];
                                    this.label[0] = new StaticLabel(this, 'enter your name', this.canvas.width / 2, this.canvas.height / 2 - this.blocksize * 6, 'grey', 'center');
                                    this.label[1] = new InputLabel(this, '___', this.canvas.width / 2, this.canvas.height / 2 + this.blocksize * 6, 'grey', 'center');
                                    this.currentStep++;
                                    break;
                                case 1:
                                    for (let i = 0; i < this.label.length; i++) {
                                        if (this.label[i].render) {
                                            this.label[i].clear();
                                            this.label[i].update();
                                            this.label[i].draw();
                                        }
                                    }

                                    if (this.label[1].finished) {
                                        this.currentStep++;
                                    }
                                    break;
                                case 2:
                                    const inputLabel = this.label[1];
                                    if (inputLabel.pointer < inputLabel.value.length) {
                                        inputLabel.name = inputLabel.name.substr(0, inputLabel.name.indexOf('_'));
                                        inputLabel.setText(inputLabel.name);
                                        inputLabel.clear();
                                        inputLabel.update();
                                        inputLabel.draw();
                                    }

                                    this.createDelay(1000).then(() => {
                                        for (let i = 0; i < this.label.length; i++) {
                                            this.label[i].clear();
                                        }
                                        this.label[0] = null;

                                        this.currentStep = 0;
                                        this.currentState = Game.state.save;
                                    });
                                    this.currentStep++;
                                    break;
                                case 3:
                                    break;

                            }

                            break;
                        case Game.state.save:
                            switch (this.currentStep) {
                                case 0:
                                    const name = this.label[1].name;
                                    const score = this.player1.score.value * 50 + 250 - this.player2.score.value * 50;
                                    const score_val = this.player1.score.value + '-' + this.player2.score.value;

                                    this.SendDatabaseRequest(name, score, score_val);

                                    this.label[0] = new DynamicLabel(this, "saving", this.canvas.width / 2, this.canvas.height / 2 - this.blocksize * 6, 'grey', 'center');
                                    this.createDelay(1000).then(() => {
                                        this.currentStep = 2;
                                    });
                                    this.currentStep++;
                                    break;
                                case 1:
                                    for (let i = 0; i < this.label.length; i++) {
                                        if (this.label[i].render) {
                                            this.label[i].clear();
                                            this.label[i].update();
                                            this.label[i].draw();
                                        }
                                    }
                                    break;
                                case 2:
                                    if (this.data === null) {
                                        console.log('waiting for data....');
                                        this.createDelay(1000).then(() => {
                                            this.currentStep = 2;
                                        });
                                        this.currentStep = 1;
                                    } else {
                                        console.log('data ready....');
                                        this.currentStep++;
                                    }
                                    break;
                                case 3:
                                    this.label[0].clear();
                                    this.label[0] = new StaticLabel(this, 'success', this.canvas.width / 2, this.canvas.height / 2 - this.blocksize * 6, 'green', 'center');
                                    this.createDelay(1000).then(() => {
                                        this.currentStep = 5;
                                    });
                                    this.createDelay(2000).then(() => {
                                        this.currentStep = 7;
                                    });
                                    this.currentStep++;
                                    break;

                                case 4:
                                    for (let i = 0; i < this.label.length; i++) {
                                        if (this.label[i].render) {
                                            this.label[i].clear();
                                            this.label[i].update();
                                            this.label[i].draw();
                                        }
                                    }
                                    break;
                                case 5:
                                    for (let i = 0; i < this.label.length; i++) this.label[i].clear();
                                    this.label = null;
                                    this.currentStep++
                                        break;
                                case 6:

                                    break;
                                case 7:
                                    this.currentStep = 0;
                                    this.currentState = Game.state.highscore
                                    break;
                            }
                            break;
                        case Game.state.highscore:
                            console.log('highscore');

                            switch (this.currentStep) {
                                case 0:
                                    if (this.data === null) {
                                        console.log('data is niet beschikbaar');
                                        this.currentStep = 0;
                                        this.currentState = Game.state.init;
                                    } else {
                                        this.createDelay(500).then(() => {
                                            this.currentStep = 2;
                                        });
                                        this.currentStep++;
                                    }
                                    break;
                                case 1:
                                    break;
                                case 2:
                                    const bl = this.blocksize;
                                    const cw = this.canvas.width;
                                    const ch = this.canvas.height;
                                    const amount = this.data.length < 5 ? this.data.length : 5;

                                    this.label = [new StaticLabel(this, 'highscore', cw / 2, ch / 2 - bl * 15, 'blue', 'center')];

                                    for (let i = 0; i < amount; i++) {
                                        let name = this.data[i].name;
                                        let score = this.data[i].score;

                                        this.label[i + 1] = new StaticLabel(this, name, cw / 2 - bl * 3, ch / 2 + bl * 7 * (i + 1) - bl * 15, 'grey', 'left');
                                        this.label[i + 1].render = false

                                        this.label[i + 1 + 5] = new StaticLabel(this, score, cw / 2 + bl * 3, ch / 2 + bl * 7 * (i + 1) - bl * 15, 'grey', 'right');
                                        this.label[i + 1 + 5].render = false;

                                        this.createDelay(100 * i).then(() => {
                                            this.label[i + 1].render = true;
                                            this.label[i + 1 + 5].render = true;
                                            this.Sound.play(this.Sound.win);
                                        });

                                        this.createDelay(2500 + 100 * (i + 1)).then(() => {
                                            if (i === 0) { this.label[0].clear(); }
                                            this.label[i + 1].clear();
                                            this.label[i + 1 + 5].clear();
                                        });



                                    }

                                    this.createDelay(4000).then(() => {
                                        this.label = null;
                                        this.currentState = Game.state.init;
                                    })
                                    this.currentStep++
                                        break;
                                case 3:
                                    if (this.label !== null) {
                                        for (let i = 0; i < this.label.length; i++) {
                                            this.label[i].update();
                                            this.label[i].draw();
                                        }
                                    }
                                    break;

                            }
                            break;

                    }

                }
                lastTime = millis;
                requestAnimationFrame(callback);
            };
            callback();

        }
        // , score_val
    SendDatabaseRequest(name, score, score_val) {
            let xmlhttp = new XMLHttpRequest();
            let me = this;

            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status == 200) {
                        this.data = JSON.parse(xmlhttp.responseText);
                        console.log(this.data);
                    } else if (xmlhttp == 400) {
                        console.log('er is een error 400');
                    } else {
                        console.log('er is iets anders mis gegaan');
                    }
                }
            }

            // xmlhttp.open('GET', 'http://pong.gluweb.nl/savescore.php?n=' + name + '&s=' + score + '&sv=' + score_val, true);
            xmlhttp.open('GET', 'http://u534253.gluweb.nl/test/savescore.php?n=' + name + '&s=' + score + '&sv=' + score_val, true)
            xmlhttp.send();
        }
        // delay maken voor het beginnen
    createDelay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // cecken of de bal met een paddle 
    collide(ball, paddle, deltatime) {
        return (ball.right + ball.velocity.x * deltatime >= paddle.left + paddle.velocity.x * deltatime &&
            ball.left + ball.velocity.x * deltatime <= paddle.right + paddle.velocity.x * deltatime &&
            ball.bottom + ball.velocity.y * deltatime >= paddle.top + paddle.velocity.y * deltatime &&
            ball.top + ball.velocity.y * deltatime <= paddle.bottom + paddle.velocity.y * deltatime) ? true : false;
    }

    CheckCollision(deltatime) {
        if (this.ball.top + this.ball.velocity.y * deltatime < this.blocksize || this.ball.bottom + this.ball.velocity.y * deltatime > this.canvas.height - this.blocksize) {
            this.ball.velocity.y *= -1.1;
            this.Sound.play(this.Sound.bounce);
        }

        this.paddle = (this.ball.position.x < this.canvas.width / 2) ? this.player1.paddle : this.player2.paddle;

        if (this.collide(this.ball, this.paddle, deltatime)) {

            if (this.ball.bottom > this.paddle.top && this.ball.top < this.paddle.bottom) {
                this.ball.position.x = this.paddle.index === 1 ? this.paddle.right + this.ball.size.x / 2 : this.paddle.left - this.ball.size.x / 2;
                this.ball.velocity.x *= -1.1;

                let by = this.ball.position.y | 0;
                let py = this.paddle.position.y | 0;
                let dist = by < py ? Math.abs(by - py) : -Math.abs(by - py);
                if (dist !== 0) {
                    let angle = (this.paddle.index === 1) ? dist : 180 - dist;
                    this.ball.setAngle(angle);
                }

            } else if (this.ball.position.y < this.paddle.position.y) {
                this.ball.position.y = this.paddle.top - this.ball.size.y / 2;
                this.ball.velocity.y *= -1.1;
                this.ball.velocity.y = this.paddle.velocity.y < 0 && this.paddle.velocity.y < this.ball.velocity.y ? this.paddle.velocity.y * 1.1 : this.ball.velocity.y;


            } else if (this.ball.position.y > this.paddle.position.y) {
                this.ball.position.y = this.paddle.bottom + this.ball.size.y / 2;
                this.ball.velocity.y *= -1.1;
                this.ball.velocity.y = this.paddle.velocity.y > 0 && this.paddle.velocity.y > this.ball.velocity.y ? this.paddle.velocity.y * 1.1 : this.ball.velocity.y;
            }
            this.Sound.play(this.Sound.bounce);
        }
        //  check waar de ball het canvas verlaat
        if (this.ball.left > this.canvas.width || this.ball.right < 0) {
            if (this.ball.left > this.canvas.width) {
                this.player1.addScore();

            }
            if (this.ball.right < 0) {
                this.player2.addScore();

            }
            if (this.player1.score.value === this.roundsToWin || this.player2.score.value === this.roundsToWin) {
                this.win();
            }
        }
    }

    simulate(deltatime) {
        this.player1.update(deltatime);
        this.player2.update(deltatime);
        this.ball.update(deltatime);

        this.CheckCollision(deltatime);
        // this.collision.aabb_collision_dectection();
    }

    update(deltatime) {
        this.accumulator += deltatime;
        while (this.accumulator > this.step) {
            this.simulate(this.step);
            this.accumulator -= this.step;
        }

    }

    draw() {
        this.clear();
        this.ball.draw();
        this.player1.draw();
        this.player2.draw();

    }
    win() {
        this.ball.position.x = this.canvas.width / 2;
        this.ball.position.y = -this.ball.size.y * 3;

        this.currentStep = 0;
        this.currentState = (this.player1.score.value === this.roundsToWin) ? Game.state.winner : Game.state.loser;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    toRadians(deg) {
        return deg * (Math.PI / 180);
    }

    toDegrees(rad) {
        return (rad * 180) / Math.PI
    }

    getRandNumBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    replaceAt(str, index, replacement) {
        return str.substr(0, index) + replacement + str.substr(index + replacement.length);
    }
}

Game.state = { init: 0, intro: 1, play: 2, winner: 3, loser: 4, enter: 5, highscore: 6, save: 7 };