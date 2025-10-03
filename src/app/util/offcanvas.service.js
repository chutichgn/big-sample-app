import angular from 'angular';

class OffcanvasService {
    constructor() {
        this.offcanvases = new Map();
    }

    register(id, controller) {
        this.offcanvases.set(id, controller);
    }

    unregister(id) {
        this.offcanvases.delete(id);
    }

    show(id) {
        const offcanvas = this.offcanvases.get(id);
        if (offcanvas) {
            offcanvas.show();
        }
    }

    hide(id) {
        const offcanvas = this.offcanvases.get(id);
        if (offcanvas) {
            offcanvas.hide();
        }
    }

    toggle(id) {
        const offcanvas = this.offcanvases.get(id);
        if (offcanvas) {
            offcanvas.toggle();
        }
    }
}

angular.module('offcanvas').service('OffcanvasService', OffcanvasService);

export default OffcanvasService;