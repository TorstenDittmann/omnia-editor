<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { debounce } from "throttle-debounce";
  import { createPopper } from "@popperjs/core";
  import sanitizeHtml from "sanitize-html";

  import Create from "./actions/Create.svelte";

  import Heading from "./blocks/Heading.svelte";
  import Paragraph from "./blocks/Paragraph.svelte";
  import Code from "./blocks/Code.svelte";

  const dispatch = createEventDispatcher();
  const blocks = {
    paragraph: Paragraph,
    heading: Heading,
    code: Code,
  };

  if (!window.process) {
    window.process = { env: {} };
  }
  document.execCommand("defaultParagraphSeparator", false, "br");

  let editorRef;
  let toolbarRef;

  let selection;
  let popper;

  let toolbar = {
    show: false,
  };

  export let active = true;
  export const autofocus = false;
  export let placeholder = "Let's write an awesome story!";

  export const data = {
    count: {
      characters: 0,
      words: 0,
      sentences: 0,
    },
  };

  export const getContent = () => {
    sanitize();
    return content;
  };

  export const setActive = (bool) => {
    active = bool;
  };

  export let content;

  onMount(() => {
    const rangeRef = new RangeRef();
    popper = createPopper(rangeRef, toolbarRef, {
      placement: "top",
    });

    selection = window.getSelection();
    rangeRef.rectChangedCallback = ({ width }) => {
      if (width > 0) {
        popper.update();
        toolbar.show = true;
      } else {
        toolbar.show = false;
      }
    };

    onInit();
  });

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

  const sanitize = () => {
    content.blocks.map((block) => {
      block.data.text = sanitizeHtml(block.data.text, {
        allowedTags: ["b", "i", "em", "strong", "br"],
      });
      return block;
    });
  };

  const getComponent = (type) => {
    return blocks[type];
  };

  const addBlock = (index, type) => {
    content.blocks.splice(index + 1, 0, {
      type: type,
      data: {
        text: "",
      },
    });
    onChange();
    refreshContent();
  };

  const removeBlock = (i) => {
    content.blocks.splice(i, 1);
    onChange();
    refreshContent();
  };

  const refreshContent = () => {
    content = content;
  };

  class RangeRef {
    constructor() {
      this.updateRect();

      const update = (evt, hide) => {
        let selection = document.getSelection();
        if (
          !selection.isCollapsed &&
          selection.baseNode &&
          selection.baseNode.parentNode.closest(".omnia-paragraph")
        ) {
          this.range =
            selection && selection.rangeCount && selection.getRangeAt(0);
          this.updateRect(hide);
        } else {
          toolbar.show = false;
        }
      };

      editorRef.addEventListener("mouseup", update);
      editorRef.addEventListener("keyup", update);
      window.addEventListener("scroll", update);
      document.scrollingElement.addEventListener("scroll", update);
    }

    updateRect(hide) {
      if (!hide && this.range) {
        this.rect = this.range.getBoundingClientRect();
      } else {
        this.rect = {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 0,
          height: 0,
        };
      }

      this.rectChangedCallback(this.rect);
    }

    rectChangedCallback() {
      // Abstract to be implemented
    }

    getBoundingClientRect() {
      return this.rect;
    }

    get clientWidth() {
      return this.rect.width;
    }

    get clientHeight() {
      return this.rect.height;
    }
  }
</script>

<style>
  .omnia-editor {
    width: -webkit-fill-available;
    margin-left: auto;
    margin-right: auto;
    font-family: Lora, sans-serif;
    font-size: 1.25rem;
    line-height: 2.5rem;
    text-align: justify;
  }
  :global(.omnia-block) {
    margin: 0.33 0;
  }
  .omnia-editor-toolbar .container {
    background-image: linear-gradient(
      to bottom,
      rgba(49, 49, 47, 0.99),
      #262625
    );
    background-repeat: repeat-x;
    border-radius: 5px;
    padding: 0.25rem 1rem;
    color: white;
    display: inline-block;
    opacity: 0;
    display: none;
    pointer-events: none;
    transition: transform 0.2s ease-in-out;
    fill: white;
  }
  .omnia-editor-toolbar .show {
    display: block;
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

<div class="omnia-editor" bind:this={editorRef} on:paste={sanitize}>
  {#each content.blocks as block, i}
    <svelte:component
      this={getComponent(block.type)}
      bind:data={block.data}
      bind:active
      on:change={debounce(500, onChange)}
      on:remove={() => removeBlock(i)}
      {placeholder} />
    {#if active}
      <Create
        on:create={(e) => addBlock(i, e.detail)}
        on:remove={() => removeBlock(i)} />
    {/if}
  {/each}
</div>
<div class="omnia-editor-toolbar" bind:this={toolbarRef} role="tooltip">
  <div class="container" class:show={toolbar.show}>
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5
          4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8
          13v5h5.5a2.5 2.5 0 1 0 0-5H8z" />
      </svg>
    </span>
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" />
      </svg>
    </span>
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" />
      </svg>
    </span>
  </div>
</div>
