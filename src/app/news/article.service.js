import angular from 'angular';

class ArticleService {
    constructor() {
        this.articles = [
            {
                id: 1,
                title: 'AngularJS Best Practices in 2025',
                content: 'AngularJS, despite being in long-term support, continues to power many enterprise applications. This article explores the best practices for maintaining and developing AngularJS applications in 2025, including component-based architecture, proper state management, and integration with modern tools.',
                author: 'John Doe',
                date: '2025-01-15',
                image: 'https://picsum.photos/800/400?random=1'
            },
            {
                id: 2,
                title: 'Integrating Bootstrap 5 with AngularJS',
                content: 'Bootstrap 5 dropped jQuery dependency, making it more compatible with modern frameworks. This comprehensive guide shows you how to integrate Bootstrap 5 components with AngularJS, including modals, offcanvas, tooltips, and more. Learn how to create reusable directives that wrap Bootstrap functionality.',
                author: 'Jane Smith',
                date: '2025-02-20',
                image: 'https://picsum.photos/800/400?random=2'
            },
            {
                id: 3,
                title: 'Modern JavaScript with Legacy AngularJS',
                content: 'Using ES6+ features like classes, modules, and arrow functions can greatly improve your AngularJS codebase. This article demonstrates how to use Webpack and Babel to transpile modern JavaScript while maintaining compatibility with AngularJS applications. Includes practical examples and migration strategies.',
                author: 'Bob Johnson',
                date: '2025-03-10',
                image: 'https://picsum.photos/800/400?random=3'
            },
            {
                id: 4,
                title: 'Component-Based Architecture in AngularJS',
                content: 'Moving from controllers and templates to component-based architecture is crucial for maintainable AngularJS apps. This guide covers component lifecycle hooks, data binding strategies, and how to structure your application using nested components for better reusability and testability.',
                author: 'Alice Williams',
                date: '2025-04-05',
                image: 'https://picsum.photos/800/400?random=4'
            },
            {
                id: 5,
                title: 'State Management in AngularJS Applications',
                content: 'Proper state management is essential for complex applications. This article explores different approaches to managing state in AngularJS, from simple service-based solutions to more sophisticated patterns inspired by Redux and MobX. Includes real-world examples and performance considerations.',
                author: 'Charlie Brown',
                date: '2025-05-12',
                image: 'https://picsum.photos/800/400?random=5'
            }
        ];
    }

    getAll() {
        return angular.copy(this.articles);
    }

    getById(id) {
        return angular.copy(this.articles.find(a => a.id === parseInt(id)));
    }
}


export default ArticleService;