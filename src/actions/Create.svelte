<script>
  import { createEventDispatcher } from "svelte";
  
  import IconTrash from "../icons/IconTrash.svelte";
  import IconCode from "../icons/IconCode.svelte";
  import IconParagraph from "../icons/IconParagraph.svelte";
  import IconQuote from "../icons/IconQuote.svelte";
  import IconHeading from "../icons/IconHeading.svelte";


  const dispatch = createEventDispatcher();
</script>

<style>
  .omnia-create {
    opacity: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: auto;
    align-content: start;
    transition: opacity 0.1s linear;
  }
  .omnia-create:hover {
    opacity: 1;
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
