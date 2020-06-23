<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { hasFocus, isActive } from "../stores";

  export let data;
  export let focus = false;

  const placeholder = "Quote";
  const dispatch = createEventDispatcher();

  let element;

  $: {
    if (element && element === document.activeElement) {
      dispatch("change", data.text);
    }
  }
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
  };
  const onFocus = (e) => {
    focus = true;
    hasFocus.set(true);
  };
  const onFocusOut = (e) => {
    focus = false;
    hasFocus.set(false);
  };
</script>

<style>
  .omnia-quote {
    display: inline-block;
    width: -webkit-fill-available;
    outline: 0;
    text-align: center;
    font-style: italic;
  }
  .omnia-quote-blur {
    opacity: 0.4;
  }
  .omnia-quote:empty:not(:focus):before {
    content: attr(placeholder);
    color: grey;
    font-style: italic;
  }
</style>

<q
  class="omnia-block omnia-quote"
  class:omnia-quote-blur={!focus && $hasFocus}
  contenteditable="true"
  on:keydown={onKeyDown}
  on:focus={onFocus}
  on:focusout={onFocusOut}
  bind:this={element}
  bind:innerHTML={data.text}
  {placeholder}>
  ...
</q>
