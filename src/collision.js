export default class Collision {
    constructor(game) {
        this.game = game;
        // console.log(this.game);
    }



    aabb_collision_dectection() {
        // this.game.paddle = (this.game.ball.position.x < this.game.canvas.width / 2) ? this.game.player1.paddle : this.game.player2.paddle;

        // // check colision top and bottom canvas
        // if ((this.game.ball.position.y - this.game.ball.size.y / 2) < 0 || (this.game.ball.position.y + this.game.ball.size.y / 2) > 700) {
        //     this.game.ball.velocity.y = -this.game.ball.velocity.y;
        //     this.game.ball.velocity.x = -this.game.ball.velocity.x;
        // }
        // // check collision right and left canvas
        // if ((this.game.ball.position.x - this.game.ball.size.x / 2) < 0 || (this.game.ball.position.x + this.game.ball.size.x / 2) > 1000) {

        //     if (this.game.ball.position.y < this.game.paddle.position.y) {
        //         this.game.ball.velocity.x = -this.game.ball.velocity.x;
        //         this.game.ball.velocity.y = -this.game.ball.velocity.y;
        //     }
        //     if (this.game.ball.position.y > this.game.paddle.position.y) {
        //         this.game.ball.velocity.x = -this.game.ball.velocity.x;
        //         this.game.ball.velocity.y = -this.game.ball.velocity.y;

        //     }
        // }
        // document.getElementById("score_computer").innerHTML = computer_score;
        // document.getElementById("score_player").innerHTML = player_score;
    }

}