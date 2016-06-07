var http = require("http");
var url = require("url");

exports.start = function (route,handle) {
	 function onRequest(request, response) {
	 	  request.setEncoding("utf8");
		  var pathname = url.parse(request.url).pathname;
		  route(pathname,handle,response,request);
	 }
	 http.createServer(onRequest).listen(8888);
	 console.log("Server has started.");
};