declare class Circle extends Entity {
    radius: number;
    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, radius: number);
    update(elapsed: number, entities: Entity[]): void;
    draw(): void;
    checkCollisions(elapsed: number, entities: Entity[]): Collision;
    collideEdge: (Ox: any, Oy: any, r: any, vx: any, vy: any, x1: any, y1: any, y2: any, xNormal: any) => number;
    collideCorner: (Ox: any, Oy: any, r: any, vx: any, vy: any, x1: any, y1: any, xNormal: any, yNormal: any) => number;
}
