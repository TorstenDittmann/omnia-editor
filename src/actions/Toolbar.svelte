<script>
  import { createEventDispatcher } from "svelte";

  import IconSave from "../icons/IconSave.svelte";
  import IconItalic from "../icons/IconItalic.svelte";
  import IconsBold from "../icons/IconsBold.svelte";
  import IconUnderline from "../icons/IconUnderline.svelte";
  import IconPreview from "../icons/IconPreview.svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .omnia-toolbar {
    position: sticky;
    width: 100%;
    top: 0;
    background-color: inherit;
    display: flex;
    justify-content: center;
    z-index: 10;
  }
  button {
    margin: 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: transform .1s;
  }
  button:hover {
    transform: scale(1.2);
  }
</style>

<div class="omnia-toolbar">
  <button on:click={() => dispatch('undoHistory')}>
    <IconsBold />
  </button>
  <button on:click={() => dispatch('redoHistory')}>
    <IconItalic />
  </button>
  <button on:click={() => document.execCommand('underline')}>
    <IconUnderline />
  </button>
  <button on:click={() => dispatch('preview')}>
    <IconPreview />
  </button>
  <button on:click={() => dispatch('save')}>
    <IconSave />
  </button>
</div>
