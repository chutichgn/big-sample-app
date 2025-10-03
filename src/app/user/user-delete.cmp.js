import template from './user-delete.html';
class UserDeleteController {
    constructor($stateParams, UserService, OffcanvasService, $state) {
        this.$stateParams = $stateParams;
        this.UserService = UserService;
        this.OffcanvasService = OffcanvasService;
        this.$state = $state;
        this.user = null;
        this.isStateMode = false;
    }

    $onInit() {
        this.isStateMode = !!this.$stateParams.id;

        if (this.isStateMode) {
            this.OffcanvasService.show('deleteUserOffcanvas');
        }

        this.loadUser();
    }

    loadUser() {
        const id = this.userId || this.$stateParams.id;
        if (id) {
            this.user = this.UserService.getById(id);
        }
    }

    confirmDelete() {
        const id = this.userId || this.$stateParams.id;
        if (id) {
            this.UserService.delete(id);
            this.close();

            // If opened via state, navigate back and reload
            if (this.isStateMode) {
                this.$state.go('users.list', {}, {reload: true});
            } else if (this.onDelete) {
                this.onDelete();
            }
        }
    }

    close() {
        this.OffcanvasService.hide('deleteUserOffcanvas');

        if (this.isStateMode) {
            this.$state.go('users.list');
        }
    }
}


UserDeleteController.$inject = ['$stateParams', 'UserService', 'OffcanvasService', '$state'];

export const userDelete = {
    template: template,
    controller: UserDeleteController,
    bindings: {
        userId: '<',
        onDelete: '&'
    }
};