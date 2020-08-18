<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { debounce } from "throttle-debounce";
  import { isActive, content, historyStore } from "./stores";
  import { editable, format } from "./helpers";
  import deepClone from "deep-clone";

  import Create from "./actions/Create.svelte";
  import Toolbar from "./actions/Toolbar.svelte";

  import Heading from "./blocks/Heading.svelte";
  import Paragraph from "./blocks/Paragraph.svelte";
  import Code from "./blocks/Code.svelte";
  import Quote from "./blocks/Quote.svelte";

  export const history = historyStore();
  export let active = true;
  export let toolbar = false;
  export let placeholder = "Let's write an awesome story!";
  export let confirmDelete = "Are you sure?";
  export let data;

  let editor;

  const dispatch = createEventDispatcher();
  const blocks = {
    paragraph: Paragraph,
    heading: Heading,
    code: Code,
    quote: Quote,
  };

  export const toggleFormat = (tag) => {
    format(tag);
  };

  export const getContent = () => {
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
    if (data && data.blocks) {
      $content = deepClone(data);
    }
    history.add();
    dispatch("init");
  };

  const emit = {
    change: debounce(500, () => {
      history.add();
      dispatch("change", $content);
    }),
    destroy: () => {
      dispatch("destroy", $content);
    },
  };

  const addBlock = (index, type) => {
    $content.blocks.splice(index + 1, 0, {
      type: type,
      data: {
        text: "",
      },
    });
    fireChange(true);
  };

  const removeBlock = (i, force) => {
    if (force || !$content.blocks[i].data.text || confirm(confirmDelete)) {
      $content.blocks.splice(i, 1);
      fireChange(true);
    }
  };

  const fireChange = (refresh) => {
    emit.change();
    refresh && ($content = $content);
  };

  const handleChange = (e) => {
    $content.blocks[e.detail.index].data.text = e.detail.content;
    fireChange(false);
  };

  onMount(onInit);
  onDestroy(emit.destroy);

  const getComponent = (type) => {
    return blocks[type];
  };

  editable.on("split", (elem, before, after, cursor) => {
    //TODO: before and after are block fragments with the content from before and after the cursor in it.
    console.log({ elem, before, after, cursor });
  });

  editable.on("merge", (elem, direction, cursor) => {
    //TODO: Fired when the user pressed forward delete (⌦) at the end or backspace (⌫) at the beginning of a block
    if (direction === "after") {
      console.log({ elem, direction, cursor });
    } else if (direction === "before") {
      console.log({ elem, direction, cursor });
    }
  });

  editable.on("insert", (elem, direction, cursor) => {
    //TODO: Fired when the user presses enter (⏎) to insert a newline.
    console.log({ elem, direction, cursor });
  });

  editable.on("paste", (elem, blocks, cursor) => {
    console.log({ elem, blocks, cursor });
    //TODO:blocks is an array of strings preprocessed by editable.js.
    // If the pasted content contains HTML it is split up by block level elements and cleaned and normalized.
  });
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

<div class="omnia-editor" bind:this={editor}>
  {#if toolbar}
    <Toolbar on:preview={() => setActive(!$isActive)} />
  {/if}
  {#if $content && $content.blocks}
    {#each $content.blocks as block, i}
      <svelte:component
        this={getComponent(block.type)}
        index={i}
        data={deepClone(block.data)}
        on:change={handleChange}
        on:remove={() => removeBlock(i, true)}
        {placeholder} />
      {#if $isActive}
        <Create
          on:create={(e) => addBlock(i, e.detail)}
          on:remove={() => removeBlock(i, false)} />
      {/if}
    {/each}
    {#if $content.blocks.length === 0 && $isActive}
      <Create
        on:create={(e) => addBlock(0, e.detail)}
        on:remove={() => removeBlock(0, false)} />
    {/if}
  {/if}
</div>
