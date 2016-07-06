var HtmlStyleMap = {
    HORIZONTALCENTER: parseHorizontal,
    VERTICALCENTER: parseVertical,
    VISIBLE: parseVisible
}
    
function parseVisible (styleName, dom, attrs, value) {
    var outputValue;
    if(value == "false"){
        outputValue = "none";
    }
    return styleName + ":" + outputValue;
}

function parseHorizontal (styleName, dom, attrs, value) {
    var parentWidth = dom.css("width").replace("px","");
    var curWidth = 20;

    if(attrs.hasOwnProperty("WIDTH")){
        curWidth = parseInt(attrs["WIDTH"])*0.5;
    }
    
    if(typeof value != "number")
        value = parseInt(value);
    if(!!parentWidth)
        parentWidth = parseInt(parentWidth) * 0.5;
    
    return styleName + ":" + (value + parentWidth - curWidth) + "px";
}

function parseVertical (styleName, dom, attrs, value) {
    var parentHeigth = dom.css("height").replace("px","");
    var curHeight = 20;

     if(attrs.hasOwnProperty("HEIGHT")){
        curHeight = parseInt(attrs["HEIGHT"])*0.5;
    }

    if(typeof value != "number")
        value = parseInt(value);
    if(!!parentHeigth)
        parentHeigth = parseInt(parentHeigth) * 0.5;

    return styleName + ":" + (value + parentHeigth - curHeight) + "px";
}

module.exports = HtmlStyleMap;