(function(angular) {'use strict';
  var module = angular.module('br.com.mulheresgremistas.francisfontoura.livroCaixa', ['ui.router']);
  
  module.config(['$stateProvider',
    function($stateProvider) {
      $stateProvider.state('livro-caixa', {
        url: '/livro-caixa',
        templateUrl: 'livro-caixa/index.html',
        controller: 'livroCaixaController'
      });
    }
  ]);
  
  module.controller('livroCaixaController', ['$scope', '$filter',
    function($scope, $filter) {
      function Entry() {
        this.date = $scope.entry && $scope.entry.date || new Date();
      }
      
      $scope._ = {};
      $scope.entry = new Entry();

      $scope.entries = localStorage.entries ? JSON.parse(localStorage.entries) : [];
      
      $scope.$watch('_.multiplier', function() {
        $scope.entry.value = Math.abs($scope.entry.value) * $scope._.multiplier;
      });
      
      $scope.$watch('entry.value', function(value) {
        $scope._.multiplier = ((value < 0) ? -1 : 1);
      });
      
      $scope.insert = function() {
        $scope.entries.push($scope.entry);
        localStorage.setItem('entries', JSON.stringify($scope.entries));
        $scope.entry = new Entry();
      };
      
      $scope.subtotal = function(index) {
        var subtotal = 0;
        var array = $filter('orderBy')($scope.entries, 'date');
        for(var i = 0; i <= index; i++) {
          subtotal += array[i].value;
        }
        return subtotal;
      };
      
      $scope.credits = function() {
        return $scope.entries.reduce(function(sum, entry) {
          if(entry.value > 0) {
            return sum + entry.value;
          } else {
            return sum;
          }
        }, 0);
      };
      
      $scope.debits = function() {
        return $scope.entries.reduce(function(sum, entry) {
          if(entry.value < 0) {
            return sum + entry.value;
          } else {
            return sum;
          }
        }, 0);
      };
      
      $scope.total = function() {
        return $scope.credits() + $scope.debits();
      };
      
      $scope.clear = function() {
        if(confirm('Confirma limpeza da tabela?')) {
          localStorage.removeItem('entries');
          $scope.entries = [];
        }
      };
    }
  ]);
})(angular);