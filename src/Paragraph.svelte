<script>
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  export let paragraph;
  export let element;

  $: {
    if (element && element === document.activeElement) {
      dispatch("change", paragraph);
    }
  }
</script>

<style>
  .omnia-paragraph {
    display: inline-block;
    width: -webkit-fill-available;
  }
</style>

<div
  class="omnia-paragraph"
  contenteditable="true"
  bind:innerHTML={paragraph.data.text}
  bind:this={element} />
