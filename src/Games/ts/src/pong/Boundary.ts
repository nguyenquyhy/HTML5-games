class Boundary extends Entity {
    normal: Vector2;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, normal: Vector2) {
        super(context, x, y, 0, 0, 1.1);

        this.normal = normal;
    }

    update(elapsed: number, entities: Entity[]) {
        // Stand still
    }
}