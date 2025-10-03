/**
 * This file imports the third party library dependencies, then creates the angular module "demo"
 * and exports it.
 */
// External dependencies
import * as angular from "angular";
import uiRouter from "@uirouter/angularjs";
import jwt from "angular-jwt";
import {StickyStatesPlugin} from '@uirouter/sticky-states';
import {DSRPlugin} from '@uirouter/dsr';
import ocLazyLoad from "oclazyload";
import angularBreadcrumb from 'angular-breadcrumb';
import ngBootstrap5 from "../util/angular-bootstrap-5";  //  import from downloaded file since no npm available
import breadcrumbTpl from "./breadcrumb.template.html";

import {MAIN_MODULE} from '../main/main.module';
import {GLOBAL_MODULE} from '../global/global.module';
// Import Offcanvas components
import '../util/offcanvas.directive';
import '../util/offcanvas.service';
import {USERS_MODULE} from "../user/users.module";


// Create the angular module "demo".
//
// Since it is exported, other parts of the application (in other files) can then import it and register things.
// In bootstrap.js, the module is imported, and the components, services, and states are registered.
export const ngmodule = angular.module("demo", [
    uiRouter,
    'ncy-angular-breadcrumb',
    'angular-jwt',
    'ngBootstrap5', //  import from downloaded file since no npm available
    'offcanvas',
    ocLazyLoad,
    MAIN_MODULE.name,
    GLOBAL_MODULE.name,
    USERS_MODULE.name,

    // These modules are lazy loaded via future states in app.states.js
    // CONTACTS_MODULE.name
    // MYMESSAGES_MODULE.name
    // PREFS_MODULE.name
]);

ngmodule.config(['$uiRouterProvider', '$locationProvider', '$breadcrumbProvider', ($uiRouter, $locationProvider, $breadcrumbProvider) => {
    $locationProvider.hashPrefix('');
    $uiRouter.plugin(StickyStatesPlugin);
    $uiRouter.plugin(DSRPlugin);
    // $breadcrumbProvider.setOptions({
    //     template: '<li class="breadcrumb-item"><a href="javascript:void(0);" ng-href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a></li>',
    //     templateLast: '<li class="breadcrumb-item active" aria-current="page">{{step.ncyBreadcrumbLabel}}</li>',
    // });
    $breadcrumbProvider.setOptions({
        template: breadcrumbTpl
    });

    // Show the UI-Router Visualizer
    // import("@uirouter/visualizer").then(module => $uiRouter.plugin(module.Visualizer));
}]);
