<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { isActive } from "../stores";

  export let data;

  const placeholder = "Heading";
  const dispatch = createEventDispatcher();

  let element;

  $: {
    if (element) {
      element.contentEditable = $isActive;
    }
  }

  const onKeyDown = (e) => {
    if (e.which === 13) {
      e.preventDefault();
    }
    if (e.which === 8 && data.text.length === 0) {
      dispatch("remove", e);
    }
    if (element && element === document.activeElement) {
      dispatch("change", data.text);
    }
  };
</script>

<style>
  .omnia-heading {
    display: inline-block;
    width: 100%;
    outline: 0;
    text-align: center;
  }
  .omnia-heading:empty:not(:focus):before {
    content: attr(placeholder);
    color: grey;
    font-style: italic;
    pointer-events: none;
  }
</style>

<h1
  class="omnia-block omnia-heading"
  contenteditable="true"
  on:keydown={onKeyDown}
  bind:this={element}
  bind:innerHTML={data.text}
  {placeholder}>
  ...
</h1>
