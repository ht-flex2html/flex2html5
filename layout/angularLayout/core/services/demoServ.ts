module app.services{
    export class demoServ implements IService {
        constructor($http, $q) {
            var displayArray = [
                { id: 0, name: "Pit", sex: "M", remark: "PT" },
                { id: 1, name: "Gary", sex: "M", remark: "GY" },
                { id: 2, name: "Lily", sex: "F", remark: "LY" },
                { id: 3, name: "Gaga", sex: "F", remark: "GG" },
                { id: 4, name: "Jim", sex: "M", remark: "J" },
                { id: 5, name: "Jack", sex: "M", remark: "JA" },
                { id: 6, name: "Tom", sex: "M", remark: "T" },
                { id: 7, name: "Walk", sex: "M", remark: "W" },
                { id: 8, name: "Earl", sex: "F", remark: "E" },
                { id: 9, name: "Kit", sex: "F", remark: "K" }
            ];
            var getData = function () {
                return displayArray;
            }
            return {
                getData:getData
            }
        }
    }
    app.registerService("demoServ",["$http", "$q"]);
}