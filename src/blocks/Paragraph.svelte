<script>
  import { createEventDispatcher } from "svelte";
  import { hasFocus, isActive } from "../stores";

  export let index;
  export let data;
  export let placeholder;
  export let focus = false;

  const dispatch = createEventDispatcher();

  let element;

  $: {
    if (element) {
      element.contentEditable = $isActive;
    }
  }

  const onKeyDown = (e) => {
    if (e.which === 8) {
      if (data.text.length === 0) {
        e.preventDefault();
        dispatch("remove", e);
      } else if (window.getSelection().anchorOffset === 0) {
        e.preventDefault();
        dispatch("join", -1);
      }
    }
    if (
      e.which === 46 &&
      data.text.length === window.getSelection().anchorOffset
    ) {
      e.preventDefault();
      dispatch("join", 1);
    }
    if (e.which === 13 && data.text.length !== 0) {
      e.preventDefault();
      dispatch("split", window.getSelection().anchorOffset);
    }
    if (element && element === document.activeElement) {
      dispatch("change", data.text);
    }
  };
  const onFocus = () => {
    focus = true;
    hasFocus.set(true);
  };
  const onFocusOut = () => {
    focus = false;
    hasFocus.set(false);
  };
</script>

<style>
  .omnia-paragraph {
    display: inline-block;
    width: -webkit-fill-available;
    outline: 0;
    transition: opacity 0.1s linear;
    padding: 0 5%;
  }
  .omnia-paragraph-blur {
    opacity: 0.4;
  }
  .omnia-paragraph:empty:not(:focus):before {
    content: attr(placeholder);
    color: grey;
    font-style: italic;
    pointer-events: none;
  }
  @media (max-width: 960px) {
    .omnia-paragraph {
      padding: 0;
    }
  }
</style>

<div
  id={`omnia-paragraph-${index}`}
  on:keydown={onKeyDown}
  on:focus={onFocus}
  on:focusout={onFocusOut}
  class:omnia-paragraph-blur={!focus && $hasFocus}
  class="omnia-block omnia-paragraph"
  contenteditable="true"
  bind:innerHTML={data.text}
  bind:this={element}
  {placeholder} />
