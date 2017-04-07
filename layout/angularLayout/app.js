/// <reference path="javascript/angular.d.ts" />
/// <reference path="javascript/angular-ui-router.d.ts" />
'use strict';
// Create and register modules
var modules = ['app.controllers', 'app.directives', 'app.filters', 'app.services'];
modules.forEach(function (module) { return angular.module(module, []); });
// *** Push uiRouter or $urlRouterProvider won't work ***
modules.push("ui.router");
angular.module('app', modules);
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        null;
    })(controllers = app.controllers || (app.controllers = {}));
    var directives;
    (function (directives) {
        null;
    })(directives = app.directives || (app.directives = {}));
    var filters;
    (function (filters) {
        null;
    })(filters = app.filters || (app.filters = {}));
    var services;
    (function (services) {
        null;
    })(services = app.services || (app.services = {}));
    /**
     * Register new controller.
     *
     * @param className
     * @param services
     */
    function registerController(className, services) {
        if (services === void 0) { services = []; }
        var controller = 'app.controllers.' + className;
        services.push(app.controllers[className]);
        angular.module('app.controllers').controller(controller, services);
    }
    app.registerController = registerController;
    /**
     * Register new filter.
     *
     * @param className
     * @param services
     */
    function registerFilter(className, services) {
        if (services === void 0) { services = []; }
        var filter = className.toLowerCase();
        services.push(function () { return (new app.filters[className]()).filter; });
        angular.module('app.filters').filter(filter, services);
    }
    app.registerFilter = registerFilter;
    /**
     * Register new directive.
     *
     * @param className
     * @param services
     */
    function registerDirective(className, services) {
        if (services === void 0) { services = []; }
        var directive = className[0].toLowerCase() + className.slice(1);
        services.push(function () { return new app.directives[className](); });
        angular.module('app.directives').directive(directive, services);
    }
    app.registerDirective = registerDirective;
    /**
     * Register new service.
     *
     * @param className
     * @param services
     */
    function registerService(className, services) {
        if (services === void 0) { services = []; }
        var service = className[0].toLowerCase() + className.slice(1);
        services.push(function () { return new app.services[className](); });
        angular.module('app.services').factory(service, services);
    }
    app.registerService = registerService;
})(app || (app = {}));
// Url routing
angular.module('app').config(['$stateProvider', '$urlRouterProvider',
    function routes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise("/main");
        $stateProvider;
    }]);
//# sourceMappingURL=app.js.map