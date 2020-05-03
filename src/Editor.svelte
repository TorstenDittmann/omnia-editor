<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { debounce } from "throttle-debounce";

  import Paragraph from "./Paragraph.svelte";
  import Toolbar from "./Toolbar.svelte";

  const dispatch = createEventDispatcher();

  export const autofocus = false;
  export const placeholder = "Let's write an awesome story!";

  const onInit = () => {
    dispatch("init", {});
  };
  const onChange = () => {
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

  export const content = {
    paragraphs: [
      {
        text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In ducimus sequi magni, quasi expedita debitis, ea tenetur quae vero illum placeat ullam omnis unde saepe. Nisi quo excepturi laudantium inventore."
      },
      {
        text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In ducimus sequi magni, quasi expedita debitis, ea tenetur quae vero illum placeat ullam omnis unde saepe. Nisi quo excepturi laudantium inventore."
      }
    ]
  };

  onMount(() => {
    onInit();
  });
</script>

<style>
  .omnia-editor {
    width: -webkit-fill-available;
    margin-left: auto;
    margin-right: auto;
    font-family: Lora, sans-serif;
    font-size: 21px;
    line-height: 1.58;
  }
  #omnia-selection-ref {
    position: absolute;
  }
</style>

<div id="omnia-editor" class="omnia-editor">
  <Toolbar />
  {#each content.paragraphs as paragraph}
    <Paragraph {...paragraph} on:change={debounce(500, onChange)} />
  {/each}
</div>
<div id="omnia-selection-ref" />
