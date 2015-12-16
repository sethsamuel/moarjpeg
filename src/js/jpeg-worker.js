const jpeg = require("jpeg-js");

onmessage = (e) =>{
	const data = new Uint8ClampedArray(e.data.data);
	const encode = jpeg.encode({width: e.data.width, height: e.data.height, data: data}, parseInt(e.data.quality));
	// postMessage({width: encode.width, height: encode.height, data: encode.data.buffer}, [encode.data.buffer]);
	postMessage({url: encode.data.toString("base64")})
}
