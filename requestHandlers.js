var fs = require("fs");
// var formidable = require("formidable");
var tools = require("./tool");
var copyDir = require("./CopyDir");
var as_to_ts = require("./as_to_ts");


function start(response,request,pathname){
    fs.readFile("demo.html",function(error, data) {
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
        if(error){  
            console.log(error);  
        }else{  
            response.writeHead(200, {"Content-Type": tools.getContentType(pathname)});
            response.write(data);
            response.end();      
        }  
    })
}

function upload(response,request,pathname) {
     console.log("访问/upload时调用这个。");
     var responseData = {sourceDir:"",outputDir:""};
     var postDataChunk;
     var exchangeSource = {};
     request.on("data",function(data){
        var data = JSON.parse(data);
        console.log(data.sourceDir);
        exchangeSource.sourceDir = data.sourceDir;
        exchangeSource.outputDir = data.outputDir;
        var asAcountResult = as_to_ts.run(exchangeSource);

        response.writeHead(200, {"Content-Type":"applicaton/json"});
        responseData.anlyiseNum = {
                            classNum:asAcountResult.classNum,
                            interfaceNum:asAcountResult.interfaceNum,
                            functionNum:asAcountResult.functionNum
                           };
        responseData.directory = copyDir.copyDir(exchangeSource.outputDir);
        response.write(JSON.stringify(responseData));
        response.end(); 
     });
     request.on("end",function(data){
        response.end(); 
     });
}



 
exports.start = start;
exports.upload = upload;
exports.init = init;