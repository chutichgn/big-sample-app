import htmlTpl from "./signout.modal.cmp.html"
import {signoutModal} from "./signout.modal.cmp";
// /client/src/logout-modal.component.js
class SignoutController {
    constructor($bs5Modal, $state, AuthService) {
        this.$bs5Modal = $bs5Modal;
        this.$state = $state;
        this.AuthService = AuthService;
    }


    $onInit() {
        console.log('!! entering  SignoutController')
        const user = this.AuthService.getProfile();
        const modal = this.$bs5Modal(signoutModal);

        modal.result.finally(() => {
            this.$state.go('home');
        });
    }
}

SignoutController.$inject = ['$bs5Modal', '$state', 'AuthService'];

export const signout = {
    controller: SignoutController,
};

