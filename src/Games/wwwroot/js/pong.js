var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Boundary = (function (_super) {
    __extends(Boundary, _super);
    function Boundary(context, x, y, normal) {
        _super.call(this, context, x, y, 0, 0, 1.1);
        this.normal = normal;
    }
    Boundary.prototype.update = function (elapsed, entities) {
        // Stand still
    };
    return Boundary;
})(Entity);
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(context, x, y, velocityX, velocityY, radius) {
        _super.call(this, context, x, y, velocityX, velocityY, 1.0);
        this.collideEdge = function (Ox, Oy, r, vx, vy, x1, y1, y2, xNormal) {
            if (vx * xNormal >= 0)
                return -1;
            // (Ox + r) is moving to x1 while Oy must be between y1 and y2 at collision
            var t = Math.min((x1 - Ox - r) / vx, (x1 - Ox + r) / vx);
            if (t < 0)
                return -1;
            var y = Oy + vy * t;
            if (y1 <= y && y <= y2)
                return t;
            return -1;
        };
        this.collideCorner = function (Ox, Oy, r, vx, vy, x1, y1, xNormal, yNormal) {
            if (vx * xNormal >= 0 && vy * yNormal >= 0)
                return -1;
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
        };
        this.radius = radius;
        this.type = 'Circle';
    }
    Circle.prototype.update = function (elapsed, entities) {
        var i = 0;
        while (true) {
            var collision = this.checkCollisions(elapsed, entities);
            if (collision === null) {
                _super.prototype.update.call(this, elapsed, entities);
                break;
            }
            else {
                var nextPosition = this.position.add(this.velocity.scale(collision.time));
                var timeLeft = elapsed - collision.time;
                collision.normal.selfNormalize();
                var velocityReversed = this.velocity.scale(-1);
                var projectionReversed = collision.normal.scale(velocityReversed.dotProduct(collision.normal));
                var diff = projectionReversed.subtract(velocityReversed).scale(2);
                var reflectedVelocity = velocityReversed.add(diff);
                if (collision.speedIncrease !== 1.0 && (collision.speedIncrease < 1.0 || this.velocity.squareLength() < this.MAX_SPEED_SQ)) {
                    reflectedVelocity.selfScale(collision.speedIncrease);
                }
                this.velocity = reflectedVelocity;
                this.position = nextPosition;
                elapsed = timeLeft;
                if (collision.entity.collided)
                    if (collision.entity.collided(this))
                        break;
                // TODO: try to figure this out
                i++;
                if (i === 100) {
                    console.log(collision);
                    break;
                }
            }
        }
    };
    Circle.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        this.context.fillStyle = "#FFFFFF";
        this.context.fill();
        this.context.strokeStyle = "#000000";
        this.context.stroke();
    };
    Circle.prototype.checkCollisions = function (elapsed, entities) {
        var currentSpeed = Math.sqrt(this.velocity.squareLength());
        var traveledDistance = currentSpeed * elapsed;
        var nearestCollision = null;
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
                    }
                    else if (entity.normal.y === 0) {
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
                }
                else if (entity instanceof Circle) {
                    var centerVector = this.position.subtract(entity.position);
                    var centerDistanceSq = centerVector.squareLength();
                    if (centerDistanceSq < this.square(this.radius + entity.radius + traveledDistance)) {
                        // Collide with a circle
                        var time = (Math.sqrt(centerDistanceSq) - (this.radius + entity.radius)) / currentSpeed;
                        if (nearestCollision === null || nearestCollision.time > time)
                            nearestCollision = new Collision(time, entity, centerVector, entity.speedIncrease);
                    }
                }
                else if (entity instanceof ControlBar) {
                    // Check 4 edges
                    // Handle vertical edges
                    var t1 = this.collideEdge(this.position.x, this.position.y, this.radius, this.velocity.x, this.velocity.y, entity.position.x, entity.position.y, entity.position.y + entity.size.y, -1);
                    var t2 = this.collideEdge(this.position.x, this.position.y, this.radius, this.velocity.x, this.velocity.y, entity.position.x + entity.size.x, entity.position.y, entity.position.y + entity.size.y, 1);
                    // Swap x and y to make the code handle horizontal edges
                    var t3 = this.collideEdge(this.position.y, this.position.x, this.radius, this.velocity.y, this.velocity.x, entity.position.y, entity.position.x, entity.position.x + entity.size.x, -1);
                    var t4 = this.collideEdge(this.position.y, this.position.x, this.radius, this.velocity.y, this.velocity.x, entity.position.y + entity.size.y, entity.position.x, entity.position.x + entity.size.x, 1);
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
                        // Collide with edge
                        if (nearestCollision === null || nearestCollision.time > t1)
                            nearestCollision = new Collision(t1, entity, normal, entity.speedIncrease);
                    }
                    else {
                        // No edge collision => check 4 corners
                        var tc1 = this.collideCorner(this.position.x, this.position.y, this.radius, this.velocity.x, this.velocity.y, entity.position.x, entity.position.y, -1, -1);
                        var tc2 = this.collideCorner(this.position.x, this.position.y, this.radius, this.velocity.x, this.velocity.y, entity.position.x + entity.size.x, entity.position.y, 1, -1);
                        var tc3 = this.collideCorner(this.position.x, this.position.y, this.radius, this.velocity.x, this.velocity.y, entity.position.x, entity.position.y + entity.size.y, -1, 1);
                        var tc4 = this.collideCorner(this.position.x, this.position.y, this.radius, this.velocity.x, this.velocity.y, entity.position.x + entity.size.x, entity.position.y + entity.size.y, 1, 1);
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
                            // Collide with edge
                            if (nearestCollision === null || nearestCollision.time > tc1)
                                nearestCollision = new Collision(tc1, entity, normal, entity.speedIncrease);
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
/// <reference path="entity.ts" />
/// <reference path="circle.ts" />
/// <reference path="boundary.ts" />
var Pong = (function () {
    function Pong(context) {
        var _this = this;
        this.keys = {};
        this.mouse = null;
        this.INITIAL_BAR_LENGTH = 50;
        this.INITIAL_BAR_DEPTH = 10;
        this.INITIAL_BALL_SPEED = 200;
        this.context = context;
        this.ball = new Circle(this.context, 0.5 * context.canvas.width, 0.5 * context.canvas.height, 0, 0, 12);
        this.players = new Array(2);
        this.players[0] = new ControlBar(this.context, 20, 0.5 * (context.canvas.height - this.INITIAL_BAR_LENGTH), 0, 0, this.INITIAL_BAR_DEPTH, this.INITIAL_BAR_LENGTH);
        this.players[1] = new ControlBar(this.context, context.canvas.width - 20 - this.INITIAL_BAR_DEPTH, 0.5 * (context.canvas.height - this.INITIAL_BAR_LENGTH), 0, 100, this.INITIAL_BAR_DEPTH, this.INITIAL_BAR_LENGTH);
        var endBoundary1 = new Boundary(context, 0, 0, new Vector2(1, 0));
        var endBoundary2 = new Boundary(context, context.canvas.width, 0, new Vector2(-1, 0));
        endBoundary1.collided = function (entity) {
            if (entity instanceof Circle) {
                _this.scores[1]++;
                _this.startGame();
                return true;
            }
            return false;
        };
        endBoundary2.collided = function (entity) {
            if (entity instanceof Circle) {
                _this.scores[0]++;
                _this.startGame();
                return true;
            }
            return false;
        };
        this.entities = new Array();
        this.entities.push(new Boundary(context, 0, 0, new Vector2(0, 1)));
        this.entities.push(new Boundary(context, 0, context.canvas.height, new Vector2(0, -1)));
        this.entities.push(endBoundary1);
        this.entities.push(endBoundary2);
        this.entities.push(this.ball);
        this.entities.push(this.players[0]);
        this.entities.push(this.players[1]);
        this.scores = [0, 0];
    }
    Pong.prototype.startGame = function () {
        var angle = Math.random() * 2 * Math.PI - Math.PI;
        if (angle > 0)
            angle = angle / 2;
        else
            angle = -Math.PI - angle / 2;
        angle -= Math.PI / 4;
        this.ball.position = new Vector2(0.5 * this.context.canvas.width, 0.5 * this.context.canvas.height);
        this.ball.velocity = new Vector2(this.INITIAL_BALL_SPEED * Math.cos(angle), this.INITIAL_BALL_SPEED * Math.sin(angle));
    };
    Pong.prototype.stopGame = function () {
        this.scores = [0, 0];
        this.ball.velocity = new Vector2(0, 0);
    };
    Pong.prototype.update = function (elapsed) {
        if (this.keys[38])
            this.players[0].up();
        else if (this.keys[40])
            this.players[0].down();
        if (this.mouse !== null) {
            if (this.mouse.y > this.context.canvas.height / 2)
                this.players[0].down();
            else
                this.players[0].up();
        }
        if (this.entities) {
            for (var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                entity.update(elapsed, this.entities);
            }
        }
    };
    Pong.prototype.render = function (elapsed) {
        // Clear everything
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        // Draw background
        this.context.beginPath();
        this.context.strokeStyle = "#000000";
        this.context.moveTo(this.context.canvas.width / 2, 0);
        this.context.lineTo(this.context.canvas.width / 2, this.context.canvas.height);
        this.context.stroke();
        // Draw points
        this.context.font = "20px Arial";
        this.context.fillStyle = "#000000";
        this.context.fillText(this.scores[0].toString(), this.context.canvas.width / 2 - 6 - this.context.measureText(this.scores[0].toString()).width, 20);
        this.context.fillText(this.scores[1].toString(), this.context.canvas.width / 2 + 5, 20);
        // Draw entities
        if (this.entities) {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].draw();
            }
        }
    };
    Pong.prototype.doKeyDown = function (e) {
        this.keys[e.keyCode] = true;
    };
    Pong.prototype.doKeyUp = function (e) {
        delete this.keys[e.keyCode];
    };
    Pong.prototype.doMouseDown = function (e) {
        // TODO: support multi-touch
        if (e.buttons > 0 || e.pointerType === "touch") {
            this.mouse = new Vector2(e.offsetX, e.offsetY);
        }
    };
    Pong.prototype.doMouseMove = function (e) {
        if (e.buttons > 0 || e.pointerType === "touch") {
            this.mouse = new Vector2(e.offsetX, e.offsetY);
        }
    };
    Pong.prototype.doMouseUp = function (e) {
        this.mouse = null;
    };
    return Pong;
})();
var lastUpdate;
var pong;
var txtFPS = $('#txtFPS');
var sum = 0;
var count = 0;
function tickPong() {
    var now = Date.now();
    if (lastUpdate) {
        var elapsed = (now - lastUpdate) / 1000;
        sum += elapsed;
        count++;
        if (sum > 1) {
            txtFPS.text(Math.round(count / sum * 100) / 100);
            count = 0;
            sum = 0;
        }
        lastUpdate = now;
        pong.update(elapsed);
        pong.render(elapsed);
    }
    else {
        lastUpdate = now;
    }
    window.requestAnimationFrame(tickPong);
}
var canvas = document.getElementById('mainCanvas');
var context;
if (canvas.getContext) {
    context = canvas.getContext('2d');
    pong = new Pong(context);
    window.addEventListener("keydown", function (e) {
        pong.doKeyDown(e);
    }, true);
    window.addEventListener("keyup", function (e) {
        pong.doKeyUp(e);
    }, true);
    if (window['PointerEvent']) {
        $('#txtPointerEvent').text('Supported');
        canvas.addEventListener("pointermove", function (event) {
            pong.doMouseMove(event);
        }, false);
        canvas.addEventListener("pointerdown", function (event) {
            pong.doMouseDown(event);
        }, false);
        canvas.addEventListener("pointerup", function (event) {
            pong.doMouseUp(event);
        }, false);
    }
    else {
        $('#txtPointerEvent').text('Not supported');
        //Provide fallback for user agents that do not support Pointer Events
        canvas.addEventListener("mousemove", function (event) {
            pong.doMouseMove(event);
        }, false);
        canvas.addEventListener("mousedown", function (event) {
            pong.doMouseDown(event);
        }, false);
        canvas.addEventListener("mouseup", function (event) {
            pong.doMouseUp(event);
        }, false);
    }
    var btnStart = $('#btnStart');
    btnStart.click(function () {
        if (btnStart.text() === 'Start Game') {
            pong.startGame();
            btnStart.text('Stop Game');
        }
        else {
            pong.stopGame();
            btnStart.text('Start Game');
        }
    });
    window.requestAnimationFrame = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['msRequestAnimationFrame'] || window['mozRequestAnimationFrame'];
    tickPong();
}
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
    Vector2.prototype.selfNormalize = function () {
        var squareLength = this.squareLength();
        if (squareLength != 1) {
            var length = Math.sqrt(squareLength);
            this.x /= length;
            this.y /= length;
        }
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
    Vector2.prototype.dotProduct = function (vector) {
        return this.x * vector.x + this.y * vector.y;
    };
    Vector2.prototype.toString = function () {
        return this.x + " " + this.y;
    };
    return Vector2;
})();
