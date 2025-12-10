let w = 550;
let h = 550;

let x = 0.1;
let y = 0;
let z = 0;

let dt = 0.2;
let b = 0.19;

let pts = [];
let n = 2500;

let colFix = 15;
let attractorScale = 0.3;

let scrollPos = 0;
let height = 1500;

function setup() {
    const col = document.getElementById("attractorDiv");
    canvas = createCanvas(col.clientWidth - colFix, height, WEBGL);
    canvas.parent("attractorDiv");
    for (let i = 0; i < n; i++) {
        x = random(-1, 1);
        y = random(-1, 1);
        z = random(-1, 1);
        pts.push([x, y, z]);
    }
    window.addEventListener("scroll", () => {
        scrollPos = window.scrollY;
    });
}

function windowResized() {
    const col = document.getElementById("attractorDiv");

    resizeCanvas(col.clientWidth - colFix, height);
}

function draw() {
    background(0);
    const col = document.getElementById("attractorDiv");
    b = map(scrollPos, 0, 1000, 0.19, 0.3);
    verticalOffset = scrollPos - 400;
    // verticalOffset = map(scrollPos, 0, 500, -100, 200);
    for (let i = 0; i < n; i++) {
        x = pts[i][0];
        y = pts[i][1];
        z = pts[i][2];

        dx = dt * (sin(y) - b * x);
        dy = dt * (sin(z) - b * y);
        dz = dt * (sin(x) - b * z);
        x = x + dx;
        y = y + dy;
        z = z + dz;

        pts[i][0] = x;
        pts[i][1] = y;
        pts[i][2] = z;

        fill(255, 255, 255);

        let sx = map(x, -3, 3, w * attractorScale, w * -1 * attractorScale);
        let sy = map(y, -3, 3, h * - 1 * attractorScale, h * attractorScale);
        let sz = map(z, -3, 3, h * 0.3, h * - 1 * attractorScale);

        stroke(255);
        strokeWeight(2);
        beginShape(POINTS);
        vertex(sx, sy + verticalOffset, sz);
        endShape();
    }
}