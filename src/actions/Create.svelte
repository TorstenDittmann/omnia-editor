<script>
  import { createEventDispatcher } from "svelte";

  import IconTrash from "../icons/IconTrash.svelte";
  import IconCode from "../icons/IconCode.svelte";
  import IconParagraph from "../icons/IconParagraph.svelte";
  import IconQuote from "../icons/IconQuote.svelte";
  import IconHeading from "../icons/IconHeading.svelte";
  import IconMore from "../icons/IconMore.svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .omnia-create {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: auto;
    align-content: start;
  }
  .omnia-create:hover {
    opacity: 1;
  }
  .omnia-create .omnia-create-actions {
    opacity: 0;
    transition: opacity 0.1s linear;
  }
  .omnia-create:hover .omnia-create-actions {
    opacity: 1;
  }
  .omnia-create .omnia-create-hint {
    position: absolute;
    opacity: 1;
  }
  .omnia-create:hover .omnia-create-hint {
    opacity: 0;
  }
  .omnia-seperator {
    margin: 0 0.5rem;
  }
  button {
    flex: 0 0 auto;
  }
  button.remove {
    background: indianred;
  }
</style>

<div class="omnia-create">
  <div class="omnia-create-hint">
    <IconMore />
  </div>
  <div class="omnia-create-actions">
    <button on:click={() => dispatch('create', 'quote')}>
      <IconQuote />
    </button>
    <button on:click={() => dispatch('create', 'heading')}>
      <IconHeading />
    </button>
    <button on:click={() => dispatch('create', 'paragraph')}>
      <IconParagraph />
    </button>
    <button on:click={() => dispatch('create', 'code')}>
      <IconCode />
    </button>
    <span class="omnia-seperator">|</span>
    <button on:click={() => dispatch('remove')} class="remove">
      <IconTrash />
    </button>
  </div>
</div>
