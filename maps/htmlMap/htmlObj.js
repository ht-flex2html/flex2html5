var cheerio = require('cheerio');
var fs = require('fs');
var HtmlCssMap = require('./htmlCssMap');
var Html = (function () {
    var content = "";
    var $ = null;
    function Html(tag, attributes, style, extend , text, parentid) {
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
        if($("head script").attr("define") !== "define")$("head").append("<script define='define'></script>");
        $("head script[define='define']").append(info);
    }
    Html.outStream= function () {
        $("head script[define='define']").removeAttr('define');
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
            content = fs.readFileSync('layout/htmlLayout.html','utf-8');
            $ = cheerio.load(content);
            currentDom = $("body");
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
        if (HtmlCssMap.hasOwnProperty(this.tag.toUpperCase())) {
            currentDom.children().last().addClass(HtmlCssMap[this.tag.toUpperCase()]);
        }
        return currentDom.children().last();
    }
    
    return Html;
})();
module.exports = Html;
