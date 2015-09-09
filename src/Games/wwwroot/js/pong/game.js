var Game = (function () {
    function Game(context) {
        this.keys = {};
        this.context = context;
        var initialSpeed = 200;
        this.ball = new Circle(this.context, 0.5 * context.canvas.width, 0.5 * context.canvas.height, initialSpeed * Math.cos(Math.random() * 2 * Math.PI), initialSpeed * Math.sin(Math.random() * 2 * Math.PI), 12);
        var barWidth = 90;
        var barHeight = 10;
        this.players = new Array(2);
        this.players[0] = new ControlBar(this.context, 20, 0.5 * (context.canvas.height - barWidth), 0, 0, barHeight, barWidth);
        this.players[1] = new ControlBar(this.context, context.canvas.width - 20 - barHeight, 0.5 * (context.canvas.height - barWidth), 0, 100, barHeight, barWidth);
        this.entities = new Array();
        this.entities.push(this.ball);
        this.entities.push(this.players[0]);
        this.entities.push(this.players[1]);
    }
    Game.prototype.doKeyDown = function (e) {
        this.keys[e.keyCode] = true;
    };
    Game.prototype.doKeyUp = function (e) {
        delete this.keys[e.keyCode];
    };
    Game.prototype.update = function (elapsed) {
        if (this.keys[38])
            this.players[0].up();
        else if (this.keys[40])
            this.players[0].down();
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
    window.addEventListener("keydown", function (e) {
        game.doKeyDown(e);
    }, true);
    window.addEventListener("keyup", function (e) {
        game.doKeyUp(e);
    }, true);
    window.requestAnimationFrame = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['msRequestAnimationFrame'] || window['mozRequestAnimationFrame'];
    tick();
}
//# sourceMappingURL=game.js.map