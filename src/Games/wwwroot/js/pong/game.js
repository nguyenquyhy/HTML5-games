var Game = (function () {
    function Game(context) {
        this.context = context;
        this.ball = new Entity(this.context, Math.random() * context.canvas.width, Math.random() * context.canvas.height, 3);
        this.ball.velocityX = 50 * Math.cos(Math.random() * 2 * Math.PI);
        this.ball.velocityY = 50 * Math.sin(Math.random() * 2 * Math.PI);
        this.entities = new Array();
        this.entities.push(this.ball);
    }
    Game.prototype.update = function (elapsed) {
        if (this.entities) {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].update(elapsed);
            }
        }
    };
    Game.prototype.render = function (elapsed) {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        if (this.entities) {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].draw();
            }
        }
    };
    return Game;
})();
var lastUpdate;
var game;
function tick() {
    var now = Date.now();
    if (lastUpdate) {
        var elapsed = (now - lastUpdate) / 1000;
        lastUpdate = now;
        game.update(elapsed);
        game.render(elapsed);
    }
    else {
        lastUpdate = now;
    }
    window.requestAnimationFrame(tick);
}
var canvas = document.getElementById('mainCanvas');
if (canvas.getContext) {
    var context = canvas.getContext('2d');
    game = new Game(context);
    tick();
}
//# sourceMappingURL=game.js.map