<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import FloatingMenu from '@tiptap/extension-floating-menu';
	import Focus from '@tiptap/extension-focus';

	import Float from './Float.svelte';
	import Tooltip from './Tooltip.svelte';

	export let editor: Editor = undefined;
	export let spellcheck: boolean = false;

	const dispatch = createEventDispatcher();
	let element: HTMLElement, floating: HTMLElement, tooltip: HTMLElement;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				BubbleMenu.configure({
					element: tooltip
				}),
				FloatingMenu.configure({
					element: floating
				}),
				Focus.configure({
					className: 'focus'
				})
			],
			content: `
				<h1>omnia-editor</h1>
				<pre><code>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit libero volutpat sed cras. Purus semper eget duis at. Mi eget mauris pharetra et ultrices neque. Aliquet bibendum enim facilisis gravida neque convallis. Tellus id interdum velit laoreet id. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Magna eget est lorem ipsum dolor. Quam quisque id diam vel quam elementum pulvinar. Amet venenatis urna cursus eget nunc scelerisque viverra. Felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Dui ut ornare lectus sit. Nulla facilisi cras fermentum odio eu feugiat. A erat nam at lectus urna. Nam aliquam sem et tortor consequat. Mi proin sed libero enim sed faucibus turpis in. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Ultricies mi eget mauris pharetra et ultrices. Semper viverra nam libero justo. Tempus quam pellentesque nec nam.</code></pre>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit libero volutpat sed cras. Purus semper eget duis at. Mi eget mauris pharetra et ultrices neque. Aliquet bibendum enim facilisis gravida neque convallis. Tellus id interdum velit laoreet id. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Magna eget est lorem ipsum dolor. Quam quisque id diam vel quam elementum pulvinar. Amet venenatis urna cursus eget nunc scelerisque viverra. Felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Dui ut ornare lectus sit. Nulla facilisi cras fermentum odio eu feugiat. A erat nam at lectus urna. Nam aliquam sem et tortor consequat. Mi proin sed libero enim sed faucibus turpis in. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Ultricies mi eget mauris pharetra et ultrices. Semper viverra nam libero justo. Tempus quam pellentesque nec nam.</p>
				<h1>Lorem Ipsum</h1>
				<p>Id donec ultrices tincidunt arcu non sodales. Eget mauris pharetra et ultrices neque ornare aenean. Risus commodo viverra maecenas accumsan lacus. Vitae tempus quam pellentesque nec nam aliquam sem et. Mauris nunc congue nisi vitae suscipit tellus. Commodo ullamcorper a lacus vestibulum. Auctor augue mauris augue neque gravida in fermentum. Dictumst quisque sagittis purus sit amet. Convallis convallis tellus id interdum velit laoreet id. Scelerisque eu ultrices vitae auctor eu augue. Eu non diam phasellus vestibulum lorem sed risus ultricies tristique. Nec ullamcorper sit amet risus nullam. Euismod lacinia at quis risus.</p>
				<p>Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Est ultricies integer quis auctor. Cum sociis natoque penatibus et magnis dis parturient. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Ut placerat orci nulla pellentesque dignissim enim. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Sit amet volutpat consequat mauris nunc congue nisi vitae suscipit. Fermentum odio eu feugiat pretium nibh ipsum. Aliquet nibh praesent tristique magna sit. Porttitor eget dolor morbi non arcu risus quis varius quam. Diam in arcu cursus euismod quis viverra nibh. Mattis pellentesque id nibh tortor id aliquet.</p>
				<p>Enim lobortis scelerisque fermentum dui faucibus in ornare quam. Tempus iaculis urna id volutpat lacus laoreet non. Orci a scelerisque purus semper eget duis at tellus. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Ut etiam sit amet nisl. Id semper risus in hendrerit gravida rutrum quisque non tellus. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Vitae sapien pellentesque habitant morbi tristique senectus. Gravida quis blandit turpis cursus in hac. Lacus viverra vitae congue eu consequat ac felis. Vitae justo eget magna fermentum iaculis eu. Eros donec ac odio tempor. Lacus viverra vitae congue eu. Pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Maecenas accumsan lacus vel facilisis volutpat.</p>
				`,
			onCreate: () => dispatch('init'),
			onFocus: () => dispatch('focus'),
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				dispatch('change', editor);
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<button on:click={() => console.log(editor.getJSON())}>Get JSON</button>
<button on:click={() => console.log(editor.getHTML())}>Get HTML</button>
<div
	class="omnia-editor"
	bind:this={element}
	{spellcheck}
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

<style lang="scss" global>
	.ProseMirror {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		text-align: justify;
		background-color: inherit;
		outline: 0;

		> * {
			font-family: inherit;
		}

		> h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			text-align: center;
		}

		> p,
		blockquote {
			line-height: 2.5rem;
			padding: 0 1rem;
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
	@media (max-width: 960px) {
		.ProseMirror {
			line-height: 2rem;
		}
	}
</style>
