var gulp = require("gulp");

var jade = require("gulp-jade");
var sass = require("gulp-sass");
var webpack = require("gulp-webpack");

gulp.task("views", function(){
	gulp.src("src/*.jade")
		.pipe(jade({
			pretty: true
		}).on("error", console.error))
		.pipe(gulp.dest("dist"));
});

gulp.task("scripts", function(){
	gulp.src("src/js/*")
		.pipe(webpack(require("./webpack.config.js")))
		.pipe(gulp.dest("dist/js"));
});

gulp.task("styles", function(){
	gulp.src("src/sass/*")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("dist/css"));
});

gulp.task("build", ["views", "scripts", "styles"]);

gulp.task("watch", function(){
	gulp.watch("src/**/*", ["build"]);
});
