import genericLayoutTpl from "./genericLayout.html";
/**
 * The controller for the `app` component.
 */
class AuthedController {
    constructor(AppConfig, AuthService, $state, $transitions, LoadingIndicatorService) {
        this.AuthService = AuthService;
        this.$state = $state;

        this.emailAddress = AppConfig.emailAddress;
        this.isAuthenticated = AuthService.isAuthenticated();
    }

    logout() {
        let {AuthService, $state} = this;
        AuthService.logout();
        // Reload states after authentication change
        return $state.go('welcome', {}, {reload: true});
    }

    isActive(glob) {
        return this.$state.includes(glob);
    }
}

AuthedController.$inject = ['AppConfig', 'AuthService', '$state', '$transitions', 'LoadingIndicatorService'];

/**
 * This is the main app component for an authenticated user.
 *
 * This component renders the outermost chrome (application header and tabs, the compose  and logout button)
 * It has a `ui-view` viewport for nested states to fill in.
 */
export const genericLayoutCmp = {
    controller: AuthedController,
    template:  genericLayoutTpl
}
