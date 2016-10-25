
route.$inject = ['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', '$ocLazyLoadProvider'];

export default function route($stateProvider, $urlRouterProvider, $sceDelegateProvider, $ocLazyLoadProvider) {
  $stateProvider
    .state('page2', {
      url: '/page2',
      views: {
        'page2': {
          templateProvider: ['$q',function($q){
            return $q((resolve) => {
              // lazy load the view
              require.ensure([], () => { return resolve(require('./page2.html')) }, 'page2');
            });
          }],
        }
      },
      resolve: {
        loadMyCtrl:  ['$q', '$ocLazyLoad',function($q, $ocLazyLoad){
          return $q((resolve) => {
            require.ensure([], () => {
              // load whole module
              let module = require('./page2.js');
              $ocLazyLoad.load({ name: 'page2' });
              resolve(module.controller);
            }, 'page2');
          });
          //return $ocLazyLoad.load('pages/page1/page1.js');
        }]
      }
    })


}
