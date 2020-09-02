<script>
  import { createEventDispatcher } from "svelte";
  import { hasFocus, isActive } from "../stores";
  import { editable, contenteditable } from "../helpers";

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

  editable.on("focus", (elem) => {
    if (elem === element) {
      focus = true;
      hasFocus.set(true);
    }
  });

  editable.on("blur", (elem) => {
    if (elem === element) {
      focus = false;
      hasFocus.set(false);
    }
  });

  editable.on("change", (elem) => {
    if (elem === element) {
      dispatch("change", { index, content: editable.getContent(elem) });
    }
  });
</script>

<style>
  .omnia-paragraph {
    display: inline-block;
    width: -webkit-fill-available;
    outline: 0;
    transition: opacity 0.1s linear;
    padding: 0 1rem;
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
  data-index={index}
  data-type="paragraph"
  class:omnia-paragraph-blur={!focus && $hasFocus}
  class="omnia-paragraph"
  use:contenteditable
  contenteditable="true"
  bind:innerHTML={data.text}
  bind:this={element}
  {placeholder} />
