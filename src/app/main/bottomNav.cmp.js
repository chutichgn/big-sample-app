import './bottomNav.cmp.css'; // Imports and bundles the CSS
import template from './bottomNav.cmp.html';
/**
 * The controller for the `login` component
 *
 * The `login` method validates the credentials.
 * Then it sends the user back to the `returnTo` state, which is provided as a resolve data.
 */
class BottomNavCtrl {
    constructor($scope, $state) {
        this.isOffcanvasOpen = false;
        this.$scope = $scope;
    }

    toggleOffcanvas() {
        this.isOffcanvasOpen = !this.isOffcanvasOpen;
        this.$scope.$apply();
    }
}

BottomNavCtrl.$inject = ['$scope','$state'];
/**

 */
export const bottomNav = {
    bindings: {returnTo: '<'},

    controller: BottomNavCtrl,

    template: template
};
