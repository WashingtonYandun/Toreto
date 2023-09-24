import { Car } from "./car.js";
import { Controls } from "./controls.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = window.innerHeight;

const car = new Car(100, 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    car.update();
    car.draw(ctx);

    requestAnimationFrame(animate);
}
