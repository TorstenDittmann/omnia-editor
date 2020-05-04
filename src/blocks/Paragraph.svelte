<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let data;
  export let placeholder;

  const dispatch = createEventDispatcher();

  let element;

  $: {
    if (element && element === document.activeElement) {
      dispatch("change", data.text);
    }
  }
</script>

<style>
  .omnia-paragraph {
    display: inline-block;
    width: -webkit-fill-available;
  }
  .omnia-paragraph:empty:not(:focus):before {
    content: attr(placeholder);
    color: grey;
    font-style: italic;
  }
</style>

<div
  class="omnia-paragraph"
  contenteditable="true"
  bind:innerHTML={data.text}
  bind:this={element}
  {placeholder} />
