var gulp = require("gulp");
var babel = require("gulp-babel");


// Gulp task to concatenate our css files
gulp.task('staticFiles', function () {
    return gulp.src(["src/**/*.css", "src/**/*.html", "src/**/externals/*.js"])

        .pipe(gulp.dest("dist"))
});


gulp.task('js', function () {
    return gulp.src(["src/**/*.js", "!src/**/externals/*.js"])
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .on("error", function (e) {
            console.log(">>> ERROR", e);
            this.emit("end");
        })
        .pipe(gulp.dest("dist"));
});
gulp.task("default", ['js', 'staticFiles']);