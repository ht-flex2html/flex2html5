var cheerio = require('cheerio');
var fs = require('fs');
var Html = (function () {
    Html.content = "";
    Html.$ = null;
    function Html(tag, attributes, style, extend , text, parentid) {
        this.tag = tag;
        this.attributes = attributes;
        this.style = style;
        this.extend = extend;
        this.text = text;
        this.parentid = parentid;
    }

    Html.addScriptLink= function (filePath) {
        $("head").append("<script type='text/javascript' src='" + filePath + "'></script>");
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
        // console.log(elem);
        if(!currentDom){
            content = fs.readFileSync('module/htmlLayout.html','utf-8');
            $ = cheerio.load(content);
            currentDom = $("body");
        }
        var style;

        switch(this.tag){
            case "label":
                // this.text = ;
                break;
        }

        if (!!this.style) {
            style = "style='" + this.style + "' ";
        }

        if(this.tag == "tr"){
            console.log(1);
        }

        currentDom.append("<" + this.tag + " "
                            + (style || "")
                            + (this.extend || "") + " "
                            + (this.attributes || "") + ">" 
                            + (this.text || "") 
                            + "</" + this.tag + ">");
                            
        return currentDom.children().last();
    }
    return Html;
})();


module.exports = Html;
