var Game = (function () {
    function Game(context) {
        var _this = this;
        this.keys = {};
        this.mouse = null;
        this.INITIAL_BAR_LENGTH = 50;
        this.INITIAL_BAR_DEPTH = 10;
        this.INITIAL_BALL_SPEED = 200;
        this.context = context;
        this.ball = new Circle(this.context, 0.5 * context.canvas.width, 0.5 * context.canvas.height, 0, 0, 12);
        this.players = new Array(2);
        this.players[0] = new ControlBar(this.context, 20, 0.5 * (context.canvas.height - this.INITIAL_BAR_LENGTH), 0, 0, this.INITIAL_BAR_DEPTH, this.INITIAL_BAR_LENGTH);
        this.players[1] = new ControlBar(this.context, context.canvas.width - 20 - this.INITIAL_BAR_DEPTH, 0.5 * (context.canvas.height - this.INITIAL_BAR_LENGTH), 0, 100, this.INITIAL_BAR_DEPTH, this.INITIAL_BAR_LENGTH);
        var endBoundary1 = new Boundary(context, 0, 0, new Vector2(1, 0));
        var endBoundary2 = new Boundary(context, context.canvas.width, 0, new Vector2(-1, 0));
        endBoundary1.collided = function (entity) {
            if (entity instanceof Circle) {
                _this.scores[1]++;
                _this.startGame();
                return true;
            }
            return false;
        };
        endBoundary2.collided = function (entity) {
            if (entity instanceof Circle) {
                _this.scores[0]++;
                _this.startGame();
                return true;
            }
            return false;
        };
        this.entities = new Array();
        this.entities.push(new Boundary(context, 0, 0, new Vector2(0, 1)));
        this.entities.push(new Boundary(context, 0, context.canvas.height, new Vector2(0, -1)));
        this.entities.push(endBoundary1);
        this.entities.push(endBoundary2);
        this.entities.push(this.ball);
        this.entities.push(this.players[0]);
        this.entities.push(this.players[1]);
        this.scores = [0, 0];
    }
    Game.prototype.startGame = function () {
        var angle = Math.random() * 2 * Math.PI;
        this.ball.position = new Vector2(0.5 * this.context.canvas.width, 0.5 * this.context.canvas.height);
        this.ball.velocity = new Vector2(this.INITIAL_BALL_SPEED * Math.cos(angle), this.INITIAL_BALL_SPEED * Math.sin(angle));
    };
    Game.prototype.stopGame = function () {
        this.scores = [0, 0];
        this.ball.velocity = new Vector2(0, 0);
    };
    Game.prototype.update = function (elapsed) {
        if (this.keys[38])
            this.players[0].up();
        else if (this.keys[40])
            this.players[0].down();
        if (this.mouse !== null) {
            if (this.mouse.y > this.context.canvas.height / 2)
                this.players[0].down();
            else
                this.players[0].up();
        }
        if (this.entities) {
            for (var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                entity.update(elapsed, this.entities);
            }
        }
    };
    Game.prototype.render = function (elapsed) {
        // Clear everything
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        // Draw background
        this.context.strokeStyle = "#000000";
        this.context.moveTo(this.context.canvas.width / 2, 0);
        this.context.lineTo(this.context.canvas.width / 2, this.context.canvas.height);
        this.context.stroke();
        // Draw points
        this.context.font = "20px Arial";
        this.context.fillStyle = "#000000";
        this.context.fillText(this.scores[0].toString(), this.context.canvas.width / 2 - 15, 20);
        this.context.fillText(this.scores[1].toString(), this.context.canvas.width / 2 + 5, 20);
        // Draw entities
        if (this.entities) {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].draw();
            }
        }
    };
    Game.prototype.doKeyDown = function (e) {
        this.keys[e.keyCode] = true;
    };
    Game.prototype.doKeyUp = function (e) {
        delete this.keys[e.keyCode];
    };
    Game.prototype.doMouseDown = function (e) {
        // TODO: support multi-touch
        if (e.buttons > 0) {
            this.mouse = new Vector2(e.offsetX, e.offsetY);
        }
    };
    Game.prototype.doMouseMove = function (e) {
        if (e.buttons > 0) {
            this.mouse = new Vector2(e.offsetX, e.offsetY);
        }
    };
    Game.prototype.doMouseUp = function (e) {
        this.mouse = null;
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
var context;
if (canvas.getContext) {
    context = canvas.getContext('2d');
    game = new Game(context);
    window.addEventListener("keydown", function (e) {
        game.doKeyDown(e);
    }, true);
    window.addEventListener("keyup", function (e) {
        game.doKeyUp(e);
    }, true);
    if (window['PointerEvent']) {
        canvas.addEventListener("pointermove", function (event) {
            game.doMouseMove(event);
        }, false);
        canvas.addEventListener("pointerdown", function (event) {
            game.doMouseDown(event);
        }, false);
        canvas.addEventListener("pointerup", function (event) {
            game.doMouseUp(event);
        }, false);
    }
    else {
        //Provide fallback for user agents that do not support Pointer Events
        canvas.addEventListener("mousemove", function (event) {
            game.doMouseMove(event);
        }, false);
        canvas.addEventListener("mousedown", function (event) {
            game.doMouseDown(event);
        }, false);
        canvas.addEventListener("mouseup", function (event) {
            game.doMouseUp(event);
        }, false);
    }
    var btnStart = $('#btnStart');
    btnStart.click(function () {
        if (btnStart.text() === 'Start Game') {
            game.startGame();
            btnStart.text('Stop Game');
        }
        else {
            game.stopGame();
            btnStart.text('Start Game');
        }
    });
    window.requestAnimationFrame = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['msRequestAnimationFrame'] || window['mozRequestAnimationFrame'];
    tick();
}
