<script>
  import { createEventDispatcher } from "svelte";

  import IconCode from "../icons/IconCode.svelte";
  import IconChange from "../icons/IconChange.svelte";
  import IconHeading from "../icons/IconHeading.svelte";
  import IconParagraph from "../icons/IconParagraph.svelte";
  import IconQuote from "../icons/IconQuote.svelte";
  import IconTrash from "../icons/IconTrash.svelte";

  const dispatch = createEventDispatcher();
  let showEdit = false;
  let containerEdit;

  const blur = () => {
    if (!containerEdit.matches(":focus-within")) {
      showEdit = false;
    }
  };
</script>

<style>
  .omnia-edit {
    position: sticky;
    top: 50%;
    opacity: 0.1;
    transition: opacity 0.1s;
    display: flex;
    flex-direction: column;
    row-gap: .5rem;
  }

  .omnia-edit:hover {
    opacity: 1;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: transform 0.1s;
  }

  button:hover {
    transform: scale(1.2);
  }

  .menu {
    position: absolute;
    left: -8rem;
    width: 8rem;
    background: var(--background-color);
    display: flex;
    visibility: hidden;
  }

  .menu.show {
    visibility: visible;
  }

  .edit {
    cursor: pointer;
    outline: none;
  }

  .edit .icon {
    display: flex;
    transition: transform 0.1s;
  }

  .edit .icon:hover {
    transform: scale(1.2);
  }

  .edit.active .icon {
    transform: scale(1.2) rotate(90deg);
  }
</style>

<div class="omnia-edit">
  <div
    class="edit"
    tabindex="0"
    class:active={showEdit}
    on:blur={blur}
    on:focus={() => (showEdit = true)}
    bind:this={containerEdit}>
    <div class="menu" class:show={showEdit}>
      <button
        title="Paragraph"
        on:blur={blur}
        on:click={() => dispatch('switch', 'paragraph')}>
        <IconParagraph />
      </button>
      <button
        title="Quote"
        on:blur={blur}
        on:click={() => dispatch('switch', 'quote')}>
        <IconQuote />
      </button>
      <button
        title="Heading"
        on:blur={blur}
        on:click={() => dispatch('switch', 'heading')}>
        <IconHeading />
      </button>
      <button
        title="Code"
        on:blur={blur}
        on:click={() => dispatch('switch', 'code')}>
        <IconCode />
      </button>
    </div>
    <span class="icon">
      <IconChange />
    </span>
  </div>
  <button title="Delete" on:click={() => dispatch('remove')}>
    <IconTrash />
  </button>
</div>
