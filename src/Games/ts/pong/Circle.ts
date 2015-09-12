class Circle extends Entity {
    radius: number;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, radius: number) {
        super(context, x, y, velocityX, velocityY, 1.0);
        this.radius = radius;
        this.type = 'Circle';
    }

    update(elapsed: number, entities: Entity[]) {

        var collision = this.checkCollisions(elapsed, entities);

        if (collision === null) {
            super.update(elapsed, entities);
        } else {
            var nextPosition = this.position.add(this.velocity.scale(collision.time));

            var timeLeft = elapsed - collision.time;
            collision.normal.selfNormalize();
            var velocityReversed = this.velocity.scale(-1);
            var projectionReversed = collision.normal.scale(velocityReversed.dotProduct(collision.normal));
            var diff = projectionReversed.subtract(velocityReversed).scale(2);
            var reflectedVelocity = velocityReversed.add(diff);

            nextPosition.selfAdd(reflectedVelocity.scale(timeLeft));

            if (collision.speedIncrease !== 1.0 && (collision.speedIncrease < 1.0 || this.velocity.squareLength() < this.MAX_SPEED_SQ)) {
                reflectedVelocity.selfScale(collision.speedIncrease)
            }
            this.velocity = reflectedVelocity;
            this.position = nextPosition;
        }
    }

    draw() {
        super.draw();

        this.context.strokeStyle = "#000000";
        this.context.fillStyle = "#FFFF00";
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
        this.context.closePath();
        //this.context.stroke();
        //this.context.fill();
    }

    checkCollisions(elapsed: number, entities: Entity[]): Collision {
        var currentSpeed = Math.sqrt(this.velocity.squareLength());
        var traveledDistance = currentSpeed * elapsed;

        var nearestCollision: Collision = null;
        for (var i = 0; i < entities.length; i++) {
            // Scan all entities
            var entity = entities[i];
            if (entity !== this) {
                if (entity instanceof Boundary) {
                    var time = -1;
                    if (entity.normal.x === 0) {
                        // Horizontal boundary
                        if (this.velocity.y * entity.normal.y < 0) {
                            var yDistance = (this.position.y - entity.position.y) * entity.normal.y - this.radius;
                            time = yDistance / Math.abs(this.velocity.y);
                        }
                    } else if (entity.normal.y === 0) {
                        // Vertical boundary
                        if (this.velocity.x * entity.normal.x < 0) {
                            var xDistance = (this.position.x - entity.position.x) * entity.normal.x - this.radius;
                            var time = xDistance / Math.abs(this.velocity.x);
                        }
                    }

                    if (time >= 0 && time < elapsed)
                        if (nearestCollision === null || nearestCollision.time > time) {
                            //console.log(i + ' ' + time);
                            nearestCollision = new Collision(time, entity, entity.normal, entity.speedIncrease);
                        }
                } else if (entity instanceof Circle) {
                    var centerVector = this.position.subtract(entity.position);
                    var centerDistanceSq = centerVector.squareLength();
                    if (centerDistanceSq < this.square(this.radius + entity.radius + traveledDistance)) {
                        // Collide with a circle
                        var time = (Math.sqrt(centerDistanceSq) - (this.radius + entity.radius)) / currentSpeed;
                        if (nearestCollision === null || nearestCollision.time > time)
                            nearestCollision = new Collision(time, entity, centerVector, entity.speedIncrease);
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

                    if (t1 >= 0 && t1 < elapsed) {
                        // Collide with edge
                        if (nearestCollision === null || nearestCollision.time > t1)
                            nearestCollision = new Collision(t1, entity, normal, entity.speedIncrease);
                    }
                    else {
                        // No edge collision => check 4 corners
                        var tc1 = this.collideCorner(this.position.x, this.position.y, this.radius,
                            this.velocity.x, this.velocity.y, entity.position.x, entity.position.y);
                        var tc2 = this.collideCorner(this.position.x, this.position.y, this.radius,
                            this.velocity.x, this.velocity.y, entity.position.x + entity.size.x, entity.position.y);
                        var tc3 = this.collideCorner(this.position.x, this.position.y, this.radius,
                            this.velocity.x, this.velocity.y, entity.position.x, entity.position.y + entity.size.y);
                        var tc4 = this.collideCorner(this.position.x, this.position.y, this.radius,
                            this.velocity.x, this.velocity.y, entity.position.x + entity.size.x, entity.position.y + entity.size.y);

                        normal = new Vector2(-1, -1);
                        if (tc2 > 0 && (tc1 < 0 || tc1 > tc2)) {
                            tc1 = tc2; normal = new Vector2(1, -1);
                        }
                        if (tc3 > 0 && (tc1 < 0 || tc1 > tc3)) {
                            tc1 = tc3; normal = new Vector2(-1, 1);
                        }
                        if (tc4 > 0 && (tc1 < 0 || tc1 > tc4)) {
                            tc1 = tc4; normal = new Vector2(1, 1);
                        }

                        if (tc1 >= 0 && tc1 < elapsed) {
                            // Collide with edge
                            if (nearestCollision === null || nearestCollision.time > tc1)
                                nearestCollision = new Collision(tc1, entity, normal, entity.speedIncrease);
                        }
                    }
                }
            }
        }

        return nearestCollision;
    }

    collideEdge = (Ox, Oy, r, vx, vy, x1, y1, y2) => {
        var t = Math.min((x1 - Ox - r) / vx, (x1 - Ox + r) / vx);
        if (t < 0) return -1;
        var y = Oy + vy * t;
        if (y1 <= y && y <= y2)
            return t;
        return -1;
    }

    collideCorner = (Ox, Oy, r, vx, vy, x1, y1) => {
        var dx = x1 - Ox;
        var dy = y1 - Oy;
        var a = vx * vx + vy * vy;
        var b = -2 * (dx * vx + dy * vy);
        var c = dx * dx + dy * dy - r * r;
        var diff = b * b - 4 * a * c;
        if (diff < 0)
            return -1;
        else if (diff == 0)
            return -b / (2 * a);
        else {
            return (-b - Math.sqrt(diff)) / (2 * a); // take only the smaller solution
        }
    }
}