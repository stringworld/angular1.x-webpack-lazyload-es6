route.$inject = ['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', '$ocLazyLoadProvider'];

export default function route($stateProvider, $urlRouterProvider, $sceDelegateProvider, $ocLazyLoadProvider) {
  $stateProvider
    .state('basic', {
      url: '/basic',
      views: {
        'basic': {
          templateProvider: ['$q',function($q){
            return $q((resolve) => {
              // lazy load the view
              require.ensure([], () => { return resolve(require('./basic.html')) }, 'basic');
            });
          }],
        }
      },
      resolve: {
        loadMyCtrl:  ['$q', '$ocLazyLoad',function($q, $ocLazyLoad){
          return $q((resolve) => {
            require.ensure([], () => {
              // load whole module
              let module = require('./basic.js');
              $ocLazyLoad.load({ name: 'basic' });
              resolve(module.controller);
            }, 'basic');
          });
        }]
      }
    })


}
