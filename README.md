# omnia-editor
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

```bash
git clone https://github.com/torstendittmann/omnia-editor
cd omnia-editor
npm install # or yarn
```

## Implementing

```bash
npm i omnia-editor
# or
yarn add omnia-editor
```

```javascript
import Editor from "omnia-editor";
const editor = new Editor({
        target: document.getElementById("editor"),
        props: {
          active: true,
          spellCheck: true
       }
    });
```

## API

### `const editor = new Editor({opts})`
- __opts.target__ default: `none` An HTMLElement to render to. This option is required.
- __anchor__ default: `null` A child of target to render the component immediately before.
- __intro__ default: `false` If true, will play transitions on initial render, rather than waiting for subsequent state changes.
- __props__ default: `{}` An object of properties to supply to the component. See below.

#### `props`
- __data__ default: `{}` A JSON object to pass content.
- __active__ default: `true` If true, content can be edited.
- __spellCheck__ default: `false` If true, content can be edited.
- __placeholder__ default: `true` Placeholder for paragraphs.
- __confirmDelete__ default: `true` Confirm dialog before deleting a block.

### `editor.getContent()`
Gets the content from the editor as a JSON object.

### `editor.update()`
Re-initializes the instance.

### `editor.setActive(boolean)`
Enables or disables the editor.

### `editor.toggleFormat(tag)`
Formats the current selection with passed tag. Available tags:
- __bold__
- __underline__
- __italic__

### `editor.history.subscribe(callback)`
Subscribes to history changes.
```javascript
callback = {
  current: 0 //current history position
  data: [...] //history snapshots
}
```

### `editor.history.undo()`
Undo changes if possible.

### `editor.history.redo()`
Redo changes if possible.

### `editor.$destroy()`
Removes the instance from the DOM and triggers the `destroy` handler.

## Events

`editor.$on(event, callback)`
Causes the callback function to be called whenever the component dispatches an event.
A function is returned that will remove the event listener when called.
```javascript
const off = app.$on('change', event => {
	console.log("content changed");
});

off();
```
- __init__: Fires after loading the editor.
- __input__: Fires after keyboard input.
- __change__: Fires after the content was successfully changed.


## Consuming

The package.json has a `"svelte"` field pointing to `src/index.js`, which allows Svelte apps to import the source code directly, if they are using a bundler plugin like [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte) or [svelte-loader](https://github.com/sveltejs/svelte-loader) (where [`resolve.mainFields`](https://webpack.js.org/configuration/resolve/#resolve-mainfields) in your webpack config includes `"svelte"`). **This is recommended.**

For everyone else, `npm run build` will bundle omnia-editor's source code into a plain JavaScript module (`dist/index.mjs`) and a UMD script (`dist/index.js`).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/AntonyBoucher"><img src="https://avatars3.githubusercontent.com/u/69065091?v=4" width="100px;" alt=""/><br /><sub><b>AntonyBoucher</b></sub></a><br /><a href="https://github.com/TorstenDittmann/omnia-editor/commits?author=AntonyBoucher" title="Code">💻</a></td>
    <td align="center"><a href="https://torstendittmann.now.sh"><img src="https://avatars1.githubusercontent.com/u/1759475?v=4" width="100px;" alt=""/><br /><sub><b>Torsten Dittmann</b></sub></a><br /><a href="https://github.com/TorstenDittmann/omnia-editor/commits?author=TorstenDittmann" title="Tests">⚠️</a> <a href="https://github.com/TorstenDittmann/omnia-editor/commits?author=TorstenDittmann" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!