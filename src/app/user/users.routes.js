export default function configureRoutes($stateProvider) {
    'ngInject';

    console.log('Configure users Routes');

    $stateProvider
        .state('users', {
            parent: 'app',
            url: '/users',
            abstract: true,
            template: '<ui-view></ui-view>',
            onEnter: ['$stateParams', '$state',
                function($stateParams, $state) {
                    //just to debug if needed
                    console.debug('!!Init state users');

                }]
        })
        .state('users.list', {
            url: '',
            component: 'userList',
            onEnter: ['$stateParams', '$state',
                function($stateParams, $state) {
                    //just to debug if needed
                    console.debug('!! Init state userList');

                }]
        })
        .state('users.edit', {
            url: '/:id/edit',
            component: 'userEdit'
        })
        .state('users.detail', {              // ← NEW
            url: '/:id/detail',
            component: 'userDetail'
        })
        .state('users.delete', {              // ← NEW
            url: '/:id/delete',
            component: 'userDelete'
        });
    ;
}

configureRoutes.$inject = ['$stateProvider'];