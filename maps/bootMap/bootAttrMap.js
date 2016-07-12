var htmlAttrMap = {
    TAG: {
        BUTTON: parseBtnText,
        LABEL: parseLabelText,
        DATAGRIDCOLUMN: parseColumText
    },
    ATTR:{
        CREATIONCOMPLETE: parseCreationComplete,
        DATAPROVIDER: pareseDataProvider
    }
}

function parseBtnText (attr, arrtValue, attributeParam){
    switch (attr) {
        case "LABEL":
            attributeParam.text = arrtValue;
    }
    return;
}

function parseLabelText (attr, arrtValue, attributeParam){
    switch (attr) {
        case "TEXT":
            attributeParam.text = arrtValue;
    }
    return;
}

function parseColumText(attr, arrtValue, attributeParam) {
    switch (attr) {
        case "HEADERTEXT":
            attributeParam.text = arrtValue;
    }
    return;
}

function parseCreationComplete(bufferAttr, arrtValue) {
    bufferAttr.loadBuffer.append(arrtValue + ";");
    return;
}

function pareseDataProvider(bufferAttr, arrtValue, tag){
    var isRender = false;
    isRender = /function renderData/g.test(bufferAttr.functionBuffer.toString());
    if(!isRender){
            renderData = '\r\nfunction renderData(id, label, displayArray) {\r\n'
                        +'var elem = document.getElementById(id);\r\n'
                        +'var output = "";\r\n'
                        +'if (label == "select") {\r\n'
                        +'    for (var index in displayArray) {\r\n'
                        +'        output += "<option>" + displayArray[index]["sex"] + "</option>";\r\n'
                        +'    }\r\n'
                        +'}\r\n'
                        +'else if (label == "table") {\r\n'
                        +'    output = "<tr><td>Name</td><td>Remark</td></tr>";\r\n'
                        +'    for (var index in displayArray) {\r\n'
                        +'        output += "<tr onclick=\'Grid.SelectRow(this)\'>"\r\n'
                        +'            + "<td class = \'td_id\'>" + displayArray[index]["id"] + "</td>"\r\n'
                        +'            + "<td class = \'td_name\'>" + displayArray[index]["name"] + "</td>"\r\n'
                        +'            + "<td class = \'td_remark\'>" + displayArray[index]["remark"] + "</td>"\r\n'
                        +'            + "</tr>";\r\n'
                        +'    }\r\n'
                        +'}\r\n'
                        +'elem.innerHTML = output;\r\n'
                    +'}\r\n';
        bufferAttr.functionBuffer.append(renderData);
    }
    switch (tag) {
        case "COMBOBOX":
            bufferAttr.loadBuffer.append('\r\nrenderData("sex_cmb", "select", displayArray);');
            break;
        case "DATAGRID":
            bufferAttr.loadBuffer.append('\r\nrenderData("data_dg", "table", displayArray);');
            break;
    }
}

module.exports = htmlAttrMap;