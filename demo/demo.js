import Editor from "./index.mjs";
import Data from "./data.js"

const editor = new Editor({
    target: document.getElementById("editor"),
    props: {
        content: Data,
        active: true
    }
})

editor.$on('change', event => {
    console.log("onchange");
});
