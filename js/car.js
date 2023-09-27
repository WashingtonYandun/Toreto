import { Controls } from "./controls.js";
import { Sensor } from "./sensor.js";
import { getPolyIntersection } from "./utils.js";

class Car {
    constructor(x, y, width, height, color = "blue") {
        // Initialize the car's position and size
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        // Physics parameters
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 5;
        this.friction = 0.045;
        this.rotation = 0.05;
        this.angle = 0;

        // Initialize controls and sensors
        this.controls = new Controls();
        this.sensor = new Sensor(this);
        this.damage = false;
    }

    update(roadBorders) {
        if (!this.damage) {
            this.move();
            this.polygon = this.#createPolygon();
            this.damage = this.#assessDamage(roadBorders);
        }
        this.sensor.update(roadBorders);
    }

    draw(ctx) {
        if (this.damage) {
            ctx.fillStyle = "red";
        } else {
            ctx.fillStyle = this.color;
        }

        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (const point of this.polygon) {
            ctx.lineTo(point.x, point.y);
        }
        ctx.fill();
        ctx.closePath();

        this.sensor.draw(ctx); // Render sensor readings
    }

    move() {
        // Manage car's movement and steering
        // Speed control
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
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

        // Ensure car doesn't move when speed is very low
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        // Steering control
        if (this.speed !== 0) {
            const flip = this.speed > 0 ? 1 : -1;
            // Rotation of the car based on steering input
            if (this.controls.right) {
                this.angle -= this.rotation * flip;
            }
            if (this.controls.left) {
                this.angle += this.rotation * flip;
            }
        }

        // Update car's position based on speed and angle
        this.x -= this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }

    #createPolygon() {
        const polygon = [];
        const r = Math.hypot(this.width, this.height) / 2;
        const a = Math.atan2(this.width, this.height);

        polygon.push({
            x: this.x - Math.sin(this.angle - a) * r,
            y: this.y - Math.cos(this.angle - a) * r,
        });
        polygon.push({
            x: this.x - Math.sin(this.angle + a) * r,
            y: this.y - Math.cos(this.angle + a) * r,
        });
        polygon.push({
            x: this.x - Math.sin(Math.PI + this.angle - a) * r,
            y: this.y - Math.cos(Math.PI + this.angle - a) * r,
        });
        polygon.push({
            x: this.x - Math.sin(Math.PI + this.angle + a) * r,
            y: this.y - Math.cos(Math.PI + this.angle + a) * r,
        });

        return polygon;
    }

    #assessDamage(roadBorders) {
        for (let i = 0; i < roadBorders.length; i++) {
            const intersection = getPolyIntersection(
                this.polygon,
                roadBorders[i]
            );
            if (intersection) {
                return true;
            }
        }
        return false;
    }
}

export { Car };
