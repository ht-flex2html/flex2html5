var HtmlKind = { 

    domTags : {
        DIV:"div",
        PANEL: "form", 
        LABEL: "label", 
        TEXTINPUT: "input", 
        COMBOBOX: "select", 
        BUTTON: "button",
        DATAGRID: "table",
        DATAGRIDCOLUMN:"tr"
    },

    paramTags : {
        ID:"id",
        TITLE:"title",
        NAME:"name"
    },

    styleTags : {
        WIDTH: "width",
        HEIGHT: "height",
        TOP: "top",
        HORIZONTALCENTER: "left",
        VERTICALCENTER: "top"
    },

    extendTags : {click:"click",customer:"customer"}
}
module.exports = HtmlKind;