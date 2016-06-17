var cheerio = require('cheerio');
var fs = require('fs');
var Html = (function () {
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
        var parentWidth = dom.parent().css("width").replace("px","");

        if(!!parentWidth)
            parentWidth = parseInt(parentWidth) * 0.5;
        
        return value + parentWidth;
    }

    Html.prototype.parseVertical = function (dom, value) {
        var parentHeigth = dom.parent().css("height").replace("px","");
        
        if(!!parentHeigth)
            parentHeigth = parseInt(parentHeigth) * 0.5;

        return value + parentHeigth;
    }

    return Html;
})();
module.exports = Html;
