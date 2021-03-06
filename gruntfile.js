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
              "\*\*/\*.html",
              "\*\*/\*.css",
              "\*\*/\*.js"
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
        tsconfig: true
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
    },
    browserSync: {
      bsFiles: {
          src : [
              "dist/**/*"
          ]
      },
      options: {
          proxy: "localhost:8080"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask("default", ["copy", "ts"]);

};