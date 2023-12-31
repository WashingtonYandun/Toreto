import { Car } from "./car.js";
import { Road } from "./road.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = window.innerHeight;

const road = new Road(canvas.width / 2, canvas.width - 25);

const car = new Car(road.getLaneCenter(2), 100, 30, 50, "#1d3557");

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    car.update(road.borders);

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.6);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}

animate();
