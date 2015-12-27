const koa = require("koa");
const koaStatic = require("koa-static");

const app = koa();
app.use(koaStatic("public"));
app.listen(8000);

