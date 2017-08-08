/*
* @Author: yw850
* @Date:   2017-08-03 13:15:36
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-07 20:31:48
*/

'use strict';
module.exports = function(grunt){


	grunt.initConfig({
		watch: {
		  jade: {
		    files: ['views/**'],
		    options: {
		      // 当文件出现改动的时候回重新启动服务
		      livereload: true
		    }
		  },
		  js: {
		    files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
		    //tasks: ['jshint'],
		    options: {
		      livereload: true
		    }
		  }
		},
		mochaTest: {
			options: {
				reporter: 'spec',

			},
			src: ['test/**/*.js']
		},
		nodemon: {
		  dev: {
		    options: {
		      file: 'app.js',
		      args: [],
		      ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
		      watchedExtensions: ['js'],
		      watchedFolders: ['./'],
		      debug: true,
		      delayTime: 1,
		      env: {
		        PORT: 3000
		      },
		      cwd: __dirname
		    }
		  }
		},
		// 传入任务
		concurrent: {
		  tasks: ['nodemon', 'watch'],
		  options: {
		    logConcurrentOutput: true
		  }
		}
	})
	var env = process.env.NODE_ENV || 'development'
	if ('development' === env) {
		// 只要有文件有改动，就会重新执行在它里面注册好的任务
		grunt.loadNpmTasks('grunt-contrib-watch')
		// 入口文件出现改动就会自动重启app的app.js
		grunt.loadNpmTasks('grunt-contrib-nodemon')
		grunt.loadNpmTasks('grunt-concurrent')
		//unit test
		grunt.loadNpmTasks('grunt-mocha-test')
		// 不要因为一些语法错误中断了grunt的整个服务
		grunt.option('force', true)
		grunt.registerTask('default', ['concurrent'])
		grunt.registerTask('test', ['mochaTest'])
	}


}