// Initial Params
let init_angle = 60;
let init_speed = 80;
let init_ball_x = 10;
let init_ball_y = 1;
let barrel_length = 30;

// Constants
let accn_g = 9.81;
let prec = 0.05;

// Transitive Params
let ball_x, ball_y, ball_vx, ball_vy, max_height, displacement;
let ballFired = false;

// Trajectory
let points = [];

// Scale
let scale;

function shootBall() {
    ballFired = true;
    ball_x = init_ball_x;
    ball_y = init_ball_y;
    ball_vx = init_speed * Math.cos(toRadian(init_angle));
    ball_vy = init_speed * Math.sin(toRadian(init_angle));

    max_height = ball_y;
    displacement = 0;

    display_params.style.display = "block";
}

function drawBall() {
    if (ballFired) {
        context.strokeStyle = "#ffffff";
        context.lineWidth = 2;
        context.beginPath();
        context.arc((ball_x - 5) / scale, canvas_height - (ball_y - 5) / scale, 5, 0, 2 * Math.PI);
        context.stroke();
        console.log("Ball drawn");
    }
}

function drawTrajectories() {
    context.fillStyle = "#ffffff";
    for (let point of points) {
        context.fillRect(point.x, point.y, 2, 2);
    }
}

function clearTrajectories() {
    points = [];
}

function drawRaw() {
    context.strokeStyle = "#ffffff";
    context.fillStyle = "#ffffff";
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(0, canvas_height - 1);
    context.lineTo(canvas_width, canvas_height - 1);
    context.stroke();
}

function update_params(input) {
    if (input == "angle-slide") {
        angle_display.innerHTML = `&theta; = ${angle_slider.value} degrees`;
        init_angle = angle_slider.value;
    }
    else if (input == "speed-slide") {
        speed_display.innerHTML = `u = ${speed_slider.value} units`;
        init_speed = speed_slider.value;
    }
}

function update() {
    if (ballFired) {
        ball_vy = ball_vy - accn_g * prec;

        ball_x = ball_x + ball_vx * prec;
        ball_y = ball_y + ball_vy * prec;

        displacement += ball_vx * prec;
        if(ball_y > max_height) {
            max_height = ball_y;
        }

        points.push({
            x: (ball_x - 5) / scale,
            y: canvas_height - (ball_y - 5) / scale,
        });

        if (ball_y <= init_ball_y) {
            ballFired = false;
            display_params.style.display = "none";
        }
        display_params.innerHTML = `x: ${ball_x.toFixed(2)}, y: ${ball_y.toFixed(2)}, v<sub>x</sub>: ${ball_vx.toFixed(2)}, v<sub>y</sub>: ${ball_vy.toFixed(2)}`;
        display_stats.innerHTML = `Range: ${displacement.toFixed(2)}, Maximum height: ${max_height.toFixed(2)}`;
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawRaw();
    drawBall();
    drawTrajectories();
}

function initParams() {
    angle_slider.value = init_angle;
    update_params('angle-slide');

    speed_slider.value = init_speed;
    update_params('speed-slide');
}

function calcScale() {
    let maxRange = (100 * 100) / accn_g;
    scale = maxRange / canvas_width;
}

window.onload = function () {
    initParams();
    calcScale();
    animate(step);
}

function step() {
    update();
    render();
    animate(step);
};