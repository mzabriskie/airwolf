module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', 'index.js']
		},
		nodeunit: {
			all: ['test/*.js']
		},
		watch: {
			test: {
				files: ['lib/*.js', 'test/**/*.js', 'test/**/*.json'],
				tasks: ['test']
			}
		}
	});

	grunt.registerTask('test', ['jshint', 'nodeunit']);
};
