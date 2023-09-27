import { getIntersection, lerp } from "./utils.js";

class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 8;
        this.rayLength = 100;
        this.raySpread = Math.PI * (13 / 18);

        this.rays = [];
        this.readings = [];

        this.lastReverseRayTime = 0;
    }

    update(roadBorders) {
        this.castRays();
        this.readings = [];

        for (const ray of this.rays) {
            this.readings.push(this.#getClosestIntersection(ray, roadBorders));
        }
    }

    #getClosestIntersection(ray, roadBorders) {
        let intersections = [];

        for (let i = 0; i < roadBorders.length; i++) {
            const intersection = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if (intersection) {
                intersections.push(intersection);
            }
        }

        if (intersections.length == 0) {
            return null;
        } else {
            const offsets = intersections.map((e) => e.offset);
            const closest = Math.min(...offsets);
            return intersections.find((e) => e.offset === closest);
        }
    }

    castRays() {
        this.rays = [];
        for (let i = 0; i <= this.rayCount; i++) {
            const rayAngle =
                lerp(
                    this.raySpread / 2,
                    -this.raySpread / 2,
                    this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
                ) + this.car.angle;

            const start = { x: this.car.x, y: this.car.y };
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength,
            };
            this.rays.push([start, end]);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.rayCount; i++) {
            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i];
            }

            // Draw the ray itself
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#6a994e"; // Green color
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            // Draw a secondary line from the car to the intersection point
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#d90429"; // Red color
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
}

export { Sensor };
