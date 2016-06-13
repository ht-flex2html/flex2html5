var cheerio = require('cheerio');
var fs = require('fs');
var Html = (function () {
    function Html(txt) {
        var content = fs.readFileSync('module/htmlLayout.html','utf-8');
        $ = cheerio.load(content);
        $('h2').text('Hello there!');
        $('h2').addClass('welcome');
        
        this.html = $.html();

    }
    Html.prototype.findChild = function (type) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].kind === type) {
                return this.children[i];
            }
        }
        return null;
    };
    Html.prototype.findChildren = function (type) {
        return this.children.filter(function (child) { return child.kind === type; });
    };
    Html.prototype.getChildFrom = function (type) {
        var child = this.findChild(type);
        if (!child) {
            return this.children.slice(0);
        }
        else {
            var index = this.children.indexOf(child);
            return this.children.slice(index + 1);
        }
    };
    Html.prototype.getChildUntil = function (type) {
        var child = this.findChild(type);
        if (!child) {
            return this.children.splice(0);
        }
        else {
            var index = this.children.indexOf(child);
            return this.children.slice(0, index);
        }
    };
    return Html;
})();
module.exports = Html;
