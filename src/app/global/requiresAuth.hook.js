/**
 * TODO: upgrade this to permission check : not only auth but can be anything such as user role, user credit score, etc....
 * This run block registers a Transition Hook which protects routes that requires permission check .
 * There is 2 parts: checking ( simple or complex function) and result/action ( do nothing or enforce something like login or alert )
 * Checking criteria can be simplified to "auth", "common client rules using user client data ", "service side check"
 *
 * This hook redirects to /login when both:
 * - The user is not authenticated
 * - The user is navigating to a state that requires authentication
 */
export function authHookRunBlock($transitions, AuthService) {
    console.debug('!! declaring auth hook !!');
    // Matches if the destination state's data property has a truthy 'requiresAuth' property
    let requiresAuthCriteria = {
        to: (state) => {
            console.debug("!! checking authentication for state ", state.name);
            return state.permissionCheck && state.data.requiresAuth;
        }
    };

    // Function that returns a redirect for the current transition to the login state
    // if the user is not currently authenticated (according to the AuthService)

    let redirectToLogin = (transition) => {
        let $state = transition.router.stateService;
        console.debug('permission result ');
        let AuthService = transition.injector().get('AuthService');

        if (!AuthService.isAuthenticated()) {
            return $state.target('login', undefined, {location: false});
        }
    };

    // Register the "permissionCheck" hook with the TransitionsService
    $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority: 10});
}

authHookRunBlock.$inject = ['$transitions', 'AuthService'];