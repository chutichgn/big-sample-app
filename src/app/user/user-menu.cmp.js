// src/main/user-menu/user-menu.component.js
import template from './user-menu.cmp.html';
import './user-menu.cmp.css';

class UserMenuController {
    constructor(AuthService, $state) {
        this.AuthService = AuthService;
        this.$state = $state;
    }

    logout() {
        this.AuthService.logout();
        this.$state.go('app.home');
    }
}

UserMenuController.$inject = [ 'AuthService', '$state','$rootScope'];


export const userMenu = {
    template,
    controller: UserMenuController
}