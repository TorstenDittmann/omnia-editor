<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
.omnia-create {
  opacity: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: auto;
  align-content: start
}
.omnia-create:hover {
  opacity: 1;
}
.omnia-create button {
    flex: 0 0 auto;
}
</style>

<div class="omnia-create">
<button on:click={() => dispatch("create", "heading")}>Add Heading</button>
<button on:click={() => dispatch("create", "paragraph")}>Add Paragraph</button>
</div>