import Editable from "upfront-editable";

let selection;

export const editable = new Editable({
    defaultBehavior: false
});

editable.selection((el, sel) => {
    selection = sel;
});

export const format = tag => {
    if (!(selection && selection.isSelection)) return false;
    switch (tag) {
        case "bold":
            selection.toggleBold();
            break;
        case "italic":
            selection.toggleEmphasis();
            break;
        case "underline":
            selection.toggleUnderline();
            break;

        default:
            break;
    }
    selection.triggerChange()

}

export const contenteditable = node => {
    editable.add(node);
}
