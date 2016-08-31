


routing.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$sceDelegateProvider'];

export default function routing($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $sceDelegateProvider) {
  //$locationProvider.html5Mode(true);
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://*.thedoc.cn/**',
    'http://p.thedoc.cn/**',
    'http://192.168.1.212:8082/**',
    'http://45.124.125.100/**',
    'http://192.168.0.215:8082/stream/**'
  ]);
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('index', {
      url: '/index',
      template: require('./pages/page1/page1.html'),
      //controller: 'page1',
      //controllerAs: 'home'
    });
}
