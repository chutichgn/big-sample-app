import angular from 'angular';

class CommentService {
    constructor() {
        this.comments = {
            1: [
                { id: 1, articleId: 1, userId: 2, text: 'Great article! Very helpful for our team.', date: '2025-01-16' },
                { id: 2, articleId: 1, userId: 3, text: 'I have been using these practices for a while now. They work really well!', date: '2025-01-17' },
                { id: 3, articleId: 1, userId: 4, text: 'Thanks for sharing. Could you elaborate more on the component lifecycle?', date: '2025-01-18' }
            ],
            2: [
                { id: 4, articleId: 2, userId: 1, text: 'This integration guide saved me hours of work!', date: '2025-02-21' },
                { id: 5, articleId: 2, userId: 5, text: 'Bootstrap 5 with AngularJS is a great combination.', date: '2025-02-22' },
                { id: 6, articleId: 2, userId: 3, text: 'Do you have examples for the carousel component?', date: '2025-02-23' }
            ],
            3: [
                { id: 7, articleId: 3, userId: 2, text: 'ES6 classes make the code so much cleaner!', date: '2025-03-11' },
                { id: 8, articleId: 3, userId: 4, text: 'Webpack configuration was tricky but this helped a lot.', date: '2025-03-12' },
                { id: 9, articleId: 3, userId: 5, text: 'Excellent article on modernizing legacy code.', date: '2025-03-13' }
            ],
            4: [
                { id: 10, articleId: 4, userId: 1, text: 'Component architecture is the way to go!', date: '2025-04-06' },
                { id: 11, articleId: 4, userId: 3, text: 'How do you handle deeply nested components?', date: '2025-04-07' },
                { id: 12, articleId: 4, userId: 2, text: 'This approach improved our codebase significantly.', date: '2025-04-08' }
            ],
            5: [
                { id: 13, articleId: 5, userId: 4, text: 'State management can be challenging in large apps.', date: '2025-05-13' },
                { id: 14, articleId: 5, userId: 1, text: 'The Redux-inspired approach works well for us.', date: '2025-05-14' },
                { id: 15, articleId: 5, userId: 5, text: 'Great comparison of different patterns!', date: '2025-05-15' }
            ]
        };
    }

    getByArticleId(articleId) {
        return angular.copy(this.comments[articleId] || []);
    }

    addComment(articleId, userId, text) {
        if (!this.comments[articleId]) {
            this.comments[articleId] = [];
        }
        const newComment = {
            id: Date.now(),
            articleId: parseInt(articleId),
            userId: parseInt(userId),
            text: text,
            date: new Date().toISOString().split('T')[0]
        };
        this.comments[articleId].push(newComment);
        return angular.copy(newComment);
    }
}



export default CommentService;