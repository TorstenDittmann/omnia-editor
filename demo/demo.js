import Editor from "../dist/index.mjs";
import Data from "./data.js"

const sample = localStorage.getItem("omnia-editor") ? JSON.parse(localStorage.getItem("omnia-editor")) : Data;

const editor = new Editor({
    target: document.getElementById("editor"),
    props: {
        content: sample
    }
})

editor.$on('change', event => {
    localStorage.setItem("omnia-editor", JSON.stringify(editor.getContent()))
    console.log("saved");
});
