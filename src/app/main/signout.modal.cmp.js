import htmlTpl from "./signout.modal.cmp.html"
// /client/src/logout-modal.component.js
class SignoutModalController {
    constructor($interval,$scope) {
        'ngInject';
        this.$interval = $interval;
        this.countdown = 5;
        this.scope= $scope;
    }

    $onInit() {
        this.timer = this.$interval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
                this.$interval.cancel(this.timer);
                this.scope.close();
            }
        }, 1000);
    }

    $onDestroy() {
        if (this.timer) this.$interval.cancel(this.timer);
    }
}

SignoutModalController.$inject = ['$interval','$scope'];

export const signoutModal = {
    controller: SignoutModalController,
    template: htmlTpl,

};

