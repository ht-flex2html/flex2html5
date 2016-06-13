/*jshint node:true*/
var AS3Parser = require('./parser');
var emitter = require('./emitter');
var path = require('path');
require('fs-extended');
var rimraf = require('rimraf');
var fs = require("fs");
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
function run(exchangeSource) {
    var sourceDir = exchangeSource.sourceDir;
    if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
        throw new Error('invalid source dir');
    }

    var outputDir = exchangeSource.outputDir;
    if (fs.existsSync(outputDir)) {
        if (!fs.statSync(outputDir).isDirectory()) {
            throw new Error('invalid ouput dir');
            process.exit(1);
        }
        rimraf.sync(outputDir);
    }

    fs.mkdirSync(outputDir);
    var files = readdir(sourceDir).filter(function (file) { 
        return /.as$/.test(file) || /.mxml$/.test(file); 
    });

    // var number = 0;
    var length = files.length;
    var asAccount = {functionNum:0,interfaceNum:0,classNum:0};
    files.forEach(function (file) {
        var isAs = true; 
        if(/.mxml$/i.test(file)){
            isAs = false;
        }
        
        var parser = new AS3Parser();
        // console.log('compiling \'' + file + '\' ' + number + '/' + length);
        var content = fs.readFileSync(path.resolve(sourceDir, file), 'UTF-8');
        var world = content;
        var test = world.replace(/\/\*\*[\s\S]*\*\//gm,"").replace(/\/\/(.*)/gm,"");

        asAccount.functionNum += test.match(/function/gm) && test.match(/function/gm).length || 0;
        asAccount.interfaceNum += test.match(/interface/gm) && test.match(/interface/gm).length || 0;
        asAccount.classNum += test.match(/class/gm) && test.match(/class/gm).length || 0;

        // console.log(content);
        var ast = parser.buildAst(path.basename(file), content);

        var outputFileName;
        var outputContent;
        if (isAs) {
            outputFileName = file.replace(/.as$/i, '.ts');
            outputContent = emitter.emit(ast, content);
        } else {
            outputFileName = file.replace(/.mxml$/i,'.html');
            var obj = new htmlObj();
            outputContent = obj.html;
        }

        fs.createFileSync(path.resolve(outputDir, outputFileName), outputContent);
        // number++;
    });
    return asAccount;
}
exports.run = run;