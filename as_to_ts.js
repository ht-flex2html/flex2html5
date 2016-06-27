/*jshint node:true*/
var AS3Parser = require('./parser');
var emitter = require('./emitter');
var path = require('path');
require('fs-extended');
var rimraf = require('rimraf');
var fs = require("fs");
var XMLParser = require("./xmlParser");
var htmlObj = require("./htmlObj");
function flatten(arr) {
    return arr.reduce(function (result, val) {
        if (Array.isArray(val)) {
            result.push.apply(result, flatten(val));
        }
        else {
            result.push(val);
        }
        return result;
    }, []);
}

function readdir(dir, prefix) {
    if (prefix === void 0) { prefix = ''; }
    return flatten(fs.readdirSync(dir).map(function (file) {
        var fileName = path.join(prefix, file);
        var filePath = path.join(dir, file);
        return fs.statSync(filePath).isDirectory() ? readdir(filePath, fileName) : fileName;
    }));
}

function displayHelp() {
    console.log('usage: as3-to-typescript <sourceDir> <outputDir>');
}

function run(sourceDir, outputDir, parseType) {
    var fileReg;
    switch (parseType) {
        case "PARSE_AS":
            fileReg = /.as$/;
            break;
        case "PARSE_MXML":
            fileReg = /.mxml$/;
            break;
    }

    var files = readdir(sourceDir).filter(function (file) { 
        return fileReg.test(file);
    });
    
    var length = files.length;
    var asAccount = {functionNum:0,interfaceNum:0,classNum:0};
    files.forEach(function (file) {
        var parser;
        var content = fs.readFileSync(path.resolve(sourceDir, file), 'UTF-8');
        var world = content;
        var test = world.replace(/\/\*\*[\s\S]*\*\//gm,"").replace(/\/\/(.*)/gm,"");

        asAccount.functionNum += test.match(/function/gm) && test.match(/function/gm).length || 0;
        asAccount.interfaceNum += test.match(/interface/gm) && test.match(/interface/gm).length || 0;
        asAccount.classNum += test.match(/class/gm) && test.match(/class/gm).length || 0;

        var outputFileName;
        var outputContent;

        var parseAS = function () {
            parser = new AS3Parser();
            var ast = parser.buildAst(path.basename(file), content);
            outputFileName = file.replace(/.as$/i, '.ts');
            outputContent = emitter.emit(ast, content);
            console.log(file + "转化完成");
        }

        var parseMXML = function () {
            outputFileName = file.replace(/.mxml$/i,'.html');
            parser = new XMLParser(content, outputFileName);
            outputContent = parser.outStream();
            console.log(file + "转化完成");
        }
        
        switch (parseType) {
            case "PARSE_MXML":
                parseMXML();
                break;
            case "PARSE_AS":
                parseAS();
                break;
        }
        var outputFilePath = path.resolve(outputDir, outputFileName);
        if (fs.existsSync(outputFilePath)) {
                rimraf.sync(outputFilePath);
        }
        fs.createFileSync(outputFilePath, outputContent);
    });
    return asAccount;
}
exports.run = run;