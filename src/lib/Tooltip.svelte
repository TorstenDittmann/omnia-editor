<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import IconHeading from './icons/IconHeading.svelte';
	import IconCode from './icons/IconCode.svelte';
	import IconParagraph from './icons/IconParagraph.svelte';
	import IconQuote from './icons/IconQuote.svelte';

	export let editor: Editor = undefined;
</script>

<div class="omnia-tooltip">
	{#if editor}
		<button
			on:click={() => editor.chain().focus().toggleBold().run()}
			class:active={editor.isActive('bold')}
		>
			Bold
		</button>
		<button
			on:click={() => editor.chain().focus().toggleItalic().run()}
			class:active={editor.isActive('italic')}
		>
			Italic
		</button>
		<button
			on:click={() => editor.chain().focus().toggleStrike().run()}
			class:active={editor.isActive('strike')}
		>
			Strike
		</button>
		<button
			on:click={() => editor.chain().focus().setTextAlign('left').run()}
			class:active={editor.isActive('strike')}
		>
			Left
		</button>
		<button
			on:click={() => editor.chain().focus().setTextAlign('center').run()}
			class:active={editor.isActive('strike')}
		>
			Center
		</button>
		<button
			on:click={() => editor.chain().focus().setTextAlign('right').run()}
			class:active={editor.isActive('strike')}
		>
			Right
		</button>

		<span>|</span>
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
		<button
			on:click={() => editor.chain().focus().toggleBlockquote().run()}
			class:active={editor.isActive('blockquote')}
		>
			<IconQuote />
		</button>
	{/if}
</div>

<style lang="scss">
	.omnia-tooltip {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-items: auto;
		align-content: start;
		background-color: var(--omnia-editor-bg-color);
		color: var(--omnia-editor-text-color);
		filter: drop-shadow(0 0 0.1rem grey);
	}

	button {
		flex: 0 0 auto;
		background: none;
		border: none;
		cursor: pointer;
		transition: transform 0.1s;
		opacity: 0.4;
		color: var(--omnia-editor-text-color);

		&.active,
		&:hover:not(:focus) {
			opacity: 1;
		}

		:global(svg) {
			fill: var(--omnia-editor-text-color);
		}
	}
	button:hover {
		transform: scale(1.2);
	}
</style>
