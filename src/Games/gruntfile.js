/// <binding ProjectOpened='ts:default, ts:tests' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: "wwwroot/lib",
                    layout: "byComponent",
                    cleanTargetDir: false
                }
            }
        },
        ts: {
            default: {
                files: [
                    { src: ["ts/src/pong/*.ts", "ts/src/common/*.ts", "typings/**/*.ts"], dest: "wwwroot/js/pong.js" },
                    { src: ["ts/src/chinesechess/*.ts", "ts/src/common/*.ts", "typings/**/*.ts"], dest: "wwwroot/js/chinesechess.js" },
                ],
                watch: "ts/src",
                options: {
                    fast: 'never',
                    declaration: true
                }
            },
            tests: {
                files: [
                    { src: ["ts/tests/pong/collisions.ts", "typings/**/*.ts", "wwwroot/js/pong/*.d.ts"], dest: "wwwroot/tests/pong/js" }
                ],
                watch: "ts/tests",
                options: {
                    fast: 'never'
                }
            },
            tsconfig: "tsconfig.json"
        },
        qunit: {
            all: ['tests/**/*.html']
        }
    });

    grunt.registerTask("default", ["bower:install", "ts"]);

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-qunit');
};