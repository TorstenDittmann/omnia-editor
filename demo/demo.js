import Editor from "./index.mjs";
import Data from "./data.js"

const editor = new Editor({
    target: document.getElementById("editor"),
    props: {
        content: Data,
        active: true,
        toolbar: true
    }
})

editor.$on('save', event => {
    console.log(event);
});
