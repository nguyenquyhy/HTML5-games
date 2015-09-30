declare class Boundary extends Entity {
    normal: Vector2;
    constructor(context: CanvasRenderingContext2D, x: number, y: number, normal: Vector2);
    update(elapsed: number, entities: Entity[]): void;
}
declare class Circle extends Entity {
    radius: number;
    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, radius: number);
    update(elapsed: number, entities: Entity[]): void;
    draw(): void;
    checkCollisions(elapsed: number, entities: Entity[]): Collision;
    collideEdge: (Ox: any, Oy: any, r: any, vx: any, vy: any, x1: any, y1: any, y2: any, xNormal: any) => number;
    collideCorner: (Ox: any, Oy: any, r: any, vx: any, vy: any, x1: any, y1: any, xNormal: any, yNormal: any) => number;
}
declare class ControlBar extends Entity {
    size: Vector2;
    keySpeed: number;
    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, width: number, height: number);
    update(elapsed: number, entities: Entity[]): void;
    draw(): void;
    up(): void;
    down(): void;
}
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
declare class Pong {
    context: CanvasRenderingContext2D;
    entities: Entity[];
    ball: Entity;
    players: ControlBar[];
    keys: {};
    mouse: Vector2;
    INITIAL_BAR_LENGTH: number;
    INITIAL_BAR_DEPTH: number;
    INITIAL_BALL_SPEED: number;
    scores: number[];
    constructor(context: CanvasRenderingContext2D);
    startGame(): void;
    stopGame(): void;
    update(elapsed: number): void;
    render(elapsed: number): void;
    doKeyDown(e: any): void;
    doKeyUp(e: any): void;
    doMouseDown(e: any): void;
    doMouseMove(e: any): void;
    doMouseUp(e: any): void;
}
declare var lastUpdate: any;
declare var pong: Pong;
declare var txtFPS: JQuery;
declare var sum: number;
declare var count: number;
declare function tickPong(): void;
declare var canvas: HTMLCanvasElement;
declare var context: CanvasRenderingContext2D;
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
