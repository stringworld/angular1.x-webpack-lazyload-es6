


routing.$inject = ['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', '$ocLazyLoadProvider'];

export default function routing($stateProvider, $urlRouterProvider, $sceDelegateProvider, $ocLazyLoadProvider) {
  //$locationProvider.html5Mode(true);
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://127.0.0.1:8080/**',
    'http://*.thedoc.cn/**',
    'http://p.thedoc.cn/**',
    'http://192.168.1.212:8082/**',
    'http://45.124.125.100/**',
    'http://192.168.0.215:8082/stream/**'
  ]);
  $urlRouterProvider.otherwise('/page1');
  $stateProvider
    .state('index', {
      url: '/index',
      sticky: true,
      deepStateRedirect: true,

    })
}
