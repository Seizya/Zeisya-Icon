let screenCanvas;
let ctx;
window.addEventListener("load", function () {
    screenCanvas = document.querySelectorAll("#Draw_Area")[0];
    ctx = screenCanvas.getContext('2d');

    screenCanvas.height = screenCanvas.clientHeight;
    screenCanvas.width = screenCanvas.clientWidth;

    draw();

    document.querySelectorAll("#A_Counter>*").forEach((element) => element.style.width = element.clientHeight + "px");
    document.querySelectorAll("#Etc>*").forEach((element) => element.style.width = element.clientHeight + "px");
})

let a = 0.23;
let b = (1 - 3 * a) / 6;
let fill = true;
let size = 1;
let color = "crimson";

window.addEventListener("resize", function () {
    screenCanvas.height = screenCanvas.clientHeight;
    screenCanvas.width = screenCanvas.clientWidth;

    draw()
})

function draw() {
    let aa = a * screenCanvas.height;
    let bb = b * screenCanvas.height;
    let one = screenCanvas.height;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.clearRect(0, 0, screenCanvas.height, screenCanvas.height)

    ctx.beginPath();

    ctx.rect(bb, bb, one - 4 * bb - aa, aa);
    ctx.rect(one - 3 * bb - 2 * aa, bb, aa, one - 2 * bb);
    ctx.rect(one - 3 * bb - 2 * aa, one - (aa + bb), 2 * (bb + aa), aa);
    ctx.rect(one - (aa + bb), (one - aa) / 2, aa, (one + aa) / 2 - bb);
    ctx.rect(one - 2 * bb - aa, (one - aa) / 2, bb + aa, aa)
    ctx.rect(bb, (one - aa) / 2, one - 5 * bb - 2 * aa, aa)

    ctx.closePath()
    if (fill) {
        ctx.fill()
    } else {
        ctx.stroke();
    }

    document.querySelectorAll("#A_Number")[0].innerText = Math.round(a * 100000) / 100000;
    document.querySelectorAll("#B_Number")[0].innerText = Math.round(b * 100000) / 100000;
}

window.addEventListener("load", () => {
    document.querySelectorAll("#Plus")[0].addEventListener("click", () => counter("Plus"));
    document.querySelectorAll("#Minus")[0].addEventListener("click", () => counter("Minus"));
})

function counter(updown) {
    if (updown == "Plus") {
        a += 0.01
        b = (1 - 3 * a) / 6;
    } else {
        a -= 0.01
        b = (1 - 3 * a) / 6;
    }

    draw()
}

window.addEventListener("load", () => {
    document.querySelectorAll("#FillStroke")[0].addEventListener("click", () => {
        if (fill) {
            document.querySelectorAll("#FillStroke")[0].innerText = "Fill";
        } else {
            document.querySelectorAll("#FillStroke")[0].innerText = "Stroke";
        }
        fill = !fill
        draw()
    });
    document.querySelectorAll("#Size")[0].addEventListener("click", () => {
        if (size == 1) {
            document.querySelectorAll("#Draw_Area")[0].style.width = "32px";
            document.querySelectorAll("#Draw_Area")[0].style.height = "32px";
            size = 0;
            document.querySelectorAll("#Size")[0].innerText = "Max";
        } else {
            document.querySelectorAll("#Draw_Area")[0].style.width = "95vh";
            document.querySelectorAll("#Draw_Area")[0].style.height = "95vh";
            size = 1;
            document.querySelectorAll("#Size")[0].innerText = "Min";
        }
    });
})

function colors(that) {
    color = that.value;
    draw();
}

window.addEventListener("load", () => {
    let png = screenCanvas.toDataURL("image/png");
    document.getElementById("Download").href = png;
})