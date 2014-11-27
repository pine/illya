webpack = require('webpack')

module.exports = (grunt) ->
    webpackBanner = grunt.file.read('webpack.banner.txt')
    
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        webpack:
            main:
                entry: './src/illya.js'
                output:
                    path: './dist/'
                    filename: 'illya.js'
                    library: 'Illya'
                    libraryTarget: 'umd'
                plugins: [
                    new webpack.BannerPlugin(webpackBanner, raw: true)
                    ]
        
        typescript:
            example:
                src: ['example/**/*.ts']
                options:
                    module: 'commonjs'
                    target: 'es5'
                    sourceMap: false
                    declaration: false
        
        uglify:
            options:
                banner: webpackBanner
                
            main:
                files:
                    './dist/illya.min.js': './dist/illya.js'
        
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
        
    grunt.registerTask 'default', ['concurrent:main']
    grunt.registerTask 'build', ['concurrent:main', 'uglify']
    grunt.registerTask 'watch', ['esteWatch']
    
    require('load-grunt-tasks')(grunt)