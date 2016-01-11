import "babel-polyfill";
import koa from "koa";
import koaStatic from "koa-static";
import koaBody from "koa-body";
import jpeg from "./lib/jpegify";


const app = koa();

app.use(function *(next){
	const requestStart = new Date();
	yield next;
	console.log(`${this.request.method} ${this.request.path} - ${this.status} - ${(new Date()).getTime() - requestStart.getTime()}ms`);
});
app.use(koaStatic("public"));
app.use(koaBody({jsonLimit: 100*1000}));
app.use(function *(next){
	if(!this.request.body.image) return yield next;
	const prefix = "data:image/jpeg;base64,";
	const imageData = this.request.body.image.slice("data:image/jpeg;base64,".length);
	const imageInBuffer = new Buffer(imageData, "base64");
	const buffer = yield* jpeg(imageInBuffer);
	console.log(`Result length ${buffer.length}`);
	this.status = 201;
	this.body = {dataUrl: prefix + buffer.toString("base64")};
});

const port = 8000;
app.listen(port);
console.log(`Running on port ${port}`);

