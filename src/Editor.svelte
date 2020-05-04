<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { debounce } from "throttle-debounce";
  import { createPopper } from "@popperjs/core";
  import sanitizeHtml from "sanitize-html";

  import Paragraph from "./Paragraph.svelte";

  const dispatch = createEventDispatcher();

  let editorRef;
  let toolbarRef;
  let selectionRef;

  let selection;
  let popper;

  let toolbar = {
    show: false
  };

  export const autofocus = false;
  export const placeholder = "Let's write an awesome story!";

  const onInit = () => {
    dispatch("init", {});
  };

  const onChange = () => {
    sanitize();
    dispatch("change", {});
  };

  const onDestroy = () => {
    dispatch("destroy", {});
  };

  export const data = {
    count: {
      characters: 0,
      words: 0,
      sentences: 0
    }
  };

  export const getContent = () => {
    sanitize();
    return content;
  };

  export let content = {
    paragraphs: [
      {
        data: {
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. In ducimus sequi magni, quasi expedita debitis, ea tenetur quae vero illum placeat ullam omnis unde saepe. Nisi quo excepturi laudantium inventore."
        }
      }
    ]
  };

  onMount(() => {
    popper = createPopper(selectionRef, toolbarRef, {
      placement: "top"
    });

    selection = window.getSelection();

    editorRef.addEventListener("mouseup", handleSelection);
    editorRef.addEventListener("keyup", handleSelection);

    editorRef.addEventListener("mousedown", event => {
      toolbar.show = false;
    });

    onInit();
  });

  const sanitize = () => {
    content.paragraphs.map(paragraph => {
      paragraph.data.text = sanitizeHtml(paragraph.data.text, {
        allowedTags: ["b", "i", "em", "strong"]
      });
      return paragraph;
    });
  };

  const handleSelection = event => {
    if (!selection.isCollapsed) {
      const { left, top, width, height } = selection
        .getRangeAt(0)
        .getBoundingClientRect();

      selectionRef.style.left = `${left}px`;
      selectionRef.style.top = `${top}px`;
      selectionRef.style.width = `${width}px`;
      selectionRef.style.height = `${height}px`;

      popper.update();
      toolbar.show = true;
    } else {
      toolbar.show = false;
    }
  };
</script>

<style>
  .omnia-editor {
    width: -webkit-fill-available;
    margin-left: auto;
    margin-right: auto;
    font-family: Lora, sans-serif;
    font-size: 21px;
    line-height: 1.58;
    text-align: justify;
  }
  .omnia-editor-selection {
    position: absolute;
    pointer-events: none;
    z-index: -1;
  }
  .omnia-editor-toolbar .container {
    background-image: linear-gradient(
      to bottom,
      rgba(49, 49, 47, 0.99),
      #262625
    );
    background-repeat: repeat-x;
    border-radius: 5px;
    padding: 0 10px;
    color: white;
    line-height: 44px;
    display: inline-block;
    opacity: 0;
    pointer-events: none;
    transition: transform 0.2s ease-in-out;
  }
  .omnia-editor-toolbar .show {
    pointer-events: auto;
    animation: pop-upwards 180ms forwards linear;
    animation-delay: 0.2s;
    transition: opacity 0s linear 0.2s;
  }
  @keyframes pop-upwards {
    0% {
      transform: matrix(0.97, 0, 0, 1, 0, 12);
      opacity: 0;
    }

    20% {
      transform: matrix(0.99, 0, 0, 1, 0, 2);
      opacity: 0.7;
    }

    40% {
      transform: matrix(1, 0, 0, 1, 0, -1);
      opacity: 1;
    }

    70% {
      transform: matrix(1, 0, 0, 1, 0, 0);
      opacity: 1;
    }

    100% {
      transform: matrix(1, 0, 0, 1, 0, 0);
      opacity: 1;
    }
  }
</style>

<div class="omnia-editor" bind:this={editorRef}>
  {#each content.paragraphs as paragraph}
    <Paragraph bind:paragraph on:change={debounce(500, onChange)} />
  {/each}
</div>
<div class="omnia-editor-toolbar" bind:this={toolbarRef} role="tooltip">
  <div class="container" class:show={toolbar.show}>
    <span>1</span>
    <span>2</span>
    <span>3</span>
  </div>
</div>
<div class="omnia-editor-selection" bind:this={selectionRef} />
