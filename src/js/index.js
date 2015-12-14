const jpeg = require("jpeg-js");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillStyle = "rgb(255,255,255)";
context.fillRect(0,0,canvas.width,canvas.height);
context.fillStyle = "rgb(128,0,0)";
context.fillRect(10,10,30,30);

document.getElementById("generate-canvas").addEventListener("click", () => {
	const timerId = "Generate";
	console.time(timerId);
	const url = canvas.toDataURL("image/jpeg", 1.0);
	const img = document.getElementById("get-img").src = url;
	console.timeEnd(timerId);
});

document.getElementById("generate-jpeg").addEventListener("click", () => {
	const timerId = "Generate";
	console.time(timerId);
	const url = canvas.toDataURL("image/jpeg", 1.0);
	const img = document.getElementById("get-img").src = url;
	console.timeEnd(timerId);
	console.log("JPEG")
});

console.log("MOAR", canvas);
