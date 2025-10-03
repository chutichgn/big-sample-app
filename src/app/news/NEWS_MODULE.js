import angular from 'angular';
import '@uirouter/angularjs';

// Import routes
import configureRoutes from './news.routes';

// Import services
import './article.service';
import './comment.service';

// Import components
import './article-list.cmp';
import './article-view.cmp';
import './comment-list.cmp';
import {articleList} from "./article-list.cmp";
import {articleView} from "./article-view.cmp";
import {commentList} from "./comment-list.cmp";
import commentService from "./comment.service";
import ArticleService from "./article.service";
import CommentService from "./comment.service";

export const NEWS_MODULE = angular.module('news', ['ui.router']);

NEWS_MODULE.config(configureRoutes);
NEWS_MODULE.component('articleList', articleList);
NEWS_MODULE.component('articleView', articleView);
NEWS_MODULE.component('commentList', commentList);
NEWS_MODULE.service('CommentService', CommentService);
NEWS_MODULE.service('ArticleService', ArticleService);

