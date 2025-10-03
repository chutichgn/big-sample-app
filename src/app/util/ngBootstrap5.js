/**
 * @ngdoc service
 * @name ngBootstrap5.$bs5Offcanvas
 * @description
 * Service to open an offcanvas sidebar programmatically
 *
 * @param {Object} options Configuration object
 * @param {string} options.templateUrl - URL to the offcanvas content template (required if template not provided)
 * @param {string} options.template - Inline template string (required if templateUrl not provided)
 * @param {string|Function|Array} options.controller - Controller for the offcanvas instance
 * @param {string} options.controllerAs - Alias for controller
 * @param {string} options.placement - Placement of offcanvas: 'start', 'end', 'top', 'bottom' (default: 'start')
 * @param {boolean} options.backdrop - Show backdrop (default: true)
 * @param {boolean} options.keyboard - Close on ESC key (default: true)
 * @param {boolean} options.scroll - Allow body scrolling (default: false)
 * @param {string} options.container - Selector for container element (default: 'body')
 *
 * @returns {Object} Object with result promise, show(), hide(), and toggle() methods
 */

(function() {
    'use strict';

    angular.module('ngBootstrap5')
        .service('$bs5Offcanvas', ['$rootScope', '$compile', '$controller', '$http', '$templateCache', '$q', '$document', '$timeout',
            function($rootScope, $compile, $controller, $http, $templateCache, $q, $document, $timeout) {

                const service = this;
                let activeOffcanvas = null;

                /**
                 * Open an offcanvas
                 */
                service.open = function(options) {
                    if (!options) {
                        throw new Error('Offcanvas options are required');
                    }

                    if (!options.template && !options.templateUrl) {
                        throw new Error('Either template or templateUrl must be provided');
                    }

                    const defaults = {
                        placement: 'start',
                        backdrop: true,
                        keyboard: true,
                        scroll: false,
                        container: 'body'
                    };

                    const config = angular.extend({}, defaults, options);
                    const deferred = $q.defer();
                    const offcanvasScope = $rootScope.$new();

                    let offcanvasElement;
                    let backdropElement;
                    let isShown = false;

                    // Close function for the scope
                    offcanvasScope.close = function(data) {
                        hide().then(() => {
                            deferred.resolve(data);
                            cleanup();
                        });
                    };

                    // Dismiss function for the scope
                    offcanvasScope.dismiss = function(reason) {
                        hide().then(() => {
                            deferred.reject(reason);
                            cleanup();
                        });
                    };

                    // Pass input data to scope via resolve
                    if (config.resolve) {
                        angular.forEach(config.resolve, (value, key) => {
                            offcanvasScope[key] = angular.isFunction(value) ? value() : value;
                        });
                    }

                    // Load template
                    const templatePromise = config.template
                        ? $q.resolve(config.template)
                        : getTemplate(config.templateUrl);

                    templatePromise.then(template => {
                        // Create offcanvas element
                        const offcanvasHtml = `
              <div class="offcanvas offcanvas-${config.placement}" 
                   tabindex="-1" 
                   role="dialog"
                   aria-modal="true">
                ${template}
              </div>
            `;

                        offcanvasElement = angular.element(offcanvasHtml);

                        // Initialize controller if provided
                        if (config.controller) {
                            const locals = {
                                $scope: offcanvasScope,
                                close: offcanvasScope.close,
                                dismiss: offcanvasScope.dismiss
                            };

                            // Add resolved values as injectables
                            if (config.resolve) {
                                angular.forEach(config.resolve, (value, key) => {
                                    locals[key] = angular.isFunction(value) ? value() : value;
                                });
                            }

                            const controllerInstance = $controller(config.controller, locals);

                            if (config.controllerAs) {
                                offcanvasScope[config.controllerAs] = controllerInstance;
                            }
                        }

                        // Compile and append
                        $compile(offcanvasElement)(offcanvasScope);
                        const container = angular.element($document[0].querySelector(config.container));
                        container.append(offcanvasElement);

                        // Setup backdrop
                        if (config.backdrop) {
                            backdropElement = angular.element('<div class="offcanvas-backdrop fade"></div>');
                            container.append(backdropElement);

                            // Click backdrop to close
                            backdropElement.on('click', () => {
                                if (config.backdrop !== 'static') {
                                    offcanvasScope.$apply(() => {
                                        offcanvasScope.dismiss('backdrop-click');
                                    });
                                }
                            });
                        }

                        // Handle ESC key
                        if (config.keyboard) {
                            const escapeHandler = (e) => {
                                if (e.key === 'Escape' || e.keyCode === 27) {
                                    offcanvasScope.$apply(() => {
                                        offcanvasScope.dismiss('escape');
                                    });
                                }
                            };
                            $document.on('keydown', escapeHandler);

                            offcanvasScope.$on('$destroy', () => {
                                $document.off('keydown', escapeHandler);
                            });
                        }

                        // Body scroll handling
                        if (!config.scroll) {
                            $document.find('body').addClass('offcanvas-open');
                        }

                        // Show offcanvas
                        $timeout(() => {
                            show();
                        }, 50);

                    }).catch(error => {
                        deferred.reject(error);
                    });

                    function show() {
                        if (isShown) return $q.resolve();

                        isShown = true;

                        // Trigger show event
                        offcanvasScope.$emit('offcanvas.show');

                        // Add show class
                        if (backdropElement) {
                            backdropElement.addClass('show');
                        }
                        offcanvasElement.addClass('show');

                        // Wait for transition
                        return $timeout(() => {
                            offcanvasScope.$emit('offcanvas.shown');
                        }, 300);
                    }

                    function hide() {
                        if (!isShown) return $q.resolve();

                        isShown = false;

                        // Trigger hide event
                        offcanvasScope.$emit('offcanvas.hide');

                        // Remove show class
                        offcanvasElement.removeClass('show');
                        if (backdropElement) {
                            backdropElement.removeClass('show');
                        }

                        // Wait for transition
                        return $timeout(() => {
                            offcanvasScope.$emit('offcanvas.hidden');
                        }, 300);
                    }

                    function toggle() {
                        return isShown ? hide() : show();
                    }

                    function cleanup() {
                        if (offcanvasElement) {
                            offcanvasElement.remove();
                        }
                        if (backdropElement) {
                            backdropElement.off('click');
                            backdropElement.remove();
                        }
                        if (!config.scroll) {
                            $document.find('body').removeClass('offcanvas-open');
                        }
                        offcanvasScope.$destroy();
                        activeOffcanvas = null;
                    }

                    function getTemplate(templateUrl) {
                        return $http.get(templateUrl, { cache: $templateCache })
                            .then(response => response.data);
                    }

                    activeOffcanvas = {
                        result: deferred.promise,
                        show,
                        hide,
                        toggle,
                        close: offcanvasScope.close,
                        dismiss: offcanvasScope.dismiss
                    };

                    return activeOffcanvas;
                };

                return service;
            }
        ]);

    /**
     * @ngdoc directive
     * @name ngBootstrap5.directive:bs5Offcanvas
     * @restrict A
     * @description
     * Directive to trigger offcanvas using data attributes
     *
     * @param {string} bs5-offcanvas - Target selector for the offcanvas element
     * @param {string} placement - Placement: 'start', 'end', 'top', 'bottom'
     * @param {boolean} backdrop - Show backdrop (default: true)
     * @param {boolean} scroll - Allow body scroll (default: false)
     *
     * @example
     * <button bs5-offcanvas="#myOffcanvas" placement="start">Open Offcanvas</button>
     * <div id="myOffcanvas" class="offcanvas offcanvas-start">
     *   <div class="offcanvas-header">
     *     <h5 class="offcanvas-title">Title</h5>
     *     <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
     *   </div>
     *   <div class="offcanvas-body">Content</div>
     * </div>
     */
    angular.module('ngBootstrap5')
        .directive('bs5Offcanvas', ['$document', '$timeout', function($document, $timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    let targetElement;
                    let backdropElement;
                    let isShown = false;

                    const config = {
                        backdrop: attrs.backdrop !== 'false',
                        scroll: attrs.scroll === 'true',
                        keyboard: attrs.keyboard !== 'false'
                    };

                    element.on('click', function(e) {
                        e.preventDefault();
                        toggle();
                    });

                    function toggle() {
                        if (!targetElement) {
                            targetElement = angular.element($document[0].querySelector(attrs.bs5Offcanvas));
                            if (!targetElement.length) {
                                console.error('Offcanvas target not found:', attrs.bs5Offcanvas);
                                return;
                            }
                        }

                        if (isShown) {
                            hide();
                        } else {
                            show();
                        }
                    }

                    function show() {
                        if (isShown) return;

                        isShown = true;

                        // Create backdrop
                        if (config.backdrop) {
                            backdropElement = angular.element('<div class="offcanvas-backdrop fade"></div>');
                            angular.element($document[0].body).append(backdropElement);

                            backdropElement.on('click', () => {
                                if (config.backdrop !== 'static') {
                                    hide();
                                }
                            });

                            $timeout(() => {
                                backdropElement.addClass('show');
                            }, 10);
                        }

                        // Handle body scroll
                        if (!config.scroll) {
                            angular.element($document[0].body).addClass('offcanvas-open');
                        }

                        // Show offcanvas
                        $timeout(() => {
                            targetElement.addClass('show');
                            scope.$emit('offcanvas.shown', { target: targetElement[0] });
                        }, 10);

                        // Handle ESC key
                        if (config.keyboard) {
                            $document.on('keydown.offcanvas', (e) => {
                                if (e.key === 'Escape' || e.keyCode === 27) {
                                    hide();
                                }
                            });
                        }

                        // Setup dismiss buttons
                        setupDismissButtons();
                    }

                    function hide() {
                        if (!isShown) return;

                        isShown = false;

                        // Hide offcanvas
                        targetElement.removeClass('show');

                        // Hide backdrop
                        if (backdropElement) {
                            backdropElement.removeClass('show');
                            $timeout(() => {
                                backdropElement.off('click');
                                backdropElement.remove();
                                backdropElement = null;
                            }, 300);
                        }

                        // Restore body scroll
                        if (!config.scroll) {
                            angular.element($document[0].body).removeClass('offcanvas-open');
                        }

                        // Remove ESC handler
                        $document.off('keydown.offcanvas');

                        scope.$emit('offcanvas.hidden', { target: targetElement[0] });
                    }

                    function setupDismissButtons() {
                        const dismissButtons = targetElement[0].querySelectorAll('[data-bs-dismiss="offcanvas"]');
                        dismissButtons.forEach(btn => {
                            angular.element(btn).on('click', () => {
                                hide();
                            });
                        });
                    }

                    scope.$on('$destroy', () => {
                        element.off('click');
                        if (backdropElement) {
                            backdropElement.off('click');
                            backdropElement.remove();
                        }
                        $document.off('keydown.offcanvas');
                    });
                }
            };
        }]);

})();