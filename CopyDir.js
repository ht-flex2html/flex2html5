
var fs=require("fs");

function copyDir(originPath){
	// this.originPath=originPath;//本地项目路径 
	var proName=originPath.split("/");//获取项目名
	//var targetPath=targetPath+"/"+ proName[proName.length-1];//服务端存放项目的路径
	return parseDir(originPath);
}

function parseDir(sourcePath,file){
	// console.log("从这里开始");
	if(!file){
		file = sourcePath.substring(sourcePath.lastIndexOf("/") + 1);
	}
	var item = {name:file, files:[], sub:[]};
	// console.log(sourcePath);
	// if(!fs.existsSync(serverPath)){//如果项目目录不存在则创建
	// 	fs.mkdirSync(serverPath);
	// 	console.log(serverPath+"目录创建成功！");
	// }

	// files = rd.readSync('/tmp');

	// var item = {name,file,sub};
	var dirList = fs.readdirSync(sourcePath);

	dirList.forEach(function(file){
		if(fs.statSync(sourcePath + '/' + file).isFile()){
			item.files.push(file);
		} else {
			item.sub.push(parseDir(sourcePath+"/"+file,file));
		}
	});
	return item;
		// files.forEach(function(file){
		// 	console.log(file);
		// 	fs.stat(sourcePath+"/"+file, function(err,stat){
		// 		if(stat.isFile()){
		// 			item.files.push(file);
		// 			console.log(item);
		// 		}else{
		// 			console.log("i ma directory");
		// 			item.sub.push(parseDir(sourcePath+"/"+file));
		// 		}
		// 	})
		// 	return item;
		// });

	}

	// fs.readdir(sourcePath,function(err,files){
	// 	//读取项目文件列表(包括文件夹)
	// 	if(err){
	// 		return console.log(err);
	// 	}
	// 	files.forEach(function(file){
	// 		//遍历文件列表(包括文件夹)
	// 		console.log(file);
	// 		fs.stat(sourcePath+"/"+file,function(err,stat){
	// 			if(stat.isFile()){
	// 				//文件/文件夹
	// 				if(!file){
	// 					var item.File = new Array();
	// 					item.File.push(file);
	// 				}
	// 				// var data=fs.readFileSync(sourcePath+"/"+file);
	// 				// fs.writeFile(serverPath + "/" + file,data);//如果是文件则复制到目标文件夹
	// 				console.log(file+"文件复制完毕");
	// 			} else {
	// 				//如果file是目录则回调方法本身，继续遍历
	// 				item.name = file;
	// 				parseDir(sourcePath + "/" + file, serverPath + "/" + file, file);
	// 			}
	// 		});
	// 	});
	// });




// }

exports.copyDir = copyDir;