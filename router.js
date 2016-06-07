var fs = require("fs");	
function route(pathname,handle,response,request) {
 console.log("About to route a request for " + pathname);
	 if(pathname == "/favicon.ico"){
	 	response.end();
	 } else if (pathname == "/start" || pathname == "/"){
	    handle["/start"](response,request,pathname);
	 } else if (pathname == "/upload"){
	    handle["/upload"](response,request,pathname);
	 } else {
	    handle["/init"](response,request,pathname);
	}
}
exports.route = route;