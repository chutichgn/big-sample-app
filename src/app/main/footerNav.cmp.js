import './footerNav.cmp.css'; // Imports and bundles the CSS
import template from './footerNav.cmp.html';
/**
 * The controller for the `login` component
 *
 * The `login` method validates the credentials.
 * Then it sends the user back to the `returnTo` state, which is provided as a resolve data.
 */
class FooterNavController {
    constructor($scope, $state) {
        this.isOffcanvasOpen = false;
        this.$scope = $scope;
    }

    toggleOffcanvas() {
        this.isOffcanvasOpen = !this.isOffcanvasOpen;
        this.$scope.$apply();
    }
}

FooterNavController.$inject = ['$scope','$state'];
/**

 */
export const footerNav = {
    bindings: {returnTo: '<'},

    controller: FooterNavController,

    template: template
};
