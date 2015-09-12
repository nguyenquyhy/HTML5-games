var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ControlBar = (function (_super) {
    __extends(ControlBar, _super);
    function ControlBar(context, x, y, velocityX, velocityY, width, height) {
        _super.call(this, context, x, y, velocityX, velocityY, 1.0);
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
