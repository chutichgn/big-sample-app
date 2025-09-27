// src/components/breadcrumb/breadcrumb.component.js
import template from './breadcrumb.cmp.html';
import './breadcrumb.cmp.css';

class BreadcrumbController {
    constructor($window, $scope) {
        this.isVisible = true;
        this.$scope = $scope;
        let lastScrollY = $window.scrollY;

        angular.element($window).on('scroll', () => {
            const currentScrollY = $window.scrollY;
            this.isVisible = currentScrollY <= lastScrollY;
            lastScrollY = currentScrollY;
            this.$scope.$apply();
        });
    }
}


BreadcrumbController.$inject = ['$window','$scope'];

export const breadcrumb = {

    controller: BreadcrumbController,

    template: template
};

