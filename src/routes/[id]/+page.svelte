<script lang="ts">
  import { NotedownRenderer, NotedownHighlighter } from "notedown-parser";
  import "./notedown.css";
  export let data: import("./$types").PageData;

  let renderer: NotedownRenderer;
  let rootEl: HTMLDivElement;
  let htmlElement: HTMLElement;

  function loadMathJax() {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    script.async = true;
    document.head.appendChild(script);

    // Configure MathJax
    (window as any).MathJax = {
      tex: {
        inlineMath: [["$", "$"]],
        displayMath: [["$$", "$$"]],
      },
      options: {
        enableMenu: false,
      },
    };
  }

  $: {
    if (typeof window !== "undefined") {
      loadMathJax();
      renderer = new NotedownRenderer(document);
      htmlElement = renderer.renderWithStyles(data.data);
      if (rootEl) {
        rootEl.innerHTML = "";
        rootEl.appendChild(htmlElement);
      }
      (async () => {
        await NotedownHighlighter.highlight(htmlElement);

        if ((window as any).MathJax && (window as any).MathJax.typeset) {
          setTimeout(() => {
            (window as any).MathJax.typeset();
          }, 100);
        }
      })();
    }
  }
</script>

<svelte:head></svelte:head>

<article>
  <div class="title">{data.data.meta.title}</div>
  <div class="tags">
    {#if data.data.meta.writeAt}
      <div class="tag">
        <div class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6z"
            />
          </svg>
        </div>
        <div class="text">
          {new Date(parseInt(data.data.meta.writeAt)).toLocaleDateString(
            "ko-KR",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </div>
      </div>
    {/if}

    <div class="tag">
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          ><path
            fill="currentColor"
            d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
          /></svg
        >
      </div>
      <div class="text">
        {data.data.meta.category || "Uncategorized"}
      </div>
    </div>
  </div>
  <div bind:this={rootEl}></div>
</article>

<style>
  article {
    max-width: 100%;

    background: var(--color-bg-layer1);
    border-radius: 1rem;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
  }

  .title {
    font-size: 1.875rem;
    line-height: 2.25rem;

    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .tags {
    display: flex;
    gap: 0.5rem;

    margin: 0.75rem 0px;
  }

  .tag {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .tag > .icon {
    color: var(--color-accent-1);
    border-radius: 0.5rem;
    width: 2rem;
    height: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--color-accent-2-hover);

    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .tag > .text {
    line-height: 1;
    color: var(--color-tag);
  }
</style>
