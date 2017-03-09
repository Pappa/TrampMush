module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "./src/client",
            src: [
              "**.html",
              "**.css",
              "src/\*\*/\*.ts"
            ],
            dest: "./dist/client"
          }
        ]
      }
    },
    ts: {
      app: {
        files: [{
          src: [
            "src/\*\*/\*.ts",
            "!src/.baseDir.ts"
          ],
          dest: "./dist"
        }],
        options: {
          target: "es5",
          module: "commonjs",
          moduleResolution: "node",
          sourceMap: true,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          lib: [ "es2015", "dom" ],
          noImplicitAny: true,
          suppressImplicitAnyIndexErrors: true
        }
      }
    },
    watch: {
      ts: {
        files: [
          "src/\*\*/\*.ts",
          "!src/.baseDir.ts"
        ],
        tasks: ["copy", "ts"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", ["copy", "ts"]);

};