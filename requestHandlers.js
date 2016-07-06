var fs = require("fs");
var tools = require("./tool");
var copyDir = require("./CopyDir");
var as_to_ts = require("./as_to_ts");
var path = require('path');
var rimraf = require('rimraf');

function start(response,request,pathname){
    fs.readFile("index.html",function(error, data) {
        if(error){  
            console.log(error);  
        }else{  
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();      
        }  
    })
}

function init(response,request,pathname) {
    fs.readFile(pathname.substring(1),function(error, data) {
        if (error) {  
            console.log(error);  
        } else {  
            response.writeHead(200, {"Content-Type": tools.getContentType(pathname)});
            response.write(data);
            response.end();      
        }  
    })
}

function upload(response,request,pathname) {

     var responseData = {sourceDir: "", outputDir: ""};
     var postDataChunk;
     var exchangeSource = {};
     var asAcountResult = {};
     
     request.on("data",function(data){
        var data = JSON.parse(data);
        var sourceDir = data.sourceDir;
        var rootDir = path.resolve(process.cwd(), "output");
        
        //生成目录操作和翻译操作
        if(data.operation === "MK_DIR"){
            if (fs.existsSync(rootDir)) {
                if (!fs.statSync(rootDir).isDirectory()) {
                    throw new Error('invalid ouput dir');
                }
                rimraf.sync(rootDir);
            }
			fs.mkdirSync(rootDir);
            createTsConfig();
            clear_mk_dir(rootDir + "/js_output");
            mkDir(sourceDir, rootDir);
            console.log("目录生成完毕");
        } else if (data.operation === "PARSE_MXML" || data.operation === "PARSE_AS") {
            if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
                throw new Error('invalid source dir');
            }

            asAcountResult = as_to_ts.run(sourceDir, rootDir, data.operation);
            if(data.operation === "PARSE_AS"){
                as_to_ts.run("output/js_output", "output/js_output", "PARSE_AS");
            }

            responseData.anlyiseNum = {
                            classNum:asAcountResult.classNum,
                            interfaceNum:asAcountResult.interfaceNum,
                            functionNum:asAcountResult.functionNum
                           };
            responseData.directory = copyDir.copyDir(rootDir);
        }
        
        //输出方法，类，接口的统计结果
        response.writeHead(200, {"Content-Type":"applicaton/json"});
        response.write(JSON.stringify(responseData));
        response.end(); 

     });
     request.on("end",function(data){
        response.end(); 
     });
}

function mkDir(sourcePath, rootDir){
	var dirList = fs.readdirSync(sourcePath);
	dirList.forEach(function(file){
		if (fs.statSync(sourcePath + '\\' + file).isDirectory()) {
            var mkDirName = rootDir + '\\' + file;
            clear_mk_dir(mkDirName);
			mkDir(sourcePath + "\\" + file, mkDirName);
		}
	});
}

function clear_mk_dir (path) {
    if (fs.existsSync(path)) {
        if (!fs.statSync(path).isDirectory()) {
            throw new Error('invalid ouput dir');
        }
        rimraf.sync(path);
    }   
    fs.mkdirSync(path);
}
        
function createTsConfig() {
    var taskContent = fs.readFileSync('.vscode/tasks.json','utf-8');
    fs.createFileSync(path.resolve("output/.setting/tasks.json"), taskContent);

    var configContent = fs.readFileSync('tsconfig.json','utf-8');
    fs.createFileSync(path.resolve("output/tsconfig.json"), taskContent);
}
 
exports.start = start;
exports.upload = upload;
exports.init = init;