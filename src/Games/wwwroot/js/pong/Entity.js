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
    Entity.prototype.update = function (elapsed) {
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
        this.collideEdge = function () {
        };
        this.radius = radius;
        this.type = 'Circle';
    }
    Circle.prototype.update = function (elapsed) {
        _super.prototype.update.call(this, elapsed);
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
    };
    Circle.prototype.checkCollisions = function (entities, elapsed) {
        var currentSpeed = Math.sqrt(this.velocity.squareLength());
        var traveledDistance = currentSpeed * elapsed;
        var nearestCollision = null;
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (entity instanceof Circle) {
                var centerDistanceSq = this.position.subtract(entity.position).squareLength();
                if (centerDistanceSq < this.square(this.radius + entity.radius + traveledDistance)) {
                    var collision = new Collision(Math.sqrt(centerDistanceSq) - (this.radius + entity.radius), entity);
                    if (nearestCollision === null || nearestCollision.distance > collision.distance)
                        nearestCollision = collision;
                }
            }
            else if (entity instanceof ControlBar) {
            }
        }
        return nearestCollision;
    };
    Circle.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.context.strokeStyle = "#000000";
        this.context.fillStyle = "#FFFF00";
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    };
    return Circle;
})(Entity);
var ControlBar = (function (_super) {
    __extends(ControlBar, _super);
    function ControlBar(context, x, y, velocityX, velocityY, width, height) {
        _super.call(this, context, x, y, velocityX, velocityY);
        this.keySpeed = 2;
        this.size = new Vector2(width, height);
        this.type = 'ControlBar';
    }
    ControlBar.prototype.update = function (elapsed) {
        _super.prototype.update.call(this, elapsed);
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
    function Collision(distance, entity) {
        this.distance = distance;
        this.entity = entity;
    }
    return Collision;
})();
//# sourceMappingURL=Entity.js.map