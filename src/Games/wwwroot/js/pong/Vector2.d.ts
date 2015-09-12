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
