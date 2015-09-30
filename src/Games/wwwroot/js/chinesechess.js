var Piece = (function () {
    function Piece(context, position, spritesheet, spritePosition) {
        this.sizeRatio = 0.8;
        this.context = context;
        this.position = position;
        this.spritesheet = spritesheet;
        this.spritePosition = spritePosition;
    }
    Piece.prototype.draw = function (padding, slotSize) {
        var size = slotSize * this.sizeRatio;
        this.context.drawImage(this.spritesheet, this.spritePosition.x, this.spritePosition.y, this.spritePosition.width, this.spritePosition.height, padding - size / 2 + this.position.x * slotSize, padding - size / 2 + this.position.y * slotSize, size, size);
    };
    return Piece;
})();
var Rectangle = (function () {
    function Rectangle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rectangle;
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
/// <reference path="../common/rectangle.ts" />
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../common/vector2.ts" />
var ChineseChess = (function () {
    function ChineseChess(context) {
        this.mouse = null;
        this.padding = 40;
        this.spriteSize = 80;
        this.context = context;
        this.spritesheet = new Image();
        this.spritesheet.src = "/images/xiangqi-pieces-sprites-80.png";
    }
    ChineseChess.prototype.startGame = function (code) {
        if (code == "") {
            alert('Please enter game code');
            return;
        }
        this.pieces = new Array();
        this.pieces.push(new Piece(this.context, new Vector2(4, 0), this.spritesheet, new Rectangle(0, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(3, 0), this.spritesheet, new Rectangle(this.spriteSize, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(5, 0), this.spritesheet, new Rectangle(this.spriteSize, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(1, 0), this.spritesheet, new Rectangle(this.spriteSize * 2, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(7, 0), this.spritesheet, new Rectangle(this.spriteSize * 2, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(2, 0), this.spritesheet, new Rectangle(this.spriteSize * 3, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(6, 0), this.spritesheet, new Rectangle(this.spriteSize * 3, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(0, 0), this.spritesheet, new Rectangle(this.spriteSize * 4, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(8, 0), this.spritesheet, new Rectangle(this.spriteSize * 4, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(1, 2), this.spritesheet, new Rectangle(this.spriteSize * 5, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(7, 2), this.spritesheet, new Rectangle(this.spriteSize * 5, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(0, 3), this.spritesheet, new Rectangle(this.spriteSize * 6, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(2, 3), this.spritesheet, new Rectangle(this.spriteSize * 6, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(4, 3), this.spritesheet, new Rectangle(this.spriteSize * 6, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(6, 3), this.spritesheet, new Rectangle(this.spriteSize * 6, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(8, 3), this.spritesheet, new Rectangle(this.spriteSize * 6, 0, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(4, 9), this.spritesheet, new Rectangle(0, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(3, 9), this.spritesheet, new Rectangle(this.spriteSize, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(5, 9), this.spritesheet, new Rectangle(this.spriteSize, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(1, 9), this.spritesheet, new Rectangle(this.spriteSize * 2, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(7, 9), this.spritesheet, new Rectangle(this.spriteSize * 2, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(2, 9), this.spritesheet, new Rectangle(this.spriteSize * 3, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(6, 9), this.spritesheet, new Rectangle(this.spriteSize * 3, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(0, 9), this.spritesheet, new Rectangle(this.spriteSize * 4, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(8, 9), this.spritesheet, new Rectangle(this.spriteSize * 4, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(1, 7), this.spritesheet, new Rectangle(this.spriteSize * 5, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(7, 7), this.spritesheet, new Rectangle(this.spriteSize * 5, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(0, 6), this.spritesheet, new Rectangle(this.spriteSize * 6, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(2, 6), this.spritesheet, new Rectangle(this.spriteSize * 6, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(4, 6), this.spritesheet, new Rectangle(this.spriteSize * 6, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(6, 6), this.spritesheet, new Rectangle(this.spriteSize * 6, this.spriteSize, this.spriteSize, this.spriteSize)));
        this.pieces.push(new Piece(this.context, new Vector2(8, 6), this.spritesheet, new Rectangle(this.spriteSize * 6, this.spriteSize, this.spriteSize, this.spriteSize)));
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
        var slotSize = (this.context.canvas.width - this.padding * 2) / 8.0;
        for (var i = 1; i < 8; i++) {
            var x = this.padding + slotSize * i;
            this.drawLine(x, this.padding, x, this.padding + slotSize * 4);
            this.drawLine(x, this.padding + slotSize * 5, x, this.padding + slotSize * 9);
        }
        this.drawLine(this.padding, this.padding, this.padding, this.padding + slotSize * 9);
        this.drawLine(this.padding + slotSize * 8, this.padding, this.padding + slotSize * 8, this.padding + slotSize * 9);
        for (var i = 0; i < 10; i++) {
            var y = this.padding + slotSize * i;
            this.drawLine(this.padding, y, this.padding + slotSize * 8, y);
        }
        this.drawLine(this.padding + slotSize * 3, this.padding, this.padding + slotSize * 5, this.padding + slotSize * 2);
        this.drawLine(this.padding + slotSize * 3, this.padding + slotSize * 2, this.padding + slotSize * 5, this.padding);
        this.drawLine(this.padding + slotSize * 3, this.padding + slotSize * 7, this.padding + slotSize * 5, this.padding + slotSize * 9);
        this.drawLine(this.padding + slotSize * 3, this.padding + slotSize * 9, this.padding + slotSize * 5, this.padding + slotSize * 7);
        if (this.pieces)
            for (var i = 0; i < this.pieces.length; i++) {
                this.pieces[i].draw(this.padding, slotSize);
            }
    };
    ChineseChess.prototype.drawLine = function (x1, y1, x2, y2) {
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
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
    $('#btnCreate').click(function () {
        chineseChess.startGame($('#txtCode').val());
    });
    window.requestAnimationFrame = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['msRequestAnimationFrame'] || window['mozRequestAnimationFrame'];
    tickChineseChess();
}
