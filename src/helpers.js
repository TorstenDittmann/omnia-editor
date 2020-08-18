import Editable from "upfront-editable";
import { content } from "./stores";

let selection;

const editable = new Editable({
  defaultBehavior: false,
  mouseMoveSelectionChanges: false,
  browserSpellcheck: true
});

editable.selection((el, sel) => {
  selection = sel;
});

editable.on("split", (elem, before, after, cursor) => {
  if(elem && elem.dataset.type !== "paragraph") {
    return false;
  }

  const reducer = (pre, cur) => `${pre}${cur.outerHTML ? cur.outerHTML : cur.nodeValue}`;
  const old = [...before.childNodes].reduce(reducer, "");
  const add = [...after.childNodes].reduce(reducer, "");
  const index = elem.dataset.index;

  content.setBlock(index, old);
  content.addBlock((+index + 1), "paragraph", add)

  //TODO: implement cursor position restoration
  console.log(cursor)
});


editable.on("merge", (elem, direction, cursor) => {
  const index = +elem.dataset.index;
  if (direction === "after") {
    content.mergeBlock(index, index + 1)
  } else if (direction === "before") {
    content.mergeBlock(index - 1, index)
  }

  //TODO: implement cursor position restoration
  console.log(cursor)
});

editable.on("insert", (elem, direction, cursor) => {
  //TODO: Fired when the user presses enter (⏎) to insert a newline.
  console.log({ elem, direction, cursor });
});

editable.on("paste", (elem, blocks, cursor) => {
  console.log({ elem, blocks, cursor });
  //TODO:blocks is an array of strings preprocessed by editable.js.
  // If the pasted content contains HTML it is split up by block level elements and cleaned and normalized.
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
