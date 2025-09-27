import template from './topNav.cmp.html';
import './topNav.cmp.css';

/**
 * The controller for the `login` component
 *
 * The `login` method validates the credentials.
 * Then it sends the user back to the `returnTo` state, which is provided as a resolve data.
 */
class TopNavController {
    constructor($state, $scope, $rootScope,$transitions) {
        // this.$rootScope = $rootScope;
        this.title =  $rootScope.pageTitle || ''; // Initial sync with $rootScope.pageTitle
        this.isModalOpen = false;
        this.$scope = $scope;

        // Listen for state change
        // Watch $rootScope.pageTitle for changes
        // $scope.$watch(
        //     () => $rootScope.pageTitle,
        //     (newValue) => {
        //         this.title = newValue || ''; // Sync appName with $rootScope.pageTitle
        //     }
        // );

        // Listen for setTitle event
        $rootScope.$on('setTitle', (event, newTitle) => {
            this.title = newTitle || '';
        });

        // Reset title at the start of every state transition
        $transitions.onStart({}, () => {
            this.title = ''; // Reset to blank
        });

        // Reset $rootScope.pageTitle on state exit
        $transitions.onExit({}, () => {
            console.log('!!!!!!!!! exutiung ',this.title)
            this.title = $rootScope.pageTitle = ''; // Reset to blank

        });


    }

    toggleModal() {
        this.isModalOpen = !this.isModalOpen;
        this.$scope.$apply();
    }
}

TopNavController.$inject = ['$state', '$scope', '$rootScope','$transitions'];
/**
 * This component renders a faux authentication UI
 *
 * It prompts for the username/password (and gives hints with bouncy arrows)
 * It shows errors if the authentication failed for any reason.
 */
export const topNav = {

    controller: TopNavController,

    template: template
};
