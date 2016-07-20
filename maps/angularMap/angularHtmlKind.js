var AngularHtmlKind = { 

    domTags : {
        DIV:"div",
        PANEL: "div", 
        LABEL: "label", 
        TEXTINPUT: "input", 
        COMBOBOX: "select", 
        BUTTON: "button",
        DATAGRID: "div",
        COLUMNS: "div",
        DATAGRIDCOLUMN:"div",
        APPLICATION:"form",
    },

    attrTags : {
        ID:"id",
        TITLE:"title",
        NAME:"name",


    },

    styleTags : {
        WIDTH: "width",
        HEIGHT: "height",
        TOP: "top",
        HORIZONTALCENTER: "left",
        VERTICALCENTER: "top",
        VISIBLE: "display"
    },

    extendTags : {
        CLICK:"onclick",
        CUSTOMER:"customer",
        CREATIONCOMPLETE: "creatOnComplete",
        DATAPROVIDER: "dataProvider",
        LABEL:"text",
        TEXT:"text",
        HEADERTEXT:"text"
    }
}
module.exports = AngularHtmlKind;