
route.$inject = ['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', '$ocLazyLoadProvider'];

export default function route($stateProvider, $urlRouterProvider, $sceDelegateProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('page1', {
            url: '/page1',
            views: {
                'page1': {
                    templateProvider: ['$q',function($q){
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => { return resolve(require('./page1.html')) }, 'page1');
                        });
                    }],
                }
            },
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad',function($q, $ocLazyLoad){
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./page1.js');
                            $ocLazyLoad.load({ name: 'page1' });
                            resolve(module.controller);
                        }, 'page1');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }]
            }
        })



}
