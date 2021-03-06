const gulp = require('gulp'),
      eslint = require('gulp-eslint'),
      mocha = require('gulp-mocha'),
      files = ['test/*.js', '!node_modules//**',__dirname + '/../lib/*.js'],
      webpack = require('webpack'),
      webpackStream = require('webpack-stream'),
      uglify = require('gulp-uglify'),
      through = require('through2'),
      ngAnnotate = require('gulp-ng-annotate'),
      html = require('html-loader'),
      sass = require('gulp-sass'),
      maps = require('gulp-sourcemaps'),
      minifyCss = require('gulp-minify-css');

// gulp.task('webpack:dev', () => {
//   gulp.src('app/js/client.js')
//     .pipe(webpackStream({
//       output: {
//         filename: 'bundle.js'
//       },
//       module: {
//         loaders: [
//           {
//             test: /\.js$/,
//             exclude: /node_modules/,
//             loader: 'babel-loader'
//           }
//         ]
//       },
//       plugins: [
//         new webpack.DefinePlugin({
//           __BASEURL__: JSON.stringify('https://heroesvsvillains.herokuapp.com')
//         })
//       ],
//       devtool: 'source-map'
//     }))
//     .pipe(maps.init({ loadMaps: true }))
//     .pipe(through.obj(function(file, enc, cb) {
//       // Dont pipe through any source map files as it will be handled
//       // by gulp-sourcemaps
//       const isSourceMap = (/\.map$/).test(file.path);
//       if (!isSourceMap) this.push(file);
//       cb();
//     }))
//     .pipe(ngAnnotate())
//     .pipe(uglify())
//     .pipe(maps.write('.'))
//     .pipe(gulp.dest('build/'));
// });


gulp.task('sass:dev', function() {
  gulp.src('./app/sass/**/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('lint', function() {
  return gulp.src(files)
    .pipe(eslint({
      extends: 'eslint:recommended', // imports general rules
      ecmaFeatures: {
        'modules': true,        // allows modules
        'blockBindings': true,  // allows const
        'arrowFunctions': true  // allows arrow functions
      },
      'rules': {
        'no-console': 0,       // allows console.logs without throwing err
        'semi': 2,             // requires semi-colons
      },
      envs: [
        'node',
        'mocha'
      ]
    }))
    .pipe(eslint.format());
});

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('html:dev', function() {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:dev', function() {
  gulp.src(__dirname + '/app/js/*.js')
    .pipe(webpackStream({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
    .pipe(webpackStream({
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      },
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/'));
});

// gulp.task('watch', function() {
//   gulp.watch(files, ['lint']);
// });

gulp.task('build:dev', ['html:dev','sass:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);

//gulp.task('default', ['mocha', 'lint', 'watch','build:dev']);


