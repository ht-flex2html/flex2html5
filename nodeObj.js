var Node = (function () {
    function Node(kind, start, end, text, children, parent) {
        this.kind = kind;
        this.start = start;
        this.end = end;
        this.text = text;
        this.children = children;
        this.parent = parent;
        if (!this.children) {
            this.children = [];
        }
    }
    Node.prototype.findChild = function (type) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i] != null && this.children[i].kind === type) {
                return this.children[i];
            }
        }
        return null;
    };
    Node.prototype.findChildren = function (type) {
        return this.children.filter(function (child) {
            if (!child)
                return false; 
            return child.kind === type; });
    };
    Node.prototype.getChildFrom = function (type) {
        var child = this.findChild(type);
        if (!child) {
            return this.children.slice(0);
        }
        else {
            var index = this.children.indexOf(child);
            return this.children.slice(index + 1);
        }
    };
    Node.prototype.getChildUntil = function (type) {
        var child = this.findChild(type);
        if (!child) {
            return this.children.splice(0);
        }
        else {
            var index = this.children.indexOf(child);
            return this.children.slice(0, index);
        }
    };
     Node.prototype.findFunctionByName = function (name) {
        if (this.text === name)
            return this;
        for (var i = 0; i < this.findChildren("function").length; i++) {
           if (this.findChildren("function")[i].findChild("name").text === name){
                return this.findChildren("function")[i]; 
           }
       };
        return null;
    };
    Node.prototype.getAssignName = function () {   
        if(this.kind === "assign"){
             return  this.findChild("dot")? this.findChild("dot").findChild("literal").text : "";
        }
       return  "";
    };
    Node.prototype.getArguments = function () {
        var result = new Array();
        var searchNode;
        if(this.kind === "call"){
             searchNode= this;
        }else if(this.kind === "assign" && this.findChild("new")){
            searchNode= this.findChild("new").findChild("call");
        }

        var arrArgs = searchNode.findChild("arguments").children;
        for(var i = 0; i < arrArgs.length; i++){
            result.push(arrArgs[i].text);
        }
       return result;
    };
     Node.prototype.getFuncBlockTempArray = function () {
        var result = new Array();
        if(this.kind === "block"){
            var arrayNode=this.findChild("var-list").findChild("name-type-init").findChild("init").findChild("array").children;
            for(var i = 0; i < arrayNode.length; i++){
                result.push(arrayNode[i].findChild("identifier").text);
            }
        }
       return result;
    };
    Object.defineProperty(Node.prototype, "lastChild", {
        get: function () {
            return this.children[this.children.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    return Node;
})();
module.exports = Node;
