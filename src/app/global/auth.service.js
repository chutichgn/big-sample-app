/**
 * This service emulates an Authentication Service.
 */
export class AuthService {
    constructor(AppConfig, $q, $timeout, $http, $window, jwtHelper) {
        this.AppConfig = AppConfig;
        this.$q = $q;
        this.$timeout = $timeout;
        this.usernames = ['myself@angular.dev', 'devgal@angular.dev', 'devguy@angular.dev','invalid'];
        this.jwtHelper = jwtHelper;
        this.$window = $window;
        this.$http = $http;
    }

    /**
     * Returns true if the user is currently authenticated, else false
     */
    isAuthenticated() {
        const token = this.getToken();
        return token && !this.jwtHelper.isTokenExpired(token);
    }
    // isAuthenticated() {
    //     return !!this.AppConfig.emailAddress;
    // }

    /**
     * Fake authentication function that returns a promise that is either resolved or rejected.
     *
     * Given a username and password, checks that the username matches one of the known
     * usernames (this.usernames), and that the password matches 'password'.
     *
     * Delays 800ms to simulate an async REST API delay.
     */
    authenticate(username, password) {
        let {$timeout, $q, AppConfig} = this;

        // checks if the username is one of the known usernames, and the password is 'password'


        const checkCredentials = this.$http.post('login', { username, password }).then((res) => {
            console.debug(res)
            this.setToken(res.data.token);
            return res.data;
            //
            // AppConfig.emailAddress = authenticatedUser;
            // AppConfig.save()
        });

        return checkCredentials;
        // const checkCredentials = () => $q((resolve, reject) => {
        //     var validUsername = this.usernames.indexOf(username) !== -1;
        //     var validPassword = password === 'password';
        //
        //     return (validUsername && validPassword) ? resolve(username) : reject("Invalid username or password");
        // });

        // return $timeout(checkCredentials, 800)

    }

    /** Logs the current user out */
    logout() {
        this.setToken(null);
        this.AppConfig.emailAddress = undefined;
        this.AppConfig.save();
        return this.$http.post('/logout'); // optional, Express just returns {success:true}
    }

    getToken() {
        return this.$window.localStorage.getItem(this.tokenKey);
    }

    setToken(token) {
        if (token) {
            this.$window.localStorage.setItem(this.tokenKey, token);
        } else {
            this.$window.localStorage.removeItem(this.tokenKey);
        }
    }


    getProfile() {
        const token = this.getToken();
        return token ? this.jwtHelper.decodeToken(token) : null;
    }

    checkSession() {
        return this.$http.get('/check-token')
            .then(res => res.data)
            .catch(() => ({ loggedIn: false }));
    }


}

AuthService.$inject = ['AppConfig', '$q', '$timeout','$http', '$window', 'jwtHelper'];
