var htmlAttrMap = {
    BUTTON: parseBtnText,
    LABEL: parseLabelText,
    DATAGRIDCOLUMN: parseColumText
}

function parseBtnText (attr, arrtValue){
    var hasText = false;
    switch (attr) {
        case "LABEL":
            hasText = true;
    }
    return hasText;
}

function parseLabelText (attr, arrtValue){
    var hasText = false;
    switch (attr) {
        case "TEXT":
            hasText = true;
    }
    return hasText;
}

function parseColumText(attr, arrtValue) {
    var hasText = false;
    switch (attr) {
        case "HEADERTEXT":
            hasText = true;
    }
    return hasText;
}

module.exports = htmlAttrMap;