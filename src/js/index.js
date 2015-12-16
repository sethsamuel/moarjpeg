// const Worker = require("worker!./jpeg-worker");
const worker = new Worker("js/jpeg-worker.js");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillStyle = "rgb(255,255,255)";
context.fillRect(0,0,canvas.width,canvas.height);

const blair = new Image();
blair.addEventListener("load", () => {
	context.drawImage(blair, 0, 0, canvas.width, canvas.height);
});
blair.src = "images/blair.jpg";

const generateCanvas = (quality) => {
	const timerId = "Generate";
	console.time(timerId);
	const url = canvas.toDataURL("image/jpeg", quality/100);
	const img = document.getElementById("get-img").src = url;
	console.timeEnd(timerId);
}

const generateJpeg = (quality) => {
	const timerId = "JPEG";
	console.time(timerId);
	const data = context.getImageData(0,0,canvas.width,canvas.height);
	worker.postMessage({quality: quality, width: data.width, height: data.height, data: data.data.buffer}, [data.data.buffer]);
	worker.onmessage = (e) => {
		document.getElementById("jpg-img").src = 'data:image/jpeg;base64,' + e.data.url;
		console.timeEnd(timerId);
	}
}

document.getElementById("generate-canvas").addEventListener("click", () => generateCanvas(document.getElementById("quality").value));

document.getElementById("generate-jpeg").addEventListener("click", () => generateJpeg(document.getElementById("quality").value));

document.getElementById("generate-opengl").addEventListener("click", () => {
	const timerId = "OpenGL";
	console.time(timerId);
	console.timeEnd(timerId);
});

document.getElementById("quality").addEventListener("input", () => {
	const quality = document.getElementById("quality").value;
	generateCanvas(quality);
	generateJpeg(quality);

});

document.getElementById("quality").value = quality;

console.log("MOAR", canvas);
