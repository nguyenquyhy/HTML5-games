var Entity = (function () {
    function Entity(context, x, y, radius) {
        this.MAX_SPEED = 1200;
        this.MAX_SPEED_SQ = this.MAX_SPEED * this.MAX_SPEED;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.context = context;
        this.velocityX = 0;
        this.velocityY = 0;
    }
    Entity.prototype.update = function (elapsed) {
        this.x += elapsed * this.velocityX;
        this.y += elapsed * this.velocityY;
        var speedSquared = this.velocityX * this.velocityX + this.velocityY * this.velocityY;
        var increaseFactor = 1.1;
        if (speedSquared > this.MAX_SPEED_SQ) {
            increaseFactor = 1.0;
        }
        if (this.x - this.radius < 0) {
            this.velocityX *= -1.0 * increaseFactor;
            this.x = this.radius - this.x + this.radius;
        }
        if (this.context.canvas.width - (this.x + this.radius) < 0) {
            this.velocityX *= -1.0 * increaseFactor;
            this.x = this.context.canvas.width - (this.x + this.radius - this.context.canvas.width) - this.radius;
        }
        if (this.y - this.radius < 0) {
            this.velocityY *= -1.0 * increaseFactor;
            this.y = this.radius - this.y + this.radius;
        }
        if (this.context.canvas.height - (this.y + this.radius) < 0) {
            this.velocityY *= -1.0 * increaseFactor;
            this.y = this.context.canvas.height - (this.y + this.radius - this.context.canvas.height) - this.radius;
        }
    };
    Entity.prototype.draw = function () {
        context.strokeStyle = "#000000";
        context.fillStyle = "#FFFF00";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.stroke();
        context.fill();
    };
    return Entity;
})();
//# sourceMappingURL=Entity.js.map