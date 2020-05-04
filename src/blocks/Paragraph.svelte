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
  const onKeyDown = e => {
    if(e.which === 8 && data.text.length === 0) {
      dispatch("remove", e);
    }
  }
</script>

<style>
  .omnia-paragraph {
    display: inline-block;
    width: -webkit-fill-available;
    outline: 0;
  }
  .omnia-paragraph:empty:not(:focus):before {
    content: attr(placeholder);
    color: grey;
    font-style: italic;
  }
</style>

<div
  on:keydown={onKeyDown}
  class="omnia-block omnia-paragraph"
  contenteditable="true"
  bind:innerHTML={data.text}
  bind:this={element}
  {placeholder} />
