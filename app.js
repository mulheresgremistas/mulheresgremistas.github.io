(function(angular) {'use strict';
  var app = angular.module('br.com.mulheresgremistas.francisfontoura', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'ui.utils.masks',
    'br.com.mulheresgremistas.francisfontoura.livroCaixa'
  ]);
  
  app.config(['$urlRouterProvider', '$compileProvider',
    function($urlRouterProvider, $compileProvider) {
      $urlRouterProvider.otherwise('/livro-caixa');
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|data):/);
    }
  ]);
})(angular);