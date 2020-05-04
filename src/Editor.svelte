<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { debounce } from "throttle-debounce";
  import { createPopper } from "@popperjs/core";
  import sanitizeHtml from "sanitize-html";

  import Create from "./actions/Create.svelte";

  import Heading from "./blocks/Heading.svelte";
  import Paragraph from "./blocks/Paragraph.svelte";

  const dispatch = createEventDispatcher();
  const blocks = {
    paragraph: Paragraph,
    heading: Heading
  };

  if (!window.process) {
    window.process = { env: {} };
  }
  document.execCommand("defaultParagraphSeparator", false, "br");

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

  export let content;

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
    content.blocks.map(block => {
      block.data.text = sanitizeHtml(block.data.text, {
        allowedTags: ["b", "i", "em", "strong", "br"]
      });
      return block;
    });
  };

  const handleSelection = event => {
    if (!selection.isCollapsed && !!selection.baseNode.parentNode.closest(".omnia-block")) {
      const { left, top, width, height } = selection.getRangeAt(0).getBoundingClientRect();

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

  const getComponent = type => {
    return blocks[type];
  };

  const addBlock = type => {
    content.blocks.push({
      type: type,
      data: {
        text: ""
      }
    })
    content = content; // just for svelte <3
  }
  const removeBlock = i => {
      content.blocks.splice(i, 1);
      content = content;
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
  .omnia-editor-selection {
    position: absolute;
    pointer-events: none;
    z-index: -1;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
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
    display: none;
    pointer-events: none;
    transition: transform 0.2s ease-in-out;
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

<div class="omnia-editor" bind:this={editorRef}>
  {#each content.blocks as block,i}
    <svelte:component
      this={getComponent(block.type)}
      bind:data={block.data}
      on:change={debounce(500, onChange)}
      on:remove={() => removeBlock(i)}
      {placeholder} />
  {/each}
  <Create on:create={e => addBlock(e.detail)} />
</div>
<div class="omnia-editor-toolbar" bind:this={toolbarRef} role="tooltip">
  <div class="container" class:show={toolbar.show}>
    <span>1</span>
    <span>2</span>
    <span>3</span>
  </div>
</div>
<div class="omnia-editor-selection" bind:this={selectionRef} />
