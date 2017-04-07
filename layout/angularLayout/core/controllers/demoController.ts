/// <reference path="../../app.ts" />
/// <reference path="../services/demoServ.ts" />

'use strict';

module app.controllers {

    export class demoController implements IController {
        constructor (private $scope, private demoServ) {
            $scope.message = demoServ.getData();

        }
    }

}

// Remember to pass all the services used by the constructor of the Controller.
app.registerController('demoController', ['$scope', 'demoServ']);