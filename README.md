# omnia-editor
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Usage in Svelte

```bash
npm i omnia-editor
# or
yarn add omnia-editor
```

```svelte
<script>
import { OmniaEditor } from "omnia-editor";
</script>

<OmniaEditor />
```

## Properties

### **value**_: string;_
Initial value of the content.

### **editor**_: Editor;_
TipTap instance of the Editor.

### **spellcheck**_: boolean;_
Use spellcheck.

## Methods

### **getJSON()**_: Object;_
Get the document as JSON.
### **getHTML()**_: string;_
Get the document as HTML.

### **getCharacterCount()**_: number;_
Get the number of characters for the current document.

### **isFocused()**_: boolean;_
Returns `true` when Editor is focused.

### **isEmpty()**_: boolean;_
Returns `true` if there is no content.

### **blur()**_: boolean;_
Removes focus from the editor.

### **focus(position)**_: boolean;_
Focus the editor at the given position.

Set the focus to the editor
```focus()```

Set the cursor to the first position
```focus('start')```

Set the cursor to the last position
```focus('end')```

Selects the whole document
```focus('all')```

Set the cursor to position 10
```focus(10)```

### **undo()**_: boolean;_
Undo recent changes.

### **redo()**_: boolean;_
Reapply reverted changes.

### **destroy()**_: void;_
Destroy the editor.

## Events

### **on:init**
Triggered when the editor is initialized.

### **on:focus**
Triggered when the editor is focused.

### **on:blur**
Triggered when the editor looses focus.

### **on:change**
Triggered when the editors content changes.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/AntonyBoucher"><img src="https://avatars3.githubusercontent.com/u/69065091?v=4" width="100px;" alt=""/><br /><sub><b>AntonyBoucher</b></sub></a><br /><a href="https://github.com/TorstenDittmann/omnia-editor/commits?author=AntonyBoucher" title="Code">💻</a></td>
    <td align="center"><a href="https://torstendittmann.now.sh"><img src="https://avatars1.githubusercontent.com/u/1759475?v=4" width="100px;" alt=""/><br /><sub><b>Torsten Dittmann</b></sub></a><br /><a href="https://github.com/TorstenDittmann/omnia-editor/commits?author=TorstenDittmann" title="Tests">⚠️</a> <a href="https://github.com/TorstenDittmann/omnia-editor/commits?author=TorstenDittmann" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/dennistobar"><img src="https://avatars1.githubusercontent.com/u/1218182?v=4" width="100px;" alt=""/><br /><sub><b>Dennis Tobar</b></sub></a><br /><a href="https://github.com/TorstenDittmann/omnia-editor/commits?author=dennistobar" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!