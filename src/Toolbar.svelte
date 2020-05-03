<script>
  import { onMount } from "svelte";
  import { createPopper } from "@popperjs/core";

  let show = false;

  onMount(() => {
    const editorRef = document.getElementById("omnia-editor");
    const toolbarRef = document.getElementById("omnia-toolbar");
    const selectionRef = document.querySelector("#omnia-selection-ref");
    const popper = createPopper(selectionRef, toolbarRef, {
      placement: "top"
    });

    const selection = window.getSelection();

    editorRef.addEventListener("mouseup", event => {
      if (!selection.isCollapsed) {
        const { left, top, width, height } = selection
          .getRangeAt(0)
          .getBoundingClientRect();

        selectionRef.style.left = `${left}px`;
        selectionRef.style.top = `${top}px`;
        selectionRef.style.width = `${width}px`;
        selectionRef.style.height = `${height}px`;

        popper.update();
        show = true;
      }
    });

    editorRef.addEventListener("mousedown", event => {
      show = false;
    });
  });
</script>

<style>
  #omnia-toolbar .container {
    background-image: linear-gradient(
      to bottom,
      rgba(49, 49, 47, 0.99),
      #262625
    );
    background-repeat: repeat-x;
    border-radius: 5px;
    padding: 0 10px;
    color: white;
    line-height: 44px;
    display: inline-block;
    opacity: 0;
    pointer-events: none;
    transition: transform 0.2s ease-in-out;
  }
  #omnia-toolbar .show {
    pointer-events: auto;
    animation: pop-upwards 180ms forwards linear;
    animation-delay: 0.2s;
    transition: opacity 0s linear 0.2s;
  }
  @keyframes pop-upwards {
    0% {
      transform: matrix(0.97, 0, 0, 1, 0, 12);
      opacity: 0;
    }

    20% {
      transform: matrix(0.99, 0, 0, 1, 0, 2);
      opacity: 0.7;
    }

    40% {
      transform: matrix(1, 0, 0, 1, 0, -1);
      opacity: 1;
    }

    70% {
      transform: matrix(1, 0, 0, 1, 0, 0);
      opacity: 1;
    }

    100% {
      transform: matrix(1, 0, 0, 1, 0, 0);
      opacity: 1;
    }
  }
</style>

<div id="omnia-toolbar" role="tooltip">
  <div class="container" class:show>
    <span>1</span>
    <span>2</span>
    <span>3</span>
  </div>
</div>
