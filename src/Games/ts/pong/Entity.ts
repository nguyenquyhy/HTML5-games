class Entity {
    position: Vector2;
    velocity: Vector2;
    context: CanvasRenderingContext2D;
    type: string;

    MAX_SPEED = 1200;
    MAX_SPEED_SQ = this.MAX_SPEED * this.MAX_SPEED;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number) {
        this.context = context;
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(velocityX, velocityY);
        this.type = 'Entity';
    }

    update(elapsed: number) {
        this.position.selfAdd(this.velocity.scale(elapsed));
    }

    draw() {

    }

    square(value: number): number {
        return value * value;
    }
}

class Circle extends Entity {
    radius: number;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, radius: number) {
        super(context, x, y, velocityX, velocityY);
        this.radius = radius;
        this.type = 'Circle';
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

    // predicting collision
    checkCollisions(entities: Entity[], elapsed: number): Collision {
        var currentSpeed = Math.sqrt(this.velocity.squareLength());
        var traveledDistance = currentSpeed * elapsed;

        var nearestCollision: Collision = null;
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (entity instanceof Circle) {
                var centerDistanceSq = this.position.subtract(entity.position).squareLength();
                if (centerDistanceSq < this.square(this.radius + entity.radius + traveledDistance)) {
                    var collision = new Collision(Math.sqrt(centerDistanceSq) - (this.radius + entity.radius), entity);
                    if (nearestCollision === null || nearestCollision.distance > collision.distance)
                        nearestCollision = collision;
                }
            } else if (entity instanceof ControlBar) {
                // Check 4 edges
                var t = this.collideEdge(this.position.x, this.position.y, this.radius,
                    this.velocity.x, this.velocity.y,
                    entity.position.x, entity.position.y, entity.position.y + entity.size.y);

                if (t < 0 || t >= elapsed) {

                }

                // Check 4 corners
            }
        }

        return nearestCollision;
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

    collideEdge = (Ox, Oy, r, vx, vy, x1, y1, y2) => {
        var t = Math.min((x1 - Ox - r) / vx, (x1 - Ox + r) / vx);
        if (t < 0) return t;
        var y = Oy + vy * t;
        if (y1 <= y && y <= y2)
            return t;
        return -1;
    }
}

class ControlBar extends Entity {
    size: Vector2;
    keySpeed: number = 2;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, width: number, height: number) {
        super(context, x, y, velocityX, velocityY);
        this.size = new Vector2(width, height);
        this.type = 'ControlBar';
    }

    update(elapsed: number) {
        super.update(elapsed);

        if (this.position.y < 0) {
            this.position.y = -this.position.y;
            this.velocity.y *= -1;
        }
        if (this.position.y + this.size.y > this.context.canvas.height) {
            this.position.y = this.context.canvas.height - (this.position.y + this.size.y - this.context.canvas.height) - this.size.y;
            this.velocity.y *= -1;
        }
    }

    draw() {
        super.draw();

        this.context.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    up() {
        this.position.y -= this.keySpeed;
    }

    down() {
        this.position.y += this.keySpeed;
    }
}

class Collision {
    constructor(distance: number, entity: Entity) {
        this.distance = distance;
        this.entity = entity;
    }

    distance: number;
    entity: Entity;
}