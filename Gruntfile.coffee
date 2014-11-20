module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        webpack:
            main:
                entry: './src/illya.js'
                output:
                    path: './dest/'
                    filename: 'illya.js'
                    library: 'Illya'
                    libraryTarget: 'umd'
        
        uglify:
            main:
                files:
                    './dest/illya.min.js': './dest/illya.js'
        
        jshint:
            main: ['./src/*.js']
        
        watch:
            compile:
                files: './src/*.js'
                tasks: ['webpack']
            
            jshint:
                files: './src/*.js'
                tasks: ['jshint']
                options:
                    spawn: false
    
    grunt.registerTask 'default', ['jshint', 'webpack']
    grunt.registerTask 'build', ['jshint', 'webpack', 'uglify']
    
    require('load-grunt-tasks')(grunt)