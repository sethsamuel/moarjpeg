var gulp = require("gulp");

var jade = require("gulp-jade");
var webpack = require("gulp-webpack");

gulp.task("views", function(){
	gulp.src("src/*.jade")
		.pipe(jade())
		.pipe(gulp.dest("dist"));
});

gulp.task("scripts", function(){
	gulp.src("src/js/*")
		.pipe(webpack(require("./webpack.config.js")))
		.pipe(gulp.dest("dist/js"));
});

gulp.task("build", ["views", "scripts"]);
