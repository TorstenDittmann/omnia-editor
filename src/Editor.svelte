<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { debounce } from "throttle-debounce";
  import { isActive, content, historyStore, defaultData } from "./stores";
  import { format, setSpellCheck } from "./helpers";
  import deepClone from "deep-clone";

  import Create from "./actions/Create.svelte";

  import Block from "./Block.svelte";
  import Sidebar from "./Sidebar.svelte";

  export const history = historyStore();
  export let active = true;
  export let spellCheck = false;
  export let sidebar = true;
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

  const activateHistory = () => {
    $history.active = true;
  };

  const emitChange = debounce(500, () => {
    $history.active && history.add();
    dispatch("change", $content);
  });

  setSpellCheck(spellCheck);
  onMount(onInit);

  content.subscribe(() => {
    dispatch("input");
    emitChange();
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
    display: flex;
    flex-direction: row;
  }
  @media (max-width: 960px) {
    .omnia-editor {
      line-height: 2rem;
    }
  }
  .omnia-blocks {
    width: 100%;
  }
</style>

<div class="omnia-editor" bind:this={editor}>
  {#if sidebar}
    <Sidebar>
      <slot />
    </Sidebar>
  {/if}
  <div class="omnia-blocks">
    {#if $content && $content.blocks}
      {#each $content.blocks as block, i}
        <Block
          {block}
          {i}
          {confirmDelete}
          {placeholder}
          on:activateHistory={activateHistory} />
      {/each}
      {#if $content.blocks.length === 0 && $isActive}
        <Create
          on:create={(e) => content.addBlock(0, e.detail, '')}
          on:remove={() => content.removeBlock(0, false, confirmDelete)} />
      {/if}
    {/if}
  </div>
</div>
