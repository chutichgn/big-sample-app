/**
 * This service emulates an Authentication Service.
 */
export class NavService {
    constructor($http) {
        this.$http = $http;
        this.navItems = [];
    }

    /**
     * Returns Items for nav bottom bar
     */

    getNavItems() {
        if (this.navItems.length) {
            return Promise.resolve(this.navItems); // Return cached items
        }
        return this.$http.get('data/nav-items.json').then(response => {
            this.navItems = response.data;
            return this.navItems;
        });
    }
}

NavService.$inject = ['$http'];
