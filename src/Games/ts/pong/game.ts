class Game {
    context: CanvasRenderingContext2D;
    entities: Entity[];
    ball: Entity;
    players: ControlBar[];
    keys = {};
    mouse: Vector2 = null;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;

        var initialSpeed = 200;

        this.ball = new Circle(this.context,
            0.5 * context.canvas.width, 0.5 * context.canvas.height,
            initialSpeed * Math.cos(Math.random() * 2 * Math.PI),
            initialSpeed * Math.sin(Math.random() * 2 * Math.PI),
            12);

        var barLength = 90;
        var barDepth = 10;
        this.players = new Array<ControlBar>(2);
        this.players[0] = new ControlBar(this.context,
            20, 0.5 * (context.canvas.height - barLength), 0, 0, barDepth, barLength);
        this.players[1] = new ControlBar(this.context,
            context.canvas.width - 20 - barDepth, 0.5 * (context.canvas.height - barLength),
            0, 100, barDepth, barLength);

        this.entities = new Array<Entity>();
        this.entities.push(this.ball);
        this.entities.push(this.players[0]);
        this.entities.push(this.players[1]);
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
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
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

    window.requestAnimationFrame = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['msRequestAnimationFrame'] || window['mozRequestAnimationFrame'];

    tick();
}