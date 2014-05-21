/* ng-FitTextDynamic v1.0.3
 * https://github.com/sgtpepper43/ng-FitTextDynamic
 *
 * Original angular project: https://github.com/patrickmarabeas/ng-FitText.js
 *
 * Original jQuery project: https://github.com/davatron5000/FitText.js
 * Includes use of Underscore's debounce function
 *
 * Copyright 2014, Trevor Fenn http://TrevorFenn.info
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 21/05/2014
 */

'use strict';

angular.module( 'ngFitTextDynamic', [] )
  .value( 'config', {
    'debounce': false,
    'delay': 250,
    'min': undefined,
    'max': undefined
  })

  .directive( 'dynamicText', [ 'config', 'dynamicTextConfig', '$timeout', function( config, fitTextConfig, $timeout ) {
    return {
      restrict: 'A',
      scope: true,
      transclude: true,
      replace: true,
      template: function( element, attrs ) {
        var tag = element[0].nodeName;
        return "<" + tag + " ng-transclude></" + tag + ">";
      },
      link: function( scope, element, attrs ) {
        angular.extend( config, fitTextConfig.config );

        scope.minFontSize = attrs.dynamicTextMin || config.min || 0;
        scope.maxFontSize = attrs.dynamicTextMax || config.max || Number.POSITIVE_INFINITY;
        scope.dynamic = attrs.dynamicText;
        scope.elementWidth = element[0].offsetWidth;
        scope.fontSizeNumeric = parseInt(document.defaultView.getComputedStyle(element[0]).fontSize.split('px')[0]);

        scope.dynamicResizer = function() {
          if (element[0].children[0].offsetHeight < scope.fontSizeNumeric*2) {
            if (scope.fontSizeNumeric+4 < scope.maxFontSize) {
              scope.fontSizeNumeric += 4;
              element[0].style.fontSize = scope.fontSizeNumeric + 'px';
              scope.dynamicResizer();
            }
            else {
              scope.fontSizeNumeric = scope.maxFontSize;
              element[0].style.fontSize = scope.fontSizeNumeric + 'px';
              if (element[0].children[0].offsetHeight > scope.fontSizeNumeric*2) {
                scope.dynamicResizer();
              }
            }
          }
          else {
            if (scope.fontSizeNumeric-4 > scope.minFontSize) {
              scope.fontSizeNumeric -= 4;
              element[0].style.fontSize = scope.fontSizeNumeric + 'px';
              if (element[0].children[0].offsetHeight > scope.fontSizeNumeric*2) {
                scope.dynamicResizer();
              }
            }
            else {
              scope.fontSizeNumeric = scope.minFontSize;
              element[0].style.fontSize = scope.fontSizeNumeric + 'px';
            }
          }
        };

        scope.$on(scope.dynamic, function () {
          $timeout(scope.dynamicResizer, 10);
        });

        config.debounce == true
          ? angular.element( window ).bind( 'resize', _debounce( function(){ scope.$apply( scope.dynamicResizer );}, config.delay ))
          : angular.element( window ).bind( 'resize', function(){ scope.$apply( scope.dynamicResizer );});

        function _debounce(a,b,c){var d;return function(){var e=this,f=arguments;clearTimeout(d),d=setTimeout(function(){d=null,c||a.apply(e,f)},b),c&&!d&&a.apply(e,f)}}
      }
    }
  }])

  .provider( 'dynamicTextConfig', function() {
    var self = this;
    this.config = {};
    this.$get = function() {
      var extend = {};
      extend.config = self.config;
      return extend;
    };
    return this;
  });
