<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let data;

  const placeholder = "Title";
  const dispatch = createEventDispatcher();

  let element;

  $: {
    if (element && element === document.activeElement) {
      dispatch("change", data.text);
    }
  }
</script>

<style>
  .omnia-title {
    display: inline-block;
    width: -webkit-fill-available;
  }
  .omnia-title:empty:not(:focus):before {
    content: attr(placeholder);
    color: grey;
    font-style: italic;
  }
</style>

<h1
  class="omnia-title"
  contenteditable="true"
  bind:this={element}
  {placeholder}>
  {data.text}
</h1>
