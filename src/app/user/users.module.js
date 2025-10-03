import angular from 'angular';
import '@uirouter/angularjs';

// Import routes
import configureRoutes from './users.routes';

// Import services
import './user.service';

// Import components
import './user-list.cmp';
import './user-edit.cmp';
import './user-detail.cmp';
import {userList} from "./user-list.cmp";
import {userDetail} from "./user-detail.cmp";
import {userEdit} from "./user-edit.cmp";
import UserService from "./user.service";
import {userDelete} from "./user-delete.cmp";

export const USERS_MODULE = angular.module('users', ['ui.router']);

USERS_MODULE.config(configureRoutes);
USERS_MODULE.component('userList', userList);
USERS_MODULE.component('userEdit', userEdit);
USERS_MODULE.component('userDetail', userDetail);
USERS_MODULE.component('userDelete', userDelete);
// USERS_MODULE.component('userList', userList);
USERS_MODULE.service('UserService', UserService);