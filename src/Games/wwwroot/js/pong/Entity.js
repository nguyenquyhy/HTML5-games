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
    }
    Entity.prototype.update = function (elapsed) {
        this.position.inc(this.velocity.multiply(elapsed));
    };
    Entity.prototype.draw = function () {
    };
    return Entity;
})();
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.squareLength = function () {
        return this.x * this.x + this.y * this.y;
    };
    Vector2.prototype.inc = function (value) {
        this.x += value.x;
        this.y += value.y;
    };
    Vector2.prototype.scale = function (value) {
        this.x *= value;
        this.y *= value;
    };
    Vector2.prototype.multiply = function (value) {
        return new Vector2(this.x * value, this.y * value);
    };
    return Vector2;
})();
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(context, x, y, velocityX, velocityY, radius) {
        _super.call(this, context, x, y, velocityX, velocityY);
        this.radius = radius;
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
        this.size = new Vector2(width, height);
    }
    ControlBar.prototype.update = function (elapsed) {
        _super.prototype.update.call(this, elapsed);
    };
    ControlBar.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.context.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    };
    return ControlBar;
})(Entity);
//# sourceMappingURL=Entity.js.map