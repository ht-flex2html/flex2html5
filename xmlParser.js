var Sax = require('sax');
var Html = require('./htmlObj');
var HtmlKind = require('./htmlKind');
var StringBuffer=require('./stringBuffer');

var HTMLElems = [];
var HTMLElem,currentDom,rootTag,curTagName,arrtValue;
var styleArray,extendArray,paramTagsArray,attributeParam;
var scriptBuffer=new StringBuffer();
var isTagClosed;
var scriptDir="js_output/";
var reg = /.*:/;

var XMLParser = (function () {
    function XMLParser(content) {
      content=content.replace(/\r\n/g,"").replace(/\n/g,"");
      this.parser = new Sax.parser(false);
      
      this.parser.onopentag = function (tag) {
        curTagName=tag.name.replace(reg,"");
        if(!rootTag)rootTag=tag;
        
        if(HTMLElem && attributeParam && (isTagClosed || isTagClosed==false)){
          HTMLElem.addAttributes(attributeParam);
          currentDom = HTMLElem.addHtmlElementToDOM(currentDom);
        }
        if (HtmlKind.domTags.hasOwnProperty(curTagName)) {
          HTMLElem=new Html(HtmlKind.domTags[curTagName]);
          styleArray = new Array();
          extendArray = new Array();
          paramTagsArray = new Array();
          
          for(var key in tag.attributes){
            arrtValue = tag.attributes[key];
            //将属性加入styleArray等
            if(arrtValue){
              if (HtmlKind.styleTags.hasOwnProperty(key)) { 
                styleArray.push(HtmlKind.styleTags[key] + ":" + arrtValue + "px");
              } else if (HtmlKind.paramTags.hasOwnProperty(key)) {
                  paramTagsArray.push(HtmlKind.paramTags[key] + "=" + arrtValue);
              } else if (HtmlKind.extendTags.hasOwnProperty(key)) {
                  extendArray.push(HtmlKind.extendTags[key] + "=" + arrtValue);
              }
            }
          }
            
          attributeParam = {};
          attributeParam.attributes =  paramTagsArray.join(" ");
          attributeParam.style =  styleArray.join(";");
          attributeParam.extend =  extendArray.join(" ");
            
          if(tag.isSelfClosing){
            attributeParam.text="";
            HTMLElem.addAttributes(attributeParam);
            currentDom = HTMLElem.addHtmlElementToDOM(currentDom);
            currentDom = currentDom.parent();   
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
        if(!text) attributeParam.text = text;
      }
      this.parser.oncdata =function (script) {
        //处理Script block
         scriptBuffer.append(script);
         scriptBuffer.append("\r\n");
      }
      this.parser.onclosetag = function (tagName) {
        if(tagName==curTagName){
          isTagClosed = true;
        }
        if(tagName == rootTag.name && scriptBuffer.toString().length >0){
          //TODO:将script 生成到文件
           var fs = require("fs");
           fs.createFileSync(path.resolve(scriptDir+class_name+".as"), scriptBuffer.toString());
        }
      }
      
      this.parser.onend = function () {
        //全部解析完毕后处理
      }
      this.parser.onerror = function (e) {
        //当解析出错时处理
      };
      this.parser.write(content).end();
      
      // Sax.EVENTS.forEach(function (ev) {
      //   var eve=ev;
      // });
    }
    XMLParser.prototype.outStream= function () {
        return Html.outStream();
    }
    return XMLParser;
})();
module.exports = XMLParser;