var Piece = (function () {
    function Piece(context, position) {
        this.context = context;
        this.position = position;
    }
    Piece.prototype.draw = function () {
    };
    return Piece;
})();
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
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../common/vector2.ts" />
var ChineseChess = (function () {
    function ChineseChess(context) {
        this.mouse = null;
        this.padding = 10;
        this.context = context;
    }
    ChineseChess.prototype.startGame = function () {
    };
    ChineseChess.prototype.stopGame = function () {
    };
    ChineseChess.prototype.update = function (elapsed) {
        if (this.mouse !== null) {
        }
    };
    ChineseChess.prototype.render = function (elapsed) {
        // Clear everything
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        // Draw background
        this.context.beginPath();
        this.context.strokeStyle = "#000000";
        for (var i = 0; i < 9; i++) {
            var x = this.padding + (this.context.canvas.width - this.padding * 2) / 8 * i;
            this.context.moveTo(x, this.padding);
            this.context.lineTo(x, this.context.canvas.height - this.padding);
            this.context.stroke();
        }
    };
    ChineseChess.prototype.doMouseDown = function (e) {
        // TODO: support multi-touch
        if (e.buttons > 0 || e.pointerType === "touch") {
            this.mouse = new Vector2(e.offsetX, e.offsetY);
        }
    };
    ChineseChess.prototype.doMouseMove = function (e) {
        if (e.buttons > 0 || e.pointerType === "touch") {
            this.mouse = new Vector2(e.offsetX, e.offsetY);
        }
    };
    ChineseChess.prototype.doMouseUp = function (e) {
        this.mouse = null;
    };
    return ChineseChess;
})();
var lastUpdate;
var chineseChess;
function tickChineseChess() {
    var now = Date.now();
    if (lastUpdate) {
        var elapsed = (now - lastUpdate) / 1000;
        lastUpdate = now;
        chineseChess.update(elapsed);
        chineseChess.render(elapsed);
    }
    else {
        lastUpdate = now;
    }
    window.requestAnimationFrame(tickChineseChess);
}
var canvas = document.getElementById('mainCanvas');
var context;
if (canvas.getContext) {
    context = canvas.getContext('2d');
    chineseChess = new ChineseChess(context);
    if (window['PointerEvent']) {
        $('#txtPointerEvent').text('Supported');
        canvas.addEventListener("pointermove", function (event) {
            chineseChess.doMouseMove(event);
        }, false);
        canvas.addEventListener("pointerdown", function (event) {
            chineseChess.doMouseDown(event);
        }, false);
        canvas.addEventListener("pointerup", function (event) {
            chineseChess.doMouseUp(event);
        }, false);
    }
    else {
        $('#txtPointerEvent').text('Not supported');
        //Provide fallback for user agents that do not support Pointer Events
        canvas.addEventListener("mousemove", function (event) {
            chineseChess.doMouseMove(event);
        }, false);
        canvas.addEventListener("mousedown", function (event) {
            chineseChess.doMouseDown(event);
        }, false);
        canvas.addEventListener("mouseup", function (event) {
            chineseChess.doMouseUp(event);
        }, false);
    }
    var btnStart = $('#btnStart');
    btnStart.click(function () {
        if (btnStart.text() === 'Start Game') {
            chineseChess.startGame();
            btnStart.text('Stop Game');
        }
        else {
            chineseChess.stopGame();
            btnStart.text('Start Game');
        }
    });
    window.requestAnimationFrame = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['msRequestAnimationFrame'] || window['mozRequestAnimationFrame'];
    tickChineseChess();
}
