var cheerio = require('cheerio');
var fs = require('fs');
var BootCssMap = require('../bootMap/bootCssMap');
var Html = (function () {
    var content = "";
    var $ = null;
    function Html(tag, attributes, style, extend , text, parentid) {
        this.tag = tag;
        this.attributes = attributes;
        this.style = style;
        this.extend = extend;
        this.text = text;
        this.parentid = parentid;
    }

    Html.addScriptLink= function (filePath) {
        $("head").append("<script type='text/javascript' src='" + filePath + "'></script>\r\n");
    }
    Html.addImportInfo =function (info) {
        $("head script").append(info);
    }
    Html.outStream= function () {
        return $.html();
    }

    Html.prototype.addAttributes = function (array) {
        this.attributes = array.attributes;
        this.style = array.style;
        this.extend = array.extend;
        this.text = array.text;
    }

    Html.prototype.addHtmlElementToDOM = function (currentDom) {
        if(!currentDom){
            content = fs.readFileSync('layout/angularLayout/views/main.html','utf-8');
            $ = cheerio.load(content);
            currentDom = $("div");
        }
        var style;
        if (!!this.style) {
            style = "style='" + this.style + "' ";
        }
        currentDom.append("<" + this.tag + " "
                            + (style || "")
                            + (this.extend || "") + " "
                            + (this.attributes || "") + ">" 
                            + (this.text || "") 
                            + "</" + this.tag +">");
        
        if (BootCssMap.hasOwnProperty(this.tag.toUpperCase())) {
                currentDom.children().last().addClass(BootCssMap[this.tag.toUpperCase()]);
        }  
        return currentDom.children().last();
    }
    
    return Html;
})();
module.exports = Html;
