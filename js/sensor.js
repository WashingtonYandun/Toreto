import { getIntersection, lerp } from "./utils.js";

class Sensor {
    constructor(car) {
        this.car = car;
        this.rayCount = 8;
        this.rayLength = 100;
        this.raySpread = Math.PI;

        this.rays = [];
        this.readings = [];
    }

    update(roadBorders) {
        this.castRays(); // Renamed from #castRays
        this.readings = [];

        for (const ray of this.rays) {
            this.readings.push(this.getClosestIntersection(ray, roadBorders)); // Renamed from #getReading
        }
        console.log(this.readings);
    }

    getClosestIntersection(ray, roadBorders) {
        // Renamed from #getReading
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
            return intersections.find((e) => e.offset == closest);
        }
    }

    castRays() {
        // Renamed from #castRays
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
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

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#6a994e";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#d90429";
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
}

export { Sensor };
