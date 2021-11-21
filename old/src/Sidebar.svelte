<style>
  .omnia-sidebar {
    position: sticky;
    top: 50%;
    opacity: 0.1;
    transition: opacity 0.1s;
    height: 100%;
  }

  .omnia-sidebar:hover {
    opacity: 1;
  }
</style>

<div class="omnia-sidebar">
  <slot />
</div>
