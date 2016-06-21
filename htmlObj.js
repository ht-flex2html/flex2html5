var cheerio = require('cheerio');
var fs = require('fs');
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

    Html.prototype.addAttributes = function (array) {
        this.attributes = array.attributes;
        this.style = array.style;
        this.extend = array.extend;
        this.text = array.text;
    }

    Html.prototype.addHtmlElementToDOM = function (currentDom) {
        // console.log(elem);
        if(!currentDom){
            content = fs.readFileSync('module/htmlLayout.html','utf-8');
            $ = cheerio.load(content);
            currentDom = $("body");
        }
        var style;

        switch(this.tag){
            case "button":
            case "label":
                this.text = "test";
                break;
        }

        if (!!this.style) {
            style = "style='" + this.style + "' ";
        }
        currentDom.append("<"+ this.tag + " "
                            + (style || "") 
                            + (this.attributes || "") + ">" 
                            + (this.text || "") 
                            + "</" + this.tag +">");
                            
        return currentDom.children().last();
    }

    Html.prototype.parseHorizontal = function (dom, value) {
        var parentWidth = dom.css("width").replace("px","");
        
        if(typeof value != "number")
            value = parseInt(value);
        if(!!parentWidth)
            parentWidth = parseInt(parentWidth) * 0.5;
        
        return value + parentWidth;
    }

    Html.prototype.parseVertical = function (dom, value) {
        var parentHeigth = dom.css("height").replace("px","");

        if(typeof value != "number")
            value = parseInt(value);
        if(!!parentHeigth)
            parentHeigth = parseInt(parentHeigth) * 0.5;

        return value + parentHeigth;
    }

    
    Html.prototype.addScriptLink= function (filePath) {
        
    }

    Html.prototype.outStream= function () {
        return $.html();
    }
    return Html;
})();
module.exports = Html;
