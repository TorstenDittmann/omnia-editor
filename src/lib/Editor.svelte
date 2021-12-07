<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { Editor, FocusPosition } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import FloatingMenu from '@tiptap/extension-floating-menu';
	import Focus from '@tiptap/extension-focus';
	import TextAlign from '@tiptap/extension-text-align';

	import Float from './Float.svelte';
	import Tooltip from './Tooltip.svelte';

	/**
	 * Initial value of the content.
	 */
	export let value: string = '';
	/**
	 * TipTap instance of the Editor.
	 */
	export let editor: Editor = undefined;
	/**
	 * Use spellcheck.
	 */
	export let spellcheck: boolean = false;
	/**
	 * Get the document as JSON.
	 */
	export const getJSON = () => editor?.getJSON();
	/**
	 * Get the document as HTML.
	 */
	export const getHTML = () => editor?.getHTML();
	/**
	 * Get the number of characters for the current document.
	 */
	export const getCharacterCount = () => editor?.getCharacterCount();
	/**
	 * Returns `true` when Editor is focused.
	 */
	export const isFocused = () => editor?.isFocused;
	/**
	 * Returns `true` if there is no content.
	 */
	export const isEmpty = () => editor?.isEmpty;
	/**
	 * Removes focus from the editor.
	 */
	export const blur = () => editor?.commands.blur();
	/**
	 * Focus the editor at the given position.
	 *
	 * @param position
	 * Set the focus to the editor
	 * focus()
	 *
	 * Set the cursor to the first position
	 * focus('start')
	 *
	 * Set the cursor to the last position
	 * focus('end')
	 *
	 * Selects the whole document
	 * focus('all')
	 *
	 * Set the cursor to position 10
	 * focus(10)
	 */
	export const focus = (position?: FocusPosition) => editor?.commands.focus(position);
	/**
	 * Undo recent changes.
	 */
	export const undo = () => editor?.commands.undo();
	/**
	 * Reapply reverted changes
	 */
	export const redo = () => editor?.commands.redo();
	/**
	 * Destroy the editor.
	 */
	export const destroy = () => editor?.destroy();

	const dispatch = createEventDispatcher();

	let element: HTMLElement;
	let floating: HTMLElement;
	let tooltip: HTMLElement;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				BubbleMenu.configure({
					element: tooltip,
					tippyOptions: {
						placement: 'bottom'
					}
				}),
				FloatingMenu.configure({
					element: floating
				}),
				Focus.configure({
					className: 'focus'
				}),
				TextAlign.configure({
					types: ['heading', 'paragraph']
				})
			],
			content: value,
			onCreate: () => dispatch('init'),
			onFocus: () => dispatch('focus'),
			onBlur: () => dispatch('blur'),
			onUpdate: () => dispatch('change'),
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
			editor = null;
		}
	});
</script>

<div class="omnia-editor">
	<div
		{spellcheck}
		bind:this={element}
		autocapitalize="off"
		autocorrect={spellcheck ? 'on' : 'off'}
	>
		<div class="ProseMirror" />
	</div>
	<div bind:this={floating}>
		<Float {editor} />
	</div>
	<div bind:this={tooltip}>
		<Tooltip {editor} />
	</div>
</div>

<style lang="scss" global>
	@import 'sass/mixins';

	.omnia-editor {
		--omnia-editor-bg-color: white;
		--omnia-editor-text-color: black;
	}

	.ProseMirror {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		text-align: justify;
		background-color: var(--omnia-editor-bg-color);
		color: var(--omnia-editor-text-color);
		outline: 0;

		> * {
			font-family: inherit;
		}

		> p,
		blockquote {
			line-height: 2.5rem;
			padding: 0 1rem;

			@include on-mobile {
				padding: 0;
				line-height: 1.5rem;
			}
		}

		> blockquote {
			text-align: center;
			font-style: italic;
		}

		&.ProseMirror-focused {
			> * {
				transition: opacity 0.1s linear;
				&:not(.focus) {
					opacity: 0.4;
				}
			}
		}
	}
</style>
