import angular from 'angular';
import template from './article-list.html';
import './article-list.css';

class ArticleListController {
    constructor(ArticleService) {
        'ngInject';
        this.ArticleService = ArticleService;
        this.articles = [];
    }

    $onInit() {
        this.articles = this.ArticleService.getAll();
    }
}

ArticleListController.$inject = ['ArticleService'];
export const articleList = {
    template: template,
    controller: ArticleListController
}

export default ArticleListController;