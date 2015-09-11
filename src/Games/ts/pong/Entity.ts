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

    update(elapsed: number, entities: Entity[]) {
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

    update(elapsed: number, entities: Entity[]) {
        var increaseFactor = 1.1;
        if (this.velocity.squareLength() > this.MAX_SPEED_SQ) {
            increaseFactor = 1.0;
        }

        var collision = this.checkCollisions(elapsed, entities);

        if (collision === null) {
            super.update(elapsed, entities);

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
        } else {
            console.log('Collided');
            var nextPosition = this.position.add(this.velocity.scale(collision.time));

            var timeLeft = elapsed - collision.time;
            collision.normal.selfNormalize();
            var velocityReversed = this.velocity.scale(-1);
            var projectionReversed = collision.normal.scale(velocityReversed.dotProduct(collision.normal));
            var diff = projectionReversed.subtract(velocityReversed).scale(2);
            var reflectedVelocity = velocityReversed.add(diff);

            nextPosition.selfAdd(reflectedVelocity.scale(timeLeft));

            this.position = nextPosition;
            this.velocity = reflectedVelocity;
        }
    }

    // predicting collision
    checkCollisions(elapsed: number, entities: Entity[]): Collision {
        var currentSpeed = Math.sqrt(this.velocity.squareLength());
        var traveledDistance = currentSpeed * elapsed;

        var nearestCollision: Collision = null;
        for (var i = 0; i < entities.length; i++) {
            // Scan all entities
            var entity = entities[i];
            if (entity !== this) {
                if (entity instanceof Circle) {
                    var centerVector = this.position.subtract(entity.position);
                    var centerDistanceSq = centerVector.squareLength();
                    if (centerDistanceSq < this.square(this.radius + entity.radius + traveledDistance)) {
                        // Collide with a circle
                        var time = (Math.sqrt(centerDistanceSq) - (this.radius + entity.radius)) / currentSpeed;
                        if (nearestCollision === null || nearestCollision.time > time)
                            nearestCollision = new Collision(time, entity, centerVector);
                    }
                } else if (entity instanceof ControlBar) {
                    // Check 4 edges
                    // Handle vertical edges
                    var t1 = this.collideEdge(this.position.x, this.position.y, this.radius,
                        this.velocity.x, this.velocity.y,
                        entity.position.x, entity.position.y, entity.position.y + entity.size.y);

                    var t2 = this.collideEdge(this.position.x, this.position.y, this.radius,
                        this.velocity.x, this.velocity.y,
                        entity.position.x + entity.size.x, entity.position.y, entity.position.y + entity.size.y);

                    // Swap x and y to make the code handle horizontal edges
                    var t3 = this.collideEdge(this.position.y, this.position.x, this.radius,
                        this.velocity.y, this.velocity.x,
                        entity.position.y, entity.position.x, entity.position.x + entity.size.x);

                    var t4 = this.collideEdge(this.position.y, this.position.x, this.radius,
                        this.velocity.y, this.velocity.x,
                        entity.position.y + entity.size.y, entity.position.x, entity.position.x + entity.size.x);

                    var normal = new Vector2(-1, 0);
                    if (t2 > 0 && (t1 < 0 || t1 > t2)) {
                        t1 = t2; normal = new Vector2(1, 0);
                    }
                    if (t3 > 0 && (t1 < 0 || t1 > t3)) {
                        t1 = t3; normal = new Vector2(0, -1);
                    }
                    if (t4 > 0 && (t1 < 0 || t1 > t4)) {
                        t1 = t4; normal = new Vector2(0, 1);
                    }

                    if (t1 >= 0) {
                        console.log(t1 + ' ' + elapsed);
                    }

                    if (t1 >= 0 && t1 < elapsed) {
                        // Collide with edge
                        if (nearestCollision === null || nearestCollision.time > t1)
                            nearestCollision = new Collision(t1, entity, normal);
                    }
                    else {
                        // Check 4 corners

                    }
                }
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
        if (t < 0) return -1;
        var y = Oy + vy * t;
        if (y1 <= y && y <= y2)
            return t;
        return -1;
    }
}

class ControlBar extends Entity {
    size: Vector2;
    keySpeed: number = 4;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, width: number, height: number) {
        super(context, x, y, velocityX, velocityY);
        this.size = new Vector2(width, height);
        this.type = 'ControlBar';
    }

    update(elapsed: number, entities: Entity[]) {
        super.update(elapsed, entities);

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
    constructor(time: number, entity: Entity, normal: Vector2) {
        this.time = time;
        this.entity = entity;
        this.normal = normal;
    }

    time: number;
    entity: Entity;
    normal: Vector2;
}