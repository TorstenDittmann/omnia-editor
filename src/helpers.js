import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-selectionsaverestore";
import "rangy/lib/rangy-textrange";

export const wrapSelection = tag => {
    if (!window.getSelection) return false;

    const el = document.createElement(tag);
    const sel = rangy.getSelection();
    if (!sel.rangeCount) return false;
    
    sel.expand("word");
    
    const savedSel = rangy.saveSelection();
    const parentTag = findUpTag(sel.focusNode, tag);
    const range = sel.getRangeAt(0).cloneRange();
    if (parentTag) {
        parentTag.replaceWith(...parentTag.childNodes);
    } else {
        range.surroundContents(el);
    }    
    rangy.restoreSelection(savedSel)
}


const findUpTag = (el, tag) => {
    while (el.parentNode) {
        if (el.tagName.toLowerCase() === "div") 
            return false;
        if (el.tagName.toLowerCase() === tag)
            return el;
        el = el.parentNode;
    }
    return false;
}