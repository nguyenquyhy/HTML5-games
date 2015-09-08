class Entity {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    radius: number;
    context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.context = context;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    update(elapsed: number) {
        this.x += elapsed * this.velocityX;
        this.y += elapsed * this.velocityY;

        if (this.x - this.radius < 0) {
            this.velocityX *= -1.1;
        }
        if (this.x + this.radius > this.context.canvas.width) {
            this.velocityX *= -1.1;
        }
        if (this.y - this.radius < 0) {
            this.velocityY *= -1.1;
        }
        if (this.y + this.radius > this.context.canvas.height) {
            this.velocityY *= -1.1;
        }
    }

    draw() {
        context.strokeStyle = "#000000";
        context.fillStyle = "#FFFF00";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.stroke();
        context.fill();
    }
}