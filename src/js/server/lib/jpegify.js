import gm from "gm";

export default function*(imageInBuffer){
	let tmpBuffer = imageInBuffer;
	let iterationCount = 1000;
	while(iterationCount--){
		tmpBuffer = yield jpeg(tmpBuffer);
	}
	return tmpBuffer;
}

function jpeg(imageInBuffer){
	return new Promise( (resolve, reject) =>{
		gm(imageInBuffer, "image.jpeg")
		.quality(10)
		.toBuffer("JPEG", (err, buffer) => {
			if(err) return reject(err);
			resolve(buffer);
		});
	});
}
