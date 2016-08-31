export default angular.module('app.page1', [])
  .controller('test1', function(){
      alert('hello')
  })
  .controller('test2', ['$scope',function($scope){
      $scope.name='scope-hi'
      alert($scope.name)
  }])
  .name;