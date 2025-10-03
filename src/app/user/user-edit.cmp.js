import angular from 'angular';
import template from './user-edit.html';
import './user-edit.css';
import UserListController from "./user-list.cmp";

class UserEditController {
    constructor(UserService, OffcanvasService) {
        'ngInject';
        this.UserService = UserService;
        this.OffcanvasService = OffcanvasService;
        this.user = {};
        this.isEditMode = false;
    }

    $onInit() {
        this.isEditMode = !!this.userId;
        if (this.isEditMode) {
            this.user = this.UserService.getById(this.userId) || {};
        } else {
            this.user = { name: '', email: '', role: 'User' };
        }
    }

    $onChanges(changes) {
        if (changes.userId && !changes.userId.isFirstChange()) {
            this.$onInit();
        }
    }

    save() {
        if (this.isEditMode) {
            this.UserService.update(this.userId, this.user);
        } else {
            this.UserService.create(this.user);
        }
        this.onSave();
    }

    cancel() {
        this.OffcanvasService.hide('editUserOffcanvas');
    }
}
UserEditController.$inject = ['UserService', 'OffcanvasService'];

export const userEdit = {
    template: template,
    controller: UserEditController,
    bindings: {
        userId: '<',
        onSave: '&'
    }
}


