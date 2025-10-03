import template from './user-detail.html';
import './user-detail.css';

class UserDetailController {

    constructor($stateParams, UserService, OffcanvasService, $state) {
        this.$stateParams = $stateParams;
        this.UserService = UserService;
        this.OffcanvasService = OffcanvasService;
        this.$state = $state;
        this.user = null;
        this.isStateMode = false;
    }


    $onInit() {
        // Check if we're in state mode (has stateParams.id) or offcanvas mode (has binding userId)
        this.isStateMode = !!this.$stateParams.id;
        console.log('is state mode ', this.isStateMode);

        if (this.isStateMode) {
            this.OffcanvasService.show('userDetailOffcanvas');
        }
        this.loadUser();
    }

    $onChanges(changes) {
        if (changes.userId && !changes.userId.isFirstChange()) {
            this.loadUser();
        }
    }


    loadUser() {
        const id = this.userId || this.$stateParams.id;
        if (id) {
            this.user = this.UserService.getById(id);
        }
    }
    close() {
        this.OffcanvasService.hide('userDetailOffcanvas');
    }
}

export const userDetail = {
    template: template,
    controller: UserDetailController,
    bindings: {
        userId: '<'
    }
}

UserDetailController.$inject = ['$stateParams', 'UserService', 'OffcanvasService', '$state'];

export default UserDetailController;