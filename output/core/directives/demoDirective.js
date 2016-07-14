(function () {
    angular
        .module("myApp")
        .directive('demoDirective', ['$scope', demoDirective]);
    function demoDirective() {
        return {
            restrict: 'AE'
        };
    }
})();
//# sourceMappingURL=demoDirective.js.map