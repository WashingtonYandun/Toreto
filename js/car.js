import { Controls } from "./controls.js";

class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.aceleration = 0.2;
        this.maxSpeed = 4;
        this.friction = 0.045;
        this.rotation = 0.02;

        this.angle = 0;

        this.controls = new Controls();
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.closePath();
        ctx.restore();
    }

    update() {
        this.#move();
    }

    #move() {
        // speed of the car
        if (this.controls.forward) {
            this.speed += this.aceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.aceleration;
        }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (this.speed > 0) {
            this.speed -= this.friction;
        }

        // epsilon for not moving when speed is very low
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        // steering of the car
        if (this.speed !== 0) {
            const flip = this.speed > 0 ? 1 : -1;
            // rotation of the car
            if (this.controls.right) {
                this.angle -= this.rotation * flip;
            }
            if (this.controls.left) {
                this.angle += this.rotation * flip;
            }
        }

        // movement of the car
        this.x -= this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}

export { Car };
