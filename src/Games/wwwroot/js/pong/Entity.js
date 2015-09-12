var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Entity = (function () {
    function Entity(context, x, y, velocityX, velocityY) {
        this.MAX_SPEED = 1200;
        this.MAX_SPEED_SQ = this.MAX_SPEED * this.MAX_SPEED;
        this.context = context;
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(velocityX, velocityY);
        this.type = 'Entity';
    }
    Entity.prototype.update = function (elapsed, entities) {
        this.position.selfAdd(this.velocity.scale(elapsed));
    };
    Entity.prototype.draw = function () {
    };
    Entity.prototype.square = function (value) {
        return value * value;
    };
    return Entity;
})();
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(context, x, y, velocityX, velocityY, radius) {
        _super.call(this, context, x, y, velocityX, velocityY);
        this.collideEdge = function (Ox, Oy, r, vx, vy, x1, y1, y2) {
            var t = Math.min((x1 - Ox - r) / vx, (x1 - Ox + r) / vx);
            if (t < 0)
                return -1;
            var y = Oy + vy * t;
            if (y1 <= y && y <= y2)
                return t;
            return -1;
        };
        this.collideCorner = function (Ox, Oy, r, vx, vy, x1, y1) {
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
                return (-b - Math.sqrt(diff)) / (2 * a);
            }
        };
        this.radius = radius;
        this.type = 'Circle';
    }
    Circle.prototype.update = function (elapsed, entities) {
        var increaseFactor = 1.1;
        if (this.velocity.squareLength() > this.MAX_SPEED_SQ) {
            increaseFactor = 1.0;
        }
        var collision = this.checkCollisions(elapsed, entities);
        if (collision === null) {
            _super.prototype.update.call(this, elapsed, entities);
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
        else {
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
    };
    Circle.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.context.strokeStyle = "#000000";
        this.context.fillStyle = "#FFFF00";
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
        this.context.closePath();
    };
    Circle.prototype.checkCollisions = function (elapsed, entities) {
        var currentSpeed = Math.sqrt(this.velocity.squareLength());
        var traveledDistance = currentSpeed * elapsed;
        var nearestCollision = null;
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (entity !== this) {
                if (entity instanceof Circle) {
                    var centerVector = this.position.subtract(entity.position);
                    var centerDistanceSq = centerVector.squareLength();
                    if (centerDistanceSq < this.square(this.radius + entity.radius + traveledDistance)) {
                        var time = (Math.sqrt(centerDistanceSq) - (this.radius + entity.radius)) / currentSpeed;
                        if (nearestCollision === null || nearestCollision.time > time)
                            nearestCollision = new Collision(time, entity, centerVector);
                    }
                }
                else if (entity instanceof ControlBar) {
                    var t1 = this.collideEdge(this.position.x, this.position.y, this.radius, this.velocity.x, this.velocity.y, entity.position.x, entity.position.y, entity.position.y + entity.size.y);
                    var t2 = this.collideEdge(this.position.x, this.position.y, this.radius, this.velocity.x, this.velocity.y, entity.position.x + entity.size.x, entity.position.y, entity.position.y + entity.size.y);
                    var t3 = this.collideEdge(this.position.y, this.position.x, this.radius, this.velocity.y, this.velocity.x, entity.position.y, entity.position.x, entity.position.x + entity.size.x);
                    var t4 = this.collideEdge(this.position.y, this.position.x, this.radius, this.velocity.y, this.velocity.x, entity.position.y + entity.size.y, entity.position.x, entity.position.x + entity.size.x);
                    var normal = new Vector2(-1, 0);
                    if (t2 > 0 && (t1 < 0 || t1 > t2)) {
                        t1 = t2;
                        normal = new Vector2(1, 0);
                    }
                    if (t3 > 0 && (t1 < 0 || t1 > t3)) {
                        t1 = t3;
                        normal = new Vector2(0, -1);
                    }
                    if (t4 > 0 && (t1 < 0 || t1 > t4)) {
                        t1 = t4;
                        normal = new Vector2(0, 1);
                    }
                    if (t1 >= 0 && t1 < elapsed) {
                        if (nearestCollision === null || nearestCollision.time > t1)
                            nearestCollision = new Collision(t1, entity, normal);
                    }
                    else {
                        var tc1 = this.collideCorner(this.position.x, this.position.y, this.radius, this.velocity.x, this.velocity.y, entity.position.x, entity.position.y);
                        var tc2 = this.collideCorner(this.position.x, this.position.y, this.radius, this.velocity.x, this.velocity.y, entity.position.x + entity.size.x, entity.position.y);
                        var tc3 = this.collideCorner(this.position.x, this.position.y, this.radius, this.velocity.x, this.velocity.y, entity.position.x, entity.position.y + entity.size.y);
                        var tc4 = this.collideCorner(this.position.x, this.position.y, this.radius, this.velocity.x, this.velocity.y, entity.position.x + entity.size.x, entity.position.y + entity.size.y);
                        normal = new Vector2(-1, -1);
                        if (tc2 > 0 && (tc1 < 0 || tc1 > tc2)) {
                            tc1 = tc2;
                            normal = new Vector2(1, -1);
                        }
                        if (tc3 > 0 && (tc1 < 0 || tc1 > tc3)) {
                            tc1 = tc3;
                            normal = new Vector2(-1, 1);
                        }
                        if (tc4 > 0 && (tc1 < 0 || tc1 > tc4)) {
                            tc1 = tc4;
                            normal = new Vector2(1, 1);
                        }
                        if (tc1 >= 0 && tc1 < elapsed) {
                            if (nearestCollision === null || nearestCollision.time > tc1)
                                nearestCollision = new Collision(tc1, entity, normal);
                        }
                    }
                }
            }
        }
        return nearestCollision;
    };
    return Circle;
})(Entity);
var ControlBar = (function (_super) {
    __extends(ControlBar, _super);
    function ControlBar(context, x, y, velocityX, velocityY, width, height) {
        _super.call(this, context, x, y, velocityX, velocityY);
        this.keySpeed = 4;
        this.size = new Vector2(width, height);
        this.type = 'ControlBar';
    }
    ControlBar.prototype.update = function (elapsed, entities) {
        _super.prototype.update.call(this, elapsed, entities);
        if (this.position.y < 0) {
            this.position.y = -this.position.y;
            this.velocity.y *= -1;
        }
        if (this.position.y + this.size.y > this.context.canvas.height) {
            this.position.y = this.context.canvas.height - (this.position.y + this.size.y - this.context.canvas.height) - this.size.y;
            this.velocity.y *= -1;
        }
    };
    ControlBar.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.context.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    };
    ControlBar.prototype.up = function () {
        this.position.y -= this.keySpeed;
    };
    ControlBar.prototype.down = function () {
        this.position.y += this.keySpeed;
    };
    return ControlBar;
})(Entity);
var Collision = (function () {
    function Collision(time, entity, normal) {
        this.time = time;
        this.entity = entity;
        this.normal = normal;
    }
    return Collision;
})();
//# sourceMappingURL=Entity.js.map