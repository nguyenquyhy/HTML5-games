/// <binding ProjectOpened='ts:default' />
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
                    { src: ["ts/pong/*.ts", "typings/**/*.ts"], dest: "wwwroot/js/pong" }
                ],
                options: {
                    fast: 'never'
                }
            },
            watch: "ts",
            tsconfig: "tsconfig.json"
        }
    });

    grunt.registerTask("default", ["bower:install", "ts"]);

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-ts');
};