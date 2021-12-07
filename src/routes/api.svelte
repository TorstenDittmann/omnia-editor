<script lang="ts">
	import { OmniaEditor } from '$lib';

	let editor: OmniaEditor;
	let editorCount: OmniaEditor;

	let value =
		'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit libero volutpat sed cras. Purus semper eget duis at.</p>';

	let output = '';

	const getJSON = () => {
		output = JSON.stringify(editor.getJSON());
	};
	const getHTML = () => {
		output = editor.getHTML();
	};
</script>

<h1>Output</h1>
<button on:click={getJSON}>Get JSON</button>
<button on:click={getHTML}>Get HTML</button>
{#if output}
	<textarea cols="30" rows="10" bind:value={output} />
{/if}
<OmniaEditor bind:this={editor} {value} />

<h1>History</h1>

<button on:click={editorCount.undo}>Undo</button>
<button on:click={editorCount.redo}>Redo</button>
<OmniaEditor bind:this={editorCount} {value} />
