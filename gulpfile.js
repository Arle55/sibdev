"use strict";

var gulp = require("gulp");
var del = require("del");
var plumber = require("gulp-plumber");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var htmlmin = require("gulp-htmlmin");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("pug", function(){
  return gulp.src("source/*.pug")
  .pipe(pug({ pretty: true }))
  .pipe(gulp.dest("source"))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"))
  .pipe(server.reload({
    stream: true							
  }))
});

gulp.task("copy", function(){
  return gulp.src([
    "source/fonts/*.{woff, woff2}",
    "source/img/**",
    "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
})

gulp.task("clean", function () {
  return del("build");
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.pug", gulp.series("pug"));
});

gulp.task("build", gulp.series("clean", "copy", "css","pug"));
gulp.task("start", gulp.series("build", "server"));