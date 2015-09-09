var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.squareLength = function () {
        return this.x * this.x + this.y * this.y;
    };
    Vector2.prototype.selfAdd = function (value) {
        this.x += value.x;
        this.y += value.y;
    };
    Vector2.prototype.selfScale = function (value) {
        this.x *= value;
        this.y *= value;
    };
    Vector2.prototype.scale = function (value) {
        return new Vector2(this.x * value, this.y * value);
    };
    Vector2.prototype.add = function (vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    };
    Vector2.prototype.subtract = function (vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    };
    Vector2.prototype.crossProduct = function (vector) {
        return this.x * vector.y + this.y * vector.x;
    };
    return Vector2;
})();
//# sourceMappingURL=Vector2.js.map