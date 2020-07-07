import Editor from "./index.mjs";
import Data from "./data.js"
console.log(Data)

const editor = new Editor({
    target: document.getElementById("editor"),
    props: {
        data: Data,
        active: true,
        toolbar: true
    }
})

editor.$on('save', event => {
    console.log(event);
});
