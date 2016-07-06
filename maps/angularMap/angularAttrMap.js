var AngularAttrMap = {
    TAG:{
        SELECT: createSelectTag
    }
}

function createSelectTag(attr, arrtValue, attrArray) {
    switch (attr) {
        case "DATAPROVIDER":
            arrtValue = arrtValue.replace(/{|}/g,"");
            attrArray.push('ng-option="x.sex for x in ' + arrtValue + '"');
    }
    return;
}
 

module.exports = AngularAttrMap;