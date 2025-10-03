import angular from 'angular';
import template from './comment-list.html';
import './comment-list.css';

class CommentListController {
    constructor(CommentService, UserService) {
        'ngInject';
        this.CommentService = CommentService;
        this.UserService = UserService;
        this.comments = [];
        this.commentAuthors = {};
    }

    $onInit() {
        this.loadComments();
    }

    $onChanges(changes) {
        if (changes.articleId && !changes.articleId.isFirstChange()) {
            this.loadComments();
        }
    }

    loadComments() {
        if (this.articleId) {
            this.comments = this.CommentService.getByArticleId(this.articleId);

            // Load user data for each comment
            this.comments.forEach(comment => {
                const user = this.UserService.getById(comment.userId);
                if (user) {
                    this.commentAuthors[comment.userId] = user;
                }
            });
        }
    }

    handleAvatarClick(userId) {
        if (this.onUserClick) {
            this.onUserClick({ userId: userId });
        }
    }

    getAuthor(userId) {
        return this.commentAuthors[userId] || { name: 'Unknown', avatar: '' };
    }
}

CommentListController.$inject = ['CommentService', 'UserService'];


export const  commentList = {
    template: template,
    controller: CommentListController,
    bindings: {
        articleId: '<',
        onUserClick: '&'
    }
};

export default CommentListController;