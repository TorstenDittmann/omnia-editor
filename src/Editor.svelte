<script>
  import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
  import { debounce } from "throttle-debounce";
  import deepClone from "deep-clone";
  import { isActive } from "./stores";
  import sanitizeHtml from "sanitize-html";

  import Create from "./actions/Create.svelte";
  import Toolbar from "./actions/Toolbar.svelte";

  import Heading from "./blocks/Heading.svelte";
  import Paragraph from "./blocks/Paragraph.svelte";
  import Code from "./blocks/Code.svelte";
  import Quote from "./blocks/Quote.svelte";

  export let active = true;
  export let toolbar = false;
  export let placeholder = "Let's write an awesome story!";
  export let confirmDelete = "Are you sure?";
  export let data;
  export let currentHistory = 0;
  export const history = [];

  export const getContent = () => {
    sanitize();
    return content;
  };

  export const setActive = (bool) => {
    $isActive = bool;
  };

  export const update = () => {
    onInit();
  };

  export const undo = () => {
    if (currentHistory >= history.length - 1) return false;
    currentHistory++;
    content = history[currentHistory];
    onChange();
  };

  export const redo = () => {
    if (currentHistory < 1) return false;
    content = history[--currentHistory];
    onChange();
  };

  let editor;
  let content;

  const dispatch = createEventDispatcher();
  const blocks = {
    paragraph: Paragraph,
    heading: Heading,
    code: Code,
    quote: Quote,
  };

  const onInit = () => {
    $isActive = active;
    content =
      data === undefined || data.blocks === undefined
        ? {
            blocks: [
              {
                type: "paragraph",
                data: {
                  text: "",
                },
              },
            ],
          }
        : data;
    addHistory();
    dispatch("init", {});
  };

  const onChange = () => {
    sanitize();
    dispatch("change", content);
  };

  const onDestroy = () => {
    dispatch("destroy", content);
  };

  const onSave = () => {
    sanitize();
    dispatch("save", content);
  };

  const sanitize = () => {
    content.blocks.map((block) => {
      block.data.text = sanitizeHtml(block.data.text, {
        allowedTags: ["b", "i", "em", "strong", "br", "u"],
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
    fireChange();
  };

  const removeBlock = (i, force) => {
    if (force || !content.blocks[i].data.text || confirm(confirmDelete)) {
      content.blocks.splice(i, 1);
      fireChange();
    }
  };

  const splitBlock = async (i, offset) => {
    let currentText = content.blocks[i].data.text;
    content.blocks[i].data.text = currentText.substring(0, offset).trim();
    addBlock(i, "paragraph");
    content.blocks[i + 1].data.text = currentText
      .substring(offset, currentText.length)
      .trim();
    await tick();
    document.getElementById(`omnia-paragraph-${i + 1}`).focus();
  };

  const joinBlock = async (i, direction) => {
    if (
      content.blocks[i + direction] === undefined ||
      content.blocks[i + direction].type !== "paragraph"
    ) {
      return false;
    }
    const range = document.createRange();
    const newBlock = direction === -1 ? i + direction : i;
    const newPosition = content.blocks[newBlock].data.text.length;

    content.blocks[newBlock].data.text +=
      content.blocks[direction === 1 ? i + direction : i].data.text;

    removeBlock(direction === 1 ? i + direction : i, true);
    await tick();

    const currentElement = document.getElementById(
      `omnia-paragraph-${newBlock}`
    );
    currentElement.focus();
    range.setStart(currentElement.firstChild, newPosition);
    range.setEnd(currentElement.firstChild, newPosition);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const refreshContent = () => {
    content = content;
  };

  const addHistory = () => {
    history.unshift(deepClone(content));
    currentHistory = 0;
    if (history.length > 10) {
      history.pop();
    }
  };

  const fireChange= () => {
    onChange();
    addHistory();
    refreshContent()
  }

  onMount(onInit);
  onDestroy(onDestroy);
</script>

<style>
  .omnia-editor {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    line-height: 2.5rem;
    text-align: justify;
    background-color: inherit;
  }
  @media (max-width: 960px) {
    .omnia-editor {
      line-height: 2rem;
    }
  }
  :global(.omnia-block) {
    margin: 0.33 0;
  }
</style>

<div class="omnia-editor" bind:this={editor} on:paste={sanitize}>
  {#if toolbar}
    <Toolbar
      on:save={onSave}
      on:preview={() => setActive(!$isActive)} />
  {/if}
  {#if content && content.blocks}
    {#each content.blocks as block, i}
      <svelte:component
        this={getComponent(block.type)}
        index={i}
        bind:data={block.data}
        on:change={debounce(500, fireChange)}
        on:split={(e) => splitBlock(i, e.detail)}
        on:join={(e) => joinBlock(i, e.detail)}
        on:remove={() => removeBlock(i, true)}
        {placeholder} />
      {#if $isActive}
        <Create
          on:create={(e) => addBlock(i, e.detail)}
          on:remove={() => removeBlock(i, false)} />
      {/if}
    {/each}
    {#if content.blocks.length === 0 && $isActive}
      <Create
        on:create={(e) => addBlock(0, e.detail)}
        on:remove={() => removeBlock(0, false)} />
    {/if}
  {/if}
</div>
