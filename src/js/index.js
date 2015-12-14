const jpeg = require("jpeg-js");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillStyle = "rgb(255,255,255)";
context.fillRect(0,0,canvas.width,canvas.height);

const quality = 10;

const blair = new Image();
blair.addEventListener("load", () => {
	context.drawImage(blair, 0, 0, canvas.width, canvas.height);
});
blair.src = "images/blair.jpg";

document.getElementById("generate-canvas").addEventListener("click", () => {
	const timerId = "Generate";
	console.time(timerId);
	const url = canvas.toDataURL("image/jpeg", quality/100);
	const img = document.getElementById("get-img").src = url;
	console.timeEnd(timerId);
});

document.getElementById("generate-jpeg").addEventListener("click", () => {
	const timerId = "JPEG";
	console.time(timerId);
	const data = context.getImageData(0,0,canvas.width,canvas.height);
	const jpegImageData = jpeg.encode(data, quality);
	const img = document.getElementById("jpg-img").src = 'data:image/jpeg;base64,' + jpegImageData.data.toString("base64");
	console.timeEnd(timerId);
});

console.log("MOAR", canvas);
