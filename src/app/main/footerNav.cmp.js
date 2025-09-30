import './footerNav.cmp.css'; // Imports and bundles the CSS
import template from './footerNav.cmp.html';
/**
 * The controller for the `login` component
 *
 * The `login` method validates the credentials.
 * Then it sends the user back to the `returnTo` state, which is provided as a resolve data.
 */
class FooterNavController {
    constructor($scope, NavService) {
        this.isOffcanvasOpen = false;
        this.$scope = $scope;
        this.NavService = NavService;
        this.navItems = [];

    }

    toggleOffcanvas() {
        this.isOffcanvasOpen = !this.isOffcanvasOpen;
        // this.$scope.$apply();
    }

    $onInit() {
        this.NavService.getNavItems().then(items => {
            this.navItems = items;
        });
    }
}

FooterNavController.$inject = ['$scope','NavService'];
/**

 */
export const footerNav = {
    bindings: {returnTo: '<'},

    controller: FooterNavController,

    template: template
};
