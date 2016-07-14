var Sax = require('sax');
var StringBuffer=require('./stringBuffer');

var Html = require('./maps/htmlMap/htmlObj');
var HtmlKind = require('./maps/htmlMap/htmlKind');
var HtmlStyleMap = require('./maps/htmlMap/htmlStyleMap');
var HtmlAttrMap = require('./maps/htmlMap/htmlAttrMap');
var HtmlCssMap = require('./maps/htmlMap/htmlCssMap');

var isBoot = true;
var isAngular = true;

var AngularAttrMap = require('./maps/angularMap/angularAttrMap');
var AngularHtmlKind = require('./maps/angularMap/angularHtmlKind');

var HTMLElems = [];
var HTMLElem,currentDom,rootTag,curTagName,arrtValue;
var attributeParam = {};
var styleArray,extendArray,paramTagsArray;
var scriptBuffer = new StringBuffer();
var loadBuffer = new StringBuffer();
var functionBuffer = new StringBuffer();
loadBuffer.append('window.onload = function () {');
var tagTypes = {"selfclose":0, "hassubtag":1, "hastext":2};
var LastTagType;
var scriptDir = "js_output/";
var reg = /.*:/;
var defindLog = "defind_";
var defindJsOutputLog = "defind_";
var XMLParser = (function () {
    function XMLParser(content, class_name) {
        this.parser = new Sax.parser(false);
        
        this.parser.onopentag = function (tag) {
            curTagName = tag.name.replace(reg, "");
            if(!rootTag)rootTag = tag;
            if (isBoot) {
                HtmlStyleMap = require('./maps/bootMap/bootStyleMap');
                HtmlAttrMap = require('./maps/bootMap/bootAttrMap');
                HtmlCssMap = require('./maps/bootMap/bootCssMap');
                Html = require("./maps/bootMap/bootObj");
            }

            if (isAngular) {
                HtmlKind = require('./maps/angularMap/angularHtmlKind');
                Html = require("./maps/angularMap/angularObj");
            }
            
            if (HTMLElem && attributeParam && LastTagType > 0) {
                HTMLElem.addAttributes(attributeParam);
                currentDom = HTMLElem.addHtmlElementToDOM(currentDom);
                if(LastTagType == tagTypes.hastext){
                    currentDom = currentDom.parent();
                }
                HTMLElem = null;
                attributeParam = {};
            }
            
            if (HtmlKind.domTags.hasOwnProperty(curTagName)) {
                var domTag = HtmlKind.domTags[curTagName];
                HTMLElem=new Html(domTag);
                attrArray = new Array();
                styleArray = new Array();
                extendArray = new Array();

                for (var key in tag.attributes) {
                    arrtValue = tag.attributes[key];
                    //将属性加入styleArray等
                    if (arrtValue) {
                        if (HtmlKind.styleTags.hasOwnProperty(key)) { 
                            var styleString = HtmlKind.styleTags[key] + ":" + arrtValue + "px";
                            if (HtmlStyleMap.hasOwnProperty(key)) {
                                styleString = HtmlStyleMap[key](HtmlKind.styleTags[key], currentDom, tag.attributes, arrtValue);
                            }
                            styleArray.push(styleString);
                        } else if (HtmlKind.attrTags.hasOwnProperty(key)) {
                            attrArray.push(HtmlKind.attrTags[key] + "=" + arrtValue);
                        } else if (HtmlKind.extendTags.hasOwnProperty(key)) {
                            //根据标签，提取text属性
                            if (isAngular) {
                                if (AngularAttrMap["TAG"][curTagName]) {
                                    AngularAttrMap["TAG"][curTagName](key, arrtValue, attrArray);
                                }
                            }
                            if (HtmlAttrMap["TAG"][curTagName]) {
                                HtmlAttrMap["TAG"][curTagName](key, arrtValue, attributeParam);
                                
                            } else {
                                extendArray.push(HtmlKind.extendTags[key] + "=" + arrtValue);   
                            }
                            if (HtmlAttrMap["ATTR"][key]) {
                                HtmlAttrMap["ATTR"][key]({functionBuffer:functionBuffer,loadBuffer:loadBuffer}, arrtValue, curTagName);
                            }
                        } else {
                            extendArray.push(defindLog + key + "=" + arrtValue);
                        }
                    }
                }

                attributeParam.attributes =  attrArray.join(" ");
                attributeParam.style =  styleArray.join(";");
                attributeParam.extend =  extendArray.join(" ");

                LastTagType = tagTypes.hassubtag;
                if (tag.isSelfClosing) {
                    LastTagType = tagTypes.selfclose;
                    HTMLElem.addAttributes(attributeParam);
                    currentDom = HTMLElem.addHtmlElementToDOM(currentDom);
                    currentDom = currentDom.parent();
                    HTMLElem = null;
                    attributeParam = {};
                }
            }
        }
        this.parser.onattribute = function (attr) {
          //可以对特定的属性做转换处理
          //attr.name
          //attr.value
          //horizontalCenter-verticalCenter
        };
        this.parser.ontext = function (text) {
          //标签文本内容处理
            if(text.replace(/\t/g,"").length >0){
                attributeParam.text = text;
            }       
        }
        this.parser.oncdata =function (script) {
          //处理Script block
          scriptBuffer.append(script);
          scriptBuffer.append("\r\n");
        }
        this.parser.onclosetag = function (tagName) {
            tagName = tagName.replace(reg,"");
            //父标签关闭时设置
            if (HtmlKind.domTags.hasOwnProperty(tagName)) {
                if (tagName == curTagName) {
                    LastTagType = tagTypes.hastext;
                } else {
                    currentDom = currentDom.parent();
                }
            }

            if (tagName == rootTag.name.replace(reg,"") && scriptBuffer.toString().length > 0) {
                //将script 生成到文件
                class_name = class_name.replace(/.html$/g,"");
                var fs = require("fs");
                var path = require('path');
                var filePath = scriptDir + defindJsOutputLog + class_name;
                loadBuffer.append("}");
                var scripts=scriptBuffer.toString();
                fs.createFileSync(path.resolve("output/" + filePath + ".as"), scripts);
                Html.addScriptLink(filePath + ".js");
                //在Html页面中保留引用信息,方便后续修改
                var linkInfo = scripts.match(/import\s\S*;/g).join("\r\n");
                if (linkInfo) {
                    Html.addImportInfo("\r\n/*\r\n" + linkInfo + "\r\n*/\r\n" + loadBuffer.toString() + "\r\n" + functionBuffer.toString());
                }
            }
        }
        
        this.parser.onend = function () {
          //全部解析完毕后处理
            scriptBuffer = new StringBuffer();
            loadBuffer = new StringBuffer();
            loadBuffer.append('window.onload = function () {');
            functionBuffer = new StringBuffer();
            currentDom = null;
            rootTag = null;
            HTMLElems = null;
        }

        this.parser.onerror = function (e) {
          //当解析出错时处理
        }
        this.parser.write(content).end();
    }

    XMLParser.prototype.outStream= function () {
        return Html.outStream();
    }

    return XMLParser;
})();
module.exports = XMLParser;