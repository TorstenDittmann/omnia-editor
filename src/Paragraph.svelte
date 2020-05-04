<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let paragraph;

  $: {
    dispatch("change", paragraph);
  }
</script>

<style>
  .omnia-paragraph {
    display: inline-block;
    width: -webkit-fill-available;
  }
</style>
<div class="omnia-paragraph" contenteditable="true" bind:innerHTML={paragraph.text} />
