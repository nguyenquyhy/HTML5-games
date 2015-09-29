var Entity = (function () {
    function Entity(context, x, y, velocityX, velocityY, speedIncrease) {
        this.MAX_SPEED = 1200;
        this.MAX_SPEED_SQ = this.MAX_SPEED * this.MAX_SPEED;
        this.context = context;
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(velocityX, velocityY);
        this.type = 'Entity';
        this.speedIncrease = speedIncrease;
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
var Collision = (function () {
    function Collision(time, entity, normal, speedIncrease) {
        this.time = time;
        this.entity = entity;
        this.normal = normal;
        this.speedIncrease = speedIncrease;
    }
    return Collision;
})();
