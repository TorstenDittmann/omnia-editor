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
    align-content: start;
  }
  .omnia-create:hover {
    opacity: 1;
  }
  .omnia-seperator {
    margin: 0 .5rem;
  }
  button {
    flex: 0 0 auto;
  }
  button svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  button.remove {
    background: indianred;
  }
</style>

<div class="omnia-create">
  <button on:click={() => dispatch('create', 'heading')}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24">
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z" />
    </svg>
  </button>
  <button on:click={() => dispatch('create', 'paragraph')}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24">
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0
        8V6z" />
    </svg>
  </button>
  <span class="omnia-seperator">|</span>
  <button on:click={() => dispatch('remove')} class="remove">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24">
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1
        1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9
        4v2h6V4H9z" />
    </svg>
  </button>
</div>
