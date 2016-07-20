var AngularAttrMap = {
    TAG: {
        SELECT: createSelectTag,
        DATAGRID: createTableTag
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


function createTableTag(attr, arrtValue, attrArray, domParam) {
    switch (attr) {
        case "DATAPROVIDER":
            arrtValue = arrtValue.replace(/{|}/g,"");
            attrArray.push('ng-grid="grid_' + arrtValue + '"');
            attrArray.push('class="gridStyle"');
    }
    return;
}
 

module.exports = AngularAttrMap;