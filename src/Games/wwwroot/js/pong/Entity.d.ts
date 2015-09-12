declare class Entity {
    position: Vector2;
    velocity: Vector2;
    context: CanvasRenderingContext2D;
    type: string;
    speedIncrease: number;
    collided: (Entity) => boolean;
    MAX_SPEED: number;
    MAX_SPEED_SQ: number;
    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, speedIncrease: number);
    update(elapsed: number, entities: Entity[]): void;
    draw(): void;
    square(value: number): number;
}
declare class Collision {
    constructor(time: number, entity: Entity, normal: Vector2, speedIncrease: number);
    time: number;
    entity: Entity;
    normal: Vector2;
    speedIncrease: number;
}
