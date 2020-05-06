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
  const onKeyDown = e => {
    if (e.which === 8 && data.text.length === 0) {
      dispatch("remove", e);
    }
  };
</script>

<style>
  .omnia-heading {
    display: inline-block;
    width: -webkit-fill-available;
    outline: 0;
    text-align: center;
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
  on:keydown={onKeyDown}
  bind:this={element}
  bind:innerHTML={data.text}
  {placeholder} />
