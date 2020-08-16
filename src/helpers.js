export const wrapSelection = tag => {
    if (!window.getSelection) return false;
    const ele = document.createElement(tag);
    const sel = window.getSelection();
    if (!sel.rangeCount) return false;
    if (sel.isCollapsed) {
        console.log(ele)
    }
    const range = sel.getRangeAt(0).cloneRange();
    range.surroundContents(ele);
    sel.removeAllRanges();
    sel.addRange(range);
}