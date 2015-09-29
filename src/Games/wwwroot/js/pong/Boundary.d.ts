declare class Boundary extends Entity {
    normal: Vector2;
    constructor(context: CanvasRenderingContext2D, x: number, y: number, normal: Vector2);
    update(elapsed: number, entities: Entity[]): void;
}
