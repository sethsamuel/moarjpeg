const worker = new Worker("js/jpeg-worker.js");

const reqwest = require("reqwest");

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
	return;
	const timerId = "Generate";
	console.time(timerId);
	const tmpImage = new Image();
	const tmpCanvas = document.getElementById("tmp-canvas")
	const tmpContext = tmpCanvas.getContext("2d");
	let dataUrl;
	let iterationCount = 1000;
	do{
		dataUrl = canvas.toDataURL("image/jpeg", quality/100);
		tmpImage.src = dataUrl;
		tmpContext.drawImage(tmpImage, 0, 0, tmpCanvas.width, tmpCanvas.height);
		dataUrl = tmpCanvas.toDataURL("image/jpeg", quality/100);
	}while(iterationCount--)
	const img = document.getElementById("get-img").src = dataUrl;
	console.timeEnd(timerId);
}

const generateServer = (quality) => {
	reqwest({
		url: "jpeg",
		method: "POST",
		type: "json",
		contentType: "application/json",
		processData: false,
		data: JSON.stringify({image: canvas.toDataURL("image/jpeg", 100)})
	})
	.then((response) => {
		const image = document.getElementById("server-img");
		image.src = response.dataUrl;
	});
}

const generateJpeg = (quality) => {
	return;
	const timerId = "JPEG";
	console.time(timerId);
	const data = context.getImageData(0,0,canvas.width,canvas.height);
	worker.postMessage({quality: quality, width: data.width, height: data.height, data: data.data.buffer}, [data.data.buffer]);
	worker.onmessage = (e) => {
		document.getElementById("jpg-img").src = 'data:image/jpeg;base64,' + e.data.url;
		console.timeEnd(timerId);
	}
}

document.getElementById("generate-server").addEventListener("click", () => generateServer(document.getElementById("quality").value));

document.getElementById("generate-canvas").addEventListener("click", () => generateCanvas(document.getElementById("quality").value));

document.getElementById("generate-jpeg").addEventListener("click", () => generateJpeg(document.getElementById("quality").value));

document.getElementById("generate-opengl").addEventListener("click", () => {
	const timerId = "OpenGL";
	console.time(timerId);
	console.timeEnd(timerId);
});

document.getElementById("quality").addEventListener("input", () => {
	const quality = document.getElementById("quality").value;
	generateServer(quality);
	generateCanvas(quality);
	generateJpeg(quality);

});

document.getElementById("quality").value = quality;

console.log("MOAR", canvas);