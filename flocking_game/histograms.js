let histogram_canvas = document.getElementById("histogram-canvas");
let histogram_context = histogram_canvas.getContext("2d");

histogram_canvas.width = canvas_width;
histogram_canvas.height = 200;
let bar_thickness = canvas_width / 30;

let attraction_histogram = [], orientation_histogram = [], persistence_histogram = [];

function updateHistograms() {
    attraction_histogram = [];
    orientation_histogram = [];
    persistence_histogram = [];

    for (let i = 0; i < 10; i++) {
        attraction_histogram.push(0);
        orientation_histogram.push(0);
        persistence_histogram.push(0);
    }

    for (let boid of boids) {
        if (boid.isAlive) {
            attraction_histogram[Math.floor(boid.attraction / 0.1)]++;
            orientation_histogram[Math.floor(boid.orientation / 0.1)]++;
            persistence_histogram[Math.floor(boid.persistence / 0.1)]++;
        }
    }
}

function drawHistograms() {
    updateHistograms();

    histogram_context.fillStyle = "#000000";
    histogram_context.fillRect(0, 0, histogram_canvas.width, histogram_canvas.height);

    let num_alive_boids = numAliveBoids();
    if (num_alive_boids > 0) {
        for (let i = 0; i < 10; i++) {
            histogram_context.fillStyle = "#ff0000";
            histogram_context.fillRect(i * bar_thickness, (num_alive_boids - attraction_histogram[i]) * histogram_canvas.height / num_alive_boids, bar_thickness, attraction_histogram[i] * histogram_canvas.height / num_alive_boids);
            histogram_context.fillStyle = "#00ff00";
            histogram_context.fillRect((10 + i) * bar_thickness, (num_alive_boids - orientation_histogram[i]) * histogram_canvas.height / num_alive_boids, bar_thickness, orientation_histogram[i] * histogram_canvas.height / num_alive_boids);
            histogram_context.fillStyle = "#0000ff";
            histogram_context.fillRect((20 + i) * bar_thickness, (num_alive_boids - persistence_histogram[i]) * histogram_canvas.height / num_alive_boids, bar_thickness, persistence_histogram[i] * histogram_canvas.height / num_alive_boids);
        }
    }

    histogram_context.strokeStyle = "#ffffff";

    histogram_context.beginPath();
    histogram_context.moveTo(10 * bar_thickness, 0);
    histogram_context.lineTo(10 * bar_thickness, histogram_canvas.height);
    histogram_context.stroke();

    histogram_context.beginPath();
    histogram_context.moveTo(20 * bar_thickness, 0);
    histogram_context.lineTo(20 * bar_thickness, histogram_canvas.height);
    histogram_context.stroke();
}