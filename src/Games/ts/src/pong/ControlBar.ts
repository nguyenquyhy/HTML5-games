class ControlBar extends Entity {
    size: Vector2;
    keySpeed: number = 4;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, width: number, height: number) {
        super(context, x, y, velocityX, velocityY, 1.0);
        this.size = new Vector2(width, height);
        this.type = 'ControlBar';
    }

    update(elapsed: number, entities: Entity[]) {
        super.update(elapsed, entities);

        if (this.position.y < 0) {
            this.position.y = -this.position.y;
            this.velocity.y *= -1;
        }
        if (this.position.y + this.size.y > this.context.canvas.height) {
            this.position.y = this.context.canvas.height - (this.position.y + this.size.y - this.context.canvas.height) - this.size.y;
            this.velocity.y *= -1;
        }
    }

    draw() {
        super.draw();

        this.context.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    up() {
        this.position.y -= this.keySpeed;
    }

    down() {
        this.position.y += this.keySpeed;
    }
}