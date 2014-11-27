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
        
        typescript:
            example:
                src: ['example/**/*.ts']
                options:
                    module: 'commonjs'
                    target: 'es5'
                    sourceMap: false
                    declaration: false
        
        uglify:
            main:
                files:
                    './dest/illya.min.js': './dest/illya.js'
        
        jshint:
            main: ['./src/**/*.js']
        
        concurrent:
            options:
                logConcurrentOutput: true
            main: ['jshint:main', 'webpack']
        
        esteWatch:
            options:
                dirs: ['src/**/', 'example/**/']
            js: (filepath) ->
                if filepath.match(/^src\//)
                    grunt.config ['jshint', 'main'], [filepath]
                    return ['concurrent:main']
                
                return []
            
            ts: (filepath) ->
                return ['webpack'] if filepath.match(/^src\//)
                
                grunt.config ['typescript', 'example', 'src'], [filepath]
                return ['typescript']
        
    grunt.registerTask 'default', ['jshint', 'webpack']
    grunt.registerTask 'build', ['jshint', 'webpack', 'uglify']
    grunt.registerTask 'watch', ['esteWatch']
    
    require('load-grunt-tasks')(grunt)