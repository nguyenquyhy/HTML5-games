/// <reference path="../common/rectangle.ts" />
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../common/vector2.ts" />

class ChineseChess {
    context: CanvasRenderingContext2D;
    mouse: Vector2 = null;
    padding = 40;
    spritesheet: HTMLImageElement;
    spriteSize = 80;
    pieces: Piece[];

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.spritesheet = new Image();
        this.spritesheet.src = "/images/xiangqi-pieces-sprites-80.png";
    }

    startGame(code: string) {
        if (code == "") {
            alert('Please enter game code');
            return;
        }
        this.pieces = new Array<Piece>();
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
    }

    stopGame() {
    }

    update(elapsed: number) {
        if (this.mouse !== null) {
        }
    }

    render(elapsed: number) {
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
    }

    drawLine(x1, y1, x2, y2) {
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    doMouseDown(e) {
        // TODO: support multi-touch
        if (e.buttons > 0 || e.pointerType === "touch") {
            this.mouse = new Vector2(e.offsetX, e.offsetY);
        }
    }

    doMouseMove(e) {
        if (e.buttons > 0 || e.pointerType === "touch") {
            this.mouse = new Vector2(e.offsetX, e.offsetY);
        }
    }

    doMouseUp(e) {
        this.mouse = null;
    }
}


var lastUpdate;
var chineseChess: ChineseChess;

function tickChineseChess() {
    var now = Date.now();

    if (lastUpdate) {
        var elapsed = (now - lastUpdate) / 1000;

        lastUpdate = now;
        chineseChess.update(elapsed);
        chineseChess.render(elapsed);
    } else {
        lastUpdate = now;
    }

    window.requestAnimationFrame(tickChineseChess);
}

var canvas = <HTMLCanvasElement>document.getElementById('mainCanvas');
var context: CanvasRenderingContext2D;
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

        //if (window.navigator.maxTouchPoints > 1)
    	   /* User agent and hardware support multi-touch */
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

    $('#btnCreate').click(() => {
        chineseChess.startGame($('#txtCode').val());
    });

    window.requestAnimationFrame = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['msRequestAnimationFrame'] || window['mozRequestAnimationFrame'];

    tickChineseChess();
}