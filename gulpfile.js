const gulp = require('gulp'),//gulp
      htmlmin = require('gulp-htmlmin'),//压缩html
      imagemin = require('gulp-imagemin'),//压缩图片
      pngcrush = require('imagemin-pngcrush'),//png
      cssmin = require('gulp-clean-css'),//压缩css
      jshint = require('gulp-jshint'),//js检查
      jsmin = require('gulp-uglify'),//压缩js
      concat = require('gulp-concat'),//合并文件
      rename = require('gulp-rename'),//文件改名
      sprite = require('gulp.spritesmith'),//雪碧图制作
      notify = require('gulp-notify');//提示信息

gulp.task('default',['css','image','js']);

//压缩html
gulp.task('html',function(){
  return gulp.src('public/mobile1/*.html')
            .pipe(htmlmin({
              removeComments: true,//清除HTML注释
              collapseWhitespace: true,//压缩空格
              collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
              removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
              removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
              removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
              minifyJS: true,//压缩页面JS
              minifyCSS: true//压缩页面CSS
            }))
            .pipe(gulp.dest('dist'))
            .pipe(notify({ message: 'html task ok!' }));
});

//压缩css
gulp.task('css',function(){
  const common =  gulp.src(['public/mobile1/css/initialize.css','public/mobile1/css/icons.css'])
                      .pipe(concat('common.css'))
                      .pipe(cssmin())
                      .pipe(gulp.dest('dist/css/'))
                      .pipe(notify({ message: 'common css task ok!' }));
  return gulp.src(['public/mobile1/css/index.css','public/mobile1/css/course.css','public/mobile1/css/order.css'])
              .pipe(cssmin())
              .pipe(gulp.dest('dist/css/'))
              .pipe(notify({ message: 'css task ok!' }));
});

//制作雪碧图
gulp.task('sprite',function(){
  return gulp.src('public/mobile1/img/icons/*.png')
            .pipe(imagemin())
            .pipe(sprite({
              imgName:'icons.png',
              cssName:'icons.css',
              padding:10,
              algorithm: 'binary-tree'
            }))
            .pipe(gulp.dest('dist/icons/'));
});

//压缩图片
gulp.task('image',function(){
  return gulp.src('public/mobile1/img/*.{png,jpg,svg}')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/img/'))
            .pipe(notify({ message: 'img task ok!' }));
});

//压缩合并js
gulp.task('js',function(){
  const index = gulp.src(['public/mobile1/js/isLogin.js','public/mobile1/js/index.js'])
                  .pipe(concat('index.js'))
                  .pipe(jsmin())
                  .pipe(gulp.dest('dist/js/'))
                  .pipe(notify({ message: 'index.js task ok!' }));
   const course = gulp.src(['public/mobile1/js/isLogin.js','public/mobile1/js/course.js'])
                  .pipe(concat('course.js'))
                  .pipe(jsmin())
                  .pipe(gulp.dest('dist/js/'))
                  .pipe(notify({ message: 'course.js task ok!' }));
   const order = gulp.src(['public/mobile1/js/isLogin.js','public/mobile1/js/order.js'])
                  .pipe(concat('order.js'))
                  .pipe(jsmin())
                  .pipe(gulp.dest('dist/js/'))
                  .pipe(notify({ message: 'order.js task ok!' }));
});


