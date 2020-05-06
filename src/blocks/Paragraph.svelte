<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { hasFocus } from "../stores";

  export let data;
  export let placeholder;
  export let focus = false;

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
  const onFocus = e => {
    focus = true;
    hasFocus.set(true);
  };
  const onFocusOut = e => {
    focus = false;
    hasFocus.set(false);
  };
</script>

<style>
  .omnia-paragraph {
    display: inline-block;
    width: -webkit-fill-available;
    outline: 0;
    transition: opacity .1s linear;
  }
  .omnia-paragraph-blur {
    opacity: 0.2;
  }
  .omnia-paragraph:empty:not(:focus):before {
    content: attr(placeholder);
    color: grey;
    font-style: italic;
  }
</style>

<div
  on:keydown={onKeyDown}
  on:focus={onFocus}
  on:focusout={onFocusOut}
  class:omnia-paragraph-blur={!focus && $hasFocus}
  class="omnia-block omnia-paragraph"
  contenteditable="true"
  bind:innerHTML={data.text}
  bind:this={element}
  {placeholder} />
