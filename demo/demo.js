import Editor from "./index.mjs";
import Data from "./data.js"

const editor = new Editor({
    target: document.getElementById("editor"),
    props: {
        data: Data,
        active: true,
        toolbar: true
    }
})

editor.$on('change', event => {
    console.log(event);
});
