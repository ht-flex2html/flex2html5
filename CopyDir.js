var fs = require("fs");

function copyDir(originPath){
	// this.originPath=originPath;//本地项目路径 
	var proName=originPath.split("/");//获取项目名
	//var targetPath=targetPath+"/"+ proName[proName.length-1];//服务端存放项目的路径
	return parseDir(originPath);
}

function parseDir(sourcePath,file){
	if(!file){
		file = sourcePath.substring(sourcePath.lastIndexOf("/") + 1);
	}
	var item = {name:file, files:[], sub:[]};

	var dirList = fs.readdirSync(sourcePath);

	dirList.forEach(function(file){
		if(fs.statSync(sourcePath + '/' + file).isFile()){
			item.files.push(file);
		} else {
			item.sub.push(parseDir(sourcePath+"/"+file,file));
		}
	});
	return item;
}
exports.copyDir = copyDir;