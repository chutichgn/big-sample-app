import angular from 'angular';


class OffcanvasController {
    constructor($element, $scope, OffcanvasService) {
        'ngInject';
        this.$element = $element;
        this.$scope = $scope;
        this.OffcanvasService = OffcanvasService;
        this.isVisible = false;
        this.backdrop = null;
    }

    $onInit() {
        this.element = this.$element[0];
        this.element.classList.add('offcanvas');
        this.element.setAttribute('tabindex', '-1');

        if (this.placement) {
            this.element.classList.add(`offcanvas-${this.placement}`);
        } else {
            this.element.classList.add('offcanvas-end');
        }

        if (this.offcanvasId) {
            this.element.setAttribute('id', this.offcanvasId);
            this.OffcanvasService.register(this.offcanvasId, this);
        }
    }

    show() {
        if (this.isVisible) return;

        this.isVisible = true;
        this.element.classList.add('show');
        this.element.style.visibility = 'visible';
        document.body.classList.add('offcanvas-open');

        this.showBackdrop();

        if (this.onShow) {
            this.onShow();
        }
    }

    hide() {
        if (!this.isVisible) return;

        this.isVisible = false;
        this.element.classList.remove('show');

        setTimeout(() => {
            this.element.style.visibility = 'hidden';
            document.body.classList.remove('offcanvas-open');
        }, 300);

        this.hideBackdrop();

        if (this.onHide) {
            this.onHide();
        }
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    showBackdrop() {
        this.backdrop = document.createElement('div');
        this.backdrop.className = 'offcanvas-backdrop fade';
        document.body.appendChild(this.backdrop);

        setTimeout(() => {
            this.backdrop.classList.add('show');
        }, 10);

        this.backdrop.addEventListener('click', () => {
            this.hide();
            this.$scope.$apply();
        });
    }

    hideBackdrop() {
        if (this.backdrop) {
            this.backdrop.classList.remove('show');
            setTimeout(() => {
                if (this.backdrop && this.backdrop.parentNode) {
                    this.backdrop.parentNode.removeChild(this.backdrop);
                    this.backdrop = null;
                }
            }, 300);
        }
    }

    $onDestroy() {
        this.hideBackdrop();
        if (this.offcanvasId) {
            this.OffcanvasService.unregister(this.offcanvasId);
        }
    }
}

OffcanvasController.$inject = ['$element', '$scope', 'OffcanvasService'];
const offcanvasModule = angular.module('offcanvas', []);

offcanvasModule.component('offcanvas', {
    transclude: true,
    bindings: {
        offcanvasId: '@',
        placement: '@',
        onShow: '&',
        onHide: '&'
    },
    controller: OffcanvasController,
    template: '<div ng-transclude></div>'
});

export default offcanvasModule.name;