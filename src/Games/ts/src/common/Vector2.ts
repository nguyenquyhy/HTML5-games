class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    squareLength() {
        return this.x * this.x + this.y * this.y;
    }

    selfAdd(value: Vector2) {
        this.x += value.x;
        this.y += value.y;
    }

    selfScale(value: number) {
        this.x *= value;
        this.y *= value;
    }

    selfNormalize() {
        var squareLength = this.squareLength();
        if (squareLength != 1) {
            var length = Math.sqrt(squareLength);
            this.x /= length;
            this.y /= length;
        }
    }

    scale(value: number): Vector2 {
        return new Vector2(this.x * value, this.y * value);
    }

    add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    crossProduct(vector: Vector2): number {
        return this.x * vector.y + this.y * vector.x;
    }

    dotProduct(vector: Vector2): number {
        return this.x * vector.x + this.y * vector.y;
    }

    toString(): string {
        return this.x + " " + this.y;
    }
}