<script>
  import { onMount, createEventDispatcher, tick } from "svelte";
  import { debounce } from "throttle-debounce";
  import { isActive } from "./stores";
  import sanitizeHtml from "sanitize-html";

  import Create from "./actions/Create.svelte";
  import Toolbar from "./actions/Toolbar.svelte";

  import Heading from "./blocks/Heading.svelte";
  import Paragraph from "./blocks/Paragraph.svelte";
  import Code from "./blocks/Code.svelte";
  import Quote from "./blocks/Quote.svelte";

  const dispatch = createEventDispatcher();
  const blocks = {
    paragraph: Paragraph,
    heading: Heading,
    code: Code,
    quote: Quote,
  };

  document.execCommand("defaultParagraphSeparator", false, "br");

  let editor;

  export let active = true;
  export let toolbar = false;
  export let placeholder = "Let's write an awesome story!";

  export let data;

  let content;

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

  const removeBlock = (i, force) => {
    if (force || confirm("Are you sure?")) {
      content.blocks.splice(i, 1);
      onChange();
      refreshContent();
    }
  };

  const splitBlock = async (i, offset) => {
    let currentText = content.blocks[i].data.text;
    content.blocks[i].data.text = currentText.substring(0,offset);
    addBlock(i, "paragraph");
    content.blocks[i+1].data.text = currentText.substring(offset, currentText.length - 1);
    await tick();
    document.getElementById(`omnia-paragraph-${i+1}`).focus();
  }

  const refreshContent = () => {
    content = content;
  };

  onMount(onInit);
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
    <Toolbar on:save={onSave} on:preview={() => setActive(!$isActive)} />
  {/if}
  {#if content && content.blocks}
    {#each content.blocks as block, i}
      <svelte:component
        index={i}
        this={getComponent(block.type)}
        bind:data={block.data}
        on:change={debounce(500, onChange)}
        on:split={e => splitBlock(i, e.detail)}
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
