<script lang="ts">
	import { OmniaEditor } from '$lib';

	let editor: OmniaEditor;

</script>

<button on:click={() => console.log(editor.getJSON())}>Get JSON</button>
<button on:click={() => console.log(editor.getHTML())}>Get HTML</button>
<button on:click={() => alert(editor.getCharacterCount())}>Get Charcount</button>
<OmniaEditor bind:this={editor} />
