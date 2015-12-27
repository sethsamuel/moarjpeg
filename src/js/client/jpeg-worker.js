const jpeg = require("jpeg-js");

onmessage = (e) =>{
	const canvas = new Canvas();
	canvas.width = e.data.width;
	canvas.height = e.data.height;
	const context = canvas.getContext('2d');
	context.putImageData(e.data, 0, 0, canvas.width, canvas.height);
	const url = canvas.toDataURL("image/jpeg", quality/100);
	postMessage({url: url});
}
