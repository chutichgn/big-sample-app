import htmlTpl from "./login.modal.html"
import loginFormHtml from "./login.form.html";

class LoginModalController {

    constructor($scope, $rootScope, $state, $bs5Modal) {
        this.$rootScope = $rootScope;
        this.bs5Modal = $bs5Modal;

        console.log("register on event");
        // $rootScope.$on('loginModalEvt', function(event, data) {
        //     console.log('Global event received:', data);
        //     this.openModal(data);
        // });

        // Listen for event
        this.unsubscribe = $rootScope.$on('loginModalEvt', (event, data) => {
            console.log(11111111111111)
            this.openModal(data);
        });

        // Clean up
        $scope.$on('$destroy', () => {
            this.unsubscribe();
        });
        this.currentState = $state.current.name;
        console.log(this.currentState)

    }

    openModal(data) {
        console.log(23334444444)
        let bs5Modal = this.bs5Modal({
            template: htmlTpl,
            controller: function() {
                this.close = function(data) {
                    bs5Modal.close(data);
                };
            },
            controllerAs: '$ctrl',
            // Pass any data here if needed
        });

        bs5Modal.result.then(result => {
            console.log('Modal closed with:', result);
        }).catch(reason => {
            console.log('Modal dismissed:', reason);
        });
        // let bs5Modal = this.bs5Modal({
        //     template: htmlTpl,
        //     controller: function() {
        //         this.close = function() {
        //             bs5Modal.hide();
        //         };
        //     },
        //     controllerAs: '$ctrl',
        //     // Pass any data here if needed
        // }).then(result => {
        //     console.log('Modal closed with:', result);
        // }).catch(reason => {
        //     console.log('Modal dismissed:', reason);
        // });
    }
}

LoginModalController.$inject = ['$scope', '$rootScope', '$state','$bs5Modal'];

export const loginModal = {
    controller: LoginModalController,
};
