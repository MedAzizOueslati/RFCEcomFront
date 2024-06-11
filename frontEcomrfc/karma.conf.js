module.exports = function(config) {
    config.set({
      // Other configurations
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      coverageReporter: {
        type: 'lcov',
        dir: require('path').join(__dirname, './coverage'),
        subdir: '.',
        includeAllSources: true
      },
      reporters: ['progress', 'coverage', 'kjhtml'],
      browsers: ['ChromeHeadless'],
      singleRun: true,
      restartOnFileChange: true
    });
  };
  