class Entity {
    position: Vector2;
    velocity: Vector2;
    context: CanvasRenderingContext2D;
    type: string;
    speedIncrease: number;
    collided: (Entity) => boolean;

    MAX_SPEED = 1200;
    MAX_SPEED_SQ = this.MAX_SPEED * this.MAX_SPEED;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, velocityX: number, velocityY: number, speedIncrease: number) {
        this.context = context;
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(velocityX, velocityY);
        this.type = 'Entity';
        this.speedIncrease = speedIncrease;
    }

    update(elapsed: number, entities: Entity[]) {
        this.position.selfAdd(this.velocity.scale(elapsed));
    }

    draw() {

    }

    square(value: number): number {
        return value * value;
    }
}

class Collision {
    constructor(time: number, entity: Entity, normal: Vector2, speedIncrease: number) {
        this.time = time;
        this.entity = entity;
        this.normal = normal;
        this.speedIncrease = speedIncrease;
    }

    time: number;
    entity: Entity;
    normal: Vector2;
    speedIncrease: number;
}