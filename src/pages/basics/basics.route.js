route.$inject = ['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', '$ocLazyLoadProvider'];

export default function route($stateProvider, $urlRouterProvider, $sceDelegateProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('basics', {
            url: '/basics',
            views: {
                'basics': {
                    templateProvider: ['$q', function($q) {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => { return resolve(require('./basics.html')) }, 'basics');
                        });
                    }],
                }
            },
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./basics.js');
                            $ocLazyLoad.load({ name: 'basics' });
                            resolve(module.controller);
                        }, 'basics');
                    });
                }]
            }
        })


}