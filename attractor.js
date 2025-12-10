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

let horizontalOffset = 10;

function setup() {
    pixelDensity(1);
    const col = document.getElementById("attractorDiv");
    canvas = createCanvas(col.clientWidth - colFix, col.clientHeight, WEBGL);
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

    resizeCanvas(col.clientWidth - colFix, col.clientHeight);
}

function draw() {
    background(0);
    const col = document.getElementById("attractorDiv");
    b = map(scrollPos, 0, col.clientHeight / 2, 0.19, 0.3);
    if (b > 0.35) {
        b = 0.35
    }
    verticalOffset = scrollPos - col.clientHeight / 3.8;
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

        sx = map(x, -3, 3, w * attractorScale, w * -1 * attractorScale);
        sy = map(y, -3, 3, h * - 1 * attractorScale, h * attractorScale);
        sz = map(z, -3, 3, h * 0.3, h * - 1 * attractorScale);

        // // blur effect disabled due to performance issues

        // horizontalOffsetMapped = map(scrollPos, 0, col.clientHeight / 5, 8, 0)
        // if (horizontalOffsetMapped < 0) {
        //     horizontalOffsetMapped = 0;
        // }

        // // red particles
        // stroke(255, 0, 0);
        // strokeWeight(2);
        // beginShape(POINTS);
        // vertex(sx - horizontalOffsetMapped, sy + verticalOffset, sz);
        // endShape();

        // // blue particles
        // stroke(0, 255, 255);
        // strokeWeight(2);
        // beginShape(POINTS);
        // vertex(sx + horizontalOffsetMapped, sy + verticalOffset, sz);
        // endShape();

        // white particles
        stroke(255);
        strokeWeight(2);
        beginShape(POINTS);
        vertex(sx, sy + verticalOffset, sz);
        endShape();
    }
}