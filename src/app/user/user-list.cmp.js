import angular from 'angular';
import template from './user-list.html';
import './user-list.css';

class UserListController {
    constructor(UserService, OffcanvasService) {
        'ngInject';

        console.log('UserListController init !!' );
        this.UserService = UserService;
        this.OffcanvasService = OffcanvasService;
        this.users = [];
    }

    $onInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.users = this.UserService.getAll();
    }

    openEditOffcanvas(userId = null) {
        this.editUserId = userId;
        this.OffcanvasService.show('editUserOffcanvas');
    }
    openDetailOffcanvas(userId) {
        this.selectedUserId = userId;
        this.OffcanvasService.show('userDetailOffcanvas');
    }

    openDeleteOffcanvas(userId) {
        this.selectedUserId = userId;
        this.OffcanvasService.show('deleteUserOffcanvas');
    }

    handleUserDeleted() {
        this.loadUsers();
        this.OffcanvasService.hide('deleteUserOffcanvas');
    }

    handleUserSaved() {
        this.loadUsers();
        this.OffcanvasService.hide('editUserOffcanvas');
    }

    deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            this.UserService.delete(userId);
            this.loadUsers();
        }
    }
}

UserListController.$inject = ['UserService', 'OffcanvasService'];

export const userList = {
    template: template,
    controller: UserListController
}


