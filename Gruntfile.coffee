webpack = require 'webpack'
JSON5 = require 'json5'
_ = require 'underscore'

module.exports = (grunt) ->
    webpackBanner = grunt.file.read('webpack.banner.txt')
    
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        webpack:
            main:
                entry: './lib/illya.js'
                output:
                    path: './dist/'
                    filename: 'illya.js'
                    library: 'Illya'
                    libraryTarget: 'umd'
                plugins: [
                    new webpack.BannerPlugin(webpackBanner, raw: true)
                    ]
        
        typescript:
            options:
                module: 'commonjs'
                target: 'es5'
                sourceMap: false
                declaration: false
            
            example:
                src: []
        
        uglify:
            options:
                banner: webpackBanner
                
            main:
                files:
                    './dist/illya.min.js': './dist/illya.js'
        
        jshint:
            main: ['./lib/**/*.js']
        
        tslint:
            options:
                configuration:  JSON5.parse(grunt.file.read('./tslint.json'))
            
            example:
                src: ['./example/**/*.ts']
        
        concurrent:
            options:
                logConcurrentOutput: true
            
            main: ['jshint:main', 'webpack:main']
            example: ['tslint:example', 'runTypescriptExample']
            exampleWatch: ['tslint:example', 'typescript:example']
            dtsWatch: ['webpack:main', 'runTypescriptExample']
            all: ['concurrent:main', 'concurrent:example']
        
        clean:
            grunt: ['Gruntfile.js*', 'Gruntfile.min*']
            vs: ['./bin', './obj']
            dist: ['./dist']
        
        esteWatch:
            options:
                dirs: ['lib/**/', 'example/**/']
                livereload: false
            js: (filepath) ->
                if filepath.match(/^lib\//)
                    grunt.config ['jshint', 'main'], [filepath]
                    return ['concurrent:main']
                
                return []
            
            ts: (filepath) ->
                # if 'illya.d.ts'
                if filepath.match(/^lib\//)
                    return ['concurrent:dtsWatch']
                
                if filepath.match(/^example\//)
                    grunt.config ['typescript', 'example', 'src'], [filepath]
                    grunt.config ['tslint', 'example', 'src'], [filepath]
                    return ['concurrent:exampleWatch']
                
                return []
        
    grunt.registerTask 'default', ['clean', 'concurrent:main']
    grunt.registerTask 'build', ['clean', 'concurrent:all', 'uglify']
    grunt.registerTask 'watch', ['esteWatch']
    
    grunt.registerTask 'runTypescriptExample', ->
        done = this.async()
        
        grunt.file.glob 'example/*', (err, files) ->
            _.each files, (file) ->
                matches = file.match(/\/(.*)$/)
                target = matches[1]
                grunt.config ['typescript', 'example_' + target, 'src'], [file + '/*.ts']
                grunt.task.run 'typescript:example_' + target
            
            done()
    
    require('load-grunt-tasks')(grunt)