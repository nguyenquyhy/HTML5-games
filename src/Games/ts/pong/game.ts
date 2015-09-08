class Game {
    context: CanvasRenderingContext2D;
    entities: Entity[];
    ball: Entity;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;

        this.ball = new Entity(this.context, Math.random() * context.canvas.width, Math.random() * context.canvas.height, 12);
        this.ball.velocityX = 200 * Math.cos(Math.random() * 2 * Math.PI);
        this.ball.velocityY = 200 * Math.sin(Math.random() * 2 * Math.PI);

        this.entities = new Array<Entity>();
        this.entities.push(this.ball);
    }

    update(elapsed: number) {
        if (this.entities) {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].update(elapsed);
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
}

var lastUpdate;
var game;

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
if (canvas.getContext) {
    var context = canvas.getContext('2d');
    game = new Game(context);
    tick();
}