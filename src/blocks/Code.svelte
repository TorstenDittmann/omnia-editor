<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { hasFocus } from "../stores";

  export let data;
  export let placeholder;
  export let focus = false;
  export let active;

  const dispatch = createEventDispatcher();

  let element;

  $: {
    if (element && element === document.activeElement) {
      dispatch("change", data.text);
    }
  }

  $: {
    if(element) {
      element.contentEditable = active;
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
  .omnia-code {
    display: inline-block;
    width: -webkit-fill-available;
    outline: 0;
    transition: opacity 0.1s linear;
    text-align: left;
  }
  .omnia-code-blur {
    opacity: 0.4;
  }
  .omnia-code:empty:not(:focus):before {
    content: attr(placeholder);
    color: grey;
    font-style: italic;
  }
</style>

<code
  on:keydown={onKeyDown}
  on:focus={onFocus}
  on:focusout={onFocusOut}
  class:omnia-code-blur={!focus && $hasFocus}
  class="omnia-block omnia-code"
  contenteditable="true"
  bind:innerHTML={data.text}
  bind:this={element}
  {placeholder} />
