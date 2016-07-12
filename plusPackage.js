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
           var type = node.text;
           var skipToNum = node.end;
           if (node.parent && node.parent.kind === NodeKind.DOT) {
                var arrChildren = node.parent.children;
                var lastNodeChildren = arrChildren[arrChildren.length - 1];
                switch(lastNodeChildren.text){
                    case "show":
                        type = "alert";
                        skipToNum = lastNodeChildren.end;
                        break;
                }
            }
            return {content:type, skipToNum:skipToNum};
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
    text: {
        MapFunction:function (node) {
            var type=node.text;
           if (node.parent && node.parent.kind === NodeKind.DOT) {
                 type="value";
            }
            return {content:type, skipToNum:node.end};
        }
    },
    getItemAt: {
        MapFunction:function (node) {
            var type = node.text;
            var skipNum=node.end;
           if (node.parent && node.parent.kind === NodeKind.DOT) {
                 type="";
                 if(node.parent.parent){
                     var ArgumentsNode=node.parent.parent.findChild(NodeKind.ARGUMENTS);
                     if(ArgumentsNode){
                        var agmtArray = new Array();
                         for(var agmt in ArgumentsNode.children){
                            agmtArray.push(ArgumentsNode.children[agmt].text);
                         }
                         if(agmtArray.length>0){
                             type+="["+agmtArray.join()+"]";
                             skipNum = node.parent.parent.end;
                         }
                     }
                 }
            }
            return {content:type, skipToNum:skipNum};
        }
    },
    dataProvider: {
        MapFunction: function (node) {
           var type = node.text;
           if (node.parent && node.parent.kind === NodeKind.DOT) {
               var id = node.parent.findChild("identifier") && node.parent.findChild("identifier").text;
                 if (node.parent.parent && node.parent.parent.kind === NodeKind.ASSIGN) {
                     var source = node.parent.parent.findChild('identifier')?
                                  node.parent.parent.findChild('identifier').text:
                                  "'dataSource'";
                     type = "renderData('" + id + "','tagType', " + source + ")";
                     return {content:type, skipToNum:node.parent.parent.end};
                 }
            }
            return {content:type, skipToNum:node.end};
        }
    }
}
module.exports = PlusPackage;