import angular from 'angular';
import template from './article-view.html';
import './article-view.css';

class ArticleViewController {
    constructor($stateParams, ArticleService, OffcanvasService) {
        'ngInject';
        this.$stateParams = $stateParams;
        this.ArticleService = ArticleService;
        this.OffcanvasService = OffcanvasService;
        this.article = null;
        this.selectedUserId = null;
    }

    $onInit() {
        const articleId = this.$stateParams.id;
        this.article = this.ArticleService.getById(articleId);
    }

    showUserDetail(userId) {
        this.selectedUserId = userId;
        this.OffcanvasService.show('userDetailOffcanvas');
    }
}
export const   articleView= {
    template: template,
    controller: ArticleViewController
}

ArticleViewController.$inject = ['$stateParams', 'ArticleService', 'OffcanvasService'];

export default ArticleViewController;
