<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let data;

  const placeholder = "Heading";
  const dispatch = createEventDispatcher();

  let element;

  $: {
    if (element && element === document.activeElement) {
      dispatch("change", data.text);
    }
  }
</script>

<style>
  .omnia-heading {
    display: inline-block;
    width: -webkit-fill-available;
    outline: 0;
  }
  .omnia-heading:empty:not(:focus):before {
    content: attr(placeholder);
    color: grey;
    font-style: italic;
  }
</style>

<h1
  class="omnia-block omnia-heading"
  contenteditable="true"
  bind:this={element}
  bind:innerHTML={data.text}
  {placeholder}>
</h1>
