<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { debounce } from "throttle-debounce";

  import Paragraph from "./Paragraph.svelte";

  const dispatch = createEventDispatcher();

  export const autofocus = false;
  export const placeholder = "Let's write an awesome story!";

  const onInit = () => {
    dispatch("init", {});
  };
  const onChange = () => {
    console.log("onchange");
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
        text: "das ist ein test"
      },
      {
        text: "Lorem Ipsum dolor!"
      }
    ]
  };

  onMount(() => {
    console.log("huhu");
    onInit();
  });
</script>

<style>
  .omnia-editor {
    width: -webkit-fill-available;
  }
</style>

<div class="omnia-editor">
  {#each content.paragraphs as paragraph}
    <Paragraph {...paragraph} on:change={debounce(500, onChange)} />
  {/each}
</div>
