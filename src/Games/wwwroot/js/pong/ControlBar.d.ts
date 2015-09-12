declare class ControlBar extends Entity {
    size: Vector2;
    keySpeed: number;
    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, width: number, height: number);
    update(elapsed: number, entities: Entity[]): void;
    draw(): void;
    up(): void;
    down(): void;
}
