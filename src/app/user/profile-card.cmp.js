import htmlTps from "./profile-card.cmp.html";
import template from "../main/login.form.html";

// /client/src/user-profile-offcanvas.service.js
class UserProfileOffcanvas {
    constructor($http, $compile, $rootScope, $document) {
        'ngInject';
        this.$http = $http;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        this.$document = $document;
    }

    open(userId) {
        return this.$http.get(`/api/users/${userId}`)
            .then(res => {
                const user = res.data;
                const scope = this.$rootScope.$new(true);
                scope.user = user;

                const template = htmlTps;

                scope.close = () => {
                    element.remove();
                    backdrop.remove();
                    scope.$destroy();
                };

                const element = this.$compile(template)(scope);
                const backdrop = angular.element(element[1]); // the backdrop div
                this.$document.find('body').append(element);
            });
    }
}

UserProfileOffcanvas.$inject = ['AppConfig', 'AuthService', '$state', '$rootScope'];


angular.module('app')
    .service('UserProfileOffcanvas', UserProfileOffcanvas);
