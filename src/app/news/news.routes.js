export default function configureRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('news', {
            parent: 'generic',
            url: '/news',
            abstract: true,
            template: '<ui-view></ui-view>'
        })
        .state('news.list', {
            url: '',
            component: 'articleList'
        })
        .state('news.view', {
            url: '/:id',
            component: 'articleView'
        });
}

configureRoutes.$inject = ['$stateProvider'];