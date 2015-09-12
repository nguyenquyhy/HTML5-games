class Game {
    context: CanvasRenderingContext2D;
    entities: Entity[];
    ball: Entity;
    players: ControlBar[];
    keys = {};
    mouse: Vector2 = null;

    INITIAL_BAR_LENGTH = 50;
    INITIAL_BAR_DEPTH = 10;
    INITIAL_BALL_SPEED = 200;

    scores: number[];

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;

        this.ball = new Circle(this.context,
            0.5 * context.canvas.width, 0.5 * context.canvas.height, 0, 0, 12);

        this.players = new Array<ControlBar>(2);
        this.players[0] = new ControlBar(this.context,
            20, 0.5 * (context.canvas.height - this.INITIAL_BAR_LENGTH), 0, 0, this.INITIAL_BAR_DEPTH, this.INITIAL_BAR_LENGTH);
        this.players[1] = new ControlBar(this.context,
            context.canvas.width - 20 - this.INITIAL_BAR_DEPTH, 0.5 * (context.canvas.height - this.INITIAL_BAR_LENGTH),
            0, 100, this.INITIAL_BAR_DEPTH, this.INITIAL_BAR_LENGTH);

        var endBoundary1 = new Boundary(context, 0, 0, new Vector2(1, 0));
        var endBoundary2 = new Boundary(context, context.canvas.width, 0, new Vector2(-1, 0));
        endBoundary1.collided = (entity) => {
            if (entity instanceof Circle) {
                this.scores[1]++;
                this.startGame();
                return true;
            }
            return false;
        };
        endBoundary2.collided = (entity) => {
            if (entity instanceof Circle) {
                this.scores[0]++;
                this.startGame();
                return true;
            }
            return false;
        };

        this.entities = new Array<Entity>();
        this.entities.push(new Boundary(context, 0, 0, new Vector2(0, 1)));
        this.entities.push(new Boundary(context, 0, context.canvas.height, new Vector2(0, -1)));
        this.entities.push(endBoundary1);
        this.entities.push(endBoundary2);
        this.entities.push(this.ball);
        this.entities.push(this.players[0]);
        this.entities.push(this.players[1]);

        this.scores = [0, 0];
    }

    startGame() {
        var angle = Math.random() * 2 * Math.PI - Math.PI;
        if (angle > 0) angle = angle / 2;
        else angle = - Math.PI - angle / 2;
        angle -= Math.PI / 4;
        this.ball.position = new Vector2(0.5 * this.context.canvas.width, 0.5 * this.context.canvas.height);
        this.ball.velocity = new Vector2(this.INITIAL_BALL_SPEED * Math.cos(angle),
            this.INITIAL_BALL_SPEED * Math.sin(angle))
    }

    stopGame() {
        this.scores = [0, 0];
        this.ball.velocity = new Vector2(0, 0);
    }

    update(elapsed: number) {
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
    }

    render(elapsed: number) {
        // Clear everything
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        // Draw background
        this.context.beginPath();
        this.context.strokeStyle = "#000000";
        this.context.moveTo(this.context.canvas.width / 2, 0);
        this.context.lineTo(this.context.canvas.width / 2, this.context.canvas.height);
        this.context.stroke();

        // Draw points
        this.context.font = "20px Arial";
        this.context.fillStyle = "#000000";
        this.context.fillText(this.scores[0].toString(), this.context.canvas.width / 2 - 6 - this.context.measureText(this.scores[0].toString()).width, 20);
        this.context.fillText(this.scores[1].toString(), this.context.canvas.width / 2 + 5, 20);

        // Draw entities
        if (this.entities) {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].draw();
            }
        }
    }

    doKeyDown(e) {
        this.keys[e.keyCode] = true;
    }

    doKeyUp(e) {
        delete this.keys[e.keyCode];
    }

    doMouseDown(e) {
        // TODO: support multi-touch
        if (e.buttons > 0) {
            this.mouse = new Vector2(e.offsetX, e.offsetY);
        }
    }

    doMouseMove(e) {
        if (e.buttons > 0) {
            this.mouse = new Vector2(e.offsetX, e.offsetY);
        }
    }

    doMouseUp(e) {
        this.mouse = null;
    }
}

var lastUpdate;
var game: Game;

function tick() {
    var now = Date.now();

    if (lastUpdate) {
        var elapsed = (now - lastUpdate) / 1000;
        lastUpdate = now;
        game.update(elapsed);
        game.render(elapsed);
    } else {
        lastUpdate = now;
    }

    window.requestAnimationFrame(tick);
}

var canvas = <HTMLCanvasElement>document.getElementById('mainCanvas');
var context: CanvasRenderingContext2D;
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
        $('#txtPointerEvent').text('Supported');
        canvas.addEventListener("pointermove", function (event) {
            game.doMouseMove(event);
        }, false);
        canvas.addEventListener("pointerdown", function (event) {
            game.doMouseDown(event);
        }, false);
        canvas.addEventListener("pointerup", function (event) {
            game.doMouseUp(event);
        }, false);

        //if (window.navigator.maxTouchPoints > 1)
    	   /* User agent and hardware support multi-touch */
    }
    else {
        $('#txtPointerEvent').text('Not supported');
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
    btnStart.click(() => {
        if (btnStart.text() === 'Start Game') {
            game.startGame();
            btnStart.text('Stop Game');
        } else {
            game.stopGame();
            btnStart.text('Start Game');
        }
    });

    window.requestAnimationFrame = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['msRequestAnimationFrame'] || window['mozRequestAnimationFrame'];

    tick();
}