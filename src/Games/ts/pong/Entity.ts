class Entity {
    position: Vector2;
    velocity: Vector2;
    context: CanvasRenderingContext2D;
    MAX_SPEED = 1200;
    MAX_SPEED_SQ = this.MAX_SPEED * this.MAX_SPEED;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number) {
        this.context = context;
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(velocityX, velocityY);
    }

    update(elapsed: number) {
        this.position.inc(this.velocity.multiply(elapsed));
    }

    draw() {

    }
}

class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    squareLength() {
        return this.x * this.x + this.y * this.y;
    }

    inc(value: Vector2) {
        this.x += value.x;
        this.y += value.y;
    }

    scale(value: number) {
        this.x *= value;
        this.y *= value;
    }

    multiply(value: number): Vector2 {
        return new Vector2(this.x * value, this.y * value);
    }
}

class Circle extends Entity {
    radius: number;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, radius: number) {
        super(context, x, y, velocityX, velocityY);
        this.radius = radius;
    }

    update(elapsed: number) {
        super.update(elapsed);

        var increaseFactor = 1.1;
        if (this.velocity.squareLength() > this.MAX_SPEED_SQ) {
            increaseFactor = 1.0;
        }

        if (this.position.x - this.radius < 0) {
            this.velocity.x *= -1.0 * increaseFactor;
            this.position.x = this.radius - this.position.x + this.radius;
        }
        if (this.context.canvas.width - (this.position.x + this.radius) < 0) {
            this.velocity.x *= -1.0 * increaseFactor;
            this.position.x = this.context.canvas.width - (this.position.x + this.radius - this.context.canvas.width) - this.radius;
        }
        if (this.position.y - this.radius < 0) {
            this.velocity.y *= -1.0 * increaseFactor;
            this.position.y = this.radius - this.position.y + this.radius;
        }
        if (this.context.canvas.height - (this.position.y + this.radius) < 0) {
            this.velocity.y *= -1.0 * increaseFactor;
            this.position.y = this.context.canvas.height - (this.position.y + this.radius - this.context.canvas.height) - this.radius;
        }
    }

    draw() {
        super.draw();

        this.context.strokeStyle = "#000000";
        this.context.fillStyle = "#FFFF00";
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    }
}


class ControlBar extends Entity {
    size: Vector2;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, width: number, height: number) {
        super(context, x, y, velocityX, velocityY);
        this.size = new Vector2(width, height);
    }

    update(elapsed: number) {
        super.update(elapsed);
    }

    draw() {
        super.draw();

        this.context.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}