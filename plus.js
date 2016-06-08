var NodeKind = require("./nodeKind");
var plus = {
    Alert:{
        MapFunction:function (node) {
           if (node.parent && node.parent.kind === NodeKind.DOT) {
                var arrChildren = node.parent.children;
                var lastNodeChildren = arrChildren[arrChildren.length - 1];
                var type;

                switch(lastNodeChildren.text){
                    case "show":
                        type = "alert";
                        break;
                }
                return {content:type, skipToNum:lastNodeChildren.end}
            }
            return {content:node.text, skipToNum:node.end};
        }
    }
}
module.exports = plus;