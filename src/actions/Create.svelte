<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<style>

</style>

<div>
<button on:click={() => dispatch("create", "heading")}>Add Heading</button>
<button on:click={() => dispatch("create", "paragraph")}>Add Paragraph</button>
</div>