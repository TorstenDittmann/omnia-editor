<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import IconHeading from './icons/IconHeading.svelte';
	import IconCode from './icons/IconCode.svelte';
	import IconParagraph from './icons/IconParagraph.svelte';
	import IconQuote from './icons/IconQuote.svelte';

	export let editor: Editor = undefined;
	export let tooltip: boolean = false;
</script>

<div class="omnia-create" class:tooltip>
	{#if editor}
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			class:active={editor.isActive('heading', { level: 1 })}
		>
			<IconHeading />
		</button>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class:active={editor.isActive('heading', { level: 2 })}
		>
			<IconHeading />
		</button>
		<button
			on:click={() => editor.chain().focus().toggleBlockquote().run()}
			class:active={editor.isActive('blockquote')}
		>
			<IconQuote />
		</button>
		<button
			on:click={() => editor.chain().focus().toggleCodeBlock().run()}
			class:active={editor.isActive('codeBlock')}
		>
			<IconCode />
		</button>
		<button
			on:click={() => editor.chain().focus().setParagraph().run()}
			class:active={editor.isActive('paragraph')}
		>
			<IconParagraph />
		</button>
	{/if}
</div>

<style lang="scss">
	.omnia-create {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-items: auto;
		align-content: start;

		&.tooltip {
			background-color: white;
			filter: drop-shadow(0 0 0.1rem grey);
		}
	}

	button {
		flex: 0 0 auto;
		background: none;
		border: none;
		cursor: pointer;
		transition: transform 0.1s;
		opacity: 0.4;

		&.active,
		&:hover:not(:focus) {
			opacity: 1;
		}
	}
	button:hover {
		transform: scale(1.2);
	}
</style>
