var NodeKind = require("./nodeKind");
var PlusPackage = {
    //类型转换
    DataGrid:{
        MapFunction:function (node) {
            var type=node.text;
           if (node.parent && node.parent.kind === NodeKind.NAME_TYPE_INIT) {
               type="HTMLTableElement";
            }
            return {content:type, skipToNum:node.end};
        }
    },
    TextInput:{
        MapFunction:function (node) {
            var type=node.text;
           if (node.parent && node.parent.kind === NodeKind.NAME_TYPE_INIT) {
               type="HTMLInputElement";
            }
            return {content:type, skipToNum:node.end};
        }
    },
    //方法转换
    Alert: {
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
    },
    addItem: {
        MapFunction:function (node) {
            var type=node.text;
           if (node.parent && node.parent.kind === NodeKind.DOT) {
                 type="push";
            }
            return {content:type, skipToNum:node.end};
        }
    },
    addItemAt: {
        MapFunction:function (node) {
            var type=node.text;
           if (node.parent && node.parent.kind === NodeKind.DOT) {
                 type="unshift";
            }
            return {content:type, skipToNum:node.end};
        }
    },
    removeItemAt: {
        MapFunction:function (node) {
            var type=node.text;
           if (node.parent && node.parent.kind === NodeKind.DOT) {
                 type="splice";
            }
            return {content:type, skipToNum:node.end};
        }
    },
}
module.exports = PlusPackage;