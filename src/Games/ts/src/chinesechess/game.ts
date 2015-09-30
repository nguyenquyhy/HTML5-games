/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../common/vector2.ts" />

class ChineseChess {
    context: CanvasRenderingContext2D;
    mouse: Vector2 = null;
    padding = 10;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    startGame() {
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
        for (var i = 0; i < 9; i++) {
            var x = this.padding + (this.context.canvas.width - this.padding * 2) / 8 * i;
            this.context.moveTo(x, this.padding);
            this.context.lineTo(x, this.context.canvas.height - this.padding);
            this.context.stroke();
        }
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

    var btnStart = $('#btnStart');
    btnStart.click(() => {
        if (btnStart.text() === 'Start Game') {
            chineseChess.startGame();
            btnStart.text('Stop Game');
        } else {
            chineseChess.stopGame();
            btnStart.text('Start Game');
        }
    });

    window.requestAnimationFrame = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['msRequestAnimationFrame'] || window['mozRequestAnimationFrame'];

    tickChineseChess();
}