/*
 After you have changed the settings under responsive_images
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
          src: [
              //'js/lib/*.js', // All JS in the libs folder
              'js/plugins.js', // Plugins
              'js/main.js'  // This specific file
          ],
          dest: 'js/build/production.js',
      }
    },
    uglify: {
        build: {
            src: 'js/build/production.js',
            dest: 'js/build/production.min.js'
        }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'css/materialize.css': 'sass/materialize.scss',
          'css/style.css': 'sass/style.scss'      // 'destination': 'source
        }
      }
    },
    watch: {
        scripts: {
            files: ['js/*.js', 'css/*.scss'],
            tasks: ['uglify','sass', 'postcss:dist'],
            options: {
                spawn: false,
            },
        } 
    },
    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    },
    responsive_images: {
      dev: {
        options: {
          engine: 'gm',
          sizes: [
          {
            width: 540,
            quality: 30
          }
          ]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg}'],
          cwd: 'img',
          dest: 'img_o'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['img_o'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['img_o', 'css']
        },
      },
    },

  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.registerTask('production', ['concat','uglify']);
  grunt.registerTask('init', ['clean', 'mkdir',]);
  grunt.registerTask('img', ['responsive_images']);
  grunt.registerTask('default', [ 'sass', 'postcss:dist']);
};
