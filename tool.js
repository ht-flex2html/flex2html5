function getContentType(pathname) {
    var filetype = pathname.substring(pathname.lastIndexOf(".") + 1).toLocaleLowerCase();
    switch(filetype){
        case "html":
            return "text/html";
        case "css":
            return "text/css";
        case "js":
            return "text/x-javascript";
        defualt:
            return "text/html";
    }
}



exports.getContentType = getContentType;