declare class Game {
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
declare var game: Game;
declare function tick(): void;
declare var canvas: HTMLCanvasElement;
declare var context: CanvasRenderingContext2D;
