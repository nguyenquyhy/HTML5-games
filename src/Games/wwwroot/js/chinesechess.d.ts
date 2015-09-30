/// <reference path="../../typings/tsd.d.ts" />
declare class Piece {
    context: CanvasRenderingContext2D;
    position: Vector2;
    spritesheet: HTMLImageElement;
    spritePosition: Rectangle;
    sizeRatio: number;
    constructor(context: CanvasRenderingContext2D, position: Vector2, spritesheet: HTMLImageElement, spritePosition: Rectangle);
    draw(padding: number, slotSize: number): void;
}
declare class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: any, y: any, width: any, height: any);
}
declare class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    squareLength(): number;
    selfAdd(value: Vector2): void;
    selfScale(value: number): void;
    selfNormalize(): void;
    scale(value: number): Vector2;
    add(vector: Vector2): Vector2;
    subtract(vector: Vector2): Vector2;
    crossProduct(vector: Vector2): number;
    dotProduct(vector: Vector2): number;
    toString(): string;
}
declare class ChineseChess {
    context: CanvasRenderingContext2D;
    mouse: Vector2;
    padding: number;
    spritesheet: HTMLImageElement;
    spriteSize: number;
    pieces: Piece[];
    constructor(context: CanvasRenderingContext2D);
    startGame(code: string): void;
    stopGame(): void;
    update(elapsed: number): void;
    render(elapsed: number): void;
    drawLine(x1: any, y1: any, x2: any, y2: any): void;
    doMouseDown(e: any): void;
    doMouseMove(e: any): void;
    doMouseUp(e: any): void;
}
declare var lastUpdate: any;
declare var chineseChess: ChineseChess;
declare function tickChineseChess(): void;
declare var canvas: HTMLCanvasElement;
declare var context: CanvasRenderingContext2D;
