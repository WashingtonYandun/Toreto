function lerp(a, b, t) {
    return a + (b - a) * t;
}

function getIntersection(pointA, pointB, pointC, pointD) {
    const determinantTopT =
        (pointD.x - pointC.x) * (pointA.y - pointC.y) -
        (pointD.y - pointC.y) * (pointA.x - pointC.x);
    const determinantTopU =
        (pointC.y - pointA.y) * (pointA.x - pointB.x) -
        (pointC.x - pointA.x) * (pointA.y - pointB.y);
    const determinantBottom =
        (pointD.y - pointC.y) * (pointB.x - pointA.x) -
        (pointD.x - pointC.x) * (pointB.y - pointA.y);

    if (determinantBottom != 0) {
        const t = determinantTopT / determinantBottom;
        const u = determinantTopU / determinantBottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(pointA.x, pointB.x, t),
                y: lerp(pointA.y, pointB.y, t),
                offset: t,
            };
        }
    }

    return null;
}

export { lerp, getIntersection };
