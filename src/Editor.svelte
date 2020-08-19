<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { debounce } from "throttle-debounce";
  import { isActive, content, historyStore, defaultData } from "./stores";
  import { format } from "./helpers";
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

  let editor;

  const dispatch = createEventDispatcher();
  const blocks = {
    paragraph: Paragraph,
    heading: Heading,
    code: Code,
    quote: Quote,
  };

  const onInit = () => {
    $isActive = active;
    if (data && data.blocks) {
      $content = deepClone(data);
    } else {
      $content = deepClone(defaultData);
    }
    history.reset();
    dispatch("init");
  };

  const handleChange = (e) => {
    $history.active = true;
    $content.blocks[e.detail.index].data.text = e.detail.content;
  };

  const getComponent = (type) => {
    return blocks[type];
  };

  onMount(onInit);

  content.subscribe(
    debounce(500, () => {
      $history.active && history.add();
      dispatch("change", $content);
    })
  );
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
        on:remove={() => content.removeBlock(i, true, confirmDelete)}
        {placeholder} />
      {#if $isActive}
        <Create
          on:create={(e) => content.addBlock(i + 1, e.detail, '')}
          on:remove={() => content.removeBlock(i, false, confirmDelete)} />
      {/if}
    {/each}
    {#if $content.blocks.length === 0 && $isActive}
      <Create
        on:create={(e) => content.addBlock(0, e.detail, '')}
        on:remove={() => content.removeBlock(0, false, confirmDelete)} />
    {/if}
  {/if}
</div>
