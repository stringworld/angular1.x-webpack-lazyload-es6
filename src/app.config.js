


routing.$inject = ['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', '$ocLazyLoadProvider'];

export default function routing($stateProvider, $urlRouterProvider, $sceDelegateProvider, $ocLazyLoadProvider) {
  //$locationProvider.html5Mode(true);
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
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
    .state('page1', {
      url: '/page1',
      views: {
        'page1': {
          templateProvider: ($q) => {
            return $q((resolve) => {
              // lazy load the view
              require.ensure([], () => resolve(require('./pages/page1/page1.html')));
            });
          },
        }
      },
      resolve: {
        loadMyCtrl: ($q, $ocLazyLoad) => {
          return $q((resolve) => {
            require.ensure([], () => {
              // load whole module
              let module = require('./pages/page1/page1.js');
              $ocLazyLoad.load({ name: 'page1' });
              resolve(module.controller);
            });
          });
          //return $ocLazyLoad.load('pages/page1/page1.js');
        }
      }
    })
    .state('page2', {
      url: '/page2',
      views: {
        'page2': {
          templateProvider: ($q) => {
            return $q((resolve) => {
              // lazy load the view
              require.ensure([], () => resolve(require('./pages/page2/page2.html')));
            });
          },
        }
      },
      resolve: {
        loadMyCtrl: ($q, $ocLazyLoad) => {
          return $q((resolve) => {
            require.ensure([], () => {
              // load whole module
              let module = require('./pages/page2/page2.js');
              $ocLazyLoad.load({ name: 'page2' });
              resolve(module.controller);
            });
          });
          //return $ocLazyLoad.load('pages/page1/page1.js');
        }
      }
    })


}
