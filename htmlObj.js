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
        // var attributes;
        switch(this.tag){
            case "div":
                if (!!this.style) {
                    style = "style='" + this.style + "' ";
                }
                currentDom.append("<div "
                                    + (style || "") 
                                    + (this.attributes || "") + ">" 
                                    + (this.text || "") 
                                    + "</div>");
                break;
        }
        return currentDom.children().last();
    }
    return Html;
})();
module.exports = Html;
