<script>
  import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte';
  import { debounce } from 'throttle-debounce';
  import deepClone from 'deep-clone';
  import { isActive, content } from './stores';
  import { editable, format } from './helpers';
  import sanitizeHtml from 'sanitize-html';

  import Create from './actions/Create.svelte';
  import Toolbar from './actions/Toolbar.svelte';

  import Heading from './blocks/Heading.svelte';
  import Paragraph from './blocks/Paragraph.svelte';
  import Code from './blocks/Code.svelte';
  import Quote from './blocks/Quote.svelte';

  export let active = true;
  export let toolbar = false;
  export let placeholder = "Let's write an awesome story!";
  export let confirmDelete = 'Are you sure?';
  export let data;

  let editor;

  const dispatch = createEventDispatcher();
  const blocks = {
    paragraph: Paragraph,
    heading: Heading,
    code: Code,
    quote: Quote,
  };

  export const history = {
    current: 0,
    data: [],
    add: () => {
      history.data.unshift(deepClone($content));
      history.current = 0;
      if (history.data.length > 10) {
        history.data.pop();
      }
    },
    undo: () => {
      if (history.current >= history.data.length - 1) return false;
      $content = history.data[++history.current];
      onChange();
    },
    redo: () => {
      if (history.current < 1) return false;
      $content = history.data[--history.current];
      onChange();
    },
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
    dispatch('init');
  };

  const emit = {
    change: debounce(500, () => {
      dispatch('change', $content);
    }),
    destroy: () => {
      dispatch('destroy', $content);
    },
  };

  const addBlock = (index, type) => {
    $content.blocks.splice(index + 1, 0, {
      type: type,
      data: {
        text: '',
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
    history.add();
    refresh && ($content = $content);
  };

  const handleChange = (e) => {
    console.log($content);
    $content.blocks[e.detail.index].data.text = e.detail.content;
    fireChange(false);
  };

  onMount(onInit);
  onDestroy(emit.destroy);

  const getComponent = (type) => {
    return blocks[type];
  };

  editable.on('split', (elem, before, after, cursor) => {
    // before and after are document fragments with the content
    // from before and after the cursor in it.
    console.log({ elem, before, after, cursor });
  });

  editable.on('merge', (elem, direction, cursor) => {
    console.log({ elem, direction, cursor });
    if (direction === 'after') {
      // your code...
    } else if (direction === 'before') {
      // your code...
    }
  });

  editable.on('switch', (elem, direction, cursor) => {
    console.log({ elem, direction, cursor });
    if (direction === 'after') {
      // your code...
    } else if (direction === 'before') {
      // your code...
    }
  });

  editable.on('insert', (elem, direction, cursor) => {
    console.log({ elem, direction, cursor });
    // your code...
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
