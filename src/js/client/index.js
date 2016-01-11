const _ = require("lodash");

const worker = new Worker("js/jpeg-worker.js");

const reqwest = require("reqwest");

_.each(["blair", "aeryn", "red", "checkers"], (imageName) => {
	const canvas = document.getElementById(`${imageName}-canvas`);
	const context = canvas.getContext("2d");
	context.fillStyle = "rgb(255,255,255)";
	context.fillRect(0,0,canvas.width,canvas.height);

	if(_.contains(["blair","aeryn"], imageName)){
		const image = new Image();
		image.addEventListener("load", () => {
			context.drawImage(image, 0, 0, canvas.width, canvas.height);
		});
		image.src = `images/${imageName}.jpg`;
	}else if(imageName == "red"){
		context.fillStyle = "red";
		context.fillRect(0,0,canvas.width,canvas.height);
	}else if(imageName === "checkers"){
		const size = 40;
		for(let i = 0; i< canvas.width/size; i++){
			for(let j = 0; j< canvas.height/size; j++){
				context.fillStyle = ((i+j)%2) ? "red" : "white";
				context.fillRect(i*size, j*size, size, size);
			}
		}
	}
});

const generateServer = () => {
	_.each(["blair", "aeryn", "red", "checkers"], (imageName) => {
		const canvas = document.getElementById(`${imageName}-canvas`);
		reqwest({
			url: "jpeg",
			method: "POST",
			type: "json",
			contentType: "application/json",
			processData: false,
			data: JSON.stringify({image: canvas.toDataURL("image/jpeg", 100)})
		})
		.then((response) => {
			const image = document.getElementById(`${imageName}-img`);
			image.src = response.dataUrl;
		});
	});
}

document.getElementById("generate").addEventListener("click", () => generateServer());


console.log("MOAR");
