'use strict';
const gutil = require('gulp-util');
const through = require('through2');
const vinyl = require('vinyl-fs');
const l = require('lodash'); 

module.exports = (options) => {
  // Какие-то действия с опциями. Например, проверка их существования,
  // задание значения по умолчанию и т.д.

  return through.obj(function(file, enc, cb) {

  	var translationObj;
  	var arrayOfRows = file.contents.toString();

 	var angular = {};
 	angular.module = function () {

 		var moduleInstance = {
 			config : config
 		}

 		function config (arg) {

 			var $translateProvider = {
 				translations : function (language, obj) {
 					translationObj = obj;
 				}	
 			}
 
 			arg($translateProvider);
 		}
 		return moduleInstance
 	};
 	
  	eval(arrayOfRows);


  	var notUniq = l._.values(translationObj);
  	var uniq = l._.uniq(l._.values(translationObj));

  	if (notUniq.length - uniq.length) {

  		console.log('\nhere is - ' + (notUniq.length - uniq.length) + ' equal translatons values in \n' + file.path);

  		var result = l._.filter(notUniq, function (value, index, iteratee) {
   			return l._.includes(iteratee, value, index + 1);
	
		});

  		result.forEach(function(value){
  			console.log(value);
  		})
	



  	}

  	// console.log(notUniq.length);
  	// console.log(uniq.length);


	
	// console.log(result);

  	// console.log(angular.module.config);

    // Если файл не существует
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    // Если файл представлен потоком
    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-example-plugin', 'Streaming not supported'));
      return;
    }

    // Код плагина

    // Возвращаем обработанный файл для следующего плагина
    this.push(file);
    cb();
  });
};