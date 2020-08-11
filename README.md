# omnia-editor
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
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
        target: document.getElementById("editor")
    });
```

## API

### `const editor = new Editor({opts})`
- __opts.target__ default: `none` An HTMLElement to render to. This option is required.
- __anchor__ default: `null` A child of target to render the component immediately before.
- __intro__ default: `false` If true, will play transitions on initial render, rather than waiting for subsequent state changes.
- __props__ default: `{}` An object of properties to supply to the component. See below.
- __props.content__ default: `{}` A JSON object to pass content.
- __props.active__ default: `true` If true, content can be edited.

### `editor.getContent()`
Gets the content from the editor as a JSON object.

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
- __change__: Fires after the content was changed.
- __destroy__: Fires after destroying the editor.
- __save__: Fires after clicking save in toolbar.


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
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!