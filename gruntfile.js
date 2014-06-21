/**
 * Author: Thomas Schiela <thomas.schiel@pumacy.de>
 * Date: 06.11.13
 * Time: 18:09
 */

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['./public/js/app/*.js', './public/vendor/js/*.js', './public/js/app/modules/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
          debounceDelay: 750
        }
      }
    },
    concat: {
      app: {
        src: ['./public/js/app/*.js', './public/js/app/modules/*.js'],
        dest: './public/js/gardnr.js'
      },
      vendor: {
        src: ['./public/vendor/js/*.js'],
        dest: './public/js/vendor.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // default task
  grunt.registerTask('default', ['concat']);
};