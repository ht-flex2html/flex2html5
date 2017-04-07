var fs = require("fs");
var tools = require("./tool");
var copyDir = require("./CopyDir");
var as_to_ts = require("./as_to_ts");
var path = require('path');
var rimraf = require('rimraf');

var isAngular = true;


function start(response, request, pathname) {
    fs.readFile("index.html", function (error, data) {
        //fs.readFile("demo.html",function(error, data) {
        if (error) {
            console.log(error);
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data);
            response.end();
        }
    })
}

function init(response, request, pathname) {
    fs.readFile(pathname.substring(1), function (error, data) {
        if (error) {
            console.log(error);
        } else {
            response.writeHead(200, { "Content-Type": tools.getContentType(pathname) });
            response.write(data);
            response.end();
        }
    })
}

function upload(response, request, pathname) {

    var responseData = { sourceDir: "", outputDir: "" };
    var postDataChunk;
    var exchangeSource = {};
    var asAcountResult = {};

    request.on("data", function (data) {
        var data = JSON.parse(data);
        var sourceDir = data.sourceDir;
        var rootDir = path.resolve(process.cwd(), "output");

        //生成目录操作和翻译操作
        if (data.operation === "MK_DIR") {
            //生成output文件夹
            clear_mk_dir(rootDir);
            if (isAngular) {
                //生成angular项目框架
                mkDir(path.resolve(process.cwd(), "layout/angularLayout"), rootDir, true);
            } else {
                mkDir(sourceDir, rootDir, false);
                clear_mk_dir(rootDir + "/js_output");
                createTsConfig(rootDir);
            }
            console.log("目录生成完毕");
        } else if (data.operation === "PARSE_MXML" || data.operation === "PARSE_AS") {
            if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
                throw new Error('invalid source dir');
            }

            asAcountResult = as_to_ts.run(sourceDir, rootDir, data.operation);

            if (isAngular && data.operation === "PARSE_MXML") {
                var files = fs.readdirSync(rootDir + '/views');
                var configString = fs.readFileSync(path.resolve(process.cwd(), "layout/angularlayout/app.ts"), "utf-8");
                var ctrString = fs.readFileSync(path.resolve(process.cwd(), "layout/angularlayout/core/controllers/mainController.ts"), "utf-8");
                files.forEach(function (file) {
                    var fileName = file.replace(".html", "");

                    configString += '\r\n\t\t.state("' + fileName + '", {'
                        + '\r\n\t\t\turl: "/' + fileName + '",'
                        + '\r\n\t\t\ttemplateUrl: "views/' + file + '",'
                        + '\r\n\t\t\tnresolve: {},'
                        + '\r\n\t\t\tcontroller:"' + fileName + 'Controller"'
                        + '\r\n\t\t})';

                    ctrString += '\r\n\texport class ' + fileName + 'Controller implements IController'
                        + '\r\n\t{'
                        + '\r\n\t\t      constructor($scope)'
                        + '\r\n\t\t      {'
                        + '\r\n\t\t\t          $scope.name="HelloWorld";'
                        + '\r\n\t\t     }'
                        + '\r\n\t  }'
                        + '\r\n\tapp.registerController("' + fileName + 'Controller",["$scope"]);'

                });
                configString += "\r\n\t}\r\n]);";
                ctrString += "\r\n}";

                fs.createFileSync(path.resolve(rootDir, "app.ts"), configString);

                fs.createFileSync(path.resolve(rootDir, "core/controllers/mainController.ts"), ctrString);
            }

            if (data.operation === "PARSE_AS") {
                as_to_ts.run("output/js_output", "output/js_output", "PARSE_AS");
            }

            responseData.anlyiseNum = {
                classNum: asAcountResult.classNum,
                interfaceNum: asAcountResult.interfaceNum,
                functionNum: asAcountResult.functionNum
            };

            responseData.directory = copyDir.copyDir(rootDir);
        }

        //输出方法，类，接口的统计结果
        response.writeHead(200, { "Content-Type": "applicaton/json" });
        response.write(JSON.stringify(responseData));
        response.end();

    });
    request.on("end", function (data) {
        response.end();
    });
}

function mkDir(sourcePath, rootDir, isCopy) {
    var dirList = fs.readdirSync(sourcePath);
    dirList.forEach(function (file) {
        if (fs.statSync(sourcePath + '\\' + file).isDirectory()) {
            var mkDirName = rootDir + '\\' + file;
            clear_mk_dir(mkDirName);
            mkDir(sourcePath + "\\" + file, mkDirName, isCopy);
        }
        if (isCopy) {
            if (fs.statSync(sourcePath + '\\' + file).isFile()) {
                var content = fs.readFileSync(sourcePath + '\\' + file, "utf-8");
                var mkDirName = rootDir + '\\' + file;
                mk_file(mkDirName, content);
            }
        }
    });

}

function clear_mk_dir(pathDir) {
    if (fs.existsSync(pathDir)) {
        if (!fs.statSync(pathDir).isDirectory()) {
            throw new Error('invalid ouput dir');
        }
        rimraf.sync(pathDir);
    }
    fs.mkdirSync(pathDir);
}


function mk_file(pathFile, content) {
    fs.createFileSync(pathFile, content);
}

function createTsConfig(rootPath) {
    var taskContent = fs.readFileSync('.vscode/tasks.json', 'utf-8');
    fs.createFileSync(path.resolve(rootPath + "/.setting/tasks.json"), taskContent);

    var configContent = fs.readFileSync('tsconfig.json', 'utf-8');
    fs.createFileSync(path.resolve(rootPath + "/tsconfig.json"), taskContent);
}

exports.start = start;
exports.upload = upload;
exports.init = init;