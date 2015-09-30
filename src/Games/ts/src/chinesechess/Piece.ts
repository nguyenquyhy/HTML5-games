class Piece {
    context: CanvasRenderingContext2D;
    position: Vector2;
    spritesheet: HTMLImageElement;
    spritePosition: Rectangle;
    sizeRatio = 0.8;

    constructor(context: CanvasRenderingContext2D, position: Vector2, spritesheet: HTMLImageElement, spritePosition: Rectangle) {
        this.context = context;
        this.position = position;
        this.spritesheet = spritesheet;
        this.spritePosition = spritePosition;
    }

    draw(padding: number, slotSize: number) {
        var size = slotSize * this.sizeRatio;
        this.context.drawImage(this.spritesheet, this.spritePosition.x, this.spritePosition.y, this.spritePosition.width, this.spritePosition.height,
            padding - size / 2 + this.position.x * slotSize, padding - size / 2 + this.position.y * slotSize, size, size);
    }
}